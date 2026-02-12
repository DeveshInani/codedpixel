import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import GlitchText from '../ui/GlitchText';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            console.log("Transmitting to API:", apiUrl);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch(`${apiUrl}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="w-full max-w-2xl mx-auto p-2">
            <div className="flex flex-col items-start mb-8 text-left">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4"
                >
                    Establish <GlitchText text="Connection" className="text-cyan-400" />
                </motion.h2>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-4">
                    [ SEND A SECURE TRANSMISSION ]
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                onSubmit={handleSubmit}
                className="glass-card p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                            <User size={12} /> Name
                        </label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            data-cursor-text="INPUT_ID"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-purple-500 flex items-center gap-2">
                            <Mail size={12} /> Email
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            data-cursor-text="INPUT_EMAIL"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-pink-500 flex items-center gap-2">
                        <MessageSquare size={12} /> Subject
                    </label>
                    <input
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        data-cursor-text="INPUT_TOPIC"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-colors"
                    />
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                        <Send size={12} /> Message
                    </label>
                    <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Your mission brief..."
                        data-cursor-text="INPUT_MESSAGE"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                    />
                </div>

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    data-cursor-text="EXECUTE_SEND"
                    className="voxel-btn w-full py-4 bg-white text-black font-black uppercase tracking-tighter hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                >
                    {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            SEND TRANSMISSION
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest justify-center"
                    >
                        <CheckCircle2 size={14} /> Transmission Received Successfully
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest justify-center text-center"
                    >
                        <AlertCircle size={14} /> {errorMessage}
                    </motion.div>
                )}
            </motion.form>
        </section>
    );
};

export default Contact;
