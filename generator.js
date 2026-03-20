import { generateHTML } from './template.js';

// Default FAQ questions from the playbook
const DEFAULT_FAQS = [
    {
        question: 'Do I need a biology/life sciences background to participate?',
        answer: 'No — we want a mix of backgrounds. If you\'re a strong engineer, designer, or data scientist, your skills are just as valuable. Teams are interdisciplinary by design.'
    },
    {
        question: 'Can I apply as an individual or do I need a team?',
        answer: 'Both work. You can apply as an individual or with a pre-formed team of up to 5. Individual applicants will be connected with other accepted participants to form teams before the event.'
    },
    {
        question: 'Do I have to choose a challenge track in advance?',
        answer: 'You\'ll indicate your preferences when applying, and you\'ll be assigned to a track based on capacity and fit. The specific challenge details are only revealed on the day of the event.'
    },
    {
        question: 'Will you cover travel costs?',
        answer: 'Yes — we offer travel grants of up to €300 for participants traveling from outside the host city. You can apply for a travel grant as part of the application.'
    },
    {
        question: 'What\'s the time commitment?',
        answer: 'The hack runs for about 24 hours: arrive Friday afternoon, hack from Friday evening through Saturday afternoon. Saturday evening is the public showcase and afterparty.'
    },
    {
        question: 'When will the specific challenges be revealed?',
        answer: 'Challenge details are revealed at the kickoff on Friday. Track topics are announced in advance so applicants know the general areas, but the specific problems are kept secret until the event to keep the playing field level.'
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
    state.backgroundUrl = val('backgroundSelect');

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
