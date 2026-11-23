import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  HeartPulse,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  PhoneCall,
  Pill,
  PlayCircle,
  Server,
  Shield,
  ShoppingBasket,
  Sparkles,
  Sun,
  TerminalSquare,
  UserRound,
  X
} from 'lucide-react';

const GITHUB = 'https://github.com/resandu75';
const LINKEDIN = 'https://www.linkedin.com/in/resandu-dewujith-621788412';
const EMAIL = 'resandudewujith040@gmail.com';
const CV = '/Resandu_Dewujith_CV.pdf';

const projects = [
  {
    title: 'FreshMart Grocery Management System',
    eyebrow: 'FEATURED BUILD',
    icon: ShoppingBasket,
    description:
      'A full-stack grocery management platform focused on inventory, POS-style flows, staff roles and operational reporting.',
    stack: ['React', 'Spring Boot', 'MySQL'],
    link: `${GITHUB}/grocery-management-system`,
    accent: 'red'
  },
  {
    title: 'Pharmacy Management System',
    eyebrow: 'WEB APPLICATION',
    icon: Pill,
    description:
      'A pharmacy operations system with authentication, database workflows and structured frontend-backend architecture.',
    stack: ['React', 'Spring Boot', 'MySQL', 'JWT'],
    link: `${GITHUB}/pharmacy-management-system`,
    accent: 'cyan'
  },
  {
    title: 'Hospital Management System',
    eyebrow: 'HEALTHCARE PLATFORM',
    icon: HeartPulse,
    description:
      'A hospital management application exploring patient records, staff workflows and connected healthcare operations.',
    stack: ['React', 'Java', 'Spring Boot'],
    link: `${GITHUB}/hospital-management-system`,
    accent: 'gold'
  },
  {
    title: 'KCC Digital Campus',
    eyebrow: 'SCHOOL DIGITAL EXPERIENCE',
    icon: GraduationCap,
    description:
      'A modern school website and digital campus concept combining public information, design and education-focused features.',
    stack: ['JavaScript', 'Node.js', 'SQLite'],
    link: GITHUB,
    accent: 'violet'
  }
];

const expertise = [
  {
    title: 'Cyber Security Fundamentals',
    icon: Shield,
    text: 'Building a strong base in security operations, blue-team thinking, networking concepts and security-minded development.'
  },
  {
    title: 'Full-Stack Development',
    icon: Code2,
    text: 'Creating practical web applications with React frontends, Java / Spring Boot backends and real database integration.'
  },
  {
    title: 'Database & Backend Workflows',
    icon: Database,
    text: 'Designing data models, building APIs and structuring systems that keep applications organized and scalable.'
  },
  {
    title: 'IT Support & Problem Solving',
    icon: Server,
    text: 'Hands-on troubleshooting experience, quick learning under pressure and a habit of turning technical issues into solutions.'
  }
];

const timeline = [
  {
    year: '2025 — Present',
    title: 'BSc (Hons) in Information Technology',
    place: 'SLIIT · Cyber Security Specialization',
    body: 'Second-year undergraduate building cybersecurity, networking, software engineering and full-stack development knowledge.'
  },
  {
    year: '2024 — Present',
    title: 'IT Support Volunteer',
    place: 'School events · Anuradhapura',
    body: 'Supported event IT operations, solved hardware/software issues and handled software setup for staff and students.'
  },
  {
    year: 'Current Focus',
    title: 'Learning Journey',
    place: 'TryHackMe · Self-Driven Growth',
    body: 'Exploring cybersecurity foundations while continuing to build practical software projects and portfolio-ready systems.'
  }
];

const highlightList = [
  'Cyber Security undergraduate at SLIIT',
  'Aspiring SOC / IT internship candidate',
  'Full-stack builder with practical university projects',
  'Comfortable with React, Spring Boot, MySQL and Java',
  'Available for internships and growth opportunities'
];

const stats = [
  ['04+', 'Portfolio Projects'],
  ['02+', 'Years of Hands-on Learning'],
  ['SLIIT', 'Cyber Security Track'],
  ['24/7', 'Curiosity to Learn']
];

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ type: '', text: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('hashchange', closeMenu);
    return () => window.removeEventListener('hashchange', closeMenu);
  }, []);

  const navItems = useMemo(
    () => [
      ['About', '#about'],
      ['Expertise', '#expertise'],
      ['Projects', '#projects'],
      ['Journey', '#journey'],
      ['Contact', '#contact']
    ],
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResult({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send message');
      setResult({ type: 'ok', text: 'Message received successfully. Thank you for reaching out.' });
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
    } catch {
      setResult({
        type: 'err',
        text: 'The contact server is currently unavailable. Please use the email link below to contact me directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <div className="page-blur blur-one" />
      <div className="page-blur blur-two" />
      <header className="header">
        <div className="wrap nav-bar">
          <a href="#top" className="brand" aria-label="Go to top">
            <span className="brand-mark">R.</span>
            <span className="brand-text">Resandu <span>/ Portfolio</span></span>
          </a>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setDark((prev) => !prev)} aria-label="Toggle theme">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="small-cta" href="#contact">
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>
            <button className="menu-btn" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <Reveal className="hero-copy">
            <div className="mini-badge">
              <Sparkles size={14} /> Premium personal portfolio
            </div>
            <h1>
              Cyber Security student.
              <br />
              <span className="accent-text">Developer with a premium edge.</span>
            </h1>
            <p className="hero-lead">
              I&apos;m <strong>Resandu Dewujith</strong> — a Cyber Security undergraduate at SLIIT, aspiring SOC analyst,
              and full-stack developer focused on building polished, practical digital products.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View my projects <ArrowRight size={16} />
              </a>
              <a href={CV} className="btn btn-secondary" target="_blank" rel="noreferrer">
                View CV <Download size={16} />
              </a>
            </div>

            <div className="hero-details">
              <span><MapPin size={15} /> Sri Lanka</span>
              <span><BriefcaseBusiness size={15} /> Open for internships</span>
              <span><Mail size={15} /> {EMAIL}</span>
            </div>
          </Reveal>

          <Reveal className="hero-media" delay={0.12}>
            <div className="hero-card hero-card-main">
              <img src="/media/hero-campus-4x5.jpg" alt="Resandu standing outdoors near the SLIIT building at night" />
              <div className="media-overlay">
                <div>
                  <strong>Resandu Dewujith</strong>
                  <p>Cyber Security Undergraduate @ SLIIT</p>
                </div>
                <span>Premium • Professional • Modern</span>
              </div>
            </div>

            <div className="hero-card hero-card-side top-card">
              <img src="/media/portrait-bike-square.jpg" alt="Resandu smiling beside a motorbike" />
              <div className="small-float">Creative energy</div>
            </div>

            <div className="hero-card hero-card-side bottom-card">
              <img src="/media/portrait-field-square.jpg" alt="Resandu sitting outdoors wearing sunglasses" />
              <div className="small-float alt">Confident personality</div>
            </div>
          </Reveal>
        </section>

        <section className="stats wrap">
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="section wrap about-grid">
          <Reveal>
            <div className="section-tag">About me</div>
            <h2>A cleaner, sharper and more premium digital introduction.</h2>
            <p className="section-copy">
              This portfolio is designed to feel modern and polished while still representing my personality. I enjoy
              combining security-minded thinking, practical coding and good visual presentation.
            </p>
            <div className="highlight-list">
              {highlightList.map((item) => (
                <div className="highlight-row" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="about-visuals" delay={0.1}>
            <div className="about-photo large">
              <img src="/media/portrait-bike-4x5.jpg" alt="Resandu portrait in Argentina football jersey" />
            </div>
            <div className="about-stack">
              <div className="about-photo small">
                <img src="/media/portrait-field-4x5.jpg" alt="Resandu relaxed portrait outdoors" />
              </div>
              <div className="info-glass">
                <div className="info-line">
                  <UserRound size={16} />
                  <span>Resandu Dewujith</span>
                </div>
                <div className="info-line">
                  <GraduationCap size={16} />
                  <span>SLIIT · Cyber Security</span>
                </div>
                <div className="info-line">
                  <Network size={16} />
                  <span>TryHackMe learning path</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="reel" className="section wrap reel-layout">
          <Reveal className="reel-copy">
            <div className="section-tag">Profile reel</div>
            <h2>Visual storytelling that feels more alive.</h2>
            <p className="section-copy">
              I added your short video as a portfolio media piece so the website feels more dynamic and personal. It
              helps the portfolio look less static and more premium.
            </p>
            <div className="reel-points">
              <div><PlayCircle size={17} /> Short profile-style campus reel</div>
              <div><Shield size={17} /> Strong personal branding with a professional feel</div>
              <div><Layers3 size={17} /> Uses your own images instead of generic placeholders</div>
            </div>
          </Reveal>

          <Reveal className="video-card" delay={0.12}>
            <video
              className="portfolio-video"
              src="/media/portfolio-reel.mp4"
              poster="/media/video-poster.jpg"
              muted
              loop
              autoPlay
              playsInline
              controls
            />
          </Reveal>
        </section>

        <section id="expertise" className="section wrap">
          <Reveal className="section-heading-row">
            <div>
              <div className="section-tag">Expertise</div>
              <h2>What I bring to the table.</h2>
            </div>
            <p>
              A mix of cybersecurity interest, practical software development and problem-solving ability — presented
              in a clear and modern way.
            </p>
          </Reveal>

          <div className="expertise-grid">
            {expertise.map(({ title, icon: Icon, text }, index) => (
              <Reveal key={title} delay={0.05 * index}>
                <article className="expertise-card">
                  <div className="expertise-icon"><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section wrap">
          <Reveal className="section-heading-row">
            <div>
              <div className="section-tag">Selected projects</div>
              <h2>Practical builds from my learning journey.</h2>
            </div>
            <p>
              These projects highlight my experience with full-stack web development, databases and system thinking.
            </p>
          </Reveal>

          <div className="projects-grid">
            {projects.map(({ title, eyebrow, icon: Icon, description, stack, link, accent }, index) => (
              <Reveal key={title} delay={0.05 * index}>
                <article className={`project-card ${accent}`}>
                  <div className="project-top">
                    <div>
                      <span className="eyebrow-text">{eyebrow}</span>
                      <h3>{title}</h3>
                    </div>
                    <div className="project-icon"><Icon size={22} /></div>
                  </div>
                  <p>{description}</p>
                  <div className="project-stack">
                    {stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <a href={link} target="_blank" rel="noreferrer" className="project-link">
                    View repository <ExternalLink size={15} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="journey" className="section wrap journey-grid">
          <Reveal>
            <div className="section-tag">Journey</div>
            <h2>Education, growth and direction.</h2>
            <p className="section-copy">
              I&apos;m still early in my career, but I&apos;m serious about growth. My focus is on building real projects,
              improving technical depth and becoming ready for cybersecurity and software opportunities.
            </p>
            <div className="focus-box">
              <h3>Current focus areas</h3>
              <div className="focus-list">
                <span><TerminalSquare size={16} /> TryHackMe learning</span>
                <span><Server size={16} /> Backend & API development</span>
                <span><Database size={16} /> SQL & database workflows</span>
                <span><PhoneCall size={16} /> Internship readiness</span>
              </div>
            </div>
          </Reveal>

          <div className="timeline">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={0.08 * index}>
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-head">
                      <h3>{item.title}</h3>
                      <span>{item.year}</span>
                    </div>
                    <strong>{item.place}</strong>
                    <p>{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section wrap contact-shell">
          <Reveal className="contact-copy">
            <div className="section-tag">Contact</div>
            <h2>Let&apos;s build something meaningful.</h2>
            <p>
              If you&apos;d like to talk about an internship, a project, collaboration or a professional opportunity, feel
              free to send me a message.
            </p>

            <div className="contact-links">
              <a href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input className="hidden-field" name="website" value={form.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" required />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Write your message" required />
              </label>
              <button type="submit" className="btn btn-primary full" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'} <ArrowUpRight size={16} />
              </button>
              {result.text ? <p className={`form-response ${result.type}`}>{result.text}</p> : null}
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <div className="footer-brand">Resandu<span>.</span></div>
            <p>Cyber Security Undergraduate · Aspiring SOC Analyst · Full-Stack Developer</p>
          </div>
          <div className="footer-actions">
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
