class VoiceAssistant {
    private static instance: VoiceAssistant;
    private synth: SpeechSynthesis = null!;
    private voice: SpeechSynthesisVoice | null = null;

    private constructor() {
        try {
            this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null as any;
            if (this.synth) {
                this.loadVoices();
                if (this.synth.onvoiceschanged !== undefined) {
                    this.synth.onvoiceschanged = this.loadVoices;
                }
            }
        } catch (err) {
            console.warn("VoiceAssistant initialization failed", err);
        }
    }

    public static getInstance(): VoiceAssistant {
        if (!VoiceAssistant.instance) {
            VoiceAssistant.instance = new VoiceAssistant();
        }
        return VoiceAssistant.instance;
    }

    private loadVoices = () => {
        if (!this.synth) return;
        try {
            const voices = this.synth.getVoices();
            if (voices && voices.length > 0) {
                this.voice = voices.find(v =>
                    v.name.includes('male') ||
                    v.name.includes('Google UK English') ||
                    v.name.includes('David')
                ) || voices[0];
            }
        } catch (err) {
            console.warn("Could not load voices", err);
        }
    };

    public speak(text: string) {
        if (!this.synth) return;
        try {
            if (this.synth.speaking) {
                this.synth.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            if (this.voice) {
                utterance.voice = this.voice;
            }
            utterance.pitch = 0.8;
            utterance.rate = 0.9;
            utterance.volume = 1.0;

            this.synth.speak(utterance);
        } catch (err) {
            console.warn("Speech synthesis failed", err);
        }
    }
}

export const voiceAssistant = VoiceAssistant.getInstance();
