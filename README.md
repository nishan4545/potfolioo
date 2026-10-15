# Vignesh Kumar S — Interactive Portfolio

A responsive React portfolio with dark and light themes, a monochrome portrait, live recreations of three Java internship projects, a recruiter overview, resume download and contact links.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Vite emits the production website into `dist/`.

## Interactive features

- Arithmetic calculator with validation and division-by-zero handling.
- Fahrenheit-to-Celsius converter with reference temperatures.
- Browser-local password generator using `crypto.getRandomValues` and rejection sampling.
- Searchable quick navigation (`Ctrl/Cmd + K`).
- Recruiter snapshot and one-page PDF resume download.
- Interactive resume guide with local, resume-based responses. **This guide does not call a live AI model.** Messages are not stored.
- Keyboard-accessible dialogs, reduced-motion support, mobile navigation and a persistent theme preference.
- Suggested follow-up questions and direct email, phone and LinkedIn contact links in the portfolio guide.

The original projects were written in Java during the TechnoHacks EduTech internship in April 2024. These demos are React recreations, not the original Java source code. Portfolio facts come from the supplied resumes; no unverified employment, projects or technology experience has been added.

## Content

Update `src/main.jsx` to edit profile content, contact details, project descriptions and resume-guide answers. Replace `public/assets/Vignesh-Kumar-Resume.pdf` to update the download. The portrait is displayed using a CSS crop of the supplied resume image, without altering the person's appearance beyond monochrome styling.

Google Fonts supplies Inter; system sans-serif fonts are used as a fallback.

Technology logo assets are from [Devicon](https://github.com/devicons/devicon), with the accompanying license in `public/assets/devicon-LICENSE.txt`. Java and Python marks identify the listed technologies.
