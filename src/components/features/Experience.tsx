import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '../../data';

const Experience = () => {
    return (
        <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                    <Briefcase size={24} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">XP GAINED</h2>
            </div>

            <div className="relative border-l border-white/10 ml-6 space-y-16">
                {EXPERIENCE.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-[#050505]" />

                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <h3 className="text-2xl font-bold tracking-tight">{job.role}</h3>
                            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
                                {job.period}
                            </span>
                        </div>

                        <div className="text-lg text-cyan-400 font-medium mb-4">{job.company}</div>

                        <p className="text-white/60 leading-relaxed mb-6 font-light">
                            {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {job.tech.map(t => (
                                <span key={t} className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-white/40">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
