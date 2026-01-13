import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/features/Hero';
import Projects from './components/features/Projects';
import TechStack from './components/features/TechStack';
import Education from './components/features/Education';
import Footer from './components/layout/Footer';
import Scene from './components/3d/Scene';

const IS_DEV = import.meta.env.MODE === 'development';

const NARRATIVE_QUOTES = [
    "I am Devesh. Ready to explore the burst?",
    "Software Developer ID verified. Ready for the code dive?",
    "Syncing project artifacts. Ready for the deep dive?",
    "Stack diagnostics online. Ready for the power-up?",
    "Cognitive logs retrieved. Ready for the nexus link?",
    "Narrative complete. Ready to establish connection?"
];

const App = () => {
    const [storyPhase, setStoryPhase] = useState(0);
    const [activeProjectTitle, setActiveProjectTitle] = useState("");
    const [isIntroAnimating, setIsIntroAnimating] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsIntroAnimating(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Intersection Observer for scroll-driven narrative
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'hero') setStoryPhase(1);
                    else if (id === 'work') setStoryPhase(2);
                    else if (id === 'stack') setStoryPhase(3);
                    else if (id === 'experience') setStoryPhase(4);
                    else if (id === 'connect') setStoryPhase(5);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const sections = ['hero', 'work', 'stack', 'experience', 'connect'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const nextSectionMap: Record<number, string> = {
        1: 'work',
        2: 'stack',
        3: 'experience',
        4: 'connect'
    };

    const prevSectionMap: Record<number, string> = {
        2: 'hero',
        3: 'work',
        4: 'stack',
        5: 'experience'
    };

    return (
        <div className="relative w-full h-screen bg-[#050505] selection:bg-cyan-500/30 overflow-hidden text-white font-inter">
            {/* Background Shader Base */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(5,5,5,1))]" />

            {/* Main 3D Scene - Always visible, fixed in background/layout */}
            <Scene
                storyPhase={storyPhase}
                isIntro={isIntroAnimating}
                activeProjectTitle={activeProjectTitle}
            />

            {/* CRT Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] mix-blend-overlay scanline-effect" />

            <div className="relative z-10 h-full overflow-y-auto no-scrollbar scroll-smooth">
                <Navbar />

                {/* Structured Main Content Grid */}
                <main className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
                        {/* Left Column (Reserved for 3D Humanoid/Artifacts) */}
                        <div className="hidden lg:block relative" />

                        {/* Right Column (Content Area) */}
                        <div className="relative z-10 px-6 md:px-12 flex flex-col">
                            {/* Vertical Section Stack */}
                            <div id="hero" className="min-h-screen flex items-center">
                                <Hero storyPhase={storyPhase} setStoryPhase={setStoryPhase} />
                            </div>

                            <div id="work" className="min-h-screen py-32">
                                <Projects onActiveProjectChange={setActiveProjectTitle} />
                            </div>

                            <div id="stack" className="min-h-screen py-32">
                                <TechStack />
                            </div>

                            <div id="experience" className="min-h-screen py-32">
                                <Education />
                            </div>

                            <div id="connect" className="min-h-screen py-32">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </main>

                {/* User-Friendly Narrative HUD */}
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1002] flex flex-col items-center gap-6 w-full max-w-xl px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={storyPhase + activeProjectTitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-card px-8 py-4 rounded-full border border-cyan-500/30 text-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.15)] ring-1 ring-white/10"
                        >
                            <p className="pixel-font text-cyan-400 text-xs tracking-widest uppercase font-black">
                                {storyPhase === 2 && activeProjectTitle
                                    ? `SYNCING: ${activeProjectTitle} - Ready for the dive?`
                                    : NARRATIVE_QUOTES[storyPhase]}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-6">
                        {storyPhase > 1 && (
                            <button
                                onClick={() => scrollToSection(prevSectionMap[storyPhase])}
                                className="px-8 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all font-black uppercase text-[10px] tracking-widest bg-black/60 backdrop-blur-md hover:bg-white/5"
                            >
                                BACK
                            </button>
                        )}
                        {!isIntroAnimating && storyPhase < 5 && (
                            <button
                                onClick={() => scrollToSection(nextSectionMap[storyPhase])}
                                className="px-10 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all font-black uppercase text-[10px] tracking-widest shadow-[0_0_30px_rgba(8,145,178,0.4)] border border-cyan-400/50"
                            >
                                {storyPhase === 1 ? "Start Exploration" : "Move Further"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Dev Helper */}
                {IS_DEV && (
                    <div className="fixed top-4 right-4 z-[2000] flex gap-2">
                        {[0, 1, 2, 3, 4, 5].map(p => (
                            <button
                                key={p}
                                onClick={() => setStoryPhase(p)}
                                className={`w-8 h-8 rounded-md text-xs font-bold ${storyPhase === p ? 'bg-cyan-500 text-black' : 'bg-white/10'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default App;
