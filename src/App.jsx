import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  UserRound,
  WandSparkles,
} from 'lucide-react';

const starter = {
  name: 'Your Name',
  title: 'Entry-Level Web Developer',
  email: 'you@example.com',
  phone: '',
  location: 'Hyderabad, India',
  summary:
    'Motivated early-career developer interested in building accessible, user-friendly web applications. Eager to learn, collaborate, and solve practical problems.',
  skills: 'HTML, CSS, JavaScript, React, Git, REST APIs',
  education: 'MCA — Your University (Year)',
  experience:
    'Project Developer | Personal Project\nBuilt a responsive web application using React and JavaScript.\nTested key user flows and fixed usability issues.',
  projects:
    'CareerLaunch — Resume Builder\nCreated a resume builder with live preview, skill-based career suggestions, and print-to-PDF support.',
};

const careerPaths = [
  {
    title: 'Frontend Developer',
    keywords: [
      'html',
      'css',
      'javascript',
      'react',
      'typescript',
      'ui',
      'web',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    description:
      'Build responsive interfaces and interactive web experiences.',
  },
  {
    title: 'Technical Support Engineer',
    keywords: [
      'support',
      'troubleshooting',
      'sql',
      'api',
      'postman',
      'linux',
      'customer',
      'network',
    ],
    skills: [
      'Troubleshooting',
      'SQL',
      'REST APIs',
      'Postman',
      'Networking basics',
    ],
    description:
      'Investigate user issues, reproduce defects, and help restore services.',
  },
  {
    title: 'QA / Software Tester',
    keywords: [
      'testing',
      'qa',
      'postman',
      'api',
      'bug',
      'sql',
      'automation',
      'test',
    ],
    skills: [
      'Test cases',
      'Bug reporting',
      'API testing',
      'SQL',
      'Automation basics',
    ],
    description:
      'Validate applications, document defects, and improve product quality.',
  },
  {
    title: 'Data Analyst',
    keywords: [
      'sql',
      'excel',
      'python',
      'power bi',
      'data',
      'analytics',
      'statistics',
    ],
    skills: [
      'SQL',
      'Excel',
      'Data visualization',
      'Python basics',
      'Statistics',
    ],
    description:
      'Turn structured data into reports and useful business insights.',
  },
  {
    title: 'Backend Developer',
    keywords: [
      'node',
      'express',
      'python',
      'java',
      'api',
      'sql',
      'mongodb',
      'backend',
    ],
    skills: [
      'Node.js or Python',
      'REST APIs',
      'SQL/NoSQL',
      'Authentication',
      'Git',
    ],
    description:
      'Design server-side logic, APIs, and data workflows.',
  },
];

function scorePath(path, words) {
  return path.keywords.reduce(
    (sum, word) => sum + (words.includes(word) ? 1 : 0),
    0
  );
}

export default function App() {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem('careerlaunch-profile');
      return saved ? { ...starter, ...JSON.parse(saved) } : starter;
    } catch {
      return starter;
    }
  });

  const [activeTab, setActiveTab] = useState('builder');
  const [notice, setNotice] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGoal, setAiGoal] = useState('professional summary');
  const [aiError, setAiError] = useState('');

  // Update a single resume field.
  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Save resume details on this device.
  useEffect(() => {
    try {
      localStorage.setItem('careerlaunch-profile', JSON.stringify(form));
    } catch {
      setNotice('Unable to save changes in this browser.');
    }
  }, [form]);

  // Generate keyword-based career recommendations.
  const words = useMemo(
    () =>
      `${form.title} ${form.skills} ${form.summary} ${form.experience} ${form.projects}`.toLowerCase(),
    [form]
  );

  const recommendations = useMemo(
    () =>
      careerPaths
        .map((path) => ({
          ...path,
          score: scorePath(path, words),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [words]
  );

  // Improve resume text using the Gemini API.
  const improveWithAI = async () => {
    const fieldMap = {
      'professional summary': 'summary',
      'experience description': 'experience',
      'project description': 'projects',
    };

    const field = fieldMap[aiGoal];

    if (!field) {
      setAiError('Please select a valid resume section.');
      return;
    }

    const text = form[field];

    if (!text || !text.trim()) {
      setAiError('Please enter some text before using AI.');
      return;
    }

    setAiLoading(true);
    setAiError('');
    setNotice('');

    try {
      const response = await fetch('/api/improve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          goal: aiGoal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'AI improvement failed. Please try again.'
        );
      }

      if (!data.improvedText || !data.improvedText.trim()) {
        throw new Error('The AI returned no improved text.');
      }

      update(field, data.improvedText);
      setNotice(
        'AI improvement complete. Review the updated text for accuracy.'
      );
    } catch (error) {
      setAiError(
        error.message ||
          'Could not connect to the AI service. Please try again.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  // Print or save the resume as PDF.
  const printResume = () => {
    setNotice(
      'In the print dialog, choose "Save as PDF" to export your resume.'
    );
    window.print();
  };

  // Restore the example profile.
  const reset = () => {
    if (
      window.confirm(
        'Reset all resume fields to the sample content? Your current details will be replaced.'
      )
    ) {
      setForm({ ...starter });
      setNotice('Sample profile restored.');
      setAiError('');
    }
  };

  // Download the resume as a text file.
  const downloadText = () => {
    const text = `${form.name}
${form.title}
${form.email}${form.phone ? ' | ' + form.phone : ''}
${form.location}

PROFESSIONAL SUMMARY
${form.summary}

SKILLS
${form.skills}

EDUCATION
${form.education}

EXPERIENCE
${form.experience}

PROJECTS
${form.projects}`;

    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/plain;charset=utf-8' })
    );

    const link = document.createElement('a');
    link.href = url;
    link.download = 'CareerLaunch-Resume.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setNotice('Resume text downloaded successfully.');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-icon">
            <Sparkles size={19} />
          </span>

          <span>
            Career<span className="brand-accent">Launch</span>
            <small>CAREER TOOLS FOR YOUR NEXT STEP</small>
          </span>
        </a>

        <div className="top-actions">
          <span className="saved">
            <CheckCircle2 size={15} />
            Auto-saves on this device
          </span>

          <button className="outline small" onClick={reset} type="button">
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      </header>

      <main id="top" className="main-wrap">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              SDG 8 · DECENT WORK &amp; ECONOMIC GROWTH
            </div>

            <h1>
              Your next opportunity
              <br />
              <span>starts with a stronger profile.</span>
            </h1>

            <p>
              Create a clear, professional resume, improve your writing with
              AI, and explore career paths based on your skills.
            </p>

            <div className="hero-pills">
              <span>
                <FileText size={15} />
                Resume builder
              </span>

              <span>
                <Target size={15} />
                Career matching
              </span>

              <span>
                <WandSparkles size={15} />
                AI assistance
              </span>

              <span>
                <Download size={15} />
                PDF-ready
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-card">
              <div className="art-card-head">
                <span />
                <span />
                <span />
              </div>

              <div className="art-avatar">
                <UserRound size={29} />
              </div>

              <div className="art-line wide" />
              <div className="art-line medium" />

              <div className="art-chip-row">
                <i />
                <i />
                <i />
              </div>

              <div className="art-line wide" />
              <div className="art-line short" />

              <div className="art-check">
                <CheckCircle2 size={17} />
                Profile ready to improve
              </div>
            </div>

            <div className="float-badge">
              <Sparkles size={16} />
              Career insights
            </div>
          </div>
        </section>

        <div className="tabbar">
          <button
            className={activeTab === 'builder' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('builder')}
            type="button"
          >
            <FileText size={17} />
            Resume Builder
          </button>

          <button
            className={activeTab === 'careers' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('careers')}
            type="button"
          >
            <BriefcaseBusiness size={17} />
            Career Guidance
          </button>
        </div>

        {notice && (
          <div className="notice" role="status">
            {notice}
            <button
              onClick={() => setNotice('')}
              aria-label="Dismiss notification"
              type="button"
            >
              ×
            </button>
          </div>
        )}

        {activeTab === 'builder' ? (
          <section className="workspace">
            <div className="editor-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-kicker">
                    STEP 1 · YOUR DETAILS
                  </span>
                  <h2>Build your resume</h2>
                  <p>Replace the sample text with your own information.</p>
                </div>

                <span className="step-count">01 / 02</span>
              </div>

              <div className="form-grid">
                <label className="field full">
                  <span>Full name</span>
                  <input
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                  />
                </label>

                <label className="field full">
                  <span>Target job title</span>
                  <input
                    value={form.title}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="e.g. Junior Frontend Developer"
                  />
                </label>

                <label className="field">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="field">
                  <span>Phone (optional)</span>
                  <input
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 ..."
                  />
                </label>

                <label className="field full">
                  <span>Location</span>
                  <input
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="City, Country"
                  />
                </label>

                <label className="field full">
                  <span>Professional summary</span>
                  <textarea
                    rows="3"
                    value={form.summary}
                    onChange={(e) => update('summary', e.target.value)}
                    placeholder="Write 2–3 sentences about your strengths and goals."
                  />
                  <small>
                    Tip: Focus on relevant skills, experience, and the role
                    you want.
                  </small>
                </label>

                {/* AI Resume Assistant */}
                <div className="field full ai-tools">
                  <span>AI Resume Assistant</span>

                  <p>
                    Improve your resume wording with Gemini AI while keeping
                    your original facts.
                  </p>

                  <select
                    value={aiGoal}
                    onChange={(e) => {
                      setAiGoal(e.target.value);
                      setAiError('');
                    }}
                    disabled={aiLoading}
                  >
                    <option value="professional summary">
                      Improve professional summary
                    </option>

                    <option value="experience description">
                      Improve experience description
                    </option>

                    <option value="project description">
                      Improve project description
                    </option>
                  </select>

                  <button
                    type="button"
                    className="primary"
                    onClick={improveWithAI}
                    disabled={aiLoading}
                  >
                    <WandSparkles size={16} />
                    {aiLoading ? 'Improving...' : 'Improve with AI'}
                  </button>

                  {aiLoading && (
                    <p role="status">
                      AI is working on your text. Please wait...
                    </p>
                  )}

                  {aiError && (
                    <p className="ai-error" role="alert">
                      {aiError}
                    </p>
                  )}

                  <small>
                    Review AI-generated text for accuracy before applying for
                    a job.
                  </small>
                </div>

                <label className="field full">
                  <span>
                    Skills <em>Separate with commas</em>
                  </span>
                  <textarea
                    rows="2"
                    value={form.skills}
                    onChange={(e) => update('skills', e.target.value)}
                    placeholder="JavaScript, React, SQL..."
                  />
                </label>

                <label className="field full">
                  <span>Education</span>
                  <textarea
                    rows="2"
                    value={form.education}
                    onChange={(e) => update('education', e.target.value)}
                    placeholder="Degree, institution, graduation year"
                  />
                </label>

                <label className="field full">
                  <span>
                    Experience <em>One role per section</em>
                  </span>
                  <textarea
                    rows="4"
                    value={form.experience}
                    onChange={(e) => update('experience', e.target.value)}
                    placeholder={'Role | Organization\nAction and impact...'}
                  />
                </label>

                <label className="field full">
                  <span>Projects</span>
                  <textarea
                    rows="3"
                    value={form.projects}
                    onChange={(e) => update('projects', e.target.value)}
                    placeholder="Project name, tools used, and outcome..."
                  />
                </label>
              </div>

              <div className="editor-footer">
                <span>
                  <CheckCircle2 size={15} />
                  Changes save automatically
                </span>

                <button
                  className="primary"
                  onClick={printResume}
                  type="button"
                >
                  <Download size={16} />
                  Print / Save as PDF
                </button>
              </div>
            </div>

            <div className="preview-panel">
              <div className="preview-top">
                <div>
                  <span className="section-kicker">LIVE PREVIEW</span>
                  <h2>Your resume</h2>
                </div>

                <button
                  className="icon-button"
                  title="Download plain text"
                  aria-label="Download resume as text"
                  onClick={downloadText}
                  type="button"
                >
                  <Download size={17} />
                </button>
              </div>

              <article className="resume-paper">
                <div className="resume-header">
                  <h2>{form.name || 'Your Name'}</h2>

                  <p className="resume-title">
                    {form.title || 'Target Role'}
                  </p>

                  <p className="resume-contact">
                    {[form.email, form.phone, form.location]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>

                <ResumeSection title="Professional Summary">
                  {form.summary}
                </ResumeSection>

                <ResumeSection title="Skills">
                  <div className="skill-tags">
                    {form.skills
                      .split(',')
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill, index) => (
                        <span key={`${skill}-${index}`}>{skill}</span>
                      ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Experience">
                  {form.experience}
                </ResumeSection>

                <ResumeSection title="Projects">
                  {form.projects}
                </ResumeSection>

                <ResumeSection title="Education">
                  {form.education}
                </ResumeSection>

                <div className="resume-foot">
                  Created with CareerLaunch · Review all details before
                  applying
                </div>
              </article>

              <p className="preview-note">
                <Lightbulb size={15} />
                Your preview updates as you type. Use Print / Save as PDF to
                export.
              </p>
            </div>
          </section>
        ) : (
          <section className="career-workspace">
            <div className="career-intro">
              <div>
                <span className="section-kicker">
                  STEP 2 · EXPLORE OPTIONS
                </span>

                <h2>Career paths to explore</h2>

                <p>
                  Suggestions are based on keywords in your target role,
                  skills, summary, experience, and projects.
                </p>
              </div>

              <div className="match-icon">
                <WandSparkles size={25} />
              </div>
            </div>

            <div className="disclaimer">
              <Lightbulb size={17} />
              This version uses keyword matching rather than AI career
              prediction. Treat the results as starting points, not
              guarantees of job eligibility.
            </div>

            <div className="career-cards">
              {recommendations.map((path, index) => (
                <article className="career-card" key={path.title}>
                  <div className="career-card-top">
                    <span className="career-number">
                      0{index + 1}
                    </span>

                    <span className="match-label">
                      {path.score
                        ? `${path.score} keyword matches`
                        : 'Explore this path'}
                    </span>
                  </div>

                  <h3>{path.title}</h3>
                  <p>{path.description}</p>

                  <div className="skill-gap-title">
                    <GraduationCap size={16} />
                    Skills to develop
                  </div>

                  <div className="gap-list">
                    {path.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <button
                    className="text-button"
                    type="button"
                    onClick={() => {
                      update('title', path.title);
                      setActiveTab('builder');
                      setNotice(
                        `Target role changed to ${path.title}. Tailor your resume to this role.`
                      );
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Use this target role
                    <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>

            <div className="next-step">
              <div className="next-icon">
                <Target size={21} />
              </div>

              <div>
                <h3>Make the next step practical</h3>
                <p>
                  Choose one target role, compare its requirements with your
                  current skills, and build a small project that demonstrates
                  the skills you want to develop.
                </p>
              </div>

              <button
                className="outline"
                onClick={() => setActiveTab('builder')}
                type="button"
              >
                Edit my resume
              </button>
            </div>
          </section>
        )}

        <section className="how-section">
          <div>
            <span className="section-kicker">HOW IT WORKS</span>
            <h2>Small steps. Clear direction.</h2>
          </div>

          <div className="how-grid">
            <div className="how-item">
              <span>01</span>
              <h3>Enter your details</h3>
              <p>
                Add your education, experience, skills, and projects.
              </p>
            </div>

            <div className="how-item">
              <span>02</span>
              <h3>Improve and review</h3>
              <p>
                Use AI to improve wording, then check the resume for accuracy
                and relevance.
              </p>
            </div>

            <div className="how-item">
              <span>03</span>
              <h3>Explore career paths</h3>
              <p>
                Review suggested roles and skill areas to develop next.
              </p>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-brand">
            <span className="brand-icon">
              <Sparkles size={16} />
            </span>
            CareerLaunch
          </div>

          <span>Student project prototype · SDG 8</span>

          <span>
            Built to support—not replace—your own career decisions.
          </span>
        </footer>
      </main>
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h3>{title}</h3>

      <div className="resume-content">
        {children || 'Add details in the form to complete this section.'}
      </div>
    </section>
  );
}