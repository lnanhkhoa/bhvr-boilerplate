import React from "react";
import { Section, Text, Button } from "@react-email/components";
import { BaseEmail } from "./base.js";

interface PasswordResetEmailProps {
  userName?: string;
  resetUrl: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  userName = "User",
  resetUrl,
}) => {
  return (
    <BaseEmail previewText="Reset your BHVR password">
      <Section style={content}>
        <Text style={heading}>Password Reset Request</Text>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          We received a request to reset your password for your BHVR account.
          If you made this request, click the button below to set a new password.
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={resetUrl}>
            Reset Password
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Or copy and paste this link into your browser:
        </Text>
        
        <Text style={linkText}>
          {resetUrl}
        </Text>
        
        <Text style={warningText}>
          ⚠️ This link will expire in 1 hour for security reasons.
        </Text>
        
        <Text style={paragraph}>
          If you didn't request a password reset, you can safely ignore this
          email. Your password will remain unchanged.
        </Text>
        
        <Text style={paragraph}>
          Best regards,<br />
          The BHVR Team
        </Text>
      </Section>
    </BaseEmail>
  );
};

const content = {
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1f2937",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#dc2626",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
};

const linkText = {
  fontSize: "14px",
  color: "#6b7280",
  wordBreak: "break-all" as const,
  margin: "0 0 16px",
  padding: "8px",
  backgroundColor: "#f3f4f6",
  borderRadius: "4px",
};

const warningText = {
  fontSize: "14px",
  color: "#dc2626",
  fontWeight: "500",
  margin: "0 0 16px",
  textAlign: "center" as const,
  padding: "12px",
  backgroundColor: "#fef2f2",
  borderRadius: "4px",
  border: "1px solid #fecaca",
};