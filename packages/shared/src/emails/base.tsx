import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Section,
  Img,
} from "@react-email/components";

interface BaseEmailProps {
  children: React.ReactNode;
  previewText?: string;
}

export const BaseEmail: React.FC<BaseEmailProps> = ({
  children,
  previewText,
}) => {
  return (
    <Html>
      <Head />
      {previewText && (
        <Text style={{ display: "none", overflow: "hidden", lineHeight: 1 }}>
          {previewText}
        </Text>
      )}
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>BHVR</Text>
          </Section>
          {children}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from BHVR. If you didn't expect this email,
              you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const header = {
  padding: "24px 0",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: "0",
};

const footer = {
  padding: "24px 0 0",
  borderTop: "1px solid #e5e7eb",
};

const footerText = {
  fontSize: "14px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "0",
};