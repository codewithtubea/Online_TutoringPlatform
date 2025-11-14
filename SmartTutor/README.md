# SmartTutor Connect

SmartTutor Connect is an online tutoring platform concept that showcases a polished marketing landing page, an interactive tutor directory prototype, a React single-page application, and lightweight PHP endpoints for future integration.

## Project Highlights

- **Marketing landing page** (`index.html`) built with accessible semantic HTML, responsive layouts, and custom styling.
- **Interactive tutor search** (`src/js/main.js`) offering in-memory filtering, booking modal, and profile preview.
- **React SPA prototype** (`src/react`) powered by Vite with modular components for hero, directory, dashboards, and modals.
- **PHP API endpoints** (`api/*.php`) for secure registration/login flows, tutor listings, and persistent booking requests backed by MySQL.
- **Shared design system** using the Playfair Display & Inter type pairing with the project palette (maroon, gold, cream, white).

## File Structure

```
project-root
├── api/
│   ├── auth.php
│   ├── bookings.php
│   └── tutors.php
├── public/
│   └── images/
│       ├── about-bg.svg
│       ├── dashboard-preview.svg
│       ├── elearning-lights.svg
│       ├── gallery-learners.svg
│       ├── gallery-smarttutor.svg
│       ├── hero-bg.svg
│       ├── home-hero.png        ← place your homepage background image here (PNG)
│       ├── logo.svg
│       ├── student-headphones.svg
│       ├── student-tablet.svg
│       ├── tutor-portrait.svg
│       ├── tutor-placeholder.svg
│       ├── tutor-writing.svg
│       ├── team-ama.svg
│       ├── team-diego.svg
│       ├── team-kwame.svg
│       ├── team-lina.svg
│       └── team-nadia.svg
├── scripts/
│   ├── build.js                 ← Build script to assemble templates
│   └── watch.js                 ← Watch mode for auto-rebuilding
├── src/
│   ├── css/main.css
│   ├── js/main.js
│   └── react/
│       ├── App.jsx
│       ├── components/
│       │   ├── BookingModal.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Filters.jsx
│       │   ├── Hero.jsx
│       │   ├── SearchBar.jsx
│       │   ├── TutorCard.jsx
│       │   ├── TutorDirectory.jsx
│       │   └── TutorProfile.jsx
│       ├── data/tutors.js
│       ├── index.html
│       └── main.jsx
├── templates/
│   ├── partials/                ← Reusable page components
│   │   ├── head.html
│   │   ├── header.html
│   │   └── footer.html
│   └── sections/                ← Main content sections
│       ├── hero.html
│       ├── about.html
│       ├── team.html
│       ├── gallery.html
│       ├── find-tutor.html
│       ├── become-tutor.html
│       ├── testimonials.html
│       └── contact.html
├── index.html                    ← Auto-generated (do not edit directly)
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Modular HTML Structure

The `index.html` file is **auto-generated** from modular templates. To edit the page:

1. **Edit sections**: Modify files in `templates/sections/` (e.g., `hero.html`, `about.html`)
2. **Edit partials**: Modify files in `templates/partials/` for shared components (header, footer)
3. **Rebuild**: Run `npm run build:html` to regenerate `index.html`
4. **Watch mode**: Run `npm run watch:html` to automatically rebuild on file changes

**Note**: Do not edit `index.html` directly—it will be overwritten on rebuild.

### Static prototype

1. Open `index.html` in any modern browser (after running `npm run build:html`)
2. The landing hero, tutor directory, booking modal, and contact form work with in-memory data.

### React SPA (Vite)

```bash
npm install
npm run dev
```

The app uses `src/react/index.html` as the Vite entry. Styling is shared via `../css/main.css`. Update mock tutor data in `src/react/data/tutors.js`.

### PHP API

The backend now persists bookings and issues signed JWTs for authenticated sessions.

1. Ensure PHP 8.1+ and MySQL 8+ are installed locally.
2. Copy `api/config/database.php` and `api/config/app.php` to environment-specific variants or set the required environment variables (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `JWT_SECRET`).
3. Initialize the database schema and seed data:

   ```bash
   php api/scripts/init_db.php
   ```

4. Start the PHP development server from the project root:

   ```bash
   php -S localhost:8000 -t .
   ```

5. Available endpoints:
   - `POST /api/auth.php?action=register` – create a new student or tutor (validates password strength, enforces unique email, returns JWT + user snapshot)
   - `POST /api/auth.php?action=login` – authenticate an existing user with hashed password verification and login attempt tracking
   - `GET /api/auth.php` – validate the current session token and retrieve the active user
   - `POST /api/bookings.php` – persist a booking request to `booking_requests` (validates tutor, datetime, and contact info)
   - `GET /api/tutors.php` – fetch tutor directory data (mock data until the tutors table is populated)

Authentication responses include a signed JWT (`token`) plus a sanitized user payload. The front-end stores the token in session storage for the current browser tab. Update the React SPA and PHP endpoints further to enforce role-based access and to integrate real tutor directories.

## Design & Accessibility Notes

- Hero typography uses Playfair Display for emphasis and Inter for UI text.
- Buttons, cards, and modals include hover states, focus-visible styles, and high contrast.
- The landing page offers skip-to-content links, aria labels, and polite announcements for search results.
- Gallery and testimonial artwork (`student-tablet.svg`, `student-headphones.svg`, `tutor-writing.svg`, `tutor-portrait.svg`, `elearning-lights.svg`) mirror the supplied photography. Replace these SVG illustrations with full-resolution photos using the same filenames to update the visuals instantly.
- The About section supports a background image via `about-bg.svg`; swap in the uploaded backdrop to update the hero instantly. Team portraits (`team-*.svg`) and gallery hero art (`gallery-learners.svg`, `gallery-smarttutor.svg`) can be replaced with high-resolution photos using identical filenames.
- Homepage background: save the provided image as `public/images/home-hero.png`. The site automatically falls back to `hero-bg.svg` if the PNG is missing.

## Next Steps

- Populate tutor and subject tables so the React SPA and PHP endpoints return live data.
- Wire up Stripe (or Paystack) for secure payments and schedule confirmation.
- Extend student/tutor dashboards with live analytics, messaging, and availability management.
- Add automated testing (Jest + React Testing Library for SPA, PHPUnit or Pest for PHP APIs).

## License

This prototype is provided as-is for educational and demonstration purposes.

