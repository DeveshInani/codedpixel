import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '../../data';
import GlitchText from '../ui/GlitchText';

const Education = () => {
    return (
        <section id="experience" className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-16 justify-end">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-right uppercase">
                    <GlitchText text="Cognitive Archive" />
                </h2>
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                    <GraduationCap size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        data-cursor-text="DECRYPT"
                        className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 block">
                                {edu.period}
                            </span>
                            <h3 className="text-xl font-bold mb-2 leading-tight">{edu.school}</h3>
                            <div className="text-cyan-400 font-medium mb-4">{edu.degree}</div>

                            <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="text-xs font-mono text-white/60">Score: <span className="text-green-400">{edu.grade}</span></span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Education;
