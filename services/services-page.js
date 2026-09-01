(function initServicesCarousel() {
    const root = document.getElementById('services-work');
    const projects = window.SERVICES_PROJECTS;
    if (!root || !Array.isArray(projects) || !projects.length) return;

    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let touchStartX = null;

    const escapeHtml = (value) =>
        String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const pad = (n) => String(n).padStart(2, '0');

    const chromeMarkup = (label) => `
        <div class="services-case-browser-chrome" aria-hidden="true">
            <span></span><span></span><span></span>
            <div class="services-case-browser-url">${escapeHtml(label)}</div>
        </div>
    `;

    const mediaMarkup = (project) => {
        const preview = project.preview || {};
        const alt = escapeHtml(preview.alt || `${project.name} website preview`);
        const image = escapeHtml(preview.image || '');

        if (project.private || !project.liveUrl) {
            return `
                <div class="services-case-browser services-case-browser--screenshot services-case-browser--private">
                    ${chromeMarkup('internal · access restricted')}
                    <div class="services-case-screenshot-frame">
                        <img class="services-case-screenshot" src="${image}" alt="${alt}" loading="lazy" decoding="async" width="1024" height="576">
                        <div class="services-case-private-overlay" aria-hidden="true">
                            <span class="services-case-private-badge">PRIVATE INTERNAL PLATFORM</span>
                        </div>
                    </div>
                </div>
            `;
        }

        const host = project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        return `
            <a class="services-case-preview-link" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHtml(project.name)} live website (opens in a new tab)">
                <div class="services-case-browser services-case-browser--screenshot services-case-browser--live">
                    ${chromeMarkup(host)}
                    <div class="services-case-screenshot-frame">
                        <img class="services-case-screenshot" src="${image}" alt="${alt}" loading="lazy" decoding="async" width="1024" height="576">
                        <div class="services-case-live-overlay" aria-hidden="true"><span>View Live Website</span></div>
                    </div>
                </div>
            </a>
        `;
    };

    const cardMarkup = (project, index) => {
        const skills = (project.skills || []).slice(0, 4);
        const tech = project.technologies || [];
        const liveButton = project.liveUrl
            ? `<a class="cta-button cta-primary" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHtml(project.name)} live website (opens in a new tab)">Visit Live Website</a>`
            : `<span class="services-case-private-pill">Private Internal Platform</span>`;

        const techBlock = tech.length
            ? `<div class="services-carousel-tags">${tech.map((t) => `<span class="services-case-tag">${escapeHtml(t)}</span>`).join('')}</div>`
            : '';

        return `
            <article
                class="services-carousel-card"
                data-index="${index}"
                id="services-project-${escapeHtml(project.id)}"
                aria-roledescription="slide"
                aria-label="${escapeHtml(project.name)} (${index + 1} of ${projects.length})"
            >
                <div class="services-carousel-card-inner">
                    <div class="services-carousel-media">${mediaMarkup(project)}</div>
                    <div class="services-carousel-copy">
                        <p class="services-case-category">${escapeHtml(project.category)}</p>
                        <h3 class="services-carousel-name">${escapeHtml(project.name)}</h3>
                        <p class="services-case-overview">${escapeHtml(project.overview)}</p>
                        <div class="services-case-block">
                            <h4 class="services-case-label">What I Built</h4>
                            <p>${escapeHtml(project.whatIBuilt)}</p>
                        </div>
                        <div class="services-case-block">
                            <h4 class="services-case-label">Skills Demonstrated</h4>
                            <ul class="services-carousel-skills">
                                ${skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
                            </ul>
                        </div>
                        ${techBlock}
                        <div class="services-case-actions">${liveButton}</div>
                    </div>
                </div>
            </article>
        `;
    };

    root.innerHTML = `
        <div
            class="services-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected website projects"
            tabindex="0"
        >
            <button type="button" class="services-carousel-nav services-carousel-nav--prev" data-dir="-1" aria-label="Show previous project">
                <span aria-hidden="true">‹</span>
            </button>
            <button type="button" class="services-carousel-nav services-carousel-nav--next" data-dir="1" aria-label="Show next project">
                <span aria-hidden="true">›</span>
            </button>

            <div class="services-carousel-stage">
                ${projects.map(cardMarkup).join('')}
            </div>

            <div class="services-carousel-footer">
                <p class="services-carousel-counter" aria-live="polite" aria-atomic="true">
                    <span data-counter>${pad(1)} / ${pad(projects.length)}</span>
                </p>
                <div class="services-carousel-dots" role="tablist" aria-label="Project indicators">
                    ${projects
                        .map(
                            (project, index) => `
                        <button
                            type="button"
                            class="services-carousel-dot"
                            role="tab"
                            aria-label="Show ${escapeHtml(project.name)}"
                            aria-controls="services-project-${escapeHtml(project.id)}"
                            data-index="${index}"
                        ></button>
                    `
                        )
                        .join('')}
                </div>
            </div>
        </div>
    `;

    const carousel = root.querySelector('.services-carousel');
    const cards = Array.from(root.querySelectorAll('.services-carousel-card'));
    const dots = Array.from(root.querySelectorAll('.services-carousel-dot'));
    const counter = root.querySelector('[data-counter]');
    const navButtons = Array.from(root.querySelectorAll('.services-carousel-nav'));

    const relativeOffset = (index) => {
        const n = projects.length;
        let diff = index - activeIndex;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        return diff;
    };

    const sync = () => {
        cards.forEach((card, index) => {
            const offset = relativeOffset(index);
            const isActive = offset === 0;
            card.dataset.offset = String(offset);
            card.classList.toggle('is-active', isActive);
            card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            card.inert = !isActive;
        });

        dots.forEach((dot, index) => {
            const selected = index === activeIndex;
            dot.classList.toggle('is-active', selected);
            dot.setAttribute('aria-selected', selected ? 'true' : 'false');
            dot.tabIndex = selected ? 0 : -1;
        });

        if (counter) {
            counter.textContent = `${pad(activeIndex + 1)} / ${pad(projects.length)}`;
        }
    };

    const goTo = (index) => {
        const n = projects.length;
        activeIndex = ((index % n) + n) % n;
        sync();
    };

    const step = (dir) => goTo(activeIndex + dir);

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => step(Number(btn.dataset.dir)));
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
    });

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1);
        }
    });

    carousel.addEventListener(
        'touchstart',
        (event) => {
            if (!event.changedTouches.length) return;
            touchStartX = event.changedTouches[0].clientX;
        },
        { passive: true }
    );

    carousel.addEventListener(
        'touchend',
        (event) => {
            if (touchStartX === null || !event.changedTouches.length) return;
            const delta = event.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(delta) < 48) return;
            step(delta < 0 ? 1 : -1);
        },
        { passive: true }
    );

    if (preferReducedMotion) {
        carousel.classList.add('services-carousel--reduced-motion');
    }

    sync();
})();

(function initServicesValueCarousel() {
    const section = document.querySelector('.services-value-section');
    if (!section) return;

    const benefits = [
        { title: 'Credibility', copy: 'Look established and trustworthy before the first conversation.' },
        { title: 'Clear Positioning', copy: 'Show who you serve, what you solve, and why to choose you.' },
        { title: 'More Appointments', copy: 'Forms and CTAs that turn interest into booked consultations.' },
        { title: 'Better Advertising', copy: 'Give ads, emails, and posts a professional place to land.' },
        { title: 'Seminar Support', copy: 'Event pages for details, registration, and follow-up.' },
        { title: 'Centralized Information', copy: 'Bio, services, credentials, and contact in one place.' },
        { title: 'Lead Tracking', copy: 'See which visits and campaigns become real inquiries.' },
        { title: 'Local Visibility', copy: 'Help nearby prospects find you when they search.' },
        { title: 'Brand Control', copy: 'Own your online presentation—not just a directory listing.' },
        { title: 'Long-Term Asset', copy: 'A site that keeps supporting referrals and campaigns.' }
    ];

    const panel = section.querySelector('.services-value-panel');
    const titleEl = section.querySelector('[data-value-title]');
    const copyEl = section.querySelector('[data-value-copy]');
    const indexEl = section.querySelector('[data-value-index]');
    const progressEl = section.querySelector('[data-value-progress]');
    const markersRoot = section.querySelector('.services-value-markers');
    const prevBtn = section.querySelector('.services-value-nav--prev');
    const nextBtn = section.querySelector('.services-value-nav--next');
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!panel || !titleEl || !copyEl || !indexEl || !progressEl || !markersRoot || !prevBtn || !nextBtn) return;

    let active = 0;
    let swapTimer = null;
    let autoTimer = null;
    let isAnimating = false;
    let hasManualNav = false;
    const AUTO_MS_DEFAULT = 3000;
    const AUTO_MS_AFTER_MANUAL = 6000;
    const SLIDE_MS = 340;

    markersRoot.innerHTML = benefits
        .map(
            (benefit, index) =>
                `<button type="button" class="services-value-marker" data-index="${index}" aria-label="${benefit.title}">${String(index + 1).padStart(2, '0')}</button>`
        )
        .join('');

    const markers = Array.from(markersRoot.querySelectorAll('.services-value-marker'));

    const clearSlideClasses = () => {
        panel.classList.remove(
            'is-exiting-next',
            'is-exiting-prev',
            'is-entering-next',
            'is-entering-prev',
            'is-settling'
        );
    };

    const applyContent = (index) => {
        const benefit = benefits[index];
        titleEl.textContent = benefit.title;
        copyEl.textContent = benefit.copy;
        indexEl.textContent = String(index + 1).padStart(2, '0');
        progressEl.style.width = `${((index + 1) / benefits.length) * 100}%`;
        markers.forEach((marker, i) => {
            marker.classList.toggle('is-active', i === index);
            marker.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
    };

    const render = (index, animate, dir = 1) => {
        if (!animate || preferReducedMotion) {
            clearSlideClasses();
            applyContent(index);
            isAnimating = false;
            return;
        }

        isAnimating = true;
        clearTimeout(swapTimer);
        clearSlideClasses();
        panel.classList.add(dir >= 0 ? 'is-exiting-next' : 'is-exiting-prev');

        swapTimer = setTimeout(() => {
            applyContent(index);
            panel.classList.remove('is-exiting-next', 'is-exiting-prev');
            panel.classList.add(dir >= 0 ? 'is-entering-next' : 'is-entering-prev');

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    panel.classList.remove('is-entering-next', 'is-entering-prev');
                    panel.classList.add('is-settling');
                    swapTimer = setTimeout(() => {
                        panel.classList.remove('is-settling');
                        isAnimating = false;
                    }, SLIDE_MS);
                });
            });
        }, SLIDE_MS);
    };

    const goTo = (index, animate = true, dir = 1) => {
        const n = benefits.length;
        const next = ((index % n) + n) % n;
        if (next === active && animate) return;
        active = next;
        render(active, animate, dir);
    };

    const step = (dir) => {
        if (isAnimating) return;
        goTo(active + dir, true, dir);
    };

    const stopAuto = () => {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    };

    const startAuto = () => {
        stopAuto();
        if (preferReducedMotion) return;
        const delay = hasManualNav ? AUTO_MS_AFTER_MANUAL : AUTO_MS_DEFAULT;
        autoTimer = setInterval(() => step(1), delay);
    };

    const noteManualNav = () => {
        hasManualNav = true;
        startAuto();
    };

    prevBtn.addEventListener('click', () => {
        step(-1);
        noteManualNav();
    });

    nextBtn.addEventListener('click', () => {
        step(1);
        noteManualNav();
    });

    markers.forEach((marker) => {
        marker.addEventListener('click', () => {
            const index = Number(marker.dataset.index);
            const dir = index >= active ? 1 : -1;
            if (isAnimating) return;
            goTo(index, true, dir);
            startAuto();
        });
    });

    panel.addEventListener('mouseenter', stopAuto);
    panel.addEventListener('mouseleave', startAuto);
    panel.addEventListener('focusin', stopAuto);
    panel.addEventListener('focusout', (event) => {
        if (!panel.contains(event.relatedTarget)) startAuto();
    });

    section.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1);
            startAuto();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1);
            startAuto();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAuto();
        else startAuto();
    });

    goTo(0, false, 1);
    startAuto();
})();
