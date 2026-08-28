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
