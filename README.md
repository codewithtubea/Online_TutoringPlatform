# SmartRegister — Attendance System (Static Site)

A simple static website for an attendance and class management concept called "SmartRegister".

## Pages

- `mainpage.html` — Landing page with navigation and features
- `Loginpage.html` — Login form (navigates to the attendance placeholder)
- `register.html` — Sign-up form (target of the “Sign Up for Free” button)
- `attendancepage.html` — Placeholder page

## How to run locally

Because this is a static site, you can open the files directly in your browser:

1. Open the folder in VS Code or File Explorer
2. Double-click `mainpage.html` to open it in your default browser

Optional: If you prefer a local server, you can use the VS Code Live Server extension or any static file server.

## Notes

- Navigation uses relative links between these HTML files.
- No backend/auth is implemented yet — buttons/links navigate between static pages.

## Repository

This code is pushed to: `https://github.com/claudetomoh/ashesi-webtech-2025-peercoding-tomoh.ikfingeh`

## Live site

After the GitHub Actions workflow runs, your site will be available at:

- https://claudetomoh.github.io/ashesi-webtech-2025-peercoding-tomoh.ikfingeh/
- Direct link to the landing page: https://claudetomoh.github.io/ashesi-webtech-2025-peercoding-tomoh.ikfingeh/mainpage.html

Notes:
- We added a GitHub Pages workflow that deploys on pushes to `main`.
- A tiny `index.html` redirects to `mainpage.html` so the root URL works.
