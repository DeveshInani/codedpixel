import { motion } from 'framer-motion';

const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <motion.span
                className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </div>
    );
};

export default GlitchText;
