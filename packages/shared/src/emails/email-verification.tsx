import React from "react";
import { Section, Text, Button } from "@react-email/components";
import { BaseEmail } from "./base.js";

interface EmailVerificationProps {
  userName?: string;
  verificationUrl: string;
}

export const EmailVerificationEmail: React.FC<EmailVerificationProps> = ({
  userName = "User",
  verificationUrl,
}) => {
  return (
    <BaseEmail previewText="Verify your BHVR email address">
      <Section style={content}>
        <Text style={heading}>Verify Your Email</Text>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          Thank you for signing up with BHVR! To complete your account setup
          and ensure you receive important updates, please verify your email
          address.
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={verificationUrl}>
            Verify Email Address
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Or copy and paste this link into your browser:
        </Text>
        
        <Text style={linkText}>
          {verificationUrl}
        </Text>
        
        <Text style={infoText}>
          ✅ This verification link will expire in 24 hours.
        </Text>
        
        <Text style={paragraph}>
          Once verified, you'll have full access to your account and all
          features.
        </Text>
        
        <Text style={paragraph}>
          If you didn't create an account with BHVR, you can safely ignore this
          email.
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
  backgroundColor: "#10b981",
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

const infoText = {
  fontSize: "14px",
  color: "#059669",
  fontWeight: "500",
  margin: "0 0 16px",
  textAlign: "center" as const,
  padding: "12px",
  backgroundColor: "#ecfdf5",
  borderRadius: "4px",
  border: "1px solid #a7f3d0",
};