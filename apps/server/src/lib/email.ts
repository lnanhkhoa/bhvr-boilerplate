import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  WelcomeEmail,
  PasswordResetEmail,
  EmailVerificationEmail,
} from "@repo/shared";

let resend: Resend | null = null;

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const DEFAULT_FROM = process.env.EMAIL_FROM || "BHVR <noreply@bhvr.com>";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  const client = getResendClient();
  
  if (!client) {
    console.log("📧 Email would be sent:", {
      to: options.to,
      subject: options.subject,
      from: DEFAULT_FROM,
    });
    console.log("💡 Set RESEND_API_KEY to enable actual email sending");
    return { success: true, id: "mock-email-id" };
  }

  try {
    const result = await client.emails.send({
      from: DEFAULT_FROM,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
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

export const sendWelcomeEmail = async (
  to: string,
  userName?: string,
  loginUrl?: string
) => {
  const defaultLoginUrl = `${process.env.APP_URL || "http://localhost:5173"}/login`;
  
  const html = await render(
    WelcomeEmail({
      userName,
      loginUrl: loginUrl || defaultLoginUrl,
    }) as any
  ) as unknown as string;

  return sendEmail({
    to,
    subject: "Welcome to BHVR!",
    html,
  });
};

export const sendPasswordResetEmail = async (
  to: string,
  resetUrl: string,
  userName?: string
) => {
  const html = await render(
    PasswordResetEmail({
      userName,
      resetUrl,
    }) as any
  ) as unknown as string;

  return sendEmail({
    to,
    subject: "Reset Your BHVR Password",
    html,
  });
};

export const sendEmailVerificationEmail = async (
  to: string,
  verificationUrl: string,
  userName?: string
) => {
  const html = await render(
    EmailVerificationEmail({
      userName,
      verificationUrl,
    }) as any
  ) as unknown as string;

  return sendEmail({
    to,
    subject: "Verify Your BHVR Email Address",
    html,
  });
};