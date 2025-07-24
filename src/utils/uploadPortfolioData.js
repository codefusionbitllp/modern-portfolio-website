/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file uploadPortfolioData.js
 */


const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// ✅ Firebase Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ Your mock data
const mockPortfolioData = {
  profile: {
    name: "Hitesh Sapra",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "Passionate developer creating innovative digital experiences...",
    email: "saprahits007@gmail.com",
    phone: "+91 9601605922",
    github: "https://github.com/saprahits",
    linkedin: "https://www.linkedin.com/in/hiteshsapra/",
    x: "https://x.com/hiteshsapra75",
    avatar: "https://fullstack.hiteshsapra.com/images/hiteshsapra.png",
    resume: "/resume.pdf",
    location: "Kuwait City, Al Asimah, Kuwait",
    availableForWork: true,
    personalInfo: {
      yearsOfExperience: 9,
      projectsCompleted: 50,
      happyClients: 30,
      coffeeCups: 1000
    }
  },
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution built with React, Node.js, and Stripe integration...",
      longDescription: "A comprehensive e-commerce platform...",
      tech: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe", "Redis"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
      ],
      liveUrl: "https://ecommerce-demo.com",
      category: "fullstack",
      status: "completed",
      createdAt: new Date('2024-01-15'),
      challenges: ["Complex payment flow integration", "Real-time inventory synchronization"],
      learnings: ["Advanced React patterns", "Microservices architecture"],
      duration: "3 months",
      teamSize: 4,
      role: "Lead Developer"
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative task management platform...",
      tech: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      liveUrl: "https://taskapp-demo.com",
      category: "web",
      status: "completed",
      createdAt: new Date('2024-02-20'),
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts...",
      tech: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      liveUrl: "https://weather-demo.com",
      category: "frontend",
      status: "completed",
      createdAt: new Date('2024-03-10'),
    }
  ],
  skills: [
    {
      category: "Mobile",
      order_id: 1,
      items: [
        { name: "Flutter", level: "expert" },
        { name: "Swift", level: "advanced" },
        { name: "Kotlin", level: "advanced" },
        { name: "GraphQL", level: "advanced" },
        { name: "Firebase", level: "expert" },
        { name: "REST APIs", level: "advanced" },
        { name: "CI/CD", level: "expert" },
        { name: "Agile Methodologies", level: "expert" },
        { name: "AWS Amplify", level: "advanced" },
      ]
    },
    {
      category: "Frontend",
      order_id: 2,
      items: [
        { name: "React", level: "expert" },
        { name: "TypeScript", level: "advanced" },
        { name: "Next.js", level: "advanced" },
        { name: "Tailwind CSS", level: "expert" },
        { name: "Framer Motion", level: "advanced" },
        { name: "GraphQL", level: "advanced" },
        { name: "Web Accessibility", level: "advanced" },
        { name: "Responsive Design", level: "expert" },
        { name: "SEO Optimization", level: "advanced" },
        { name: "Progressive Web Apps", level: "advanced" },
      ]
    },
    {
      category: "Backend",
      order_id: 3,
      items: [
        { name: "Node.js", level: "advanced" },
        { name: "Django", level: "advanced" },
        { name: "Firebase", level: "expert" },
        { name: "PostgreSQL", level: "advanced" },
        { name: "MongoDB", level: "intermediate" },
        { name: "GraphQL", level: "advanced" },
        { name: "Auth 2.0", level: "advanced" },
        { name: "REST APIs", level: "expert" },
        { name: "AWS", level: "intermediate" },
        { name: "Microservices", level: "expert" },
        { name: "Serverless Architecture", level: "advanced" },
        { name: "Agile Methodologies", level: "expert" },
        { name: "WebSockets", level: "advanced" },
        { name: "Payment Gateways", level: "expert" },
        { name: "Data Modeling", level: "advanced" },
        { name: "Caching Strategies", level: "advanced" },
        { name: "API Rate Limiting", level: "advanced" },
      ]
    },
    {
      category: "Tools",
      order_id: 4,
      items: [
        { name: "Xcode", level: "expert" },
        { name: "Android Studio", level: "expert" },
        { name: "Visual Studio Code", level: "expert" },
        { name: "Postman", level: "expert" },
        { name: "GitHub", level: "expert" },
        { name: "GitLab", level: "expert" },
        { name: "Jira", level: "advanced" },
        { name: "Slack", level: "expert" },
        { name: "Trello", level: "advanced" },
        { name: "Asana", level: "advanced" },
        { name: "CircleCI", level: "expert" },
        { name: "AWS CloudFormation", level: "intermediate" },
        { name: "Sentry", level: "advanced" },
        { name: "Nginx", level: "advanced" },
        { name: "Apache", level: "advanced" },
        { name: "Git", level: "expert" },
        { name: "Docker", level: "advanced" },
        { name: "Webpack", level: "intermediate" },
        { name: "Figma", level: "intermediate" }
      ]
    }
  ],
  experience: [
    {
      id: "1",
      company: "CodeFusionBit LLP",
      position: "TPM/ Team Lead",
      duration: "May 2023 - Present",
      startDate: new Date('2023-05-01'),
      description: "Technical Project Manager: team mgmt, project architecture, client communication, CI/CD. Building and leading a team of developers to deliver high-quality software solutions.",
      achievements: [
        "As Technical Project Manager, managed a team of 20+ developers and 6+ cross-functional teams",
        "Oversaw project timelines, budgets, and client communication and stakeholder management",
        "Responsible for project architecture and design decisions",
        "Led development of 5+ major client projects",
        "Mentored 12+ senior and junior developers",
        "Managed cross-functional 6+ teams",
        "Implemented CI/CD pipelines for faster deployments",
        "Good Knowledge of Quality Assurance and Testing",
        "Agile methodologies and project management",
      ],
      technologies: ["Flutter", "Swift/Swift UI","Kotlin", "React", "TypeScript", "Next.js", "GraphQL", "AWS", "Firebase", "PostgreSQL", "MongoDB", "Docker", "Git", "Payment gateways", "Security assessment", "CI/CD", "Agile methodologies", "Microservices", "WebSockets", "REST APIs", "Jira", "Slack"],
      location: "Rajkot Gujarat, India",
      type: "full-time"
    },
    {
      id: "2",
      company: "9series Solutions Pvt. Ltd.",
      position: "Team Lead",
      duration: "March 2022 - May 2023",
      startDate: new Date('2022-03-01'),
      description: "Mobile Team Lead: team mgmt, mobile app architecture, code reviews, client communication, POCs. Leading a team of mobile developers to create innovative mobile applications.",
      achievements: [
        "As a Mobile Team Lead, managed a team of 10 developers",
        "Responsible for mobile app architecture and design",
        "Conducted code reviews and ensured best practices",
        "Worked closely with clients to gather requirements and provide estimates",
        "Developed proof of concepts (POCs) for new technologies",
        "Designed and implemented scalable mobile architectures",
        "Ensured high code quality and performance optimization",
        "Mentored senior/junior developers and conducted training sessions",
        "Collaborated with cross-functional teams to deliver projects on time",
      ],
      technologies: ["Android", "iOS", "Swift", "Flutter", "Java", "Kotlin", "Dart", "Firebase", "REST APIs", "Git", "Agile methodologies", "Microservices", "CI/CD", "GraphQL", "PostgreSQL", "MongoDB", "Jira", "Slack", "Docker", "AWS", ],
      location: "Ahmedabad Gujarat, India",
      type: "full-time"
    },
    {
      id: "3",
      company: "Bito1 Techplode",
      position: "Sr. Android and Flutter Developer",
      duration: "Feb 2019 - March 2022",
      startDate: new Date('2019-02-01'),
      description: "Senior Android and Flutter Developer: mobile app development, team leadership, code reviews, client communication. Leading the development of mobile applications using Android and Flutter.",
      achievements: [
        "Developed and maintained multiple Android and Flutter applications",
        "Worked on e-commerce, social media, and utility apps",
        "Collaborated with designers to create user-friendly interfaces",
        "Implemented RESTful APIs for mobile applications",
        "Led a team of 5 developers, ensuring timely project delivery",
        "Conducted code reviews and provided mentorship to junior developers",
      ],
      technologies: ["Android", "Flutter", "Java", "Kotlin", "Dart", "Firebase", "REST APIs", "Git", "Agile methodologies", "CI/CD", "Jira", "AWS"],
      location: "Ahmedabad Gujarat, India",
      type: "full-time"
    },
    {
      id: "4",
      company: "Appeters Technology",
      position: "Android and Web Developer",
      duration: "Jan 2016 - Jan 2019",
      startDate: new Date('2016-01-01'),
      description: "Worked as a PHP Web Developer and Android Developer, contributing to various projects and enhancing user experiences.",
      achievements: [
        "PHP Web Developer & Android Developer",
        "Developed and maintained multiple Android applications",
        "Worked on various web projects using PHP and MySQL",
        "Collaborated with designers to create user-friendly interfaces",
        "Implemented RESTful APIs for mobile applications",
      ],
      technologies: ["Android", "PHP", "MySQL", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
      location: "Rajkot Gujarat, India",
      type: "full-time"
    },
  ],
  education: [
    {
      id: "mca",
      degree: "Master of Technology in Computer Science",
      institution: "Gujarat Technological University",  
      startDate: new Date('2016-06-01'),
      endDate: new Date('2018-05-01'),
      description: "Completed a Master's degree in Computer Science, focusing on advanced software development and project management.",
      location: "Ahmedabad, Gujarat, India",
      achievements: [
        "Graduated with a Master's degree in Computer Science",
        "Focused on advanced software development and project management",
        "Completed a thesis on software architecture and design patterns",
      ] 
    },
    {
      id: "bca",
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Saurashtra University",
      startDate: new Date('2011-08-01'),   
      endDate: new Date('2015-05-01'),
      description: "Completed a Bachelor's degree in Computer Science, gaining a strong foundation in software development and engineering principles.",
      location: "Rajkot, Gujarat, India",
      achievements: [
        "Graduated with a Bachelor's degree in Computer Science",
        "Gained a strong foundation in software development and engineering principles",
      ]
    }
  ]
};

// ✅ Upload function
async function uploadData() {
  try {
    // Profile
    await db.collection("portfolioWeb").doc("profile").set(mockPortfolioData.profile);

    // Projects
    for (const project of mockPortfolioData.projects) {
      await db.collection("portfolioWeb").doc("profile").collection("projects").doc(project.id).set(project);
    }

    // Skills
    for (const skill of mockPortfolioData.skills) {
      await db.collection("portfolioWeb").doc("profile").collection("skills").doc(skill.category).set(skill);
    }

    // Experience
    for (const exp of mockPortfolioData.experience) {
      await db.collection("portfolioWeb").doc("profile").collection("experience").doc(exp.id).set(exp);
    }


    // Education
    for (const edu of mockPortfolioData.education) {
      await db.collection("portfolioWeb").doc("profile").collection("education").doc(edu.id).set(edu);
    }


    console.log("✅ portfolioWeb data uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
}

uploadData();