import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
    tags: string[];
    github?: string;
}

const ProjectCard = ({ title, desc, icon: Icon, color, tags, github }: ProjectCardProps) => (
    <motion.div
        whileHover={{ y: -12, scale: 1.01 }}
        className="glass-card p-10 rounded-3xl relative overflow-hidden group border border-white/5 h-full flex flex-col backdrop-blur-xl bg-white/[0.01] hover:bg-white/[0.03] transition-all"
    >
        <div className="absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-10 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: color }} />
        <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-white/30 transition-all" style={{ color }}>
            <Icon size={32} />
        </div>
        <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase group-hover:text-white transition-colors">{title}</h3>
        <p className="text-white/40 mb-8 leading-relaxed flex-grow font-medium group-hover:text-white/60 transition-colors">{desc}</p>
        <div className="flex flex-wrap gap-2 mb-10">
            {tags?.map((tag: string) => (
                <span key={tag} className="text-[9px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 font-black uppercase tracking-widest group-hover:border-white/20 transition-all">
                    {tag}
                </span>
            ))}
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] border-t border-white/5 pt-6 group-hover:border-white/10 transition-colors">
            {github ? (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-white transition-all cursor-pointer"
                >
                    <Github size={14} /> Source Code
                </a>
            ) : (
                <span className="flex items-center gap-2 text-white/20 cursor-not-allowed">
                    <Github size={14} /> Source Code
                </span>
            )}
            <span className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-cyan-400 transition-all">
                <ExternalLink size={14} /> Documentation
            </span>
        </div>
    </motion.div>
);

export default ProjectCard;
