// Bio × AI Hackathon Landing Page — HTML Template Generator
// Takes a config object and returns a complete, self-contained HTML string.

export function generateHTML(config) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(config.cityName)} Bio × AI Hackathon${config.eventDate ? ' — ' + escapeHtml(config.eventDate) : ''}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(config.cityName)} Bio × AI Hackathon">
    <meta property="og:description" content="${escapeHtml(config.tagline || '')}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(config.cityName)} Bio × AI Hackathon">
    <meta name="twitter:description" content="${escapeHtml(config.tagline || '')}">
    <meta name="description" content="${escapeHtml(config.cityName)} Bio × AI Hackathon${config.tagline ? ' — ' + escapeHtml(config.tagline) : ''}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧬</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --white: #ffffff;
            --white-70: rgba(255, 255, 255, 0.7);
            --white-50: rgba(255, 255, 255, 0.5);
            --glass-bg: rgba(25, 20, 85, 0.4);
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        html, body { height: 100%; }

        body {
            font-family: 'Roboto Mono', monospace;
            background: ${config.backgroundUrl ? `url('${escapeHtml(config.backgroundUrl)}')` : 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #2d1b69 100%)'} no-repeat center center fixed;
            background-size: cover;
            color: var(--white);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4rem 2rem;
        }

        .container {
            max-width: 1000px;
            width: 100%;
            text-align: center;
            margin: auto 0;
        }

        /* Bio × AI Branding — top */
        .bioxai-top-brand {
            margin-bottom: 2.5rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.1s forwards;
        }

        .bioxai-top-brand img {
            height: 50px;
            width: auto;
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
        }

        .bioxai-top-brand span {
            display: block;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.65rem;
            color: var(--white-50);
            margin-top: 0.5rem;
            letter-spacing: 0.05em;
        }

        /* Organizer Logos */
        .logos {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4rem;
            margin-bottom: 3.5rem;
            flex-wrap: wrap;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.2s forwards;
        }

        .logo {
            height: 70px;
            width: auto;
            filter: brightness(0) invert(1);
            opacity: 0.95;
        }

        h1 {
            font-family: 'Oswald', sans-serif;
            font-weight: 600;
            font-size: clamp(3rem, 10vw, 5.5rem);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            margin-bottom: 2rem;
            color: var(--white);
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.4s forwards;
        }

        .info {
            font-family: 'Roboto Mono', monospace;
            font-weight: 400;
            font-size: 1rem;
            color: var(--white);
            margin-bottom: 2.5rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.6s forwards;
        }

        .divider {
            width: 60px;
            height: 1px;
            background: var(--white-50);
            margin: 0 auto 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.65s forwards;
        }

        /* Apply Button */
        .apply-btn {
            display: inline-block;
            font-family: 'Oswald', sans-serif;
            font-weight: 600;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--white);
            background: rgba(255, 255, 255, 0.12);
            border: 2px solid var(--white);
            border-radius: 8px;
            padding: 0.85rem 2.5rem;
            text-decoration: none;
            transition: background 0.3s ease, transform 0.15s ease;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.7s forwards;
            margin-bottom: 1rem;
        }

        .apply-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }

        .apply-btn:active { transform: translateY(0); }

        /* Email Signup */
        .signup-text {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.9rem;
            color: var(--white);
            margin-bottom: 0.2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.7s forwards;
        }

        .tally-embed {
            max-width: 450px;
            margin: 0 auto;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.8s forwards;
        }

        /* What to Expect Section */
        .expect-section {
            margin-top: 3rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.85s forwards;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 2rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 3rem;
        }

        .section-label {
            font-family: 'Oswald', sans-serif;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--white);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1.5rem;
        }

        .expect-list {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.85rem;
            color: var(--white);
            line-height: 1.8;
            max-width: 600px;
            margin: 0 auto;
            text-align: left;
        }

        .expect-list p { margin-bottom: 0.75rem; }
        .expect-list a { color: var(--white); text-decoration: underline; transition: opacity 0.3s ease; }
        .expect-list a:hover { opacity: 0.7; }

        /* Challenge Tracks */
        .challenges-section {
            margin-top: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.9s forwards;
            margin-bottom: 3rem;
        }

        .challenges-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            max-width: 900px;
            margin: 1.5rem auto 0;
        }

        .challenge-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
        }

        .challenge-title {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--white);
            margin-bottom: 1.25rem;
        }

        .challenge-partner-label {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.65rem;
            color: var(--white-50);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 0.75rem;
        }

        .challenge-partner-logo {
            height: 28px;
            width: auto;
            filter: brightness(0) invert(1);
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }

        .challenge-partner-logo:hover { opacity: 1; }

        .challenge-tba {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.8rem;
            color: var(--white-50);
        }

        /* Prizes Section */
        .prizes-section {
            margin-top: 2rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.92s forwards;
        }

        .prizes-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 2rem 2.5rem;
            max-width: 700px;
            margin: 1.5rem auto 0;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }

        .prize-item {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }

        .prize-item a {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            width: 110px;
        }

        .prize-logo {
            max-height: 28px;
            max-width: 110px;
            width: auto;
            height: auto;
            filter: brightness(0) invert(1);
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }

        .prize-logo:hover { opacity: 1; }

        .prize-description {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.8rem;
            color: var(--white);
            line-height: 1.6;
            text-align: left;
        }

        /* Partners Section */
        .partners-section {
            margin-top: 2rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 0.95s forwards;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .partner-group { margin-bottom: 2rem; }
        .partner-group:last-child { margin-bottom: 0; }

        .partner-type-label {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.7rem;
            color: var(--white-50);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
        }

        .support-logos {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
        }

        .support-logo {
            height: 35px;
            width: auto;
            filter: brightness(0) invert(1);
            transition: opacity 0.3s ease;
        }

        .support-logo:hover { opacity: 0.7; }

        /* FAQ Section */
        .faq-section {
            margin-top: 3rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 1.1s forwards;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .faq-item {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            margin-bottom: 0.75rem;
            overflow: hidden;
        }

        .faq-question {
            width: 100%;
            background: none;
            border: none;
            padding: 1.25rem 1.5rem;
            text-align: left;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.85rem;
            font-weight: 400;
            color: var(--white);
            transition: background 0.3s ease;
        }

        .faq-question:hover { background: rgba(255, 255, 255, 0.05); }

        .faq-icon {
            font-size: 1.25rem;
            color: var(--white);
            transition: transform 0.3s ease;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .faq-item.active .faq-icon { transform: rotate(45deg); }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
        }

        .faq-item.active .faq-answer { max-height: 300px; }

        .faq-answer-content {
            padding: 0 1.5rem 1.25rem 1.5rem;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.8rem;
            color: var(--white-70);
            line-height: 1.7;
            text-align: left;
        }

        .faq-answer-content a { color: var(--white); text-decoration: underline; transition: opacity 0.3s ease; }
        .faq-answer-content a:hover { opacity: 0.7; }

        /* Contact */
        .contact-text {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.8rem;
            color: var(--white);
            margin-top: 2rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 1.15s forwards;
        }

        .contact-text a { color: var(--white); text-decoration: underline; }
        .contact-text a:hover { opacity: 0.7; }

        /* Footer */
        .bioxai-stamp-bottom {
            text-align: center;
            margin: 2rem auto 0.5rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 1.4s forwards;
        }

        .bioxai-stamp-bottom a {
            text-decoration: none;
        }

        .bioxai-stamp-bottom img {
            width: 160px;
            height: auto;
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
            display: block;
            margin: 0 auto;
        }

        .footer-legal {
            font-family: 'Roboto Mono', monospace;
            font-size: 0.7rem;
            color: var(--white-50);
            margin-top: 1rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeUp 0.8s ease-out 1.2s forwards;
        }

        .footer-legal a {
            color: var(--white-50);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-legal a:hover { color: var(--white); }
        .footer-legal span { margin: 0 0.5rem; }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 800px) {
            .challenges-grid { grid-template-columns: 1fr; max-width: 350px; }
        }

        @media (max-width: 600px) {
            body { padding-top: 2rem; }
            .logos { flex-direction: column; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem; }
            .logo { height: 55px; }
            .info { font-size: 0.9rem; }
            .support-logos { gap: 2rem; }
            .support-logo { height: 28px; }
            .faq-question { font-size: 0.8rem; padding: 1rem 1.25rem; }
            .faq-answer-content { font-size: 0.75rem; padding: 0 1.25rem 1rem 1.25rem; }
            .prize-item { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
            .prize-item a { width: auto; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Bio × AI Branding -->
        <div class="bioxai-top-brand">
            <a href="https://bioxai.eu" target="_blank" rel="noopener noreferrer">
                <img src="https://bioxai.eu/assets/logo.png" alt="Bio × AI Europe">
            </a>
            <span>A European Bio × AI Hackathon</span>
        </div>

${config.showOrgLogos && config.orgLogos?.length ? `        <!-- Organizer Logos -->
        <div class="logos">
${config.orgLogos.map(logo => `            <a href="${escapeHtml(logo.url)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(logo.imageUrl)}" alt="${escapeHtml(logo.name)}" class="logo"></a>`).join('\n')}
        </div>
` : ''}
        <h1>${escapeHtml(config.cityName)} Bio × AI Hackathon</h1>

        <p class="info">${escapeHtml(config.tagline || '')}</p>

        <div class="divider"></div>

${config.showApplyButton && config.applyUrl ? `        <a href="${escapeHtml(config.applyUrl)}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply Now</a>
` : ''}
${config.showEmailSignup ? `        <p class="signup-text">${escapeHtml(config.signupText || 'Leave your email to get updates and hear when applications open.')}</p>
        <div class="tally-embed">
            <iframe data-tally-src="${escapeHtml(config.tallyUrl || '')}" loading="lazy" width="100%" height="152" frameborder="0" marginheight="0" marginwidth="0" title="Email signup"></iframe>
        </div>
` : ''}
${config.showExpect ? `        <!-- What to Expect -->
        <div class="expect-section">
            <p class="section-label">What to Expect</p>
            <div class="expect-list">
${(config.expectItems || []).map(item => `                <p>${item}</p>`).join('\n')}
            </div>
        </div>
` : ''}
${config.showChallenges ? `        <!-- Challenge Tracks -->
        <div class="challenges-section">
            <p class="section-label">Challenge Tracks</p>
            <div class="challenges-grid">
${(config.challenges || []).map(ch => `                <div class="challenge-card">
                    <p class="challenge-title">${escapeHtml(ch.title)}</p>
                    <p class="challenge-partner-label">Challenge Partner</p>
${ch.isTBA ? `                    <p class="challenge-tba">TBA</p>` : `                    <a href="${escapeHtml(ch.partnerUrl)}" target="_blank" rel="noopener noreferrer">
                        <img src="${escapeHtml(ch.partnerLogoUrl)}" alt="${escapeHtml(ch.partnerName || '')}" class="challenge-partner-logo">
                    </a>`}
                </div>`).join('\n')}
${config.showMoreTBA ? `                <div class="challenge-card">
                    <p class="challenge-title">More TBA</p>
                    <p class="challenge-partner-label">&nbsp;</p>
                    <p class="challenge-tba">Coming soon</p>
                </div>` : ''}
            </div>
        </div>
` : ''}
${config.showPrizes && config.prizes?.length ? `        <!-- Prizes -->
        <div class="prizes-section">
            <p class="section-label">Prizes</p>
            <div class="prizes-card">
${config.prizes.map(prize => `                <div class="prize-item">
                    <a href="${escapeHtml(prize.url)}" target="_blank" rel="noopener noreferrer">
                        <img src="${escapeHtml(prize.logoUrl)}" alt="${escapeHtml(prize.name || '')}" class="prize-logo">
                    </a>
                    <p class="prize-description">${prize.description}</p>
                </div>`).join('\n')}
            </div>
        </div>
` : ''}
${config.showPartners ? `        <!-- Partners -->
        <div class="partners-section">
            <p class="section-label">Partners</p>
${renderPartnerTier('Compute Partner', config.computePartners)}
${renderPartnerTier('Gold Partners', config.goldPartners)}
${renderPartnerTier('Silver Partners', config.silverPartners)}
${renderPartnerTier('Bronze Partners', config.bronzePartners)}
        </div>
` : ''}
${config.showFAQ && config.faqs?.length ? `        <!-- FAQ -->
        <div class="faq-section">
            <p class="section-label">FAQ</p>
${config.faqs.map(faq => `            <div class="faq-item">
                <button class="faq-question">
                    <span>${escapeHtml(faq.question)}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">${faq.answer}</div>
                </div>
            </div>`).join('\n')}
        </div>
` : ''}
        <!-- Footer -->
        <div class="bioxai-stamp-bottom">
            <a href="https://bioxai.eu" target="_blank" rel="noopener noreferrer">
                <img src="https://bioxai.eu/assets/logo-full.png" alt="European Bio × AI Hacks">
            </a>
        </div>

${config.legalLinks?.length ? `        <p class="footer-legal">
${config.legalLinks.map((link, i) => `${i > 0 ? '            <span>·</span>\n' : ''}            <a href="${escapeHtml(link.url)}" target="_blank">${escapeHtml(link.text)}</a>`).join('\n')}
        </p>
` : ''}
    </div>
${config.showEmailSignup && config.tallyUrl ? `
    <script>var d=document,s=d.createElement("script");s.src="https://tally.so/widgets/embed.js";d.body.appendChild(s);</script>
` : ''}
${config.showFAQ && config.faqs?.length ? `
    <script>
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const wasActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!wasActive) item.classList.add('active');
            });
        });
    </script>
` : ''}
</body>
</html>`;
}

function renderPartnerTier(label, partners) {
    if (!partners || partners.length === 0) return '';
    return `            <div class="partner-group">
                <p class="partner-type-label">${escapeHtml(label)}</p>
                <div class="support-logos">
${partners.map(p => `                    <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">
                        <img src="${escapeHtml(p.logoUrl)}" alt="${escapeHtml(p.name || '')}" class="support-logo">
                    </a>`).join('\n')}
                </div>
            </div>`;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
