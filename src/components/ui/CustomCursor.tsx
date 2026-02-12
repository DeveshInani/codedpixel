import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, .cursor-pointer, input');
            setIsHovering(!!isClickable);

            if (isClickable) {
                const text = target.getAttribute('data-cursor-text') || 'SELECT';
                setCursorText(text);
            } else {
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Main Cursor Box */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 80 : 20,
                    height: isHovering ? 30 : 20,
                    backgroundColor: isHovering ? 'rgba(34, 211, 238, 1)' : 'rgba(34, 211, 238, 0.4)',
                    borderRadius: isHovering ? '4px' : '0px',
                }}
                className="flex items-center justify-center border border-cyan-400 overflow-hidden mix-blend-difference"
            >
                {isHovering && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] font-black text-black uppercase tracking-tighter"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* Trailing Crosshair */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="w-10 h-10 border border-cyan-400/20 rounded-full"
            />
        </div>
    );
};

export default CustomCursor;
