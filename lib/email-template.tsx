import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function ContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{`New portfolio message from ${name}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section>
            <Heading style={heading}>New message from your portfolio</Heading>
            <Text style={meta}>
              <strong>From:</strong> {name} &lt;{email}&gt;
            </Text>
            {subject ? (
              <Text style={meta}>
                <strong>Subject:</strong> {subject}
              </Text>
            ) : null}
            <Hr style={hr} />
            <Text style={messageStyle}>{message}</Text>
            <Hr style={hr} />
            <Text style={footer}>
              Reply directly to this email to reach {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0b12",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  padding: "32px 0",
};
const container = {
  backgroundColor: "#11131d",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "32px",
};
const heading = {
  color: "#e7e9f1",
  fontSize: "20px",
  fontWeight: 600,
  margin: "0 0 20px",
};
const meta = { color: "#99a1b3", fontSize: "14px", margin: "4px 0" };
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "20px 0" };
const messageStyle = {
  color: "#c3c8d6",
  fontSize: "15px",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
};
const footer = { color: "#6b7488", fontSize: "12px", margin: "0" };
