import { motion } from 'framer-motion';
import { SKILLS } from '../../data';
import GlitchText from '../ui/GlitchText';

const TechStack = () => {
    // Helper to get simple-icon slug (basic mapping)
    const getIconUrl = (tech: string) => {
        const slug = tech.toLowerCase()
            .replace('c++', 'cplusplus')
            .replace('c#', 'csharp')
            .replace('.', '')
            .replace(/\s+/g, '');
        return `https://cdn.simpleicons.org/${slug}/white`;
    };

    return (
        <section id="stack" className="py-20 w-full max-w-3xl">
            <div className="mb-16">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 uppercase leading-none">
                    <GlitchText text="TECH STACK" />
                </h2>
                <p className="text-white/30 pixel-font text-[10px] tracking-[0.3em] uppercase">Continuously expanding my toolkit to build what matters.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SKILLS.map((tech, i) => (
                    <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        data-cursor-text={`BOOT_${tech.toUpperCase()}`}
                        whileHover={{
                            y: -8,
                            backgroundColor: '#ffffff',
                            scale: 1.05,
                            boxShadow: '0 20px 40px rgba(255,255,255,0.2)'
                        }}
                        className="p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4 transition-all duration-300 group bg-white/[0.02]"
                    >
                        <div className="w-8 h-8 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100 group-hover:invert group-hover:brightness-0">
                            <img
                                src={getIconUrl(tech)}
                                alt={tech}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-black transition-colors">{tech}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};


export default TechStack;
