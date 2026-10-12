# CareerLaunch — Resume Builder & Career Guidance

A student web-development prototype aligned with SDG 8 (Decent Work and Economic Growth). It helps job seekers draft a resume, preview it live, export/print it, and explore career paths with transparent keyword matching.

## Features
- Responsive React interface
- Editable resume fields with live preview
- Auto-save to browser localStorage (on this device only)
- Print / Save as PDF and plain-text download
- Skill-based career-path suggestions and skill-gap prompts
- Reset-to-sample action

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally
1. Extract this ZIP.
2. Open the extracted `careerlaunch` folder in VS Code.
3. Open a terminal in that folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL Vite prints, usually `http://localhost:5173`.

## Production build
Run `npm run build`. The deployable site is created in `dist/`.

## Deploy with Vercel
1. Push the project folder to a new GitHub repository.
2. Sign in to Vercel and import that repository.
3. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
4. Deploy and open the generated public URL to test it.

## Limitations / honest project scope
- Career recommendations use keyword matching; this version does not call an AI API or predict employment outcomes.
- Resume data is stored only in the current browser's localStorage. It is not uploaded to a server.
- Verify all generated resume content and personal details before sharing it with employers.

## Manual test checklist
1. Page loads on desktop and mobile widths.
2. Editing each form field updates the resume preview.
3. Skills separated by commas appear as individual tags.
4. Refreshing the page preserves fields on the same browser/device.
5. Print / Save as PDF opens the browser print dialog and the print view contains only the resume.
6. Plain-text download creates `CareerLaunch-Resume.txt`.
7. Career Guidance shows three recommendations and relevant skill lists.
8. “Use this target role” updates the title field and returns to the builder.
9. Reset restores the sample profile after confirmation.
10. Empty optional fields do not crash the page.
