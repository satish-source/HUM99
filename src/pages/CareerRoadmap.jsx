import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Circle, Lock, Briefcase, TrendingUp, DollarSign, Clock, 
  ChevronRight, X, Sparkles, Loader2, AlertCircle, PlayCircle, Quote, Check, Code, Users 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../components/GlassCard';

const roadmapData = {
  // Class 10 Foundation Roads
  'foundation-cs': {
    title: 'Foundations of Computer Science',
    color: 'blue',
    description: 'Learn the core building blocks of computing, programming logic, and computational thinking for Class 10.',
    totalYears: '1 year',
    avgTopSalary: 'Skill Certificate',
    videoUrl: "https://www.youtube.com/embed/zOjov-2OZ0E",
    quote: {
      author: "Sandeep Jain, Founder of GeeksforGeeks",
      text: "Starting early is the best advantage. Focus on logic building, simple puzzle-solving, and binary arithmetic before jumping into syntax-heavy languages."
    },
    stages: [
      {
        level: 1,
        title: 'Introduction to Logic & Algorithms',
        yearsExp: '3 Months',
        salary: 'Conceptual',
        description: 'Understand how computers think, draw flowcharts, write basic pseudocode, and learn binary logic.',
        skills: ['Flowcharts', 'Pseudocode', 'Binary Math', 'Variables', 'If/Else Logic'],
        checklist: ['Draw 10 flowcharts for daily routines', 'Master decimal to binary conversions', 'Understand basic logic gates (AND, OR, NOT)'],
        project: 'Create a text-based decision adventure flowchart on paper.'
      },
      {
        level: 2,
        title: 'Block Programming & Scratch',
        yearsExp: '3 Months',
        salary: 'Conceptual',
        description: 'Build simple games and visual stories using block coding. Focus on loops and events.',
        skills: ['Loops', 'Event Triggers', 'Animations', 'Conditionals', 'Scratch Interface'],
        checklist: ['Create a sprite animation', 'Implement collision detection triggers', 'Build a simple score calculator'],
        project: 'Develop a fully playable "Catch the Falling Apples" game in Scratch.'
      },
      {
        level: 3,
        title: 'Python for Beginners',
        yearsExp: '6 Months',
        salary: 'Conceptual',
        description: 'Transition from blocks to text-based coding using Python. Learn syntax, inputs, and functions.',
        skills: ['Python Syntax', 'List/Arrays', 'Input/Output', 'Functions', 'Turtle Graphics'],
        checklist: ['Write a program to calculate simple interest', 'Implement string reverse functions', 'Use Turtle Graphics to draw shapes'],
        project: 'Build a command-line Guess the Number game with user inputs and error checks.'
      }
    ]
  },
  'foundation-finance': {
    title: 'Financial Literacy & Banking',
    color: 'amber',
    description: 'Understand the world of money, savings, personal finance, and modern banking systems for Class 10.',
    totalYears: '1 year',
    avgTopSalary: 'Skill Certificate',
    videoUrl: "https://www.youtube.com/embed/y83E8T-m1Sg",
    quote: {
      author: "Nikhil Kamath, Co-Founder of Zerodha",
      text: "Understanding compounding interest early in life is a superpower. Start by managing a small pocket money budget and tracking every rupee."
    },
    stages: [
      {
        level: 1,
        title: 'Money & Simple Banking',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Learn history of currency, how savings accounts work, fixed deposits, and basic debit/credit cards.',
        skills: ['Savings Accounts', 'Fixed Deposits', 'Compound Interest', 'Debit/Credit Cards'],
        checklist: ['Understand SBI savings account interest rates', 'Calculate simple interest vs compound interest', 'Read a sample bank statement'],
        project: 'Create a monthly spreadsheet detailing income and expenditure of a mock family budget.'
      },
      {
        level: 2,
        title: 'Modern Digital Finance',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Learn the workings of UPI, mobile wallets, net banking, and online safety against financial scams.',
        skills: ['UPI (Unified Payments Interface)', 'Mobile Wallets', 'Net Banking Safety', 'Phishing Awareness'],
        checklist: ['Trace how a UPI payment works from Bank A to Bank B', 'Identify 3 signs of a fake phishing link', 'Explain two-factor authentication'],
        project: 'Design a poster/guide on "5 Rules of Digital Safety for Grandparents".'
      },
      {
        level: 3,
        title: 'Investing & Stock Markets Basics',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Introduction to stocks, mutual funds, gold, real estate, and the power of inflation.',
        skills: ['Inflation Basics', 'Nifty & Sensex', 'Mutual Funds', 'Diversification'],
        checklist: ['Explain how inflation reduces money value', 'Explain what a share index like Nifty represents', 'Understand long-term compounding'],
        project: 'Select 5 dummy companies and track their stock performance over 2 weeks.'
      }
    ]
  },
  'foundation-design': {
    title: 'Introduction to Visual Design',
    color: 'pink',
    description: 'Explore the basics of color, typography, composition, and digital illustration tools for Class 10.',
    totalYears: '1 year',
    avgTopSalary: 'Skill Certificate',
    videoUrl: "https://www.youtube.com/embed/YqQx75OPRa0",
    quote: {
      author: "Abhinav Chhikara, Founder of 10k Designers",
      text: "Design is about hierarchy and clarity. Train your eyes by looking at billboards, websites, and magazines to dissect why they look clean or cluttered."
    },
    stages: [
      {
        level: 1,
        title: 'Drawing & Composition',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Learn the basic principles of design: balance, contrast, alignment, and proximity.',
        skills: ['Rule of Thirds', 'Color Theory', 'Contrast', 'Grid Systems'],
        checklist: ['Create a color wheel using watercolors', 'Sketch 10 geometric compositions', 'Find examples of bad alignment in advertisements'],
        project: 'Sketch a poster design on paper demonstrating balance and visual hierarchy.'
      },
      {
        level: 2,
        title: 'Typography & Fonts',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Discover font families: Serif, Sans-Serif, Display. Learn how typography conveys emotions.',
        skills: ['Font Pairing', 'Kerning & Leading', 'Typography Hierarchy', 'Creative Lettering'],
        checklist: ['Differentiate between Serif and Sans-Serif', 'Pair a heading font with a readable body font', 'Design a hand-drawn logo of your initials'],
        project: 'Create a typography-only poster with a quote, focusing on type hierarchy.'
      },
      {
        level: 3,
        title: 'Digital Tools (Canva & Figma Basics)',
        yearsExp: '4 Months',
        salary: 'Conceptual',
        description: 'Transition sketches into digital vector layouts using free software like Canva or Figma.',
        skills: ['Vector Tools', 'Layout Design', 'Exporting Assets', 'Layers & Masks'],
        checklist: ['Draw basic shapes in Figma', 'Organize layers logically', 'Design a card UI or social media post banner'],
        project: 'Design a digital birthday invitation card using Figma vector tools.'
      }
    ]
  },

  // Class 12 Degrees & Prep Roads
  'btech-cse': {
    title: 'B.Tech Computer Science (JEE Prep)',
    color: 'blue',
    description: 'Prepare for India\'s premier engineering entrance exams and master early CS academics.',
    totalYears: '4 Years (Degree)',
    avgTopSalary: '₹12L - ₹45L+ LPA',
    videoUrl: "https://www.youtube.com/embed/p9VbZpE386k",
    quote: {
      author: "Dr. H. C. Verma, Author of Concepts of Physics",
      text: "Do not memorize equations. Visualize concepts in mechanics, electromagnetism, and coordinate geometry. Problem-solving speed comes naturally with deep conceptual clarity."
    },
    stages: [
      {
        level: 1,
        title: 'JEE Main & Advanced Preparation',
        yearsExp: 'Class 11 & 12',
        salary: 'Academic Prep',
        description: 'Master advanced Physics (Mechanics, Electrodynamics), Chemistry (Organic, Inorganic, Physical), and Mathematics (Calculus, Algebra, Coordinate Geometry).',
        skills: ['JEE Physics', 'JEE Chemistry', 'JEE Mathematics', 'Speed & Accuracy'],
        checklist: ['Solve past 10 years JEE papers', 'Take 50+ timed full-length mock exams', 'Maintain a separate formula copy'],
        project: 'Score high percentile in JEE Main & Advanced to secure admissions in IITs, NITs, or IIITs.'
      },
      {
        level: 2,
        title: 'Engineering Core - Semester 1 to 4',
        yearsExp: 'College Year 1-2',
        salary: 'Academic Stage',
        description: 'Learn college fundamentals: Calculus, Digital Logic, Computer Networks, and Object-Oriented Programming (C++ or Java).',
        skills: ['C++ / Java', 'OOPs Concepts', 'Digital Logic', 'Computer Networks', 'OS Basics'],
        checklist: ['Implement memory management loops', 'Understand process scheduling algorithms', 'Design boolean logic gates on simulators'],
        project: 'Create a custom Command Line Interface shell using C++.'
      },
      {
        level: 3,
        title: 'DSA & Competitive Programming',
        yearsExp: 'College Year 2-3',
        salary: 'Internship Ready',
        description: 'Master Data Structures and Algorithms (Trees, Graphs, Dynamic Programming). Participate in Codeforces/LeetCode coding challenges.',
        skills: ['Linked Lists & Trees', 'Recursion & DP', 'Graph Algorithms', 'Time Complexity (Big O)'],
        checklist: ['Solve 300+ LeetCode problems', 'Participate in Google Kickstart / HashCode', 'Master Recursion and DFS/BFS search'],
        project: 'Implement a Pathfinding Visualizer (Dijkstra/A* Algorithm) using HTML5 Canvas or React.'
      },
      {
        level: 4,
        title: 'Campus Placements & Software Projects',
        yearsExp: 'College Year 4',
        salary: '₹8L – ₹25L LPA',
        description: 'Build full-stack capstone projects, write technical system design reports, and clear HR / tech interviews.',
        skills: ['System Design', 'Full-stack Project', 'Resume Building', 'Mock Interviews'],
        checklist: ['Prepare mock system design responses', 'Review OOP concepts and DBMS (SQL)', 'Complete 2 full-scale projects'],
        project: 'Develop a Peer-to-Peer local file sharing app using WebRTC and Node.js.'
      }
    ]
  },
  'bca': {
    title: 'Bachelor of Computer Applications (BCA)',
    color: 'sky',
    description: 'Learn modern software applications, database architectures, and practical coding frameworks for BCA.',
    totalYears: '3 Years (Degree)',
    avgTopSalary: '₹6L - ₹15L LPA',
    videoUrl: "https://www.youtube.com/embed/P3gN4k7G6H4",
    quote: {
      author: "Kunal Kushwaha, Developer Advocate",
      text: "BCA is highly practical. Focus on building real projects, contributing to open-source, and learning Git early. Degrees don't get you jobs—proof of work does."
    },
    stages: [
      {
        level: 1,
        title: 'Software & Web Basics',
        yearsExp: 'Year 1',
        salary: 'Academic Stage',
        description: 'Learn web development (HTML, CSS, JavaScript) and core programming (C / C++).',
        skills: ['C Programming', 'HTML & CSS', 'JavaScript Basics', 'SQL Databases'],
        checklist: ['Write 50 console programs in C', 'Create responsive static webpages', 'Write basic database SELECT and JOIN queries'],
        project: 'Build a responsive personal website containing a simple calculator tool.'
      },
      {
        level: 2,
        title: 'OOPs & Database Management Systems',
        yearsExp: 'Year 2',
        salary: 'Academic Stage',
        description: 'Understand Object-Oriented programming with Java, system analysis, and advanced relational databases.',
        skills: ['Java Programming', 'Relational Databases', 'System Analysis', 'Software Engineering'],
        checklist: ['Master inheritance, polymorphism in Java', 'Design ER Diagrams for banking systems', 'Write stored procedures in MySQL'],
        project: 'Develop a Desktop Student Management System using Java Swing and MySQL.'
      },
      {
        level: 3,
        title: 'Full Stack Web Projects & Placements',
        yearsExp: 'Year 3',
        salary: '₹3.5L – ₹8L LPA',
        description: 'Master full-stack frameworks like Node.js / React, prepare resumes, and apply for campus placements.',
        skills: ['React.js', 'Node.js & Express', 'MongoDB', 'REST APIs', 'Git / GitHub'],
        checklist: ['Complete a MERN stack course', 'Host projects live on Vercel and Render', 'Prepare for technical interview questions'],
        project: 'Build a real-time collaborative task board (like Trello) using React, Socket.io, and Node.js.'
      }
    ]
  },
  'bdes': {
    title: 'Bachelor of Design (B.Des)',
    color: 'pink',
    description: 'Master creative UX, product design, fashion design, or graphic layouts in top design colleges.',
    totalYears: '4 Years (Degree)',
    avgTopSalary: '₹10L - ₹24L LPA',
    videoUrl: "https://www.youtube.com/embed/n4p_q0i1N2g",
    quote: {
      author: "Sudhir Sharma, Chief Editor of Pool Magazine",
      text: "Design is a process of problem-solving. Keep a sketchpad everywhere. Learn to observe how people struggle with interfaces, packaging, and spaces, and design solutions."
    },
    stages: [
      {
        level: 1,
        title: 'Design Foundations & Sketching',
        yearsExp: 'Year 1',
        salary: 'Academic Stage',
        description: 'Learn perspective drawing, form and space analysis, color physics, and material exploration.',
        skills: ['Perspective Sketching', 'Color Harmonies', 'Material Exploration', '2D Composition'],
        checklist: ['Complete 50 perspective sketches', 'Differentiate between warm and cool compositions', 'Build form models using cardboard/clay'],
        project: 'Create a conceptual model of a hybrid home office storage organizer.'
      },
      {
        level: 2,
        title: 'Digital Tools & Layouts',
        yearsExp: 'Year 2',
        salary: 'Academic Stage',
        description: 'Learn design software: Adobe Photoshop, Illustrator, InDesign, and vector tools in Figma.',
        skills: ['Vector Illustration', 'Photo Manipulation', 'Page Layout Design', 'Figma Wireframes'],
        checklist: ['Design 10 vector logos in Illustrator', 'Assemble a 16-page brochure in InDesign', 'Wireframe a mobile login page in Figma'],
        project: 'Design a corporate branding kit (logo, business cards, letterhead) for a green-energy startup.'
      },
      {
        level: 3,
        title: 'Interaction Design & User Research',
        yearsExp: 'Year 3',
        salary: 'Internship Ready',
        description: 'Perform user interviews, build user personas, conduct usability heuristics audits, and design mobile apps.',
        skills: ['User Interviews', 'UX Heuristics', 'High-Fidelity Prototypes', 'Information Architecture'],
        checklist: ['Interview 5 users about a shopping app', 'Create user journey maps', 'Run usability tests on high-fidelity designs'],
        project: 'Design a mobile medicine-delivery application specifically for elderly users, including full user research.'
      },
      {
        level: 4,
        title: 'Design Thesis & Professional Portfolio',
        yearsExp: 'Year 4',
        salary: '₹6L – ₹15L LPA',
        description: 'Create your graduation capstone project, refine your portfolio, and pitch to design studios.',
        skills: ['Design Portfolio', 'Pitching & Presentation', 'Industry Standards', 'Interactive Prototype'],
        checklist: ['Assemble a Behance / Web portfolio with 3 case studies', 'Prepare your design slides presentation', 'Mock client feedback sessions'],
        project: 'Complete a detailed B.Des graduation thesis project addressing city traffic micro-mobility.'
      }
    ]
  },

  // College Professional Roads (Existing expanded with checklists & projects)
  swe: {
    title: 'Software Engineer',
    color: 'blue',
    description: 'A structured path from beginner developer to engineering leadership in India.',
    totalYears: '8–12 years',
    avgTopSalary: '₹50L - ₹80L+ LPA',
    videoUrl: "https://www.youtube.com/embed/nryz398s85o",
    quote: {
      author: "Rohan Sharma, Tech Lead at CRED (Bengaluru)",
      text: "Master your programming foundations and system design early. Building for 10 million active users in India requires high performance, load balancing, and solid database indexing."
    },
    stages: [
      {
        level: 1,
        title: 'Junior Software Engineer',
        yearsExp: '0–2 years',
        salary: '₹6L – ₹12L LPA',
        description: 'Entry-level position. Focus on learning collaborative workflows, fixing bugs, writing clean functions, and understanding the codebase.',
        skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'Git & GitHub', 'REST APIs', 'SQL Queries', 'Package Managers (npm)', 'Browser DevTools'],
        checklist: [
          'Master async JS: Promises, Async/Await, and error handling.',
          'Learn Git commands: branching, merging, and resolving conflicts.',
          'Understand REST API design, HTTP status codes, and methods.',
          'Write basic relational queries: SELECT, JOIN, WHERE, and GROUP BY.',
          'Implement fluid responsive layouts using CSS Grid and Flexbox.'
        ],
        project: 'Build a responsive Task Manager web app using React, storing tasks in a Node.js/Express API with a PostgreSQL database.'
      },
      {
        level: 2,
        title: 'Software Engineer (Mid-Level)',
        yearsExp: '2–5 years',
        salary: '₹12L – ₹22L LPA',
        description: 'Independently own features, participate in architecture design, write unit/integration tests, and build containerized deployments.',
        skills: ['React/Next.js', 'Node.js & Express', 'PostgreSQL DB', 'Unit Testing (Jest)', 'CI/CD Pipelines', 'Docker', 'AWS Basics (S3/EC2)'],
        checklist: [
          'Apply OOP concepts and SOLID principles in daily coding.',
          'Write comprehensive unit tests achieving 80%+ coverage with Jest.',
          'Containerize local server architectures using Docker multi-stage builds.',
          'Set up automated compilation and testing pipelines with GitHub Actions.',
          'Optimize relational database models, normalizations, and foreign keys.'
        ],
        project: 'Create a scalable URL Shortener API with Redis caching, request rate-limiting, and automated deployment.'
      },
      {
        level: 3,
        title: 'Senior Software Engineer',
        yearsExp: '5–8 years',
        salary: '₹22L – ₹38L LPA',
        description: 'Lead technical choices, design microservices, optimize performance bottlenecks, and scale databases.',
        skills: ['System Design (LLD/HLD)', 'Microservices', 'NoSQL DBs (MongoDB)', 'Performance Tuning', 'Message Queues (Kafka)', 'Cloud IAM'],
        checklist: [
          'Design distributed microservices with API Gateways and load balancers.',
          'Optimize database indexing, partitioning, and read/write replica routing.',
          'Implement event-driven patterns with Kafka or RabbitMQ.',
          'Perform security audits on backend APIs, JWTs, and cloud storage folders.',
          'Mentor junior engineers and write clean, comprehensive code reviews.'
        ],
        project: 'Develop a real-time multiplayer game matching server utilizing WebSockets, Redis pub/sub, and Kafka queues.'
      },
      {
        level: 4,
        title: 'Staff Engineer',
        yearsExp: '8–12 years',
        salary: '₹38L – ₹65L LPA',
        description: 'Set organizational tech stack guidelines, write RFC design papers, manage technical debt, and build developer platforms.',
        skills: ['Distributed Systems', 'RFC Writing', 'Kubernetes Orchestration', 'Database Sharding', 'Cloud FinOps', 'Security Standards'],
        checklist: [
          'Write thorough Request for Comments (RFC) documents for architecture shifts.',
          'Design horizontal database sharding schemas across thousands of nodes.',
          'Configure Kubernetes auto-scaling, service meshes, and namespace boundaries.',
          'Align multi-squad tech stacks with product roadmaps and release cycles.',
          'Audit and reduce cloud costs via automated FinOps sizing configurations.'
        ],
        project: 'Lead the migration of a massive monolithic production database to a zero-downtime sharded PostgreSQL cluster.'
      },
      {
        level: 5,
        title: 'Principal Engineer / Tech Director',
        yearsExp: '12+ years',
        salary: '₹65L – ₹1.2Cr+ LPA',
        description: 'Top technical level. Shape engineering culture, evaluate new tech, negotiate cloud contracts, and scale systems to millions of users.',
        skills: ['Org Strategy', 'C-Suite Tech Advisory', 'Platform Engineering', 'Hybrid Cloud', 'Disaster Recovery (DR)', 'Tech Branding'],
        checklist: [
          'Formulate the company\'s multi-year cloud and platform migration strategy.',
          'Establish technical review boards and engineer leveling guidelines.',
          'Optimize cloud contract spend and AWS/Azure enterprise reservation agreements.',
          'Design active-active multi-region failovers and verify recovery times (RTO/RPO).',
          'Write open-source libraries and speak at global tech conferences.'
        ],
        project: 'Oversee zero-downtime serverless payment system migration, saving 45% in infrastructure costs and reducing P99 latency.'
      }
    ],
  },
  ai: {
    title: 'AI Engineer',
    color: 'violet',
    description: 'From machine learning basics to leading AI research and product development in top tech hubs.',
    totalYears: '6–10 years',
    avgTopSalary: '₹70L - ₹1.5Cr+ LPA',
    videoUrl: "https://www.youtube.com/embed/XmG2d5U2WzY",
    quote: {
      author: "Dr. Ananya Iyer, Principal AI Scientist at Ola Electric",
      text: "AI is moving at lightning speed. Don't just learn how to import models; understand the mathematics behind neural networks, fine-tuning techniques, and cost-efficient MLOps deployment."
    },
    stages: [
      {
        level: 1,
        title: 'Junior ML Engineer / AI Developer',
        yearsExp: '0–2 years',
        salary: '₹8L – ₹14L LPA',
        description: 'Master data analysis, clean messy real-world datasets, and build baseline regression/classification ML models.',
        skills: ['Python', 'NumPy & Pandas', 'Scikit-learn', 'Linear Algebra & Calculus', 'Data Visualizations', 'Jupyter Notebooks'],
        checklist: [
          'Perform Exploratory Data Analysis (EDA) on datasets with millions of rows.',
          'Understand statistical mechanics: distributions, variances, and hypothesis testing.',
          'Train, evaluate, and hyperparameter-tune classical Scikit-learn algorithms.',
          'Clean and preprocess data: missing values, normalization, and label encoding.',
          'Create interactive dashboards to present insights using Streamlit or Seaborn.'
        ],
        project: 'Develop a flight delay prediction model and host it as a simple dashboard using Python and Streamlit.'
      },
      {
        level: 2,
        title: 'ML Engineer / AI Engineer',
        yearsExp: '2–5 years',
        salary: '₹14L – ₹25L LPA',
        description: 'Build and deploy deep learning models, configure continuous ML training runs, and host models in production APIs.',
        skills: ['PyTorch / TensorFlow', 'Deep Learning (CNNs/RNNs)', 'FastAPI & API Design', 'Docker Containers', 'MLOps (MLflow)', 'AWS SageMaker'],
        checklist: [
          'Train custom convolutional neural networks for complex computer vision tasks.',
          'Integrate MLflow or Weights & Biases to track training metrics and weights.',
          'Package models into Docker containers and deploy to AWS EC2 or ECS.',
          'Optimize model runtimes using ONNX and TensorRT quantization tools.',
          'Set up automated data validation checks on incoming inference records.'
        ],
        project: 'Deploy a high-throughput medical image classification API using PyTorch, FastAPI, and Docker on AWS ECS.'
      },
      {
        level: 3,
        title: 'Senior AI Engineer / LLM Specialist',
        yearsExp: '5–8 years',
        salary: '₹25L – ₹48L LPA',
        description: 'Fine-tune open-source LLMs, build advanced Retrieval Augmented Generation (RAG) pipelines, and architect vector search databases.',
        skills: ['HuggingFace Transformers', 'LLM Fine-tuning (QLoRA)', 'Vector DBs (Pinecone)', 'LangChain & LlamaIndex', 'Prompt Engineering', 'Model Guardrails'],
        checklist: [
          'Fine-tune open-source models (Llama 3, Mistral) on custom datasets using QLoRA.',
          'Architect hybrid-search vector pipelines matching dense and sparse embeddings.',
          'Configure indexing, partitioning, and caching inside Pinecone or Milvus databases.',
          'Write custom input/output guardrails using NeMo to filter prompt injections.',
          'Design complex multi-agent system loops using LangGraph or AutoGen.'
        ],
        project: 'Create an automated legal contract auditor that analyzes 10,000-page lease documents with RAG and LLM agents.'
      },
      {
        level: 4,
        title: 'AI Architect / Lead Engineer',
        yearsExp: '8–12 years',
        salary: '₹48L – ₹80L LPA',
        description: 'Architect large-scale enterprise AI frameworks, coordinate multi-GPU cluster usage, and audit data privacy compliance.',
        skills: ['AI Platform Architecture', 'Multi-GPU Serving (vLLM)', 'Model Privacy', 'Distributed ML Training', 'Kubeflow Pipelines', 'AI Strategy'],
        checklist: [
          'Design distributed model training clusters using PyTorch DistributedDataParallel (DDP).',
          'Deploy high-throughput inference engines utilizing vLLM and Triton servers.',
          'Establish enterprise feature store systems and real-time inference tables.',
          'Implement strict data compliance pipelines (PII masking, differential privacy).',
          'Optimize neural network compute schedules to minimize GPU utilization costs.'
        ],
        project: 'Build an enterprise-wide generative search dashboard parsing 100k internal files in sub-10ms query latencies.'
      },
      {
        level: 5,
        title: 'Chief AI Officer / VP of AI',
        yearsExp: '12+ years',
        salary: '₹80L – ₹1.8Cr+ LPA',
        description: 'Define organizational AI visions, manage multi-million dollar compute budgets, and establish AI compliance standards.',
        skills: ['AI Governance', 'GPU Infrastructure Budgets', 'AI Ethics & Safety', 'Enterprise Data Strategy', 'C-Suite leadership'],
        checklist: [
          'Draft corporate governance standards for ethical and safe AI model operations.',
          'Audit automated system structures against international AI acts (e.g., EU AI Act).',
          'Manage multi-crore budgets for GPU hardware purchases and cloud compute contracts.',
          'Advise corporate boards on strategic generative AI investments and monetization.',
          'Scale AI research and product engineering departments from scratch.'
        ],
        project: 'Lead complete enterprise-wide transformation automating customer service and operations with custom AI agents, cutting operational costs by 35%.'
      }
    ],
  },
  cyber: {
    title: 'Cybersecurity',
    color: 'red',
    description: 'Defend digital infrastructure at startup and enterprise scales.',
    totalYears: '8–12 years',
    avgTopSalary: '₹40L - ₹75L LPA',
    videoUrl: "https://www.youtube.com/embed/3yZzEaW9Wz0",
    quote: {
      author: "Vikram Sen, Director of Security at Paytm",
      text: "With India's digital payment ecosystem growing exponentially, cybersecurity is a national priority. Learn how to think like a hacker to prevent exploits before they compromise live wallets."
    },
    stages: [
      { 
        level: 1, title: 'Security Analyst (Tier 1)', yearsExp: '0–2 years', salary: '₹5L – ₹8L LPA', 
        description: 'Monitor alerts in the SOC, audit user permissions, and assist in incident reporting.', 
        skills: ['SIEM Tools', 'Network Basics', 'Log Analysis', 'Incident Response', 'CompTIA Security+'],
        checklist: ['Configure Wireshark filters', 'Identify SQL Injection alerts in SIEM logs', 'Master Linux server log directories'],
        project: 'Set up a local intrusion detection system (Snort) on a Virtualbox network.'
      },
      { 
        level: 2, title: 'Penetration Tester / Security Engineer', yearsExp: '2–5 years', salary: '₹8L – ₹15L LPA', 
        description: 'Conduct pen tests, discover vulnerabilities, and secure APIs and servers.', 
        skills: ['Ethical Hacking', 'Metasploit', 'Web App Security (OWASP)', 'Scripting (Python/Bash)', 'CEH'],
        checklist: ['Write custom automated port-scanner scripts in Python', 'Exploit OWASP Top 10 vulnerabilities in test sites', 'Decrypt MD5/SHA hashes'],
        project: 'Conduct an authorized penetration testing audit of a local open-source project and document findings.'
      },
      { 
        level: 3, title: 'Senior Security Engineer', yearsExp: '5–8 years', salary: '₹15L – ₹28L LPA', 
        description: 'Design threat modeling security frameworks and oversee red/blue team simulations.', 
        skills: ['Zero Trust Architecture', 'Cloud Security', 'Threat Modeling', 'SOC Leadership'],
        checklist: ['Map complex network infrastructure using threat model systems', 'Deploy AWS IAM boundaries and security policies', 'Review reverse-engineering binary scripts'],
        project: 'Develop a zero-trust single sign-on authentication gateway for a staging server.'
      },
      { 
        level: 4, title: 'Security Architect', yearsExp: '8–12 years', salary: '₹28L – ' + '₹45L LPA', 
        description: 'Build enterprise risk frameworks, audit compliance, and design security policies.', 
        skills: ['Enterprise Security Design', 'Risk Management', 'Compliance (SOC2, ISO27001)', 'Vendor Auditing'],
        checklist: ['Complete ISO27001 readiness audits', 'Create secure network topology reference designs', 'Audit cloud server access policies'],
        project: 'Prepare a security policy playbook for a fintech startup preparing for an IPO.'
      },
      { 
        level: 5, title: 'CISO / VP of Security', yearsExp: '12+ years', salary: '₹45L – ₹80L+ LPA', 
        description: 'Executive level. Own the entire organization\'s security architecture, breach response, and security budget.', 
        skills: ['Board Reporting', 'Crisis Leadership', 'Compliance', 'Budget Management'],
        checklist: ['Deliver a security threat presentation to executive directors', 'Establish global disaster recovery protocols', 'Manage multi-crore security budgets'],
        project: 'Manage live mitigation and recovery actions during a simulated major data breach drill.'
      }
    ],
  },
  cloud: {
    title: 'Cloud Architect',
    color: 'sky',
    description: 'Build robust, highly scalable cloud architectures for enterprise web systems.',
    totalYears: '8–12 years',
    avgTopSalary: '₹45L - ₹80L LPA',
    videoUrl: "https://www.youtube.com/embed/l5A3C8Q84-M",
    quote: {
      author: "Sneha Patel, Cloud Lead at Tata Consultancy Services",
      text: "Everything is migrating to the cloud. Focus on Infrastructure as Code (IaC) tools like Terraform and containerization with Kubernetes to stand out in the Indian job market."
    },
    stages: [
      { 
        level: 1, title: 'Cloud Support Engineer', yearsExp: '0–2 years', salary: '₹5L – ' + '₹8L LPA', 
        description: 'Manage accounts, provision simple virtual machines, and audit billing metrics.', 
        skills: ['AWS/Azure/GCP Basics', 'Linux Command Line', 'Terraform Basics', 'Networking Fundamentals'],
        checklist: ['Set up AWS EC2 instances and VPC subnets', 'Configure SSH keys and firewalls', 'Monitor billing using AWS Cost Explorer'],
        project: 'Host a static portfolio page on AWS S3 with Custom Domains and CloudFront CDN.'
      },
      { 
        level: 2, title: 'Cloud Engineer / DevOps Associate', yearsExp: '2–5 years', salary: '₹8L – ' + '₹15L LPA', 
        description: 'Configure Docker files, set up CI/CD pipelines, and scale databases.', 
        skills: ['Infrastructure as Code', 'Docker & Kubernetes', 'CI/CD Pipelines', 'AWS / Azure'],
        checklist: ['Containerize a web app with multi-stage Dockerfiles', 'Write Terraform templates for basic networks', 'Write GitHub Actions deploy scripts'],
        project: 'Deploy a multi-tier web application (React + Node + Postgres) to AWS ECS using Terraform.'
      },
      { 
        level: 3, title: 'Senior DevOps / SRE Engineer', yearsExp: '5–8 years', salary: '₹15L – ' + '₹28L LPA', 
        description: 'Lead automation scripts, optimize infrastructure costs, and manage server uptimes.', 
        skills: ['Multi-cloud Strategy', 'Site Reliability Engineering', 'Platform Engineering', 'Cloud Security'],
        checklist: ['Establish prometheus and Grafana alert boundaries', 'Configure auto-scaling groups with ALB load balancers', 'Implement blue-green deployments'],
        project: 'Build a highly resilient Kubernetes cluster (EKS) utilizing Helm Charts and ArgoCD.'
      },
      { 
        level: 4, title: 'Cloud Architect', yearsExp: '8–12 years', salary: '₹28L – ' + '₹48L LPA', 
        description: 'Design secure, scalable cloud architectures across the organization.', 
        skills: ['Enterprise Architecture', 'FinOps (Cost Mgmt)', 'Disaster Recovery', 'Governance'],
        checklist: ['Conduct security review of multi-cloud VPC designs', 'Manage FinOps dashboards to reduce cloud spend', 'Design active-active multi-region failovers'],
        project: 'Design the disaster recovery backup migration path for a global streaming service.'
      },
      { 
        level: 5, title: 'Director of Infrastructure / Cloud VP', yearsExp: '12+ years', salary: '₹48L – ' + '₹85L+ LPA', 
        description: 'Head of global infrastructure, cloud migrations, vendor contract negotiations, and DevOps culture.', 
        skills: ['C-Suite Communication', 'Infrastructure Strategy', 'Global Scale Design', 'Vendor Negotiation'],
        checklist: ['Negotiate multi-million dollar AWS/Azure enterprise discounts', 'Formulate organizational hybrid-cloud transitions', 'Head SRE platform organizations'],
        project: 'Lead the migration of a massive financial transaction backend from on-premise servers into a multi-cloud network.'
      }
    ],
  },
  ux: {
    title: 'UI/UX Designer',
    color: 'pink',
    description: 'Design beautiful, user-centered product experiences for global audiences.',
    totalYears: '6–10 years',
    avgTopSalary: '₹30L - ₹55L LPA',
    videoUrl: "https://www.youtube.com/embed/5Hl3y63V7vA",
    quote: {
      author: "Pooja Mehta, Design Director at Razorpay",
      text: "Design isn't just how it looks; it's how it works. Talk to your users, build wireframes, iterate constantly, and map out clean user journeys to design apps people love."
    },
    stages: [
      { level: 1, title: 'Junior UI/UX Designer', yearsExp: '0–2 years', salary: '₹4.5L – ₹7L LPA', description: 'Create simple icons, wireframes, style guides, and assist in user testing.', skills: ['Figma / Sketch', 'Wireframing', 'User Research Basics', 'Visual Design'], checklist: ['Master Figma vector tools', 'Create 20 reusable UI components', 'Conduct 3 heuristic evaluation audits'], project: 'Design a high-fidelity mobile landing page layout in Figma.' },
      { level: 2, title: 'UI/UX Designer', yearsExp: '2–5 years', salary: '₹7L – ₹14L LPA', description: 'Own product features, coordinate design systems, and run usability tests.', skills: ['Design Systems', 'Prototyping', 'A/B Testing', 'WCAG Accessibility'], checklist: ['Maintain visual design consistency across components', 'Create micro-interaction prototypes', 'Conduct A/B testing on user conversions'], project: 'Design the checkout screen flow for an online commerce app with animations.' },
      { level: 3, title: 'Senior UX Designer', yearsExp: '5–8 years', salary: '₹14L – ₹25L LPA', description: 'Define the product design framework, lead user journeys, and mentor juniors.', skills: ['Product Strategy', 'UX Writing', 'Interaction Design', 'Stakeholder Pitching'], checklist: ['Build complex user journey flowcharts', 'Align design layouts with engineering requirements', 'Establish project design guidelines'], project: 'Lead user experience design redesign of a dashboard project from research to hi-fi prototypes.' },
      { level: 4, title: 'Principal Designer', yearsExp: '8–12 years', salary: '₹25L – ₹42L LPA', description: 'Set design directions across multiple teams, build design-thinking cultures.', skills: ['Design Systems at Scale', 'User Research Methodologies', 'Executive Alignment'], checklist: ['Coordinate product branding consistency', 'Introduce organizational design tokens', 'Pitch designs to directors'], project: 'Standardize the design tokens framework of a large enterprise web ecosystem.' },
      { level: 5, title: 'VP of Design / Chief Design Officer', yearsExp: '12+ years', salary: '₹42L – ₹65L+ LPA', description: 'Shape product brand strategy, direct design organization, and influence company vision.', skills: ['Creative Direction', 'Brand Strategy', 'Design Org Building', 'C-Suite Communication'], checklist: ['Audit creative branding operations', 'Build corporate design strategies', 'Scale design departments'], project: 'Oversee full digital and physical design revamp of a national product brand.' }
    ],
  },
  game: {
    title: 'Game Developer',
    color: 'green',
    description: 'Create interactive 2D/3D games using modern engine technologies.',
    totalYears: '8–12 years',
    avgTopSalary: '₹25L - ' + '₹45L LPA',
    videoUrl: "https://www.youtube.com/embed/e_yW6rZ_KzY",
    quote: {
      author: "Amit Kumar, Lead Gameplay Programmer at Ubisoft Pune",
      text: "Game development is highly challenging but deeply rewarding. Build small games in Unity or Unreal Engine, upload them to itch.io, and showcase your physics and scripting math skills."
    },
    stages: [
      { level: 1, title: 'Junior Game Programmer', yearsExp: '0–2 years', salary: '₹4L – ₹7L LPA', description: 'Program simple gameplay triggers, fix UI bugs, and code basic assets.', skills: ['Unity / Unreal Engine', 'C# / C++', 'Game Physics Basics', 'Version Control'], checklist: ['Implement linear movement triggers', 'Resolve collider detection bugs', 'Commit code using Git branches'], project: 'Develop a 2D Platformer game (like Flappy Bird) in Unity.' },
      { level: 2, title: 'Gameplay Developer', yearsExp: '2–5 years', salary: '₹7L – ₹12L LPA', description: 'Write gameplay scripts, customize lighting/shaders, and manage multiplayer states.', skills: ['Gameplay Programming', 'Shader Writing (GLSL)', 'AI Pathfinding', 'Multiplayer Basics'], checklist: ['Program pathfinding AI for enemies', 'Write custom cell shader materials', 'Set up simple server networking'], project: 'Build a 3D isometric shooter game with basic enemy AI in Unity or Unreal.' },
      { level: 3, title: 'Senior Game Engineer', yearsExp: '5–8 years', salary: '₹12L – ₹22L LPA', description: 'Optimize engine performance, profile memory usage, and build core game loops.', skills: ['Engine Architecture', 'Performance Profiling', 'Console SDKs (PlayStation/Xbox)'], checklist: ['Identify CPU spikes using Unity Profiler', 'Optimize draw call batches', 'Integrate game console APIs'], project: 'Develop an online multiplayer arena shooter using Mirror/Photon networking.' },
      { level: 4, title: 'Lead Developer', yearsExp: '8–12 years', salary: '₹22L – ₹35L LPA', description: 'Coordinate engineering squads, handle publisher submissions, and guide coding styles.', skills: ['Team Leadership', 'Project Management', 'Tech Stack Design'], checklist: ['Oversee continuous build runs', 'Coordinate milestone deliverables with publishers', 'Write complex game engine features'], project: 'Direct and release a game title onto Steam or PlayStation Network.' },
      { level: 5, title: 'Technical Director', yearsExp: '12+ years', salary: '₹35L – ₹55L+ LPA', description: 'Define the technical vision for the entire studio or franchise.', skills: ['Studio Strategy', 'Technology Selection', 'Publisher Relations', 'Creative Direction'], checklist: ['Select company game engine platforms', 'Formulate long-term studio architectures', 'Advise creative leads on feasibility'], project: 'Launch a major AAA studio game title, managing a team of 40+ programmers.' }
    ],
  },
  data: {
    title: 'Data Scientist',
    color: 'amber',
    description: 'Drive data-informed product decisions, analytical frameworks, and ML pipelines.',
    totalYears: '7–11 years',
    avgTopSalary: '₹45L - ' + '₹75L LPA',
    videoUrl: "https://www.youtube.com/embed/KxTLaK41h2I",
    quote: {
      author: "Rashmi Nair, Analytics Director at Swiggy",
      text: "Data science is about solving business problems, not just running code. Learn how to tell a story with data, run clean A/B experiments, and master SQL alongside Python."
    },
    stages: [
      { level: 1, title: 'Junior Data Analyst', yearsExp: '0–2 years', salary: '₹5.5L – ₹9L LPA', description: 'Clean data, build dashboard trackers, write SQL queries, and make charts.', skills: ['Python / R', 'SQL', 'Tableau / PowerBI', 'Basic Statistics'], checklist: ['Write complex SQL joins and aggregation queries', 'Perform EDA (Exploratory Data Analysis) with pandas', 'Design clear charts in Tableau'], project: 'Build a business analytics dashboard analyzing sales data using Tableau.' },
      { level: 2, title: 'Data Scientist', yearsExp: '2–5 years', salary: '₹9L – ₹16L LPA', description: 'Train predictive models, run A/B test experiments, and perform feature engineering.', skills: ['Machine Learning', 'A/B Testing', 'Feature Engineering', 'Big Data (Spark)'], checklist: ['Train random forest classification models', 'Analyze A/B test p-values', 'Process millions of rows using Spark datasets'], project: 'Build a churn prediction pipeline using scikit-learn and Flask.' },
      { level: 3, title: 'Senior Data Scientist', yearsExp: '5–8 years', salary: '₹16L – ₹28L LPA', description: 'Lead ML models, perform advanced causal inference, and audit analytics pipelines.', skills: ['Advanced ML', 'Causal Inference', 'MLOps', 'Business Acumen'], checklist: ['Implement causal inference models', 'Configure automated ML retraining loops', 'Translate business problems to quantitative queries'], project: 'Deploy a price optimization ML model that shifts pricing based on live supply demand.' },
      { level: 4, title: 'Analytics Lead', yearsExp: '8–12 years', salary: '₹28L – ₹48L LPA', description: 'Set business metrics frameworks, direct org-wide data projects, and mentor junior analysts.', skills: ['Metrics Design', 'Data Governance', 'Executive Presentation'], checklist: ['Establish core company metrics frameworks', 'Write data privacy and retention policies', 'Present insights to VP levels'], project: 'Architect a new company-wide analytics dashboard parsing 100M events per day.' },
      { level: 5, title: 'VP of Data Science', yearsExp: '12+ years', salary: '₹48L – ₹80L+ LPA', description: 'Executive head of data products, privacy compliance, AI monetization, and global data strategy.', skills: ['Data Product Strategy', 'Data Privacy Compliance', 'Board Reporting', 'Business Scaling'], checklist: ['Manage data science departments', 'Pitch data investments to boards', 'Advise legal teams on model safety compliance'], project: 'Lead the conversion of enterprise data warehouses into real-time transactional data hubs.' }
    ],
  },
};

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',   bar: 'from-blue-400 to-blue-600' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', bar: 'from-violet-400 to-violet-600' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-600',    dot: 'bg-red-500',    badge: 'bg-red-100 text-red-700',       bar: 'from-red-400 to-red-600' },
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-200',    text: 'text-sky-600',    dot: 'bg-sky-500',    badge: 'bg-sky-100 text-sky-700',       bar: 'from-sky-400 to-sky-600' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-600',   dot: 'bg-pink-500',   badge: 'bg-pink-100 text-pink-700',     bar: 'from-pink-400 to-pink-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600',  dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   bar: 'from-green-400 to-green-600' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700',   bar: 'from-amber-400 to-amber-600' },
};

const CAREER_PROFILES = {
  'foundation-cs': [
    { name: "Aarav Sharma", role: "Class 11 Student", company: "DPS RK Puram", quote: "Learning Scratch and logic in Class 10 made my transition to school Python coding extremely smooth!", link: "#" },
    { name: "Sneha Reddy", role: "B.Tech Student", company: "IIIT Hyderabad", quote: "I started logic building in Class 10. It gave me a huge head start in coding and data structures at college.", link: "#" },
    { name: "Raj Malhotra", role: "Software Engineer", company: "Google India", quote: "Computational thinking is the bedrock. Even in 10th standard, learning algorithms shapes how you solve issues.", link: "#" }
  ],
  'foundation-finance': [
    { name: "Ishaan Gupta", role: "CA Aspirant", company: "SRCC", quote: "Compounding interest and UPI security tracking in 10th grade laid the bedrock for my accountancy passion.", link: "#" },
    { name: "Priya Varma", role: "Financial Analyst", company: "Goldman Sachs", quote: "Understanding personal finance early is a life skill. It helps you manage money and think analytically.", link: "#" },
    { name: "Amit Mehta", role: "Product Lead", company: "Zerodha", quote: "Fintech is booming. Connecting banking basics with computer tools early is highly valuable.", link: "#" }
  ],
  'foundation-design': [
    { name: "Ananya Sen", role: "Design Student", company: "NID Ahmedabad", quote: "Exploring visual hierarchy and typography in 10th grade helped me build my early design portfolios.", link: "#" },
    { name: "Kabir Roy", role: "UI Designer", company: "Razorpay", quote: "Canva and Figma basics in school are great. Train your eye to look at layouts, colors, and patterns.", link: "#" },
    { name: "Meera Nair", role: "Creative Director", company: "TCS iON Design", quote: "Design is problem-solving. Learning compose rules early prepares you for high-paying product roles.", link: "#" }
  ],
  'btech-cse': [
    { name: "Rohan Das", role: "Software Dev Intern", company: "Amazon India", quote: "JEE prep builds logical endurance. Getting into NIT Trichy opened campus placements with top-tier product packages.", link: "#" },
    { name: "Divya Kapoor", role: "Systems Engineer", company: "Infosys", quote: "Focus on OOPs and database index structures in your 2nd year. Relational querying is highly tested in interviews.", link: "#" },
    { name: "Siddharth Jain", role: "Tech Lead", company: "CRED", quote: "Solve LeetCode problems consistently. Speed and recursion mastery are key to clearing campus coding rounds.", link: "#" }
  ],
  'bca': [
    { name: "Vikram Seth", role: "Frontend Developer", company: "Wipro", quote: "BCA gave me solid practical web hours. Doing projects on GitHub is what got me hired, not just the degree.", link: "#" },
    { name: "Neha Joshi", role: "Full Stack Engineer", company: "Paytm", quote: "Mastering JS, React, and Node during BCA made me stand out. Showcase proof-of-work on Vercel.", link: "#" },
    { name: "Aditya Puri", role: "Technical Specialist", company: "Cognizant", quote: "Database administration and SQL skills are highly sought. BCA's database coursework is very relevant.", link: "#" }
  ],
  'bdes': [
    { name: "Kriti Sharma", role: "UX Intern", company: "Flipkart", quote: "NID preparation tests your observation. Wireframing and design thinking methods are critical for B.Des success.", link: "#" },
    { name: "Varun Verma", role: "Visual Designer", company: "Swiggy", quote: "Figma wireframes and high-fidelity mockups are key. Build Behance case studies detailing user interviews.", link: "#" },
    { name: "Aisha Khan", role: "Product Designer", company: "Microsoft India", quote: "Learn design system tokens and WCAG accessibility standards. It separates amateur UI from pro UX.", link: "#" }
  ],
  'swe': [
    { name: "Rajat Verma", role: "Software Engineer", company: "CRED (Bengaluru)", quote: "LLD and relational SQL structures are heavily used at high-load startups. Write modular clean functions.", link: "#" },
    { name: "Preeti Shenoy", role: "Senior Developer", company: "Microsoft India", quote: "Docker containerization and CI/CD actions are now standard expectations. Make sure to build projects with them.", link: "#" },
    { name: "Tarun Gupta", role: "Engineering Lead", company: "Walmart Global Tech", quote: "Scale requires understanding Redis queues, horizontal sharding, and database read/write replicas.", link: "#" }
  ],
  'ai': [
    { name: "Dr. Sandeep Kumar", role: "AI Scientist", company: "Ola Electric", quote: "Math is key. Understand backpropagation calculus and linear algebra before fine-tuning HuggingFace models.", link: "#" },
    { name: "Tanya Sen", role: "LLM Engineer", company: "Krutrim AI", quote: "Parameter-efficient fine-tuning (LoRA) and RAG vector databases are crucial skills in high demand currently.", link: "#" },
    { name: "Abhinav Singh", role: "MLOps Architect", company: "Fractal Analytics", quote: "Deploying and monitoring models in production using vLLM and Kubeflow saves massive GPU cluster costs.", link: "#" }
  ],
  'cyber': [
    { name: "Nitin Sharma", role: "SecOps Lead", company: "Paytm", quote: "Digital payment safety requires strict alert parsing. Analyze SQLi and XSS attempts daily in logs.", link: "#" },
    { name: "Ritu Goel", role: "Penetration Tester", company: "KPMG India", quote: "Learn ethical hacking with Kali Linux. Automating vulnerability scripts in Python will speed up security audits.", link: "#" },
    { name: "Alok Dwivedi", role: "CISO", company: "HDFC Bank", quote: "Governance, SOC2, and Zero Trust models are our core shields. Security is about defense policies and audits.", link: "#" }
  ],
  'cloud': [
    { name: "Sanjay Joshi", role: "DevOps Engineer", company: "TCS", quote: "Kubernetes configuration and Helm charts are standard tools. Automating cloud VPC resources with Terraform is crucial.", link: "#" },
    { name: "Monika Sen", role: "Cloud Architect", company: "Wipro Digital", quote: "Manage FinOps dashboards to reduce cloud hosting spend. Multi-region load balancing prevents downtime.", link: "#" },
    { name: "Harish Rao", role: "Infrastructure Director", company: "Jio Platforms", quote: "Migrating active databases to sharded cloud clusters without losing any data is a master-level project.", link: "#" }
  ],
  'ux': [
    { name: "Pooja Mehta", role: "Design Director", company: "Razorpay", quote: "Do not skip user interviews. Visuals are only 20% of design; mapping the customer journey solves the real issues.", link: "#" },
    { name: "Rishabh Roy", role: "UX Designer", company: "MakeMyTrip", quote: "Micro-interactions and spring physics animations in Figma make the app feel tactile and alive.", link: "#" },
    { name: "Shruti Varma", role: "VP of Product", company: "Paytm Insider", quote: "Design tokens scale. Standardizing button layouts and accessibility rules speeds up front-end execution.", link: "#" }
  ],
  'game': [
    { name: "Amit Kumar", role: "Gameplay Coder", company: "Ubisoft Pune", quote: "Develop small projects and host them on itch.io. Show physics triggers and object pool optimization.", link: "#" },
    { name: "Neha Goel", role: "Shader Artist", company: "Technicolor India", quote: "Custom cell shaders and particle effects separate indie graphics from standard Unity defaults.", link: "#" },
    { name: "Vikram Das", role: "Technical Director", company: "Nazara Games", quote: "Online multiplayer states require deep WebSocket latency tuning. Physics synching is a complex task.", link: "#" }
  ],
  'data': [
    { name: "Rashmi Nair", role: "Analytics Director", company: "Swiggy", quote: "Metrics design drives product growth. Use scikit-learn models to predict churn and target user groups.", link: "#" },
    { name: "Abhishek Roy", role: "Data Engineer", company: "PhonePe", quote: "Relational database JOINs and spark ETL jobs clean messy telemetry streams before training models.", link: "#" },
    { name: "Kiran Shah", role: "VP of Analytics", company: "Flipkart India", quote: "A/B testing statistical p-values are the ultimate source of truth. Make decisions on data, not guesses.", link: "#" }
  ]
};

const CAREER_SALARIES = {
  'foundation-cs': [
    { level: 'Beginner', salary: 1.5 },
    { level: 'Mid-Grade', salary: 2.2 },
    { level: 'Certificate', salary: 3.0 }
  ],
  'foundation-finance': [
    { level: 'Beginner', salary: 2.0 },
    { level: 'Mid-Grade', salary: 3.0 },
    { level: 'Certificate', salary: 4.0 }
  ],
  'foundation-design': [
    { level: 'Beginner', salary: 2.0 },
    { level: 'Mid-Grade', salary: 2.8 },
    { level: 'Certificate', salary: 4.0 }
  ],
  'btech-cse': [
    { level: 'Entry (T3)', salary: 6.0 },
    { level: 'Entry (T1)', salary: 18.0 },
    { level: 'Post-Degree', salary: 30.0 }
  ],
  'bca': [
    { level: 'Entry (T3)', salary: 4.0 },
    { level: 'Entry (T1)', salary: 7.0 },
    { level: 'Post-Degree', salary: 10.0 }
  ],
  'bdes': [
    { level: 'Entry (T3)', salary: 5.0 },
    { level: 'Entry (T1)', salary: 10.0 },
    { level: 'Post-Degree', salary: 14.0 }
  ],
  'swe': [
    { level: 'Fresher', salary: 8.0 },
    { level: 'Mid (3-5y)', salary: 18.0 },
    { level: 'Senior (7y+)', salary: 32.0 }
  ],
  'ai': [
    { level: 'Fresher', salary: 12.0 },
    { level: 'Mid (3-5y)', salary: 24.0 },
    { level: 'Senior (7y+)', salary: 45.0 }
  ],
  'cyber': [
    { level: 'Fresher', salary: 7.0 },
    { level: 'Mid (3-5y)', salary: 14.0 },
    { level: 'Senior (7y+)', salary: 26.0 }
  ],
  'cloud': [
    { level: 'Fresher', salary: 10.0 },
    { level: 'Mid (3-5y)', salary: 20.0 },
    { level: 'Senior (7y+)', salary: 34.0 }
  ],
  'ux': [
    { level: 'Fresher', salary: 6.0 },
    { level: 'Mid (3-5y)', salary: 12.0 },
    { level: 'Senior (7y+)', salary: 22.0 }
  ],
  'game': [
    { level: 'Fresher', salary: 5.0 },
    { level: 'Mid (3-5y)', salary: 10.0 },
    { level: 'Senior (7y+)', salary: 20.0 }
  ],
  'data': [
    { level: 'Fresher', salary: 9.0 },
    { level: 'Mid (3-5y)', salary: 18.0 },
    { level: 'Senior (7y+)', salary: 30.0 }
  ]
};

const CAREER_TUTORIALS = {
  'foundation-cs': [
    { title: "Introduction to Computer Science", channel: "Harvard CS50", url: "https://www.youtube.com/embed/zOjov-2OZ0E", duration: "2h 30m" },
    { title: "Python for Beginners - Full Course", channel: "Programming with Mosh", url: "https://www.youtube.com/embed/_uQrJ0TkZlc", duration: "6h 14m" },
    { title: "Scratch Game Development Tutorial", channel: "Griffpatch", url: "https://www.youtube.com/embed/8K4S0eL0uI4", duration: "25m" }
  ],
  'foundation-finance': [
    { title: "How the Economic Machine Works", channel: "Ray Dalio", url: "https://www.youtube.com/embed/PHe0bXAIuk0", duration: "30m" },
    { title: "Personal Finance & Money Management", channel: "Ali Abdaal", url: "https://www.youtube.com/embed/O85LdM60V4g", duration: "45m" },
    { title: "Introduction to Stock Market & Investing", channel: "Zerodha Varsity", url: "https://www.youtube.com/embed/fDplZ44oV1U", duration: "20m" }
  ],
  'foundation-design': [
    { title: "Graphic Design Fundamentals", channel: "GCFLearnFree", url: "https://www.youtube.com/embed/YqQx75OPRa0", duration: "15m" },
    { title: "Figma for Beginners Complete Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/ft30zcMlFao", duration: "3h 40m" },
    { title: "Color Theory & Typography Basics", channel: "Jesse Showalter", url: "https://www.youtube.com/embed/95_8oXfUe2E", duration: "18m" }
  ],
  'btech-cse': [
    { title: "Data Structures & Algorithms Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/bum_19loj9A", duration: "8h 12m" },
    { title: "B.Tech Computer Science Core Lectures", channel: "NPTEL", url: "https://www.youtube.com/embed/gI8N7N-4wWk", duration: "45m" },
    { title: "Object-Oriented Programming C++ Tutorial", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/wN0x9eZvOo4", duration: "1h 30m" }
  ],
  'bca': [
    { title: "Web Development Complete Course", channel: "SuperSimpleDev", url: "https://www.youtube.com/embed/HXYgK65Mh2s", duration: "11h 50m" },
    { title: "Full Stack MERN Developer Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/7CqJlxBYj-M", duration: "9h 40m" },
    { title: "Java Programming for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/embed/grEKMHGYyns", duration: "2h 30m" }
  ],
  'bdes': [
    { title: "Introduction to User Experience (UX)", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/c6W4sR8K1-0", duration: "2h 15m" },
    { title: "Material Design & Sketching Guide", channel: "Design Theory", url: "https://www.youtube.com/embed/mGjZz60p4s4", duration: "22m" },
    { title: "NID/UCEED Preparation Drawing Basics", channel: "Design Academy", url: "https://www.youtube.com/embed/cWn501c6sE4", duration: "15m" }
  ],
  'swe': [
    { title: "System Design Course for Beginners", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/SqcY0GlETPk", duration: "5h 20m" },
    { title: "Git & GitHub Crash Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/RGOj5yH7evk", duration: "1h 10m" },
    { title: "Docker & Kubernetes Full Tutorial", channel: "TechWorld with Nana", url: "https://www.youtube.com/embed/3c-iBn73dDE", duration: "3h 40m" }
  ],
  'ai': [
    { title: "Deep Learning & Neural Networks", channel: "Andrej Karpathy", url: "https://www.youtube.com/embed/gGxe2mN3kHg", duration: "2h 15m" },
    { title: "Transformers, GPTs & Fine-Tuning QLoRA", channel: "Andrej Karpathy", url: "https://www.youtube.com/embed/kCc8FmEb1nY", duration: "1h 56m" },
    { title: "Retrieval-Augmented Generation (RAG) Tutorial", channel: "LangChain", url: "https://www.youtube.com/embed/tcqEUSNCn8I", duration: "45m" }
  ],
  'cyber': [
    { title: "Cybersecurity Full Course for Beginners", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/3yZzEaW9Wz0", duration: "12h" },
    { title: "Wireshark Packet Analysis Tutorial", channel: "NetworkChuck", url: "https://www.youtube.com/embed/rK2Hl1AypwM", duration: "35m" },
    { title: "Ethical Hacking & Metasploit Tutorial", channel: "HackerSploit", url: "https://www.youtube.com/embed/e_yW6rZ_KzY", duration: "1h 15m" }
  ],
  'cloud': [
    { title: "AWS Cloud Practitioner Certification Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/SOTamWGuqXs", duration: "13h" },
    { title: "Terraform Infrastructure as Code Complete Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/SLB_c_ayRMo", duration: "2h 30m" },
    { title: "DevOps Roadmap & SRE Fundamentals", channel: "TechWorld with Nana", url: "https://www.youtube.com/embed/9pZ2xmsSdmU", duration: "1h 15m" }
  ],
  'ux': [
    { title: "UI Design Principles & Figma Layouts", channel: "Mizko", url: "https://www.youtube.com/embed/uH3L8qT-m4o", duration: "40m" },
    { title: "Figma Design Systems & Components", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/Xq4y69gUu2U", duration: "2h" },
    { title: "How to Build a UI/UX Design Portfolio", channel: "Abhinav Chhikara", url: "https://www.youtube.com/embed/v3A_e4n7R_I", duration: "25m" }
  ],
  'game': [
    { title: "Unity Game Development Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/gB1F9G0JXOo", duration: "7h" },
    { title: "Unreal Engine 5 Beginner Tutorial", channel: "Unreal Sensei", url: "https://www.youtube.com/embed/gQmiqmxJMtA", duration: "5h 15m" },
    { title: "C# Scripting & Physics in Unity", channel: "Brackeys", url: "https://www.youtube.com/embed/j48LtUkZRjU", duration: "30m" }
  ],
  'data': [
    { title: "Data Science for Beginners Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/embed/ua-CiDNNj30", duration: "6h" },
    { title: "SQL for Data Analysis Tutorial", channel: "Alex The Analyst", url: "https://www.youtube.com/embed/HXV3zeQKqGY", duration: "4h" },
    { title: "A/B Testing & Statistics for Data Science", channel: "StatQuest", url: "https://www.youtube.com/embed/8K4S0eL0uI4", duration: "20m" }
  ]
};

const CareerRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = roadmapData[id];

  // Quiz States
  const [activeSkill, setActiveSkill] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizState, setQuizState] = useState('quiz'); // 'quiz', 'success', 'fail'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Career not found</h2>
        <button onClick={() => navigate('/explorer')} className="text-blue-600 underline">← Back to Explorer</button>
      </div>
    );
  }

  const handleStartQuiz = async (skill) => {
    setActiveSkill(skill);
    setShowQuizModal(true);
    setQuizLoading(true);
    setQuizState('quiz');
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill })
      });
      if (response.ok) {
        const quizData = await response.json();
        setQuizQuestions(quizData);
      } else {
        alert("Failed to load quiz. Make sure the backend is running.");
        setShowQuizModal(false);
      }
    } catch (err) {
      console.error('Quiz fetch error:', err);
      alert("Error generating quiz.");
      setShowQuizModal(false);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSubmit = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    const correctIndex = quizQuestions[currentQuizQuestion].answer;
    if (optionIndex === correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      // Final grading
      const finalScore = quizScore;
      if (finalScore >= 2) {
        setQuizState('success');
        handleAwardXP(100);
      } else {
        setQuizState('fail');
      }
    }
  };

  const handleAwardXP = async (amount) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const getRes = await fetch(`${apiBaseUrl}/api/profile`);
      if (getRes.ok) {
        const profile = await getRes.json();
        let newXp = (profile.xp || 0) + amount;
        let newLevel = profile.level || 1;
        const nextLevelThreshold = newLevel * 500;
        
        if (newXp >= nextLevelThreshold) {
          newXp -= nextLevelThreshold;
          newLevel += 1;
        }
        
        await fetch(`${apiBaseUrl}/api/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ xp: newXp, level: newLevel })
        });
      }
    } catch (err) {
      console.error('Error awarding XP:', err);
    }
  };

  const c = colorMap[data.color];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowQuizModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={24} />
              </button>
              
              {quizLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                  <h3 className="text-xl font-bold text-slate-800">Generating AI Quiz...</h3>
                  <p className="text-sm text-slate-500">Preparing questions for "{activeSkill}"</p>
                </div>
              ) : quizState === 'quiz' && quizQuestions.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">AI Skill Test: {activeSkill}</span>
                    <span className="text-xs text-slate-400 font-mono">Q: {currentQuizQuestion + 1} / {quizQuestions.length}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-6">{quizQuestions[currentQuizQuestion].question}</h3>
                  
                  <div className="flex flex-col gap-3">
                    {quizQuestions[currentQuizQuestion].options.map((option, idx) => {
                      let btnStyle = "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100";
                      if (isAnswered) {
                        const correctIndex = quizQuestions[currentQuizQuestion].answer;
                        if (idx === correctIndex) {
                          btnStyle = "border-green-300 bg-green-50 text-green-700 font-semibold";
                        } else if (idx === selectedAnswer) {
                          btnStyle = "border-red-300 bg-red-50 text-red-700";
                        } else {
                          btnStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                        }
                      }
                      
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(idx)}
                          className={`w-full py-3.5 px-5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  
                  {isAnswered && (
                    <button
                      onClick={handleNextQuestion}
                      className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                      {currentQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              ) : quizState === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Passed! 🎉</h3>
                  <p className="text-slate-500 mb-6">
                    Awesome job! You answered the questions correctly and verified your understanding of **{activeSkill}**.
                  </p>
                  <div className="bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl font-bold mb-6">
                    +100 XP Awarded
                  </div>
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                  >
                    Continue Journey
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Failed</h3>
                  <p className="text-slate-500 mb-6">
                    You got {quizScore} out of 3 questions correct. You need at least 2 correct answers to pass the skill check.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleStartQuiz(activeSkill)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                    >
                      Retry Quiz
                    </button>
                    <button
                      onClick={() => setShowQuizModal(false)}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <button
        onClick={() => navigate('/explorer')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Career Explorer
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          <span className={c.text}>{data.title}</span> Career Roadmap
        </h1>
        <p className="text-slate-500 text-lg mb-6">{data.description}</p>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { icon: <Clock size={16} />, label: 'Journey Duration', value: data.totalYears },
            { icon: <TrendingUp size={16} />, label: 'Top Indian Salary', value: data.avgTopSalary },
            { icon: <Briefcase size={16} />, label: 'Stages', value: `${data.stages.length} levels` },
          ].map((stat) => (
            <div key={stat.label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${c.border} ${c.bg}`}>
              <span className={c.text}>{stat.icon}</span>
              <div>
                <div className="text-xs text-slate-400">{stat.label}</div>
                <div className={`text-sm font-bold ${c.text}`}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Media & Community Insights Section */}
      {data.videoUrl && data.quote && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Day in the Life Video */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
              <PlayCircle className="text-blue-600" size={20} />
              Day in the Life of a {data.title}
            </h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe 
                width="100%" 
                height="100%" 
                src={data.videoUrl} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </GlassCard>

          {/* Professional Story */}
          <GlassCard className="p-6 flex flex-col justify-between relative overflow-hidden bg-slate-50">
            <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20 -z-10">
              <Quote size={100} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
                <Quote className="text-blue-600" size={20} />
                Professional Journey Advice
              </h3>
              <p className="text-sm italic text-slate-600 leading-relaxed mb-6">
                "{data.quote.text}"
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {data.quote.author.split(' ')[0][0]}{data.quote.author.split(' ')[1] ? data.quote.author.split(' ')[1][0] : ''}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">{data.quote.author}</div>
                <div className="text-[10px] text-slate-400 font-medium">Verified Contributor via LinkedIn</div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Salary Chart & Professionals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Salary Chart Column */}
        <GlassCard className="lg:col-span-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <TrendingUp className={c.text} size={20} />
              Salary Growth Path (₹ LPA)
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-semibold">
              Average annual package progression in the Indian market from entry-level to senior roles.
            </p>
          </div>
          
          <div className="h-[220px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CAREER_SALARIES[id] || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="level" stroke="#64748b" fontSize={11} fontWeight={600} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} tickLine={false} label={{ value: '₹ LPA Package', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '9px', fontWeight: 700 } }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value) => [`₹ ${value} Lakhs`, 'LPA Package']}
                />
                <Bar dataKey="salary" fill={id.includes('foundation') ? '#f59e0b' : '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Profiles Section Column */}
        <GlassCard className="lg:col-span-2 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            Verified Career Journeys
          </h3>
          <p className="text-xs text-slate-500 mb-6 font-semibold">
            Hear from real working professionals in India about what it takes to succeed in this career path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(CAREER_PROFILES[id] || []).map((prof, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between relative shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{prof.name}</h4>
                  <div className="text-[10px] text-slate-500 font-semibold mb-3">{prof.role} at <span className="text-primary font-bold">{prof.company}</span></div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "{prof.quote}"
                  </p>
                </div>
                
                <a 
                  href={prof.link}
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-bold mt-4 block self-start transition-colors"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recommended Watch & Learn Tutorial Videos */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
          <PlayCircle className="text-red-500" size={22} />
          Recommended Tutorials (Watch & Learn)
        </h3>
        <p className="text-xs text-slate-500 mb-6 font-semibold">
          Hand-picked high-quality tutorial series and lectures to help you acquire key skills for this path.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(CAREER_TUTORIALS[id] || []).map((video, idx) => (
            <GlassCard key={idx} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow border-slate-200">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200 shadow-inner mb-3">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={video.url} 
                  title={video.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1.5" title={video.title}>{video.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                  <span>Channel: {video.channel}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-[8px] font-bold text-slate-600">{video.duration}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />

        <div className="space-y-6">
          {data.stages.map((stage, idx) => (
            <motion.div
              key={stage.level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-16"
            >
              {/* Level dot */}
              <div className={`absolute left-0 w-12 h-12 rounded-full ${c.dot} flex items-center justify-center text-white font-bold text-lg shadow-md z-10`}>
                {stage.level}
              </div>

              <GlassCard className={`border ${c.border} hover:shadow-md transition-shadow`}>
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${c.bar} rounded-t-xl -mt-6 -mx-6 mb-4`} style={{width: 'calc(100% + 3rem)', marginLeft: '-1.5rem', marginTop: '-1.5rem', marginBottom: '1rem', borderRadius: '0.75rem 0.75rem 0 0'}} />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>Level {stage.level}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">{stage.description}</p>

                    {/* Detailed learning path (Checklist & Projects) */}
                    {stage.checklist && stage.project && (
                      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-4">
                        <div>
                          <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                            <CheckCircle2 size={12} className="text-blue-500" />
                            Core Learning Checklist
                          </h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-500 font-medium">
                            {stage.checklist.map((item, idx) => (
                              <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                            <Code size={12} className="text-green-500" />
                            Hands-On Project To Build
                          </h4>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 font-medium leading-relaxed shadow-sm">
                            {stage.project}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleStartQuiz(skill)}
                          className="text-xs bg-slate-50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 font-medium active:scale-95 shadow-sm"
                          title="Click to take an AI Skill Test!"
                        >
                          <Sparkles size={11} className="text-blue-500 animate-pulse" />
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stats sidebar */}
                  <div className="flex flex-row md:flex-col gap-3 md:gap-2 md:min-w-[160px] shrink-0">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bg} border ${c.border}`}>
                      <Clock size={14} className={c.text} />
                      <div>
                        <div className="text-xs text-slate-400">Experience</div>
                        <div className={`text-xs font-bold ${c.text}`}>{stage.yearsExp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                      <DollarSign size={14} className="text-green-600" />
                      <div>
                        <div className="text-xs text-slate-400">Salary Package</div>
                        <div className="text-xs font-bold text-green-700">{stage.salary}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress arrow to next */}
                {idx < data.stages.length - 1 && (
                  <div className={`flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs ${c.text} font-medium`}>
                    <ChevronRight size={14} />
                    Next: {data.stages[idx + 1].title}
                  </div>
                )}
                {idx === data.stages.length - 1 && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-green-600 font-medium">
                    <CheckCircle2 size={14} />
                    Top of the career ladder! 🎉
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
