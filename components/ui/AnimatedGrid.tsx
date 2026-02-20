import * as motion from 'motion/react-client'
import { Grid } from '@radix-ui/themes';

export default function AnimatedGrid({ children }: { children: React.ReactNode[] }) {
    return (
        <Grid columns={{ initial: '1', sm: '2', md: '4', lg: '4', xl: '4' }} gap="4">
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView="rest"
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ height: '100%' }}
                    whileHover="hovered"
                    variants={{
                        hovered: { opacity: 1, y: 0 },
                        rest: { opacity: 1, y: 0 }
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </Grid>
    );
}