import { useEffect, useRef, useState } from "react";
import { DATA } from "./data.js";

function Reveal({ as: Tag = "div", className = "", children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal${on ? " in" : ""} ${className}`.trim()}>{children}</Tag>;
}

function Letters({ text, offset = 0 }) {
  return (
    <span className="row" aria-hidden="true">
      {text.split("").map((c, i) => (
        <span className="ch" key={i} style={{ "--i": i + offset }}>{c}</span>
      ))}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const items = [["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["projects", "Projects"], ["contact", "Contact"]];
  return (
    <header className="nav">
      <div className="wrap">
        <a href="#top" className="logo">Kanak Bari</a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        <nav aria-label="Primary">
          <ul className={open ? "open" : ""}>
            {items.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <h1 aria-label="Kanak Bari">
          <Letters text="Kanak" />
          <Letters text="Bari" offset={5} />
        </h1>
        <a className="btn primary resume-btn" href={DATA.resume} download>
          Download Resume
        </a>
        <p className="role">Full-stack developer, MERN</p>
        <p className="lead">I build usable web applications from idea to deployment, and enjoy finding a smarter way to build them.</p>
        <div className="cta">
          <a className="btn primary" href="#projects">See my projects</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="block" id={id}>
      <div className="wrap">
        <Reveal><h2>{title}</h2></Reveal>
        {children}
      </div>
    </section>
  );
}

function About() {
  const facts = [["Based in", "Mumbai, India"], ["Studying", "B.Sc. IT, University of Mumbai"], ["Graduating", "2027"]];
  return (
    <Section id="about" title="About">
      <Reveal className="about">
        <p>I like building things, figuring out how they work, and making them work better. I turn ideas into real, usable applications, solve problems along the way, and keep exploring new technologies. I’m currently studying IT and building full-stack projects with authentication, admin tools and reporting.</p>
        <ul className="facts">
          {facts.map(([k, v]) => <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
        </ul>
      </Reveal>
    </Section>
  );
}

function ProfileLinks() {
  return (
    <Section id="profile" title="Profile">
      <Reveal className="profile-box">
        <div className="profile-grid">
          {DATA.profileHighlights.map((item) => (
            <a className="profile-card" key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </div>
        <div className="repo-list">
          <h3>GitHub highlights</h3>
          <ul>
            {DATA.githubRepos.map((repo) => (
              <li key={repo.name}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Reveal className="skills">
        {DATA.skills.map(([group, list]) => (
          <div key={group}>
            <h3>{group}</h3>
            <div className="chips">{list.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <Reveal>
        <ol className="timeline">
          {DATA.jobs.map((j) => (
            <li key={j.t}>
              <h3>{j.t}</h3>
              <p className="meta">{j.o} · {j.d}</p>
              <ul className="pts">{j.p.map((x) => <li key={x}>{x}</li>)}</ul>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

function Project({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="card">
      <h3>{p.n}</h3>
      <p className="meta">{p.s.join(", ")}</p>
      <p style={{ margin: 0 }}>{p.d}</p>
      <div className={`more${open ? " open" : ""}`}>
        <div><ul className="pts">{p.p.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
      <div className="row2">
        <button className="link-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Hide details" : "Show details"}</button>
        <a className="btn primary" href={p.live} target="_blank" rel="noopener noreferrer">Live</a>
        <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <Reveal className="projects">
        {DATA.projects.map((p) => <Project key={p.n} p={p} />)}
      </Reveal>
    </Section>
  );
}

function Education() {
  const { education } = DATA;
  return (
    <Section id="education" title="Education">
      <Reveal className="edu">
        <div className="edu-header">
          <div>
            <h3>{education.program}</h3>
            <p className="meta">{education.college} · {education.period}</p>
          </div>
          <div className="edu-tag">Result: {education.overall.result}</div>
        </div>

        <div className="edu-summary">
          <div>
            <span>Overall CGPA</span>
            <strong>{education.overall.cgp}</strong>
          </div>
          <div>
            <span>Overall Grade</span>
            <strong>{education.overall.grade}</strong>
          </div>
          <div>
            <span>Overall %</span>
            <strong>{education.overall.percentage}</strong>
          </div>
          <div>
            <span>Credits</span>
            <strong>{education.overall.credits}</strong>
          </div>
        </div>

        <div className="semester-grid">
          {education.semesters.map((item) => (
            <article key={item.sem} className="semester-card">
              <h4>{item.sem}</h4>
              <div className="semester-metrics">
                <div><span>Credits</span><strong>{item.credits}</strong></div>
                <div><span>SGPA</span><strong>{item.sgpa}</strong></div>
                <div><span>Grade</span><strong>{item.grade}</strong></div>
                <div><span>%</span><strong>{item.percentage}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Let’s build something">
      <Reveal className="contact">
        <a className="email-link" href={`mailto:${DATA.email}`}>{DATA.email}</a>
        <div className="cta">
          <a className="btn primary" href="tel:+917249415485">{DATA.phone}</a>
          <a className="btn" href={DATA.links.linkedin}>LinkedIn</a>
          <a className="btn" href={DATA.links.github}>GitHub</a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero /><About /><ProfileLinks /><Skills /><Experience /><Projects /><Education /><Contact />
      </main>
      <footer><div className="wrap">Crafted By Kanak Bari © 2026</div></footer>
    </>
  );
}
