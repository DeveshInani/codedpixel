import { useEffect, useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { MonitorCheck, Factory, Microscope, Activity } from 'lucide-react';
import { PROJECTS } from '../../data';
import GlitchText from '../ui/GlitchText';

const Projects = ({ onActiveProjectChange }: { onActiveProjectChange: (title: string) => void }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const title = entry.target.getAttribute('data-project-title');
                    if (title) onActiveProjectChange(title);
                }
            });
        }, { threshold: 0.6 });

        const cards = sectionRef.current?.querySelectorAll('[data-project-title]');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [onActiveProjectChange]);

    const getIcon = (title: string) => {
        if (title.includes('Snitchbot')) return MonitorCheck;
        if (title.includes('BIM')) return Factory;
        if (title.includes('Lung')) return Microscope;
        if (title.includes('Doctor')) return Activity;
        return MonitorCheck;
    };

    return (
        <section ref={sectionRef} id="work" className="py-20 w-full max-w-3xl">
            <div className="mb-16">
                <span className="pixel-font text-purple-500 text-lg tracking-widest uppercase mb-2 block">The Portfolio</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                    <GlitchText text="SELECTED WORKS" />
                </h2>
            </div>

            <div className="flex flex-col gap-6">
                {PROJECTS.map((project, index) => (
                    <div key={index} data-project-title={project.title} data-cursor-text="OPEN_ARTIFACT">
                        <ProjectCard
                            title={project.title}
                            desc={project.desc}
                            icon={getIcon(project.title)}
                            color={project.color}
                            tags={project.tags}
                            github={project.github}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};



export default Projects;
