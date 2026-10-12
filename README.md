# CareerLaunch 🚀
### AI-Assisted Resume Builder & Career Guidance Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://careerlaunch-ten.vercel.app/)
[![React](https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![SDG 8](https://img.shields.io/badge/UN%20SDG-8%20Decent%20Work-E5243B)](https://sdgs.un.org/goals/goal8)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-success?logo=vercel)](https://vercel.com/)

**CareerLaunch** is a student-developed web application that helps job seekers create and refine resumes, preview their content in real time, export resume documents, and explore career paths based on their skills.

The project aligns with **United Nations Sustainable Development Goal 8: Decent Work and Economic Growth** by exploring how accessible digital tools can support career preparation.

🌐 **Live application:** https://careerlaunch-ten.vercel.app/

## ✨ Features

- **Resume Builder:** Enter and edit personal details, professional summaries, education, experience, projects, and skills.
- **Live Resume Preview:** View resume changes as you edit the form.
- **AI-Assisted Content Improvement:** Improve professional summaries, work experience descriptions, and project descriptions.
- **PDF Export:** Print or save the resume as a PDF through the browser.
- **Plain-Text Export:** Download resume content as a text file.
- **Career Guidance:** Explore career suggestions and relevant skills using transparent keyword matching.
- **Skill-Gap Prompts:** Identify skills that may be relevant to a target career path.
- **Automatic Local Saving:** Retain resume details in browser local storage on the current device.
- **Responsive Interface:** Use the application on desktop and mobile-sized screens.
- **Reset to Sample:** Restore example profile data for testing and demonstration.

## 🎯 Problem Statement

Students and early-career job seekers may find it difficult to prepare structured resumes, communicate their experience effectively, and identify skills relevant to potential career paths.

CareerLaunch brings essential resume preparation and introductory career exploration tools together in one accessible web application.

## 💡 Proposed Solution

CareerLaunch combines an editable resume form, live document preview, AI-assisted writing improvements, and explainable keyword-based career suggestions.

The goal is to make resume preparation more accessible while keeping users in control of their information and final resume content.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and production build |
| JavaScript | Application logic and interactions |
| CSS | Responsive styling and layout |
| Browser localStorage | On-device resume persistence |
| Vercel | Production hosting |
| AI API integration | Assisted improvement of selected resume text |

Career recommendations in the current prototype use keyword matching; they are not predictions of hiring success or employment outcomes.

## 🏗️ Application Workflow

1. Open CareerLaunch.
2. Enter or update resume information.
3. Review changes in the live preview.
4. Optionally improve selected text using the AI-assisted writing feature.
5. Explore career suggestions and relevant skills.
6. Export the resume as a PDF or plain-text file.
7. Review all information before sharing the resume.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm
- Git (for cloning the repository)

### Installation

Clone the repository:

```bash
git clone https://github.com/LingalaRajeshwar/careerlaunch-app.git
cd careerlaunch-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are placed in the `dist/` directory.

## 🔐 Environment Configuration

The AI-assisted writing functionality requires the API configuration used by the application.

- Store API credentials in environment variables.
- Configure production secrets through the hosting platform's environment-variable settings.
- Never commit API keys, `.env` files, or other secrets to GitHub.
- Keep private credentials on the server side rather than exposing them in client-side code.
- If an API key is required locally, follow the environment-variable names expected by the project's API implementation.

## 🧪 Testing

The following core workflows have been manually tested in the deployed application:

- [x] Homepage loads successfully.
- [x] Resume fields can be edited.
- [x] Live preview updates with form changes.
- [x] PDF export works.
- [x] AI-assisted professional summary improvement works.
- [x] AI-assisted experience and project description improvement works.

Additional recommended checks include mobile responsiveness, local-storage persistence after refresh, career recommendation accuracy, empty optional fields, and reset confirmation.

## 🔒 Privacy and Limitations

- Resume details are stored in browser local storage on the current device.
- Local browser storage is not a substitute for encrypted cloud storage or a secure backup.
- AI-assisted text should be reviewed for accuracy before use.
- Career suggestions use keyword matching and do not guarantee employment, interview selection, or job placement.
- AI API requests may transmit the selected text to the configured AI service. Avoid submitting sensitive personal information unnecessarily and review the service's applicable privacy terms.

## 🌱 Social Impact

CareerLaunch is aligned with **UN Sustainable Development Goal 8: Decent Work and Economic Growth**.

The prototype explores how accessible digital tools can help people prepare job application materials and understand skills associated with different career paths.

## 🗺️ Future Enhancements

- Resume templates and customizable formatting.
- Downloadable resume layouts with improved accessibility.
- More detailed and explainable skill-gap analysis.
- Automated tests and continuous integration.
- Improved accessibility and multilingual support.
- Optional resume versions tailored to specific job descriptions.
- Stronger privacy controls and clearer data-management options.

## 👨‍💻 Project Information

**Project:** CareerLaunch — Resume Builder & Career Guidance  
**Project type:** Student web-development prototype  
**Deployment:** Vercel  
**Repository:** https://github.com/LingalaRajeshwar/careerlaunch-app  
**Live demo:** https://careerlaunch-ten.vercel.app/

---

*CareerLaunch is an educational prototype. Users should verify all resume content and personal information before submitting applications.*
