/**
 * AnimatedGrid component.
 *
 * A responsive CSS grid wrapper that applies a staggered fade-in animation
 * to each child via Framer Motion. Children enter the viewport invisible
 * (`opacity: 0, y: 30`) and animate to their final position once they scroll
 * into view (`viewport: { once: true }`).
 *
 * Column count:
 * - 1 column on small screens
 * - 2 columns on `sm`
 * - 3 columns on `md` and above
 *
 * @example
 * <AnimatedGrid>
 *   {products.map((p) => <ProductCard key={p._id} {...p} />)}
 * </AnimatedGrid>
 */
import * as motion from 'motion/react-client'
import { Grid } from '@radix-ui/themes';

interface AnimatedGridProps {
    /** Child elements to render inside the grid — one cell per item. */
    children: React.ReactNode[]
}

export default function AnimatedGrid({ children }: AnimatedGridProps) {
    return (
        <Grid height="100%" columns={{ initial: '1', sm: '2', md: '3', lg: '3', xl: '3' }} gap="4">
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    /** Start hidden and offset below final position. */
                    initial={{ opacity: 0, y: 30 }}
                    whileInView="rest"
                    /** Stagger each card by 100 ms so they cascade into view. */
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    /** Only animate once — no re-trigger on scroll back up. */
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