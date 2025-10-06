import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeEmail, PasswordResetEmail, EmailVerificationEmail } from "@repo/shared";
import { APP_URL, EMAIL_FROM, RESEND_API_KEY } from "@/configs/env";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  const client = new Resend(RESEND_API_KEY);

  if (!client) {
    console.log("📧 Email would be sent:", { ...options, from: EMAIL_FROM });
    console.log("💡 Set RESEND_API_KEY to enable actual email sending");
    return { success: true, id: "mock-email-id" };
  }

  try {
    const result = await client.emails.send({
      ...options,
      from: EMAIL_FROM,
      to: Array.isArray(options.to) ? options.to : [options.to],
    });

    if (result.error) {
      console.error("Failed to send email:", result.error);
      return { success: false, error: result.error.message };
    }

    console.log("Email sent successfully:", result.data?.id);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: (error as Error).message };
  }
};

export const sendWelcomeEmail = async (to: string, userName?: string, loginUrl?: string) => {
  const defaultLoginUrl = `${APP_URL}/login`;
  const subject = "Welcome to BHVR!";
  const html = (await render(
    WelcomeEmail({ userName, loginUrl: loginUrl || defaultLoginUrl }) as any,
  )) as unknown as string;
  return sendEmail({ to, subject, html });
};

export const sendPasswordResetEmail = async (to: string, resetUrl: string, userName?: string) => {
  const subject = "Reset Your BHVR Password";
  const html = (await render(PasswordResetEmail({ userName, resetUrl }) as any)) as unknown as string;
  return sendEmail({ to, subject, html });
};

export const sendEmailVerificationEmail = async (to: string, verificationUrl: string, userName?: string) => {
  const subject = "Verify Your BHVR Email Address";
  const html = (await render(EmailVerificationEmail({ userName, verificationUrl }) as any)) as unknown as string;
  return sendEmail({ to, subject, html });
};
