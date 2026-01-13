import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

export const SOCIALS = [
    { name: 'GitHub', icon: Github, link: 'https://github.com/deveshinani839' }, // Assuming github username from email, generic placeholder otherwise
    { name: 'LinkedIn', icon: Linkedin, link: '#' },
    { name: 'Email', icon: Mail, link: 'mailto:deveshinani839@gmail.com' },
];

export const HERO_CONTENT = {
    name: "DEVESH INANI",
    tagline: "Cooking Big Brain AI Systems",
    bio: "Building logic with aura. Main character energy in the terminal. No cap, just compute. Shipping code that hits different.",
    location: "Hyderabad, Telangana"
};

export const EXPERIENCE = [
    {
        company: "Techefficio",
        role: "Python Developer",
        period: "Oct 2025 - Present",
        description: "In the lab cooking up face detection & recognition systems. Automating audit flows for Maruti Suzuki (big league stuff). Collabing on ANPR systems for seamless workflow execution. Pure impact, no fluff.",
        tech: ["Python", "OpenCV", "AI"]
    },
    {
        company: "Vrinda Techapps",
        role: "Project Intern",
        period: "July 2023 - Sep 2023",
        description: "Designed a yoga app that passes the vibe check. Integrated APIs for smooth data flow. Managed server-side logic like a boss. Collaborated with the squad to refine features.",
        tech: ["UI/UX", "API Integration", "Backend"]
    }
];

export const EDUCATION = [
    {
        school: "Vellore Institute of Technology",
        degree: "B.Tech CSE",
        grade: "7.7 CGPA",
        period: "2021 - Present"
    },
    {
        school: "Tatya Saheb Musle Junior College",
        degree: "Intermediate (MPC)",
        grade: "89.83%",
        period: "2019 - 2021"
    },
    {
        school: "VIBGYOR School",
        degree: "Class 10",
        grade: "80.2%",
        period: "2019"
    }
];

export const PROJECTS = [
    {
        title: "BIM MILLS",
        desc: "Textile manufacturing website. Smart factory vibes.",
        tags: ["React", "Industry 4.0", "Web"],
        color: "#4ade80"
    },
    {
        title: "Lung Cancer Detection",
        desc: "Deep learning model for prediction. High precision, saving lives fr.",
        tags: ["DL", "Medical AI", "Python"],
        color: "#f43f5e"
    },
    {
        title: "AI Proctoring",
        desc: "Enterprise level solution. Keeping exams fair with big brain AI.",
        tags: ["AI", "Enterprise", "Security"],
        color: "#22d3ee"
    },
    {
        title: "AI Doctor",
        desc: "Your digital health guardian. AI powered diagnostics.",
        tags: ["Healthcare", "AI", "Ml"],
        color: "#a855f7"
    }
];

export const SKILLS = [
    "Java", "Python", "SQL", "MySQL", "HTML", "CSS", "JavaScript",
    "MERN", "Flutter", "Machine Learning", "PyTorch", "ONNX", "NumPy", "Pandas",
    "Matplotlib", "R Studio", "Power BI", "OpenCV", "Computer Vision",
    "React", "Django", "FastAPI"
];
