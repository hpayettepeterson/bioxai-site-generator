import { generateHTML } from './template.js';

// Default FAQ questions — wording adapted from the Berlin edition
const DEFAULT_FAQS = [
    {
        question: 'Do I need a biology or life sciences background to participate?',
        answer: 'No! We\'re looking for a mix of profiles: biology/life sciences expertise, computational/AI skills, and other complementary backgrounds (design, product, business). Each team will ideally have both bio and tech talent. If you\'re a strong builder or scientist in any relevant area, apply.'
    },
    {
        question: 'Can I apply as an individual or do I need a team?',
        answer: 'Both work. You can apply with a pre-formed team (max 5 people) or as an individual. After acceptances go out, we\'ll facilitate virtual team matching so individuals can find teammates with complementary skills before the event.'
    },
    {
        question: 'Do I have to choose a challenge track in advance?',
        answer: 'In the application, you\'ll indicate which track(s) you\'re most interested in. You can select just one if you have a strong preference, or multiple if you\'re open. Since we need to keep teams roughly balanced across tracks, if you select multiple we may assign you to one based on capacity. You\'ll know your track assignment before the event, but the specific challenge details won\'t be revealed until the day of.'
    },
    {
        question: 'Will you cover travel costs?',
        answer: 'We plan to help cover travel costs for as many accepted participants as we can coming from outside the host city. More details to come!'
    },
    {
        question: 'What\'s the time commitment?',
        answer: 'Arrive Friday afternoon for registration and challenge briefings. The hack runs for 24 hours (Friday afternoon → Saturday afternoon). Pitch showcase, networking and afterparty on Saturday evening (attendance expected). During the hack, you\'re welcome to leave to sleep or stay and work through the night, whatever works for you.'
    },
    {
        question: 'When will the specific challenges be revealed?',
        answer: 'All participants will receive the specific challenges at the same time on the day of the hackathon, during the challenge briefing session on Friday afternoon. This ensures a level playing field; no one gets a head start. You\'ll know the broad track areas in advance so you can choose which track interests you, but the detailed problem statements stay under wraps until kickoff.'
    },
    {
        question: 'How many winners will there be?',
        answer: 'There will be a winning team for each challenge track, plus one overall hackathon winner selected from all participants. The overall winner may or may not also be a track winner.'
    },
    {
        question: 'What do the winners get?',
        answer: 'Prizes vary by edition — check the Prizes section above for details. But winner or not, every participant walks away with hands-on experience, connections to top scientists, engineers, VCs, and founders, access to an incredible bio × AI network across Europe, and some crazy stories.'
    }
];

// State
let state = {
    cityName: '',
    eventDate: '',
    tagline: '',
    backgroundUrl: '',
    showApplyButton: false,
    applyUrl: '',
    showEmailSignup: false,
    signupText: 'Leave your email to get updates and hear when applications open.',
    tallyUrl: '',
    showOrgLogos: false,
    orgLogos: [],
    showExpect: false,
    expectItems: [],
    showChallenges: false,
    challengeCount: 3,
    challenges: [],
    showMoreTBA: false,
    showJudges: false,
    judges: [],
    showPrizes: false,
    prizes: [],
    showPartners: false,
    computePartners: [],
    goldPartners: [],
    silverPartners: [],
    bronzePartners: [],
    showFAQ: true,
    faqs: [...DEFAULT_FAQS],
    legalLinks: []
};

// Debounced preview update
let updateTimer = null;
function scheduleUpdate() {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(updatePreview, 150);
}

function updatePreview() {
    const html = generateHTML(state);
    const iframe = document.getElementById('previewFrame');
    iframe.srcdoc = html;
}

// Read all form values into state
function readForm() {
    state.cityName = val('cityName');
    state.eventDate = val('eventDate');
    state.tagline = val('tagline');
    const bgVal = val('backgroundSelect');
    state.backgroundUrl = bgVal ? `https://hpayettepeterson.github.io/bioxai-site-generator/${bgVal}` : '';

    state.showApplyButton = checked('showApply');
    state.applyUrl = val('applyUrl');

    state.showEmailSignup = checked('showSignup');
    state.signupText = val('signupText');
    state.tallyUrl = val('tallyUrl');

    state.showOrgLogos = checked('showOrgLogos');
    state.orgLogos = readRepeatables('orgLogos', ['name', 'imageUrl', 'url']);

    state.showExpect = checked('showExpect');
    state.expectItems = readListItems('expectItems');

    state.showChallenges = checked('showChallenges');
    state.challengeCount = parseInt(val('challengeCount')) || 3;
    state.challenges = readChallenges();
    state.showMoreTBA = checked('showMoreTBA');

    state.showJudges = checked('showJudges');
    state.judges = readJudges();

    state.showPrizes = checked('showPrizes');
    state.prizes = readRepeatables('prizes', ['name', 'logoUrl', 'url', 'description']);

    state.showPartners = checked('showPartners');
    state.computePartners = readRepeatables('computePartners', ['name', 'logoUrl', 'url']);
    state.goldPartners = readRepeatables('goldPartners', ['name', 'logoUrl', 'url']);
    state.silverPartners = readRepeatables('silverPartners', ['name', 'logoUrl', 'url']);
    state.bronzePartners = readRepeatables('bronzePartners', ['name', 'logoUrl', 'url']);

    state.showFAQ = checked('showFAQ');
    state.faqs = readFAQs();

    state.legalLinks = readRepeatables('legalLinks', ['text', 'url']);
}

function val(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function checked(id) {
    const el = document.getElementById(id);
    return el ? el.checked : false;
}

function readRepeatables(containerId, fields) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    const items = container.querySelectorAll('.repeatable-item');
    return Array.from(items).map(item => {
        const obj = {};
        fields.forEach(field => {
            const input = item.querySelector(`[data-field="${field}"]`);
            obj[field] = input ? input.value : '';
        });
        return obj;
    });
}

function readChallenges() {
    const container = document.getElementById('challengeTracks');
    if (!container) return [];
    const items = container.querySelectorAll('.repeatable-item');
    return Array.from(items).map(item => {
        return {
            title: item.querySelector('[data-field="title"]')?.value || '',
            partnerName: item.querySelector('[data-field="partnerName"]')?.value || '',
            partnerLogoUrl: item.querySelector('[data-field="partnerLogoUrl"]')?.value || '',
            partnerUrl: item.querySelector('[data-field="partnerUrl"]')?.value || '',
            isTBA: item.querySelector('[data-field="isTBA"]')?.checked || false
        };
    });
}

function readFAQs() {
    const container = document.getElementById('faqItems');
    if (!container) return [];
    const items = container.querySelectorAll('.faq-editor-item');
    return Array.from(items).map(item => ({
        question: item.querySelector('[data-field="question"]')?.value || '',
        answer: item.querySelector('[data-field="answer"]')?.value || ''
    }));
}

function readListItems(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    const inputs = container.querySelectorAll('input[type="text"]');
    return Array.from(inputs).map(i => i.value).filter(v => v.trim());
}

function readJudges() {
    const container = document.getElementById('judges');
    if (!container) return [];
    const items = container.querySelectorAll('.repeatable-item');
    return Array.from(items).map(item => {
        return {
            name: item.querySelector('[data-field="name"]')?.value || '',
            title: item.querySelector('[data-field="title"]')?.value || '',
            photoUrl: item.querySelector('[data-field="photoUrl"]')?.value || '',
            linkedinUrl: item.querySelector('[data-field="linkedinUrl"]')?.value || '',
            orgLogoUrl: item.querySelector('[data-field="orgLogoUrl"]')?.value || '',
            isTBA: item.querySelector('[data-field="isJudgeTBA"]')?.checked || false
        };
    });
}

function judgeItemHTML(judge) {
    return `<div class="repeatable-item">
        <div class="item-header"><span>${judge.name || 'Judge'}</span><button class="remove-btn" onclick="this.closest('.repeatable-item').remove(); readFormAndUpdate();">×</button></div>
        <div class="tba-toggle">
            <input type="checkbox" data-field="isJudgeTBA" ${judge.isTBA ? 'checked' : ''}>
            <label>TBA Placeholder</label>
        </div>
        <div class="judge-fields" ${judge.isTBA ? 'style="display:none"' : ''}>
            <div class="form-group">
                <label>Name</label>
                <input type="text" data-field="name" value="${attr(judge.name)}" placeholder="Full name">
            </div>
            <div class="form-group">
                <label>Title & Organization</label>
                <input type="text" data-field="title" value="${attr(judge.title)}" placeholder="e.g. VP Health, Merantix">
            </div>
            <div class="form-group">
                <label>Photo URL</label>
                <input type="url" data-field="photoUrl" value="${attr(judge.photoUrl)}" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>LinkedIn URL (optional)</label>
                <input type="url" data-field="linkedinUrl" value="${attr(judge.linkedinUrl)}" placeholder="https://linkedin.com/in/...">
            </div>
            <div class="form-group">
                <label>Org Logo URL (optional)</label>
                <input type="url" data-field="orgLogoUrl" value="${attr(judge.orgLogoUrl)}" placeholder="https://...">
            </div>
        </div>
    </div>`;
}

function addJudge() {
    const container = document.getElementById('judges');
    const div = document.createElement('div');
    div.innerHTML = judgeItemHTML({ name: '', title: '', photoUrl: '', linkedinUrl: '', orgLogoUrl: '', isTBA: false });
    container.appendChild(div.firstElementChild);
    bindInputs(container);
    bindJudgeTBA(container);
    scheduleUpdate();
}

function bindJudgeTBA(container) {
    container.querySelectorAll('[data-field="isJudgeTBA"]').forEach(cb => {
        if (cb.dataset.judgeTbaBound) return;
        cb.dataset.judgeTbaBound = '1';
        cb.addEventListener('change', () => {
            const fields = cb.closest('.repeatable-item').querySelector('.judge-fields');
            if (fields) fields.style.display = cb.checked ? 'none' : '';
            readForm();
            scheduleUpdate();
        });
    });
}

// Render dynamic form parts
function renderChallenges() {
    const container = document.getElementById('challengeTracks');
    const count = parseInt(val('challengeCount')) || 3;
    // Preserve existing data
    const existing = readChallenges();
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const ch = existing[i] || { title: '', partnerName: '', partnerLogoUrl: '', partnerUrl: '', isTBA: false };
        container.innerHTML += challengeItemHTML(i, ch);
    }
    bindInputs(container);
}

function challengeItemHTML(index, ch) {
    return `<div class="repeatable-item">
        <div class="item-header"><span>Track ${index + 1}</span></div>
        <div class="form-group">
            <label>Track Title</label>
            <input type="text" data-field="title" value="${attr(ch.title)}" placeholder="e.g. Protein Design">
        </div>
        <div class="tba-toggle">
            <input type="checkbox" data-field="isTBA" id="tba_${index}" ${ch.isTBA ? 'checked' : ''}>
            <label for="tba_${index}">Partner TBA</label>
        </div>
        <div class="partner-fields" ${ch.isTBA ? 'style="display:none"' : ''}>
            <div class="form-group">
                <label>Partner Name</label>
                <input type="text" data-field="partnerName" value="${attr(ch.partnerName)}" placeholder="Company name">
            </div>
            <div class="form-group">
                <label>Partner Logo URL</label>
                <input type="url" data-field="partnerLogoUrl" value="${attr(ch.partnerLogoUrl)}" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>Partner Website</label>
                <input type="url" data-field="partnerUrl" value="${attr(ch.partnerUrl)}" placeholder="https://...">
            </div>
        </div>
    </div>`;
}

function renderRepeatableContainer(containerId, fields, labels, addLabel) {
    const container = document.getElementById(containerId);
    const addBtn = container.nextElementSibling;

    // Clear existing listeners by replacing button
    const newBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newBtn, addBtn);

    newBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.innerHTML = repeatableItemHTML(fields, labels, {});
        container.appendChild(div.firstElementChild);
        bindInputs(container);
        scheduleUpdate();
    });
}

function repeatableItemHTML(fields, labels, data) {
    return `<div class="repeatable-item">
        <div class="item-header"><span>${labels._title || ''}</span><button class="remove-btn" onclick="this.closest('.repeatable-item').remove(); readFormAndUpdate();">×</button></div>
        ${fields.map((f, i) => `<div class="form-group">
            <label>${labels[f] || f}</label>
            <${f === 'description' || f === 'answer' ? 'textarea' : 'input type="text"'} data-field="${f}" value="${attr(data[f])}" placeholder="${labels[f + '_placeholder'] || ''}"></${f === 'description' || f === 'answer' ? 'textarea' : 'input'}>
        </div>`).join('')}
    </div>`;
}

function addRepeatableItem(containerId, fields, labels) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.innerHTML = repeatableItemHTML(fields, labels, {});
    container.appendChild(div.firstElementChild);
    bindInputs(container);
    scheduleUpdate();
}

function addExpectItem() {
    const container = document.getElementById('expectItems');
    const div = document.createElement('div');
    div.className = 'repeatable-item';
    div.style.display = 'flex';
    div.style.gap = '0.5rem';
    div.style.alignItems = 'center';
    div.innerHTML = `<input type="text" style="flex:1;padding:0.5rem 0.75rem;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-size:0.8rem;font-family:inherit;" placeholder="e.g. 80 participants from across Europe">
        <button class="remove-btn" onclick="this.parentElement.remove(); readFormAndUpdate();">×</button>`;
    container.appendChild(div);
    bindInputs(container);
    scheduleUpdate();
}

function addFAQItem() {
    const container = document.getElementById('faqItems');
    const div = document.createElement('div');
    div.className = 'faq-editor-item';
    div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <span style="font-size:0.7rem;font-weight:600;color:var(--text-heading);">Question</span>
            <button class="remove-btn" onclick="this.closest('.faq-editor-item').remove(); readFormAndUpdate();">×</button>
        </div>
        <div class="form-group">
            <input type="text" data-field="question" placeholder="Question">
        </div>
        <div class="form-group">
            <label>Answer</label>
            <textarea data-field="answer" placeholder="Answer (HTML allowed)"></textarea>
        </div>`;
    container.appendChild(div);
    bindInputs(container);
    scheduleUpdate();
}

// Bind input listeners to a container
function bindInputs(container) {
    container.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.dataset.bound) return;
        el.dataset.bound = '1';
        el.addEventListener('input', () => { readForm(); scheduleUpdate(); });
        el.addEventListener('change', () => { readForm(); scheduleUpdate(); });
    });

    // TBA toggle: show/hide partner fields
    container.querySelectorAll('[data-field="isTBA"]').forEach(cb => {
        if (cb.dataset.tbaBound) return;
        cb.dataset.tbaBound = '1';
        cb.addEventListener('change', () => {
            const fields = cb.closest('.repeatable-item').querySelector('.partner-fields');
            if (fields) fields.style.display = cb.checked ? 'none' : '';
            readForm();
            scheduleUpdate();
        });
    });
}

// Section collapse toggles
function initSectionToggles() {
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking a checkbox
            if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') return;
            header.closest('.form-section').classList.toggle('collapsed');
        });
    });
}

// Visibility toggles: show/hide section body content
function initVisibilityToggles() {
    document.querySelectorAll('.visibility-toggle input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            readForm();
            scheduleUpdate();
        });
        // Stop propagation so section doesn't collapse
        cb.addEventListener('click', e => e.stopPropagation());
    });

    // Same for adjacent labels
    document.querySelectorAll('.visibility-toggle label').forEach(label => {
        label.addEventListener('click', e => e.stopPropagation());
    });
}

// Code modal
function showCodeModal() {
    readForm();
    const html = generateHTML(state);
    document.getElementById('codeOutput').textContent = html;
    document.getElementById('codeModal').classList.add('open');
}

function hideCodeModal() {
    document.getElementById('codeModal').classList.remove('open');
}

function copyCode() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = 'Copied!';
        btn.classList.add('success');
        setTimeout(() => {
            btn.textContent = 'Copy HTML';
            btn.classList.remove('success');
        }, 2000);
    });
}

function attr(val) {
    if (!val) return '';
    return String(val).replace(/"/g, '&quot;');
}

// Global function for inline onclick handlers
window.readFormAndUpdate = function() {
    readForm();
    scheduleUpdate();
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    initSectionToggles();
    initVisibilityToggles();

    // Bind all existing inputs
    document.querySelectorAll('.sidebar input, .sidebar textarea, .sidebar select').forEach(el => {
        el.addEventListener('input', () => { readForm(); scheduleUpdate(); });
        el.addEventListener('change', () => { readForm(); scheduleUpdate(); });
    });

    // Challenge count change
    document.getElementById('challengeCount').addEventListener('change', renderChallenges);

    // Init challenges
    renderChallenges();

    // Render default "What to Expect" items
    const defaultExpectItems = [
        '~XX participants, a mix of top scientific and technical talent from [city] and across Europe',
        'Hacking from Friday afternoon to Saturday afternoon, in-person at [venue]',
        'Public pitch event, networking and afterparty Saturday evening'
    ];
    const expectContainer = document.getElementById('expectItems');
    defaultExpectItems.forEach(text => {
        const div = document.createElement('div');
        div.className = 'repeatable-item';
        div.style.display = 'flex';
        div.style.gap = '0.5rem';
        div.style.alignItems = 'center';
        div.innerHTML = `<input type="text" style="flex:1;padding:0.5rem 0.75rem;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-size:0.8rem;font-family:inherit;" value="${attr(text)}">
            <button class="remove-btn" onclick="this.parentElement.remove(); readFormAndUpdate();">×</button>`;
        expectContainer.appendChild(div);
    });
    bindInputs(expectContainer);

    // Render default FAQs
    const faqContainer = document.getElementById('faqItems');
    DEFAULT_FAQS.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'faq-editor-item';
        div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                <span style="font-size:0.7rem;font-weight:600;color:var(--text-heading);">Question</span>
                <button class="remove-btn" onclick="this.closest('.faq-editor-item').remove(); readFormAndUpdate();">×</button>
            </div>
            <div class="form-group">
                <input type="text" data-field="question" value="${attr(faq.question)}">
            </div>
            <div class="form-group">
                <label>Answer</label>
                <textarea data-field="answer">${faq.answer}</textarea>
            </div>`;
        faqContainer.appendChild(div);
    });
    bindInputs(faqContainer);

    // Button handlers
    document.getElementById('showCodeBtn').addEventListener('click', showCodeModal);
    document.getElementById('closeModal').addEventListener('click', hideCodeModal);
    document.getElementById('closeModalBottom').addEventListener('click', hideCodeModal);
    document.getElementById('copyBtn').addEventListener('click', copyCode);

    // Add buttons
    document.getElementById('addOrgLogo').addEventListener('click', () => {
        addRepeatableItem('orgLogos',
            ['name', 'imageUrl', 'url'],
            { _title: 'Logo', name: 'Name', name_placeholder: 'Organization name', imageUrl: 'Logo Image URL', imageUrl_placeholder: 'https://...', url: 'Website URL', url_placeholder: 'https://...' }
        );
    });

    document.getElementById('addExpectItem').addEventListener('click', addExpectItem);

    document.getElementById('addJudge').addEventListener('click', addJudge);

    document.getElementById('addPrize').addEventListener('click', () => {
        addRepeatableItem('prizes',
            ['name', 'logoUrl', 'url', 'description'],
            { _title: 'Prize', name: 'Name', name_placeholder: 'Partner name', logoUrl: 'Logo URL', logoUrl_placeholder: 'https://...', url: 'Website', url_placeholder: 'https://...', description: 'Description', description_placeholder: 'e.g. $5,000 grant for winning team' }
        );
    });

    ['computePartners', 'goldPartners', 'silverPartners', 'bronzePartners'].forEach(tier => {
        document.getElementById('add_' + tier).addEventListener('click', () => {
            addRepeatableItem(tier,
                ['name', 'logoUrl', 'url'],
                { _title: 'Partner', name: 'Name', name_placeholder: 'Partner name', logoUrl: 'Logo URL', logoUrl_placeholder: 'https://...', url: 'Website', url_placeholder: 'https://...' }
            );
        });
    });

    document.getElementById('addFAQ').addEventListener('click', addFAQItem);

    document.getElementById('addLegalLink').addEventListener('click', () => {
        addRepeatableItem('legalLinks',
            ['text', 'url'],
            { _title: 'Link', text: 'Link Text', text_placeholder: 'e.g. Privacy Policy', url: 'URL', url_placeholder: 'https://...' }
        );
    });

    // Close modal on backdrop click
    document.getElementById('codeModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) hideCodeModal();
    });

    // Initial preview
    readForm();
    updatePreview();
});
