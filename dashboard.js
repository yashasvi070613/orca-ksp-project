/* ══════════════════════════════════════════
   O.R.C.A Dashboard JS
   Chat Bubble + Onboarding Spotlight
   ══════════════════════════════════════════ */
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3Ndt8ev-6mcV4CsYVSrhwatN4iUJpogc",
  authDomain: "orca-49591.firebaseapp.com",
  projectId: "orca-49591",
  storageBucket: "orca-49591.firebasestorage.app",
  messagingSenderId: "851973313915",
  appId: "1:851973313915:web:9bf5d3ae16bc51e8a7d9de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const CATALYST_URL = 'https://orca-60075642287.development.catalystserverless.in/server/orca-chat/';

/* ── State ── */
let queryCount = 0;
let isTyping = false;
let chatOpen = false;
let currentTheme = localStorage.getItem('orca-dash-theme') || 'light';

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      const el = document.getElementById('user-email');
      if (el) el.textContent = user.email;
    }
  });

  document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => { window.location.href = 'login.html'; });
  });

  // Auto-dismiss tooltip after 5 s
  setTimeout(() => {
    document.getElementById('bubble-tooltip')?.classList.add('hidden');
  }, 5000);

  // Start onboarding if first visit
  const seen = localStorage.getItem('orca-onboarded');
  if (!seen) {
    // Small delay so the page feels loaded first
    setTimeout(startOnboarding, 900);
  }
});

/* ════════════════════════════════════════
   CHAT BUBBLE
   ════════════════════════════════════════ */
function toggleChat() {
  chatOpen = !chatOpen;

  const wrapper = document.getElementById('chat-bubble-wrapper');
  const panel   = document.getElementById('chat-panel');
  const badge   = document.getElementById('bubble-badge');
  const tooltip = document.getElementById('bubble-tooltip');

  wrapper.classList.toggle('is-open', chatOpen);
  panel.classList.toggle('is-open', chatOpen);

  // Hide badge + tooltip once opened
  if (chatOpen) {
    badge?.classList.add('hidden');
    tooltip?.classList.add('hidden');
    setTimeout(() => document.getElementById('chat-input')?.focus(), 300);
  }
}

/* ════════════════════════════════════════
   CHAT MESSAGING
   ════════════════════════════════════════ */
async function sendChat() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message || isTyping) return;

  input.value = '';
  appendMessage('user', message);
  hideSuggestions();
  showTyping();

  isTyping = true;
  document.getElementById('send-btn').disabled = true;

  try {
    const res = await fetch(CATALYST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    removeTyping();
    appendMessage('bot', data.reply || 'No response received.');
    queryCount++;
    const el = document.getElementById('query-count');
    if (el) el.textContent = queryCount;
  } catch {
    removeTyping();
    appendMessage('bot', '⚠️ Unable to reach O.R.C.A AI. Please check your connection.');
  }

  isTyping = false;
  document.getElementById('send-btn').disabled = false;
  document.getElementById('chat-input')?.focus();
}

function appendMessage(role, text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `<div class="msg-label">${role === 'bot' ? 'O.R.C.A AI' : 'You'}</div>${escapeHtml(text)}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg typing';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-label">O.R.C.A AI</div><div class="typing-dots"><span></span><span></span><span></span></div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function sendSuggestion(chip) {
  document.getElementById('chat-input').value = chip.textContent;
  sendChat();
}

function hideSuggestions() {
  const s = document.getElementById('suggestions');
  if (s) s.style.display = 'none';
}

/* ════════════════════════════════════════
   THEME
   ════════════════════════════════════════ */
function toggleDashTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('orca-dash-theme', currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  const btn = document.getElementById('dash-theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ════════════════════════════════════════
   ONBOARDING SPOTLIGHT
   ════════════════════════════════════════ */

/**
 * Each step:
 *  targetId   – element to highlight (gets .onboard-ring)
 *  title      – tooltip heading
 *  desc       – tooltip body text
 *  position   – where to place the tooltip: 'right' | 'left' | 'top' | 'above-bubble'
 */
const STEPS = [
  {
    targetId: 'nav-overview',
    title: 'Your Dashboard',
    desc:  'This is your command centre. See live metrics, crime logs, and quick stats for Karnataka at a glance.',
    position: 'right'
  },
  {
    targetId: 'nav-maps',
    title: 'Crime Maps',
    desc:  'Explore geographic hotspots, filter by crime type or district, and identify emerging patterns visually.',
    position: 'right'
  },
  {
    targetId: 'chat-bubble-btn',
    title: 'Ask the AI Assistant',
    desc:  'This button opens your AI assistant — ask questions in English, Hindi or Kannada and get instant crime intelligence.',
    position: 'above-bubble'
  }
];

let currentStep = 0;
let previousTarget = null;

function startOnboarding() {
  currentStep = 0;
  const overlay = document.getElementById('spotlight-overlay');
  overlay.classList.add('active');

  // Build dots
  const dotsEl = document.getElementById('spotlight-dots');
  dotsEl.innerHTML = STEPS.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}"></div>`).join('');
  document.getElementById('step-total').textContent = STEPS.length;

  showStep(0);
}

function showStep(index) {
  // Clean previous highlight
  if (previousTarget) {
    previousTarget.classList.remove('onboard-ring', 'spotlight-highlight');
  }

  const step = STEPS[index];
  const target = document.getElementById(step.targetId);
  if (!target) { nextStep(); return; }

  // Highlight target
  target.classList.add('onboard-ring');

  // Add extra visual glow for specific elements
  if (step.targetId === 'chat-bubble-btn') {
    target.classList.add('spotlight-highlight');
  } else if (step.targetId.startsWith('nav-')) {
    target.classList.add('spotlight-highlight');
  }

  previousTarget = target;

  // Update tooltip content
  document.getElementById('step-num').textContent = index + 1;
  document.getElementById('spotlight-title').textContent = step.title;
  document.getElementById('spotlight-desc').textContent = step.desc;

  const nextBtn = document.getElementById('spotlight-next-btn');
  nextBtn.textContent = index === STEPS.length - 1 ? 'Get Started ✓' : 'Next →';

  // Update dots
  document.querySelectorAll('.spotlight-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  // Position tooltip relative to target
  positionTooltip(target, step.position);
}

function positionTooltip(target, position) {
  const tooltip = document.getElementById('spotlight-tooltip');
  const rect = target.getBoundingClientRect();
  const gap = 16;
  const margin = 12; // min distance from any viewport edge

  // Reset all sides and transform first
  tooltip.style.top = tooltip.style.left = tooltip.style.right = tooltip.style.bottom = 'auto';
  tooltip.style.transform = '';

  // Measure actual tooltip size after a paint tick, but we need to position
  // synchronously — use the CSS width (280px) and estimate height
  const TW = 280;
  const TH = tooltip.offsetHeight || 210;
  const VW = window.innerWidth;
  const VH = window.innerHeight;

  let top, left;

  if (position === 'right') {
    // Prefer right of target; vertically centred on it
    left = rect.right + gap;
    top  = rect.top + rect.height / 2 - TH / 2;

    // If it overflows right edge, flip to left of target
    if (left + TW > VW - margin) {
      left = rect.left - TW - gap;
    }
  } else if (position === 'left') {
    left = rect.left - TW - gap;
    top  = rect.top + rect.height / 2 - TH / 2;

    // If it overflows left edge, flip to right
    if (left < margin) {
      left = rect.right + gap;
    }
  } else if (position === 'above-bubble') {
    // Above and horizontally centred on the bubble button
    left = rect.left + rect.width / 2 - TW / 2;
    top  = rect.top - TH - gap;

    // If it goes above the top, place below instead
    if (top < margin) {
      top = rect.bottom + gap;
    }
  } else {
    // Centred fallback
    left = VW / 2 - TW / 2;
    top  = VH / 2 - TH / 2;
  }

  // Clamp both axes so tooltip never leaves the viewport
  left = Math.min(Math.max(margin, left), VW - TW - margin);
  top  = Math.min(Math.max(margin, top),  VH - TH - margin);

  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
}

function nextStep() {
  if (currentStep < STEPS.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    endOnboarding();
  }
}

function endOnboarding() {
  // Clean up highlights
  if (previousTarget) {
    previousTarget.classList.remove('onboard-ring', 'spotlight-highlight');
    previousTarget = null;
  }

  const overlay = document.getElementById('spotlight-overlay');
  overlay.classList.remove('active');
  localStorage.setItem('orca-onboarded', '1');

  // After onboarding, nudge the chat bubble with a little bounce
  setTimeout(() => {
    const btn = document.getElementById('chat-bubble-btn');
    btn.style.transform = 'scale(1.15)';
    setTimeout(() => { btn.style.transform = ''; }, 300);
  }, 400);
}

/* ════════════════════════════════════════
   UTILS
   ════════════════════════════════════════ */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

/* ── Expose to window (for inline handlers) ── */
window.toggleChat      = toggleChat;
window.sendChat        = sendChat;
window.sendSuggestion  = sendSuggestion;
window.toggleDashTheme = toggleDashTheme;
window.nextStep        = nextStep;
window.endOnboarding   = endOnboarding;