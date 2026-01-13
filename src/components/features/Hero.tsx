import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Zap, X } from 'lucide-react';
import { HERO_CONTENT } from '../../data';

const Hero = ({ storyPhase, setStoryPhase }: { storyPhase: number, setStoryPhase: (v: number) => void }) => {
    const isExploded = storyPhase === 1;

    return (
        <section className="relative h-screen w-full flex flex-col justify-center px-6 text-left overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="z-10 relative"
            >
                <div className="mb-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                    <Sparkles size={12} /> {HERO_CONTENT.tagline}
                </div>

                <div className="relative group cursor-pointer mb-8" onClick={() => setStoryPhase(1)}>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] select-none uppercase">
                        <span className="block hover:text-cyan-400 transition-colors duration-300">DEVESH</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            INANI
                        </span>
                    </h1>
                    <p className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mt-4 group-hover:text-cyan-400 transition-colors">
                        {isExploded ? "[ THE SYSTEM IS LIVE ]" : "[ CLICK TO ENTER THE FLOW ]"}
                    </p>
                    <p className="text-[8px] font-black tracking-[0.2em] text-cyan-400/40 uppercase mt-1">
                        Try clicking Devesh on the left – he's got moves!
                    </p>
                </div>


                <AnimatePresence mode="wait">
                    {!isExploded ? (
                        <motion.div
                            key="normal"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            className="max-w-xl"
                        >
                            <p className="text-lg md:text-xl text-white/50 mb-12 font-medium leading-relaxed italic border-l-2 border-cyan-500/30 pl-6">
                                "{HERO_CONTENT.bio}"
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="voxel-btn px-8 py-4 bg-white text-black font-black uppercase tracking-tighter hover:bg-cyan-400 transition-all flex items-center gap-2">
                                    <Terminal size={18} /> View Repos
                                </button>
                                <button
                                    onClick={() => setStoryPhase(1)}
                                    className="voxel-btn px-8 py-4 bg-transparent border border-white/20 text-white font-black uppercase tracking-tighter hover:border-white transition-all flex items-center gap-2"
                                >
                                    <Zap size={18} /> Explode Info
                                </button>
                            </div>
                        </motion.div>

                    ) : (
                        <motion.div
                            key="exploded"
                            initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-full max-w-2xl flex flex-col gap-6 p-2 z-[20]"
                        >
                            <div className="flex flex-col items-start mb-4">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4"
                                >
                                    Software <span className="text-cyan-400">Developer</span>
                                </motion.h2>
                                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                    className="glass-card p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl hover:border-cyan-400 transition-colors pointer-events-auto"
                                >
                                    <h3 className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-1">Location</h3>
                                    <p className="text-xl font-bold">{HERO_CONTENT.location}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="glass-card p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl hover:border-purple-500 transition-colors pointer-events-auto"
                                >
                                    <h3 className="text-purple-500 text-[10px] font-black uppercase tracking-widest mb-1">Level</h3>
                                    <p className="text-xl font-bold">B.Tech CSE <span className="text-white/30 text-sm font-medium ml-2">@ VIT</span></p>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                                    className="glass-card p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl hover:border-pink-500 transition-colors pointer-events-auto"
                                >
                                    <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-widest mb-1">Experience</h3>
                                    <p className="text-sm font-black leading-tight uppercase tracking-tighter italic">"Automating the future at Techefficio"</p>
                                </motion.div>
                            </div>
                        </motion.div>

                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Hero;
