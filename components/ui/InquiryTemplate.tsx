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
    Tailwind,
} from "@react-email/components";

export interface InquiryEmailProps {
    email: string;
    phone: string;
    location: string;
    details: string;
    source: string;
}

export const InquiryTemplate = ({
    email,
    phone,
    location,
    details,
    source,
}: InquiryEmailProps) => (
    <Html>
        <Head />
        <Preview>New Project Inquiry from {email}</Preview>
        <Tailwind>
            <Body className="bg-gray-100 font-sans">
                <Container className="bg-white border border-gray-200 p-8 my-10 mx-auto max-w-xl rounded-lg shadow-sm">
                    <Heading className="text-2xl font-bold text-gray-800 mb-4">
                        New Project Inquiry
                    </Heading>
                    <Text className="text-gray-600 mb-6">
                        You have received a new lead from your website contact form.
                    </Text>

                    <Section className="mb-4">
                        <Text className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            Contact Information
                        </Text>
                        <Text className="text-gray-800 m-0"><strong>Email:</strong> {email}</Text>
                        <Text className="text-gray-800 m-0"><strong>Phone:</strong> {phone}</Text>
                    </Section>

                    <Section className="mb-4">
                        <Text className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            Property Location
                        </Text>
                        <Text className="text-gray-800 m-0">{location}</Text>
                    </Section>

                    <Hr className="border-gray-200 my-4" />

                    <Section className="mb-4">
                        <Text className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            Project Details
                        </Text>
                        <Text className="text-gray-800 leading-relaxed">{details}</Text>
                    </Section>

                    <Section>
                        <Text className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            How they heard about us
                        </Text>
                        <Text className="text-gray-800 m-0">{source}</Text>
                    </Section>

                    <Hr className="border-gray-200 my-6" />

                    <Text className="text-xs text-gray-400 text-center">
                        Sent via your Resend + Next.js Integration
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default InquiryTemplate;
