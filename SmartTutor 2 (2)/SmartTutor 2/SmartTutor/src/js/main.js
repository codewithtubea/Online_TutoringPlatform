// Initialize tutor directory when DOM is ready
console.log('Tutor directory script loaded');

(function() {
        'use strict';

        // Wait for DOM to be ready
        function domReady(fn) {
            if (document.readyState === 'loading') {
                console.log('Tutor directory: DOM is loading, waiting for DOMContentLoaded');
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                console.log('Tutor directory: DOM already loaded, executing immediately');
                fn();
            }
        }

        domReady(function() {
            console.log('Tutor directory: DOM ready, initializing...');
            // Try multiple times to ensure element is found
            let attempts = 0;
            const maxAttempts = 20;

            function tryInit() {
                attempts++;
                const root = document.querySelector("#search-root");
                if (root) {
                    console.log('Tutor directory: Found #search-root on attempt', attempts);
                    initTutorDirectory();
                } else if (attempts < maxAttempts) {
                    console.log('Tutor directory: Attempt', attempts, '- #search-root not found, retrying in 50ms...');
                    setTimeout(tryInit, 50);
                } else {
                    console.error('Tutor directory: Failed to find #search-root after', maxAttempts, 'attempts');
                    console.error('Tutor directory: Page HTML:', document.body.innerHTML.substring(0, 1000));
                }
            }

            tryInit();
        });

        function initTutorDirectory() {
            const state = {
                query: "",
                subject: "",
                price: "",
                rating: "",
                mode: "all",
            };

            const tutors = [{
                    id: 1,
                    name: "Jane Doe",
                    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
                    rating: 4.9,
                    price: 25,
                    photo: "public/images/student-headphones.svg",
                    bio: "STEM specialist with 8 years of experience preparing students for WAEC and IB exams.",
                    location: "Accra",
                    availability: [
                        { day: "Mon", time: "9:00 AM - 12:00 PM" },
                        { day: "Wed", time: "2:00 PM - 5:00 PM" },
                        { day: "Sat", time: "10:00 AM - 1:00 PM" }
                    ],
                    mode: ["online", "in-person"],
                },
                {
                    id: 2,
                    name: "Kwame Mensah",
                    subjects: ["English", "Essay Writing", "Literature", "History", "Social Studies"],
                    rating: 4.7,
                    price: 18,
                    photo: "public/images/tutor-portrait.svg",
                    bio: "Cambridge-trained English tutor focused on academic writing and IELTS prep.",
                    location: "Kumasi",
                    availability: [
                        { day: "Tue", time: "10:00 AM - 2:00 PM" },
                        { day: "Thu", time: "3:00 PM - 6:00 PM" },
                        { day: "Fri", time: "9:00 AM - 12:00 PM" }
                    ],
                    mode: ["online"],
                },
                {
                    id: 3,
                    name: "Aisha Bello",
                    subjects: ["Biology", "Chemistry", "Mathematics", "Physics", "Health Science"],
                    rating: 4.8,
                    price: 22,
                    photo: "public/images/tutor-writing.svg",
                    bio: "Biochemist offering practical lessons with virtual lab simulations.",
                    location: "Tamale",
                    availability: [
                        { day: "Wed", time: "8:00 AM - 11:00 AM" },
                        { day: "Thu", time: "1:00 PM - 4:00 PM" },
                        { day: "Sun", time: "2:00 PM - 5:00 PM" }
                    ],
                    mode: ["online", "hybrid"],
                },
                {
                    id: 4,
                    name: "Samuel Owusu",
                    subjects: ["Computer Science", "Coding", "Mathematics", "Physics", "Robotics"],
                    rating: 4.6,
                    price: 27,
                    photo: "public/images/elearning-lights.svg",
                    bio: "Software engineer teaching Python, JavaScript, and robotics for teens.",
                    location: "Cape Coast",
                    availability: [
                        { day: "Mon", time: "2:00 PM - 6:00 PM" },
                        { day: "Tue", time: "10:00 AM - 1:00 PM" },
                        { day: "Sat", time: "9:00 AM - 12:00 PM" }
                    ],
                    mode: ["online", "in-person"],
                },
                {
                    id: 5,
                    name: "Elizabeth Addy",
                    subjects: ["History", "Social Studies", "English", "Geography", "Civics"],
                    rating: 4.5,
                    price: 16,
                    photo: "public/images/student-tablet.svg",
                    bio: "Former lecturer helping students master essay-based subjects with confidence.",
                    location: "Accra",
                    availability: [
                        { day: "Fri", time: "1:00 PM - 4:00 PM" },
                        { day: "Sat", time: "10:00 AM - 2:00 PM" },
                        { day: "Sun", time: "11:00 AM - 3:00 PM" }
                    ],
                    mode: ["in-person", "hybrid"],
                },
                {
                    id: 6,
                    name: "Michael Kumi",
                    subjects: ["Mathematics", "Physics", "Engineering", "Computer Science", "Statistics"],
                    rating: 4.7,
                    price: 24,
                    photo: "public/images/tutor-portrait.svg",
                    bio: "Engineer and math tutor with 10 years of experience helping students excel in technical subjects.",
                    location: "Kumasi",
                    availability: [
                        { day: "Mon", time: "3:00 PM - 6:00 PM" },
                        { day: "Wed", time: "9:00 AM - 12:00 PM" },
                        { day: "Fri", time: "2:00 PM - 5:00 PM" }
                    ],
                    mode: ["online", "in-person"],
                },
                {
                    id: 7,
                    name: "Fatima Abdul",
                    subjects: ["Arabic", "Islamic Studies", "History", "English", "Social Studies"],
                    rating: 4.8,
                    price: 20,
                    photo: "public/images/tutor-writing.svg",
                    bio: "Multilingual tutor specializing in Arabic and Islamic studies with international certification.",
                    location: "Tamale",
                    availability: [
                        { day: "Tue", time: "8:00 AM - 12:00 PM" },
                        { day: "Thu", time: "2:00 PM - 5:00 PM" },
                        { day: "Sat", time: "9:00 AM - 1:00 PM" }
                    ],
                    mode: ["online", "hybrid"],
                },
                {
                    id: 8,
                    name: "David Osei",
                    subjects: ["French", "English", "Literature", "Essay Writing", "History"],
                    rating: 4.6,
                    price: 19,
                    photo: "public/images/elearning-lights.svg",
                    bio: "Bilingual language tutor with expertise in French and English communication skills.",
                    location: "Accra",
                    availability: [
                        { day: "Mon", time: "10:00 AM - 2:00 PM" },
                        { day: "Wed", time: "3:00 PM - 6:00 PM" },
                        { day: "Sun", time: "1:00 PM - 4:00 PM" }
                    ],
                    mode: ["online"],
                },
                {
                    id: 9,
                    name: "Grace Mensah",
                    subjects: ["Biology", "Chemistry", "Health Science", "Mathematics", "Physics"],
                    rating: 4.9,
                    price: 23,
                    photo: "public/images/student-headphones.svg",
                    bio: "Medical professional providing comprehensive science tutoring with real-world applications.",
                    location: "Kumasi",
                    availability: [
                        { day: "Tue", time: "1:00 PM - 5:00 PM" },
                        { day: "Thu", time: "9:00 AM - 12:00 PM" },
                        { day: "Sat", time: "2:00 PM - 6:00 PM" }
                    ],
                    mode: ["online", "in-person", "hybrid"],
                },
                {
                    id: 10,
                    name: "James Asante",
                    subjects: ["Economics", "Business Studies", "Mathematics", "Accounting", "Statistics"],
                    rating: 4.7,
                    price: 21,
                    photo: "public/images/tutor-portrait.svg",
                    bio: "Business consultant and economics tutor helping students understand real-world applications.",
                    location: "Accra",
                    availability: [
                        { day: "Mon", time: "1:00 PM - 4:00 PM" },
                        { day: "Wed", time: "10:00 AM - 1:00 PM" },
                        { day: "Fri", time: "3:00 PM - 6:00 PM" },
                        { day: "Sun", time: "10:00 AM - 2:00 PM" }
                    ],
                    mode: ["online", "in-person"],
                },
            ];

            const priceOptions = [
                { label: "All Rates", value: "" },
                { label: "Under $20/hr", value: "20" },
                { label: "$20 - $25/hr", value: "25" },
                { label: "$25+/hr", value: "26" },
            ];

            const ratingOptions = [
                { label: "Any Rating", value: "" },
                { label: "4.5+", value: "4.5" },
                { label: "4.8+", value: "4.8" },
            ];

            const modeChips = [
                { value: "all", label: "All Modes" },
                { value: "online", label: "Online" },
                { value: "in-person", label: "In-person" },
                { value: "hybrid", label: "Hybrid" },
            ];

            const subjects = Array.from(new Set(tutors.flatMap((tutor) => tutor.subjects))).sort();

            const root = document.querySelector("#search-root");
            if (!root) {
                console.error('Tutor directory: #search-root element not found in DOM');
                console.log('Tutor directory: Available sections:', document.querySelectorAll('section'));
                console.log('Tutor directory: All divs with id:', Array.from(document.querySelectorAll('div[id]')).map(d => d.id));
                return;
            }
            console.log('Tutor directory: Found #search-root, proceeding with initialization', root);

            root.innerHTML = `
    <div class="search-controls" role="search">
      <input id="search-query" name="search" placeholder="Search tutors, subjects, or keywords" aria-label="Search tutors" />
      <select id="subject-filter" aria-label="Filter by subject"></select>
      <select id="price-filter" aria-label="Filter by hourly rate"></select>
      <select id="rating-filter" aria-label="Filter by rating"></select>
      <button id="search-btn" class="btn btn-primary" type="button">Search</button>
    </div>
    <div class="filter-chips" role="group" aria-label="Session mode filters"></div>
    <div id="results" class="tutor-grid" aria-live="polite"></div>
    <p id="empty-state" class="muted" hidden>No tutors match your filters. Try adjusting your search.</p>
  `;

            const queryInput = root.querySelector("#search-query");
            const subjectSelect = root.querySelector("#subject-filter");
            const priceSelect = root.querySelector("#price-filter");
            const ratingSelect = root.querySelector("#rating-filter");
            const searchBtn = root.querySelector("#search-btn");
            const chipsContainer = root.querySelector(".filter-chips");
            const resultsEl = root.querySelector("#results");
            const emptyStateEl = root.querySelector("#empty-state");

            // generic image fallback for broken sources
            document.addEventListener('error', (e) => {
                const target = e.target;
                if (target && target.tagName === 'IMG' && target.dataset && target.dataset.fallback) {
                    if (target.src.endsWith(target.dataset.fallback)) return; // prevent loop
                    target.src = target.dataset.fallback;
                }
            }, true);

            const createOption = (value, label) => `<option value="${value}">${label}</option>`;

            subjectSelect.innerHTML = ["", ...subjects]
                .map((subject) => createOption(subject, subject || "All Subjects"))
                .join("");

            priceSelect.innerHTML = priceOptions.map((opt) => createOption(opt.value, opt.label)).join("");
            ratingSelect.innerHTML = ratingOptions.map((opt) => createOption(opt.value, opt.label)).join("");

            chipsContainer.innerHTML = modeChips
                .map(
                    (chip) => `
        <button class="filter-chip ${chip.value === state.mode ? "active" : ""}" data-value="${chip.value}" type="button">
          ${chip.label}
        </button>
      `
                )
                .join("");

            function renderResults(list) {
                console.log('Tutor directory: renderResults called with', list.length, 'tutors');
                if (!resultsEl) {
                    console.error('Tutor directory: resultsEl is null!');
                    return;
                }
                if (!list.length) {
                    resultsEl.innerHTML = "";
                    emptyStateEl.hidden = false;
                    console.log('Tutor directory: No tutors to display');
                    return;
                }
                emptyStateEl.hidden = true;
                console.log('Tutor directory: Rendering', list.length, 'tutor cards');
                resultsEl.innerHTML = list
                    .map(
                        (tutor) => `
        <article class="tutor-card" tabindex="0">
          <img src="${tutor.photo}" alt="${tutor.name}" class="tutor-photo" />
          <div class="tutor-body">
            <h3>${tutor.name}</h3>
            <p class="muted">${tutor.subjects.join(" • ")} · $${tutor.price}/hr · ★ ${tutor.rating.toFixed(1)}</p>
            <p>${tutor.bio}</p>
            <p class="muted">${tutor.location} • ${tutor.mode.map((m) => titleCase(m)).join(", ")}</p>
            <div class="tutor-availability">
              <strong>Available:</strong>
              <ul class="availability-list">
                ${tutor.availability.map(avail => `<li>${avail.day}: ${avail.time}</li>`).join('')}
              </ul>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary" data-action="book" data-id="${tutor.id}">Book</button>
              <button class="btn btn-outline-maroon" data-action="profile" data-id="${tutor.id}">View Profile</button>
            </div>
          </div>
        </article>
      `
                )
                .join("");
        }

        function titleCase(text) {
            return text.replace(/(^|\s)([a-z])/g, (_, space, letter) => space + letter.toUpperCase());
        }

        function applyFilters() {
            console.log('Tutor directory: applyFilters called');
            if (!resultsEl) {
                console.error('Tutor directory: resultsEl not found in applyFilters!');
                return;
            }
            const filtered = tutors.filter((tutor) => {
                const matchesQuery = state.query ? [tutor.name, tutor.bio, tutor.subjects.join(" "), tutor.location]
                    .join(" ")
                    .toLowerCase()
                    .includes(state.query) :
                    true;

                const matchesSubject = state.subject ? tutor.subjects.includes(state.subject) : true;

                const matchesPrice = state.price ?
                    state.price === "20" ?
                    tutor.price < 20 :
                    state.price === "25" ?
                    tutor.price >= 20 && tutor.price <= 25 :
                    tutor.price >= 26 :
                    true;

                const matchesRating = state.rating ? tutor.rating >= Number(state.rating) : true;

                const matchesMode = state.mode === "all" ? true : tutor.mode.includes(state.mode);

                return matchesQuery && matchesSubject && matchesPrice && matchesRating && matchesMode;
            });

            console.log('Tutor directory: Filtered to', filtered.length, 'tutors');
            renderResults(filtered);
        }

        function updateStateFromInputs() {
            state.query = queryInput.value.trim().toLowerCase();
            state.subject = subjectSelect.value;
            state.price = priceSelect.value;
            state.rating = ratingSelect.value;
            applyFilters();
        }

        queryInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                updateStateFromInputs();
            }
        });

        searchBtn.addEventListener("click", updateStateFromInputs);
        subjectSelect.addEventListener("change", updateStateFromInputs);
        priceSelect.addEventListener("change", updateStateFromInputs);
        ratingSelect.addEventListener("change", updateStateFromInputs);

        chipsContainer.addEventListener("click", (event) => {
            const chip = event.target.closest(".filter-chip");
            if (!chip) return;
            chipsContainer.querySelectorAll(".filter-chip").forEach((el) => el.classList.remove("active"));
            chip.classList.add("active");
            state.mode = chip.dataset.value;
            applyFilters();
        });

        resultsEl.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const tutorId = Number(button.dataset.id);
            const tutor = tutors.find((t) => t.id === tutorId);
            if (!tutor) return;

            if (button.dataset.action === "book") {
                openBookingModal(tutor);
            }

            if (button.dataset.action === "profile") {
                openProfileDrawer(tutor);
            }
        });

        function openBookingModal(tutor) {
            const portal = document.querySelector("#portal-root");
            portal.innerHTML = `
      <div class="modal open" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div class="modal-inner">
          <button class="modal-close" aria-label="Close booking modal">✕</button>
          <h3 id="booking-title">Book a session with ${tutor.name}</h3>
          <p class="muted">${tutor.subjects.join(" • ")} · $${tutor.price}/hr</p>
          <form class="booking-form">
            <label for="booking-datetime">Preferred date & time</label>
            <input type="datetime-local" id="booking-datetime" required />
            <label for="booking-notes">What would you like to focus on?</label>
            <textarea id="booking-notes" rows="4" placeholder="E.g., quadratic equations, essay structure..." required></textarea>
            <button type="button" class="btn btn-primary">Confirm Booking</button>
          </form>
        </div>
      </div>
    `;

            const modal = portal.querySelector(".modal");
            const closeBtn = portal.querySelector(".modal-close");
            const confirmBtn = portal.querySelector("button.btn-primary");

            const close = () => {
                portal.innerHTML = "";
                document.removeEventListener("keydown", onKeydown);
            };

            const onKeydown = (event) => {
                if (event.key === "Escape") {
                    close();
                }
            };

            closeBtn?.addEventListener("click", close);
            modal?.addEventListener("click", (event) => {
                if (event.target === modal) close();
            });
            document.addEventListener("keydown", onKeydown);

            confirmBtn?.addEventListener("click", () => {
                const datetime = portal.querySelector("#booking-datetime").value;
                const notes = portal.querySelector("#booking-notes").value.trim();

                if (!datetime || !notes) {
                    alert("Please add your preferred date/time and what you want to focus on.");
                    return;
                }

                alert(`Booking request sent to ${tutor.name}\nDate: ${new Date(datetime).toLocaleString()}\nNotes: ${notes}`);
                close();
            });
        }

        function openProfileDrawer(tutor) {
            const portal = document.querySelector("#portal-root");
            portal.innerHTML = `
      <div class="modal open" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <div class="modal-inner">
          <button class="modal-close" aria-label="Close profile modal">✕</button>
          <h3 id="profile-title">${tutor.name}</h3>
          <p class="muted">${tutor.subjects.join(" • ")} · $${tutor.price}/hr · ★ ${tutor.rating.toFixed(1)}</p>
          <p class="muted">${tutor.mode.map((m) => titleCase(m)).join(", ")} • Based in ${tutor.location}</p>
          <p>${tutor.bio}</p>
          <div class="tutor-availability">
            <strong>Available Times:</strong>
            <ul class="availability-list">
              ${tutor.availability.map(avail => `<li>${avail.day}: ${avail.time}</li>`).join('')}
            </ul>
          </div>
          <p><strong>Subjects:</strong> ${tutor.subjects.join(", ")}</p>
          <button class="btn btn-primary" data-action="book" data-id="${tutor.id}">Book this tutor</button>
        </div>
      </div>
    `;

            const modal = portal.querySelector(".modal");
            const closeBtn = portal.querySelector(".modal-close");

            const close = () => {
                portal.innerHTML = "";
                document.removeEventListener("keydown", onKeydown);
            };

            const onKeydown = (event) => {
                if (event.key === "Escape") close();
            };

            closeBtn?.addEventListener("click", close);
            modal?.addEventListener("click", (event) => {
                if (event.target === modal) close();
            });
            document.addEventListener("keydown", onKeydown);

            portal.querySelector("[data-action='book']")?.addEventListener("click", () => {
                close();
                openBookingModal(tutor);
            });
        }

        // Initial render: Show all tutors when page loads
        applyFilters();

        // Sticky header shadow
        const header = document.querySelector(".site-header");
        const toggleHeaderShadow = () => {
            if (!header) return;
            header.classList.toggle("scrolled", window.scrollY > 10);
        };
        toggleHeaderShadow();
        window.addEventListener("scroll", toggleHeaderShadow);

        // Mobile nav toggle
        const navToggle = document.querySelector(".nav-toggle");
        const navLinks = document.querySelector(".nav-links");
        if (navToggle && navLinks) {
            navToggle.addEventListener("click", () => {
                const expanded = navToggle.getAttribute("aria-expanded") === "true";
                navToggle.setAttribute("aria-expanded", String(!expanded));
                navLinks.classList.toggle("open");
            });

            navLinks.querySelectorAll("a").forEach((link) =>
                link.addEventListener("click", () => {
                    navLinks.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                })
            );
        }

        // Contact form submission (prototype)
        const contactForm = document.querySelector(".contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(contactForm);
                const name = formData.get("name");
                alert(`Thanks ${name}! Our team will reach out shortly.`);
                contactForm.reset();
            });
        }

        // Footer year
        const yearEl = document.querySelector("#year");
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
})();