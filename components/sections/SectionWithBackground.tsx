import { Section, Inset } from '@radix-ui/themes';
import clsx from 'clsx';
import Image from 'next/image';

interface SectionWithBackgroundProps {
    children: React.ReactNode;
    imageUrl: string;
    alt: string;
    className?: string;
    height?: string;
    blurDataURL?: string;
}

const SectionWithBackground = (props: SectionWithBackgroundProps) => {
    const { children, className, imageUrl, alt, height, blurDataURL } = props;

    return (
        <Section position="relative" size="4" width="100%" height={height ? height : "calc(100vh - 95px)"} className={clsx(
            "overflow-hidden flex items-center justify-center",
            className
        )} >
            <Inset>
                {/* Background Image */}
                <Image
                    alt={alt}
                    src={imageUrl}
                    fill
                    priority={true}
                    style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-1)] to-transparent opacity-80" />
            </Inset>
            {children}
        </Section>
    );
};

export default SectionWithBackground;