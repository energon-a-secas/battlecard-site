const DEFAULT_BRAND = { company: '', logoDataUrl: '', font: 'sans' };

const DEFAULT_STATE = {
  title: 'SALES BATTLECARD',
  columns: 3,
  theme: 'dark',
  brand: { ...DEFAULT_BRAND },
  sections: [
    {
      id: 's1',
      title: 'Company Overview',
      icon: 'business',
      accentColor: '#0063e5',
      colSpan: 2,
      rowSpan: 1,
      content: 'Describe the company, its mission, and key differentiators.',
      layout: 'numbered',
      subsections: [
        { title: '01', content: 'Key differentiator one' },
        { title: '02', content: 'Key differentiator two' },
        { title: '03', content: 'Key differentiator three' }
      ]
    },
    {
      id: 's2',
      title: 'Requirements',
      icon: 'writing',
      accentColor: '#ef4444',
      colSpan: 1,
      rowSpan: 2,
      content: 'List the customer requirements and buying criteria. What must the solution do?',
      layout: 'free',
      subsections: []
    },
    {
      id: 's3',
      title: 'Product',
      icon: 'technology',
      accentColor: '#6366f1',
      colSpan: 1,
      rowSpan: 1,
      content: 'Product highlights and key capabilities.',
      layout: 'columns',
      subsections: [
        { title: 'ONE', content: 'First advantage' },
        { title: 'TWO', content: 'Second advantage' }
      ]
    },
    {
      id: 's4',
      title: 'Strengths',
      icon: 'cybersecurity',
      accentColor: '#8b5cf6',
      colSpan: 1,
      rowSpan: 1,
      content: 'Where you win and why customers choose you.',
      layout: 'free',
      subsections: []
    },
    {
      id: 's5',
      title: 'FAQs / Answers',
      icon: 'tech-stories',
      accentColor: '#475569',
      colSpan: 1,
      rowSpan: 2,
      content: '',
      layout: 'qa',
      subsections: [
        { title: 'What is your pricing model?', content: 'We offer flexible subscription tiers for all team sizes.' },
        { title: 'How does onboarding work?', content: 'Full setup and training in under 24 hours.' },
        { title: 'Do you have enterprise options?', content: 'Yes, with dedicated support and custom contracts.' }
      ]
    },
    {
      id: 's6',
      title: 'Pricing',
      icon: 'finance',
      accentColor: '#0284c7',
      colSpan: 1,
      rowSpan: 1,
      content: 'Pricing tiers and value propositions.',
      layout: 'columns',
      subsections: [
        { title: 'Starter', content: '$0/mo' },
        { title: 'Pro', content: '$49/mo' },
        { title: 'Enterprise', content: 'Custom' }
      ]
    },
    {
      id: 's7',
      title: 'Weaknesses',
      icon: 'startups',
      accentColor: '#dc2626',
      colSpan: 1,
      rowSpan: 1,
      content: 'Known limitations to address proactively in your pitch.',
      layout: 'numbered',
      subsections: [
        { title: '01', content: 'Limitation one' },
        { title: '02', content: 'Limitation two' }
      ]
    }
  ]
};

// A card reaches the page from a share link (#c=), an imported JSON file or
// localStorage, and render.js writes these fields into HTML attributes. So
// every field that lands in markup is checked against what the app itself
// produces, never just typeof string: a crafted link once closed the attribute
// and added an error handler through logoDataUrl, accentColor and a section id.
const LOGO_RE = /^data:image\/(?:png|jpeg|gif|webp|avif|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}$/;
const COLOR_RE = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const ID_RE = /^[A-Za-z0-9_-]{1,40}$/;
const FONTS = ['sans', 'serif', 'mono'];

/** A logo is only ever a base64 image data URL (what FileReader gives us), or nothing. */
export function safeLogo(v) {
  return typeof v === 'string' && LOGO_RE.test(v) ? v : '';
}

/** Shape-check + fill gaps so imported/shared/old cards can't break render. */
export function normalizeCard(raw) {
  if (!raw || !Array.isArray(raw.sections) || raw.sections.length === 0) return null;
  const brand = raw.brand && typeof raw.brand === 'object' ? raw.brand : {};
  const card = {
    title: typeof raw.title === 'string' ? raw.title : 'SALES BATTLECARD',
    columns: Math.max(1, Math.min(6, parseInt(raw.columns, 10) || 3)),
    theme: typeof raw.theme === 'string' ? raw.theme : 'dark',
    brand: {
      company: typeof brand.company === 'string' ? brand.company.slice(0, 60) : DEFAULT_BRAND.company,
      logoDataUrl: safeLogo(brand.logoDataUrl),
      font: FONTS.includes(brand.font) ? brand.font : DEFAULT_BRAND.font,
    },
    sections: raw.sections.filter(s => s && typeof s === 'object').map(s => ({
      id: typeof s.id === 'string' && ID_RE.test(s.id) ? s.id : uid(),
      title: typeof s.title === 'string' ? s.title : 'Section',
      icon: typeof s.icon === 'string' ? s.icon : 'technology',
      accentColor: typeof s.accentColor === 'string' && COLOR_RE.test(s.accentColor) ? s.accentColor : '#0063e5',
      colSpan: Math.max(1, Math.min(6, parseInt(s.colSpan, 10) || 1)),
      rowSpan: Math.max(1, Math.min(4, parseInt(s.rowSpan, 10) || 1)),
      content: typeof s.content === 'string' ? s.content : '',
      layout: ['free', 'numbered', 'columns', 'qa', 'pairs'].includes(s.layout) ? s.layout : 'free',
      subsections: Array.isArray(s.subsections)
        ? s.subsections.map(sub => ({
            title: typeof sub?.title === 'string' ? sub.title : '',
            content: typeof sub?.content === 'string' ? sub.content : ''
          }))
        : []
    }))
  };
  return card.sections.length ? card : null;
}

/** Card encoded in the URL hash (#c=…), shared decision-wheel-style. */
function loadFromHash() {
  const m = location.hash.match(/#c=([^&]+)/);
  if (!m) return null;
  try {
    return normalizeCard(JSON.parse(decodeURIComponent(atob(m[1]))));
  } catch (_) { return null; }
}

function loadState() {
  const shared = loadFromHash();
  if (shared) return shared;
  try {
    const saved = localStorage.getItem('battlecard-v1');
    if (saved) {
      const card = normalizeCard(JSON.parse(saved));
      if (card) return card;
    }
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

export const state = loadState();

export function saveState() {
  try {
    localStorage.setItem('battlecard-v1', JSON.stringify(state));
  } catch (_) {}
}

/** Replace the whole card in place (template load, JSON import, share link). */
export function replaceState(card) {
  state.title = card.title;
  state.columns = card.columns;
  if (card.theme) state.theme = card.theme;
  state.brand = card.brand;
  state.sections = card.sections;
  saveState();
}

export function resetState() {
  const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
  state.title = fresh.title;
  state.columns = fresh.columns;
  state.theme = fresh.theme;
  state.brand = fresh.brand;
  state.sections = fresh.sections;
  saveState();
}

export function uid() {
  return 's' + Math.random().toString(36).slice(2, 9);
}
