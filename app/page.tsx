"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { getGithubUser, getGithubRepos } from '@/lib/github';
import { Terminal, Github, ExternalLink, Code2, Download, Linkedin, Twitter, Mail, BookOpen, Cpu, Menu, X, Eye, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Background3D from '@/components/Background3D';

const GITHUB_USERNAME = 'SaiGawand12';
const bio = "I am a Cybersecurity student at RV University with expertise in network security, penetration testing, threat intelligence, and cloud security. I also have experience in Full Stack Development, UI/UX, and AR/VR. Passionate about building secure, user-friendly applications, I'm seeking opportunities to grow and collaborate. Let's connect!";

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 90 },
  { name: "UI/UX", level: 90 },
  { name: "Cyber Security", level: 90 },
  { name: "Cloud Computing", level: 90 },
  { name: "AR/VR", level: 85 },
  { name: "Ethical Hacking", level: 90 },
  { name: "Node.js", level: 95 },
  { name: "TypeScript", level: 95 },
  { name: "Python", level: 90 },
];

const education = [
  {
    degree: "Bachelor of Science(Hons) in Computer Science",
    institution: "RV University",
    year: "2022-2026",
    discription: "Building expertise in Cybersecurity, Full Stack Development, UI/UX, and AR/VR. Gaining hands-on experience in penetration testing, cloud security, and secure application development. Actively working on projects that apply theoretical knowledge to real-world challenges."
  },
];

const experiences = [
  {
    title: "Cybersecurity Intern",
    company: "CodeAlpha",
    period: "Apr 2025 - Present",
    description: [
      "Conducted vulnerability assessments and penetration testing on web applications",
      "Implemented security monitoring solutions using SIEM tools",
      "Developed security awareness training materials for employees",
      "Assisted in incident response and threat hunting activities"
    ]
  },
  {
    title: "Web Development Intern",
    company: "CodSoft",
    period: "Apr 2025 - Present",
    description: [
      "Developing and improving responsive web applications using HTML, CSS, JavaScript, and React.",
      " Implementing modern UI/UX designs and ensuring cross-browser compatibility.",
      " Working on real-world projects, including frontend development and API integration.",
      "Collaborating with a team to build scalable and efficient web solutions.",
      "Gaining hands-on experience with Git, GitHub, and deployment processes."
    ]
  }
];

const certificates = [
  {
    title: "Tata Cybersecurity Security Analyst Job Simulation",
    issuer: " Forage",
    image: "/Tata certificate-1.png",
  },
  {
    title: "Mern Stack",
    issuer: "RV University",
    image: "/MERN Stack069000-1.png",
  },
  {
    title: "Photoshop Beginner",
    issuer: "EDUCBA",
    image: "/Photoshop Beginnerr-1.png",
  },
  {
    title: "JavaScript",
    issuer: "UpGrad",
    image: "/javscript certificate-1.png",
  },
  {
    title: "Introduction to Cyber Security",
    issuer: "SkillUp",
    image: "/Introduction_to_Cyber_Security-1.png",
  },
  {
    title: "Ethical Hacking for Beginners",
    issuer: "SkillUp",
    image: "/Ethical Hacking Certificate-1.png",
  },
  {
    title: "Ethical Hacking Masterclass",
    issuer: "Infosys Springboard",
    image: "/Ethical Hacking Masterclass-1.png",
  },
];

function Section({ children, id, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleRepos, setVisibleRepos] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEmailClick = () => {
    const subject = "Inquiry from Portfolio Website";
    const body = `Hi Sai,\n\nI came across your portfolio and would like to connect regarding...\n\nBest regards,\n[Your Name]`;
    const mailtoLink = `mailto:saigawand90@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    async function fetchGithubData() {
      const userData = await getGithubUser(GITHUB_USERNAME);
      const reposData = await getGithubRepos(GITHUB_USERNAME);
      setUser(userData);
      setRepos(reposData);
    }
    fetchGithubData();

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'certificates', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMore = () => {
    setVisibleRepos((prev) => Math.min(prev + 6, repos.length));
  };

  const navigationItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'certificates', label: 'CERTIFICATES' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2 neon-text">
              <Terminal size={24} />
              <span className="text-primary neon-text font-bold">CYBER_DEV</span>
            </button>

            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    activeSection === item.id ? 'text-primary neon-text' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button 
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/90 border-t border-primary/20 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm uppercase tracking-wider transition-colors px-4 py-2 ${
                      activeSection === item.id ? 'text-primary neon-text' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <Section id="home" className="relative mb-16 text-center min-h-screen flex flex-col justify-center">
            <Background3D />
            <motion.h1
              className="text-6xl font-bold mb-4 neon-text glitch"
              data-text={user?.name || "SAI GAWAND"}
            >
              {user?.name || "SAI GAWAND"}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-cyan-400"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  1000,
                  'Aspiring Cybersecurity Professional',
                  1000,
                  'Code Artist',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center space-x-6 mt-8"
            >
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/sai-gawand-aa719025b/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://x.com/saigawand90" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="mailto:saigawand90@gmail.com" className="text-primary hover:text-secondary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <a
                href="SAI_GAWAND_RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-black rounded-lg hover:bg-secondary transition-colors"
              >
                <Eye className="w-5 h-5 mr-2" /> View CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="scroll-down group"
              onClick={() => scrollToSection('about')}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary group-hover:text-secondary transition-colors"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M12 3v18m0 0l-7-7m7 7l7-7"
                    className="group-hover:stroke-[3]"
                  />
                </svg>
                <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-full filter blur-xl group-hover:bg-secondary/20 transition-colors"></div>
              </motion.div>
            </motion.div>
          </Section>

          <Section id="about" className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-card p-8 rounded-lg neon-border">
                <div className="flex flex-col items-center">
                  {user?.avatar_url && (
                    <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden neon-border">
                      <Image
                        src={user.avatar_url}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-4">{user?.name}</h2>
                  <p className="text-muted-foreground text-center">{bio}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-card p-8 rounded-lg neon-border">
                  <div className="flex items-center mb-6">
                    <Cpu className="w-6 h-6 mr-2 text-primary" />
                    <h3 className="text-xl font-bold">Skills</h3>
                  </div>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-progress"
                            style={{ '--progress': `${skill.level}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card p-8 rounded-lg neon-border">
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    <h3 className="text-xl font-bold">Education</h3>
                  </div>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-primary">{edu.year}</p>
                        <p className="text-sm text-primary">{edu.discription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>

          <Section id="experience" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 neon-text">
              <Briefcase className="inline mr-2" />
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg hover:neon-border transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                  <p className="text-secondary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground mb-4">{exp.period}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="projects" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 neon-text">
              <Code2 className="inline mr-2" />
              Latest Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, visibleRepos).map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg hover:neon-border transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                  <p className="text-muted-foreground mb-4">{repo.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Github className="w-4 h-4 mr-1" />
                      <span>{repo.stargazers_count} stars</span>
                    </div>
                    <div className="flex space-x-4">
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-all">  
                          <ExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary hover:text-secondary transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {visibleRepos < repos.length && (
              <motion.button
                onClick={loadMore}
                className="neon-border px-6 py-3 rounded-lg mx-auto mt-12 block hover:bg-cyan-500/10 border-2 border-red-500"
              >
                Load More
              </motion.button>
            )}
          </Section>

          <Section id="certificates" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 neon-text">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg hover:neon-border transition-all duration-300"
                >
                  <h3 className="text-xl font-bold">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="mt-4 rounded-lg shadow-md certificate-image"
                  />
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="contact" className="text-center">
            <h2 className="text-3xl font-bold mb-8 neon-text">Get In Touch</h2>
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors neon-border"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </button>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors neon-border"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Profile
              </a>
            </div>
          </Section>
        </div>
      </main>

      <footer className="border-t border-cyan-500/20 py-8 text-center text-gray-400">
        <p>© 2025 Sai Gawand • All rights reserved</p>
        <p>
          Want to explore my projects?{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary"
          >
            Visit my GitHub
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/sai-gawand-aa719025b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/saigawand90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </>
  );
}
