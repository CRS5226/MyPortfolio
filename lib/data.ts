export const personalInfo = {
  name: "Chitraksh Singh",
  title: "Machine Learning Engineer",
  tagline: "Building intelligent systems at the intersection of AI, security & financial markets",
  email: "chitrakshsingh007@gmail.com",
  linkedin: "https://www.linkedin.com/in/chitraksh-singh/",
  github: "https://github.com/CRS5226",
  scholar: "https://scholar.google.com/citations?user=p5eBCKUAAAAJ&hl=en",
  location: "Mumbai, India",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: "H to H",
    role: "Machine Learning Engineer",
    location: "Delhi",
    duration: "Aug 2025 – Present",
    achievements: [
      "Architected an Autonomous Agentic Trading System leveraging Claude 3.5 to dynamically synthesize intra-day strategies; implemented a self-correcting feedback loop that optimizes algorithmic parameters based on real-time pre-market volatility and historical performance.",
      "Engineered a High-Concurrency Data Pipeline for 1,500+ stocks via Zerodha API; utilized Redis sharding, multiprocessing, and round-robin strategies to minimize RAM overhead and ensure low-latency data synchronization.",
      "Developed an NLP-driven Sentiment Analysis Engine using Google News RSS to monitor global financial headlines; built an automated pipeline to quantify market impact, providing actionable predictive signals for algorithmic decision-making.",
      "Integrated a Claude-Zerodha MCP (Model Context Protocol) Connector to facilitate real-time, natural language trade verification; enabled an interactive, agentic experience for retail users to query market status via custom trading workbooks.",
      "Automated Real-Time Reporting & Visualization by linking backend predictive models to Microsoft Graph API and Telegram Bot API; enabled seamless live-logging of trade data into cloud-synchronized Excel environments for instant analysis.",
      "Optimized Production Infrastructure on a VPS using Nginx and PM2 for high-uptime deployment of Next.js platforms; managed full-stack DNS configuration (A/MX records) to ensure 24/7 service availability and secure mail integration.",
    ],
  },
  {
    company: "Frondeur Labs",
    role: "Machine Learning Engineer – Intern",
    location: "Bengaluru",
    duration: "Mar 2025 – Aug 2025",
    achievements: [
      "Architected an Autonomous Agentic Trading System leveraging Claude 3.5 to dynamically synthesize intra-day strategies; implemented a self-correcting feedback loop that optimizes algorithmic parameters based on real-time pre-market volatility and historical performance.",
      "Engineered a High-Concurrency Data Pipeline for 1,500+ stocks via Zerodha API; utilized Redis sharding, multiprocessing, and round-robin strategies to minimize RAM overhead and ensure low-latency data synchronization.",
      "Developed an NLP-driven Sentiment Analysis Engine using Google News RSS to monitor global financial headlines; built an automated pipeline to quantify market impact, providing actionable predictive signals for algorithmic decision-making.",
      "Integrated a Claude-Zerodha MCP (Model Context Protocol) Connector to facilitate real-time, natural language trade verification; enabled an interactive, agentic experience for retail users to query market status via custom trading workbooks.",
      "Automated Real-Time Reporting & Visualization by linking backend predictive models to Microsoft Graph API and Telegram Bot API; enabled seamless live-logging of trade data into cloud-synchronized Excel environments for instant analysis.",
      "Optimized Production Infrastructure on a VPS using Nginx and PM2 for high-uptime deployment of Next.js platforms; managed full-stack DNS configuration (A/MX records) to ensure 24/7 service availability and secure mail integration.",
    ],
  },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["C++", "Python", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    items: ["Flask", "Scikit-learn", "NodeJS", "PyTorch", "TensorFlow"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "MongoDB"],
  },
  {
    category: "Certifications",
    items: [
      "AI Classroom – Microsoft",
      "Geoprocessing – ISRO",
      "DSA Workshop – GFG",
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    name: "Satellite Semantic Segmentation",
    description:
      "A deep learning pipeline for semantic segmentation of high-resolution satellite imagery using the LandCover.ai dataset.",
    highlights: [
      "Developed a segmentation model for RGB spectral band images (9000 × 9500 px) using the LandCover.ai dataset.",
      "Applied data augmentation strategies to improve generalization, reducing overfitting by 15%.",
      "Boosted image resolution by implementing Generative Adversarial Networks (GANs), increasing clarity by 10%.",
      "Implemented U-Net architecture with a Vision Transformer, achieving an IoU score of 83.11%.",
    ],
    techStack: ["Python", "PyTorch", "U-Net", "GAN", "Vision Transformer", "LandCover.ai"],
    links: [],
  },
];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  href: string;
}

export const publications: Publication[] = [
  {
    title: "KillChainGraph: ML Framework for Predicting and Mapping ATT&CK Techniques",
    authors: "C. Singh, M. Dhanraj, K. Huang",
    venue: "arXiv preprint arXiv:2508.18230",
    year: "2025",
    href: "https://arxiv.org/abs/2508.18230",
  },
  {
    title: "Policy-Value Guided MDP-MCTS Framework for Cyber Kill-Chain Inference",
    authors: "C. Singh, M. Dhanraj, K. Huang",
    venue: "arXiv preprint arXiv:2512.15150",
    year: "2025",
    href: "https://arxiv.org/abs/2512.15150",
  },
  {
    title: "Hamiltonian-Inspired Attention Mechanism for Scalable RF Transmitter Fingerprinting",
    authors: "C. Singh, M. Dhanraj, A. Sheriff",
    venue: "arXiv preprint arXiv:2605.30364",
    year: "2026",
    href: "https://arxiv.org/abs/2605.30364",
  },
  {
    title: "Towards U-Net Based Semantic Segmentation for Satellite Images",
    authors: "C. Singh, D. K. Dewangan",
    venue: "IEEE International Conference on Intelligent Signal Processing",
    year: "2024",
    href: "#",
  },
  {
    title: "Empowering DDoS Resilience: Machine Learning Strategies for Enhanced Cybersecurity",
    authors: "V. Tiwari, C. Singh, A. Patidar, S. S. Pasha, S. Gupta",
    venue: "International Conference on Entrepreneurship, Innovation, and Leadership",
    year: "2024",
    href: "#",
  },
];

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa: string;
  achievements: string[];
}

export const education: Education[] = [
  {
    degree: "M.Tech in Computer Science",
    institution: "Indian Institute of Information and Technology, Gwalior",
    location: "Gwalior, Madhya Pradesh",
    duration: "Aug 2023 – May 2025",
    gpa: "9.27 / 10",
    achievements: ["Kaggle Expert", "MHRD Fellowship", "Teaching Assistantship"],
  },
  {
    degree: "B.Tech in Information Technology",
    institution: "University of Mumbai",
    location: "Mumbai, Maharashtra",
    duration: "Aug 2019 – May 2023",
    gpa: "9.13 / 10",
    achievements: ["Smart India Hackathon 2022", "Mastek DB 2021"],
  },
];
