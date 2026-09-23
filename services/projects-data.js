/**
 * Featured website projects shown on /services
 * Update liveUrl / image paths here when new assets are available.
 */
window.SERVICES_PROJECTS = [
    {
        id: 'haluska-hoops',
        name: 'Haluska Hoops',
        category: 'Basketball Training Business Website',
        liveUrl: 'https://haluska-hoops.vercel.app/',
        overview:
            'A responsive business website that presents Haluska Hoops’ training programs, pricing, service areas, and brand in one professional online experience.',
        whatIBuilt:
            'I organized the business’s services into a clear, mobile-friendly website designed to help athletes and parents understand the offering and book training.',
        skills: [
            'Responsive web design',
            'Service and pricing presentation',
            'Brand-focused visual design',
            'Conversion-oriented calls to action'
        ],
        technologies: [],
        preview: {
            image: '../assets/services/haluska-hoops-home.jpg',
            imageWebp: '../assets/services/haluska-hoops-home-960.webp',
            imageWebpFull: '../assets/services/haluska-hoops-home.webp',
            alt: 'Haluska Hoops homepage showing the basketball training hero and Book Assessment call to action'
        },
        private: false
    },
    {
        id: 'colin-haluska-investments',
        name: 'Colin Haluska Investments',
        category: 'Full-Stack Financial Technology Application',
        liveUrl: 'https://colinhaluskainvestments.com/',
        overview:
            'A full-stack paper-trading platform with buy/sell orders, portfolio holdings, real-time P&L, a transaction ledger, market-data APIs, and cash-validation logic that mirrors core brokerage workflows.',
        whatIBuilt:
            'I built the platform end-to-end as Founder & Developer (March 2026 – Present), connecting a responsive financial dashboard with market-data APIs, transaction-based portfolio accounting, and real-time P&L.',
        skills: [
            'Full-stack development',
            'API and market-data integration',
            'Authentication and data security',
            'Financial database and transaction modeling'
        ],
        technologies: [
            'Next.js',
            'FastAPI',
            'Python',
            'SQLAlchemy',
            'JWT',
            'Financial APIs'
        ],
        preview: {
            image: '../assets/services/colin-haluska-investments-home.jpg',
            imageWebp: '../assets/services/colin-haluska-investments-home-960.webp',
            imageWebpFull: '../assets/services/colin-haluska-investments-home.webp',
            alt: 'Colin Haluska Investments homepage with paper trading terminal card and Access Terminal call to action'
        },
        private: false
    },
    {
        id: 'sfg-resource-hub',
        name: 'SFG Resource Hub',
        category: 'Internal Financial Services Platform',
        liveUrl: null,
        overview:
            'A protected internal platform that centralizes frequently used carrier, licensing, and operational resources for authorized team members.',
        whatIBuilt:
            'I consolidated 22-carrier reference material, licensing protocols, and carrier wire-transfer instructions into a searchable internal reference registry with structured navigation and protected access.',
        skills: [
            'Internal tool development',
            'Information architecture',
            'Interactive resource design',
            'Access-conscious deployment'
        ],
        technologies: [],
        preview: {
            image: '../assets/services/sfg-resource-hub-login.jpg',
            imageWebp: '../assets/services/sfg-resource-hub-login-960.webp',
            imageWebpFull: '../assets/services/sfg-resource-hub-login.webp',
            alt: 'SFG Resource Hub private login interface labeled Internal Use Only'
        },
        private: true
    }
];
