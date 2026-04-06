import type { Metadata } from 'next';
import TermsAndConditions from '@/components/ui/TermsAndConditions';
import { Container, Section } from '@radix-ui/themes';

export const metadata: Metadata = {
    title: 'Terms and Conditions of Sale',
    description: 'Terms and conditions of sale for Arizona Fire Features.',
};

export default function TermsPage() {
    return (
        <Section>
            <Container size="3" className="py-12 px-4">
                <TermsAndConditions />
            </Container>
        </Section>
    );
}
