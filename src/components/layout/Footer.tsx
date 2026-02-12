
import { Mail, Phone, Linkedin, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="connect" className="py-20 w-full max-w-3xl border-t border-white/5">
            <div className="flex flex-col gap-12">
                <div className="max-w-xl">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 uppercase leading-none">Let's <span className="text-cyan-400">Vibe</span></h2>
                    <p className="text-white/40 mb-12 text-sm italic font-medium leading-relaxed border-l-2 border-purple-500/30 pl-6">"Straight fire deployments only. Slide into my DMs for collaborations."</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group cursor-pointer bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-cyan-400/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Email me</div>
                                <div className="text-lg font-bold">deveshinani839@gmail.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-purple-400/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <Phone size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Call me</div>
                                <div className="text-lg font-bold">+91 7498709009</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://www.linkedin.com/in/devesh-inani-700547289/" target="_blank" className="voxel-btn p-6 glass-card rounded-2xl flex items-center justify-between group hover:border-cyan-400 transition-colors bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <Linkedin size={24} className="text-[#0077B5]" />
                            <span className="text-sm font-black uppercase tracking-widest">LinkedIn</span>
                        </div>
                        <ExternalLink size={16} className="text-white/20 group-hover:text-white" />
                    </a>
                    <a href="https://github.com/DeveshInani" target="_blank" className="voxel-btn p-6 glass-card rounded-2xl flex items-center justify-between group hover:border-white transition-colors bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <Github size={24} />
                            <span className="text-sm font-black uppercase tracking-widest">GitHub</span>
                        </div>
                        <ExternalLink size={16} className="text-white/20 group-hover:text-white" />
                    </a>
                </div>
            </div>

            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="pixel-font text-white/10 text-[10px] tracking-widest uppercase">Built with zero-latency aura | © 2025 DEVESH INANI</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Active for dev hires</span>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
