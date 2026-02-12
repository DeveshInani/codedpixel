import { motion } from 'framer-motion';
import { Cpu, Wifi, BatteryCharging } from 'lucide-react';

const Navbar = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <nav className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center p-6 md:px-12 pointer-events-none">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center gap-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-cyan-400 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-cyan-400/20 group-hover:bg-cyan-400/40 transition-colors" />
                        <span className="text-cyan-400 font-black relative z-10">DI</span>
                    </div>
                    <div className="hidden md:block">
                        <h1 className="text-xs font-black tracking-[0.3em] text-white/90">DEVESH_INANI_OS</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">System Online</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="hidden lg:flex items-center gap-12 pointer-events-auto px-10 py-4 border border-white/5 bg-black/40 backdrop-blur-md rounded-full"
            >
                {['Work', 'Stack', 'Archive', 'Connect'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        data-cursor-text={`GOTO_${item.toUpperCase()}`}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-cyan-400 transition-all relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                ))}
            </motion.div>

            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center gap-8"
            >
                <div className="hidden md:flex items-center gap-4 text-white/40">
                    <div className="flex items-center gap-2">
                        <Cpu size={14} />
                        <span className="text-[10px] font-bold">4.2GHz</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wifi size={14} />
                        <span className="text-[10px] font-bold">5G_NX</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                        <BatteryCharging size={14} className="animate-pulse" />
                        <span className="text-[10px] font-bold">100%</span>
                    </div>
                </div>
                <div className="text-xl font-black text-white/90 font-mono tracking-tighter">
                    [{time}]
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;
