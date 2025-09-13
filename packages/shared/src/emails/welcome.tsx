import React from "react";
import { Section, Text, Button } from "@react-email/components";
import { BaseEmail } from "./base.js";

interface WelcomeEmailProps {
  userName?: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = "User",
  loginUrl,
}) => {
  return (
    <BaseEmail previewText={`Welcome to BHVR, ${userName}!`}>
      <Section style={content}>
        <Text style={heading}>Welcome to BHVR!</Text>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          Welcome to BHVR! Your account has been successfully created. We're
          excited to have you on board.
        </Text>
        
        <Text style={paragraph}>
          You can now access your account and explore all the features we have
          to offer.
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Get Started
          </Button>
        </Section>
        
        <Text style={paragraph}>
          If you have any questions or need assistance, don't hesitate to reach
          out to our support team.
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
  backgroundColor: "#3b82f6",
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