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

export interface Achievement {
  text: string;
  link?: { label: string; href: string };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  achievements: Achievement[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    company: "H to H",
    role: "Machine Learning Engineer",
    location: "Delhi",
    duration: "Aug 2025 – Present",
    logo: "/images/HtoH.png",
    achievements: [
      { text: "Architected an Autonomous Agentic Trading System powered by Claude 3.5 — implemented a self-correcting feedback loop that continuously re-optimises execution parameters against real-time pre-market volatility and historical P&L signals." },
      { text: "Engineered a high-concurrency data pipeline ingesting 1,500+ equity instruments via the Zerodha API; leveraged Redis sharding, multiprocessing, and round-robin dispatch to eliminate memory bottlenecks and achieve sub-100ms data synchronisation." },
      { text: "Built an NLP-driven Sentiment Analysis Engine over Google News RSS — automated headline scoring pipeline converts qualitative market signals into quantitative alpha inputs for the trading engine." },
      { text: "Integrated a Claude–Zerodha MCP Connector enabling natural-language trade verification; retail users can query live market state and trigger workbook analytics through a conversational agentic interface." },
      { text: "Automated live trade reporting by piping model outputs to Microsoft Graph API and Telegram Bot API — cloud-synced Excel workbooks provide real-time P&L visibility with zero manual intervention." },
      { text: "Hardened production infrastructure on a VPS with Nginx reverse-proxy and PM2 process management; handled full DNS stack (A/MX records) for 24/7 uptime across Next.js services and transactional mail." },
    ],
  },
  {
    company: "Frondeur Labs",
    role: "Machine Learning Engineer – Intern",
    location: "Bengaluru",
    duration: "Mar 2025 – Aug 2025",
    logo: "/images/frondeurlabs.png",
    achievements: [
      { text: "Synthesised and semantically mapped CVE, CWE, CAPEC, ExploitDB, and TTP data into a unified threat-intelligence dataset, enabling structured kill-chain analysis at enterprise scale." },
      { text: "Designed ML pipelines to model multi-stage kill-chain attack scenarios — trained classifiers to identify and predict potential attack vectors across enterprise network topologies." },
      { text: "Co-authored KillChainGraph — built a custom ATT&CK-MITRE dataset with ATTCKBERT and trained graph ML models to surface novel attack paths from unstructured threat intel.", link: { label: "GitHub", href: "https://github.com/Frondeur-Labs/KillChainGraph" } },
      { text: "Extended KillChainGraph with a Policy-Value Network inside an MDP-MCTS framework, significantly improving attack-path inference accuracy and decision-making quality under uncertainty.", link: { label: "GitHub", href: "https://github.com/Frondeur-Labs/Kill-Chain-Inference" } },
      { text: "Architected a unified red-teaming interface via FastAPI — consolidated disparate ML threat models into a single backend enabling real-time adversarial workflow automation for security analysts." },
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

export interface Certificate {
  name: string;
  issuer: string;
  file: string;
}

export const certificates: Certificate[] = [
  { name: "AI Classroom", issuer: "Microsoft", file: "/certificates/microsoft.pdf" },
  { name: "Geoprocessing with Python", issuer: "ISRO", file: "/certificates/isro.pdf" },
  { name: "DSA Workshop", issuer: "GeeksForGeeks", file: "/certificates/gfg.pdf" },
  { name: "Python Programming", issuer: "Udemy", file: "/certificates/python.pdf" },
  { name: "C++ Programming", issuer: "Udemy", file: "/certificates/cpp.pdf" },
];

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links: { label: string; href: string }[];
  image?: string;
}

export const projects: Project[] = [
  {
    name: "Satellite Semantic Segmentation",
    description:
      "End-to-end deep learning pipeline for semantic segmentation of high-resolution satellite imagery — from raw RGB bands to production-ready land-cover maps.",
    highlights: [
      "Built a segmentation model on the LandCover.ai dataset processing RGB imagery at 9000 × 9500 px resolution.",
      "Applied targeted data augmentation strategies, reducing overfitting by 15% without additional data collection.",
      "Deployed GAN-based super-resolution post-processing, boosting output image clarity by 10%.",
      "Implemented U-Net with a Vision Transformer encoder — achieved 83.11% IoU on the held-out test set.",
    ],
    techStack: ["Python", "PyTorch", "U-Net", "GAN", "Vision Transformer", "LandCover.ai"],
    links: [],
    image: "/images/semanticsegmentation_rel.png",
  },
  {
    name: "KillChainGraph",
    description:
      "ML framework for predicting and mapping ATT&CK techniques from unstructured threat intelligence. Built for enterprise-scale kill-chain analysis with graph ML models.",
    highlights: [
      "Built custom ATT&CK-MITRE dataset using ATTCKBERT for semantic threat mapping.",
      "Trained graph ML models to surface novel attack paths from unstructured threat intel.",
      "Extended with Policy-Value Network in MDP-MCTS framework for attack-path inference.",
      "Consolidated into FastAPI red-teaming interface for real-time adversarial automation.",
    ],
    techStack: ["Python", "PyTorch", "Graph ML", "BERT", "FastAPI", "ATT&CK MITRE"],
    links: [
      { label: "GitHub", href: "https://github.com/Frondeur-Labs/KillChainGraph" },
      { label: "Paper", href: "https://arxiv.org/abs/2508.18230" },
    ],
    image: "/images/killchaingraph.png",
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
  logo: string;
}

export const education: Education[] = [
  {
    degree: "M.Tech in Computer Science",
    institution: "Indian Institute of Information and Technology, Gwalior",
    location: "Gwalior, Madhya Pradesh",
    duration: "Aug 2023 – May 2025",
    gpa: "9.27 / 10",
    logo: "/images/iiit_logo.png",
  },
  {
    degree: "B.Tech in Information Technology",
    institution: "University of Mumbai",
    location: "Mumbai, Maharashtra",
    duration: "Aug 2019 – May 2023",
    gpa: "9.13 / 10",
    logo: "/images/mu_logo.png",
  },
];
