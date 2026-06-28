/* Dashboard JS — O.R.C.A */
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

let queryCount = 0;
let isChatOpen = false;
let isTyping = false;
let currentTheme = localStorage.getItem('orca-dash-theme') || 'light';

// ── Tour Steps ─────────────────────────────────────────────────
const tourSteps = [
  {
    target: 'tour-sidebar',
    title: 'Welcome to O.R.C.A 👋',
    desc: 'This is your crime intelligence dashboard. Use the sidebar to navigate between Overview, Crime Maps, Network Analysis, and Reports.',
    position: 'right'
  },
  {
    target: 'tour-metrics',
    title: 'Live Crime Metrics 📊',
    desc: 'These cards show real-time statistics — active cases, critical alerts, deployed officers, and your AI query count for this session.',
    position: 'bottom'
  },
  {
    target: 'tour-table',
    title: 'Recent Crime Logs 📋',
    desc: 'View the latest FIR entries from all 1100+ police stations across Karnataka, filterable by category, location, and status.',
    position: 'top'
  },
  {
    target: 'chat-bubble',
    title: 'Your AI Assistant 🤖',
    desc: 'Click this bubble anytime to chat with O.R.C.A AI! Ask questions in English, Hindi, or Kannada to query crime data, find hotspots, and analyze patterns.',
    position: 'top-left'
  }
];

let currentStep = 0;

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      const emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = user.email;

      // Start tour for first-time users
      const toured = localStorage.getItem('orca-toured');
      if (!toured) {
        setTimeout(() => startTour(), 800);
      }
    }
  });

  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => { window.location.href = 'login.html'; });
    });
  }

  // Hide bubble tooltip after 4s
  setTimeout(() => {
    const t = document.getElementById('bubble-tooltip');
    if (t) t.style.opacity = '0';
    setTimeout(() => { if (t) t.style.display = 'none'; }, 400);
  }, 4000);
});

// ══════════════════════════════════════
// ONBOARDING TOUR
// ══════════════════════════════════════
function startTour() {
  currentStep = 0;
  const overlay = document.getElementById('tour-overlay');
  overlay.classList.add('active');
  buildDots();
  showTourStep(0);
}

function buildDots() {
  const dots = document.getElementById('tour-dots');
  dots.innerHTML = '';
  tourSteps.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'tour-dot' + (i === 0 ? ' active' : '');
    dots.appendChild(d);
  });
}

function showTourStep(index) {
  const step = tourSteps[index];
  const target = document.getElementById(step.target);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const padding = 8;

  // Highlight
  const hl = document.getElementById('tour-highlight');
  hl.style.left = (rect.left - padding) + 'px';
  hl.style.top = (rect.top - padding) + 'px';
  hl.style.width = (rect.width + padding * 2) + 'px';
  hl.style.height = (rect.height + padding * 2) + 'px';

  // Pulse ring
  const pulse = document.getElementById('tour-pulse');
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  pulse.style.left = (cx - 20) + 'px';
  pulse.style.top = (cy - 20) + 'px';
  pulse.style.width = '40px';
  pulse.style.height = '40px';

  // Tooltip position — always centered and within screen
  const tooltip = document.getElementById('tour-tooltip');
  const tw = 300;
  const th = 200;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  tooltip.style.width = tw + 'px';

  let left, top;

  if (step.position === 'right') {
    left = rect.right + 20;
    top = rect.top;
  } else if (step.position === 'bottom') {
    left = rect.left;
    top = rect.bottom + 16;
  } else if (step.position === 'top') {
    left = rect.left;
    top = rect.top - th - 16;
  } else if (step.position === 'top-left') {
    left = rect.left - tw - 20;
    top = rect.top - th;
  } else {
    left = vw / 2 - tw / 2;
    top = vh / 2 - th / 2;
  }

  // Clamp within viewport
  left = Math.max(16, Math.min(left, vw - tw - 16));
  top = Math.max(16, Math.min(top, vh - th - 16));

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';

  // Content
  document.getElementById('tour-step-label').textContent = `Step ${index + 1} of ${tourSteps.length}`;
  document.getElementById('tour-title').textContent = step.title;
  document.getElementById('tour-desc').textContent = step.desc;

  // Dots
  document.querySelectorAll('.tour-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  // Last step button
  const btn = document.getElementById('tour-next-btn');
  btn.textContent = index === tourSteps.length - 1 ? 'Get Started! 🚀' : 'Next →';

  // Scroll target into view
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function nextTourStep() {
  if (currentStep < tourSteps.length - 1) {
    currentStep++;
    showTourStep(currentStep);
  } else {
    endTour();
  }
}

function endTour() {
  const overlay = document.getElementById('tour-overlay');
  overlay.classList.remove('active');
  overlay.style.display = 'none';
  localStorage.setItem('orca-toured', 'true');

  // Open chat bubble with animation after tour ends
  setTimeout(() => {
    const badge = document.getElementById('bubble-badge');
    if (badge) {
      badge.style.display = 'flex';
      badge.textContent = '1';
    }
  }, 500);
}

// ══════════════════════════════════════
// CHAT BUBBLE & WINDOW
// ══════════════════════════════════════
function toggleChatWindow() {
  isChatOpen = !isChatOpen;
  const win = document.getElementById('chat-window');
  const btn = document.getElementById('chat-bubble');
  const badge = document.getElementById('bubble-badge');

  win.classList.toggle('open', isChatOpen);
  btn.classList.toggle('open', isChatOpen);

  if (isChatOpen) {
    if (badge) badge.style.display = 'none';
    setTimeout(() => document.getElementById('win-chat-input')?.focus(), 300);
  }
}

// ══════════════════════════════════════
// CHAT LOGIC
// ══════════════════════════════════════
async function winSendChat() {
  const input = document.getElementById('win-chat-input');
  const message = input.value.trim();
  if (!message || isTyping) return;

  input.value = '';
  appendWinMessage('user', message);
  hideChips();
  showWinTyping();
  isTyping = true;
  document.getElementById('win-send-btn').disabled = true;

  try {
    const res = await fetch(CATALYST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    removeWinTyping();
    appendWinMessage('bot', data.reply || 'No response.');
    queryCount++;
    const qc = document.getElementById('query-count');
    if (qc) qc.textContent = queryCount;
  } catch (err) {
    removeWinTyping();
    appendWinMessage('bot', '⚠️ Connection error. Please try again.');
  }

  isTyping = false;
  document.getElementById('win-send-btn').disabled = false;
  document.getElementById('win-chat-input')?.focus();
}

function appendWinMessage(role, text) {
  const msgs = document.getElementById('win-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const label = role === 'bot' ? 'O.R.C.A AI' : 'You';
  div.innerHTML = `<div class="chat-msg-label">${label}</div>${escapeHtml(text)}`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showWinTyping() {
  const msgs = document.getElementById('win-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'win-typing';
  div.innerHTML = `<div class="chat-msg-label">O.R.C.A AI</div><div class="typing-indicator"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeWinTyping() {
  document.getElementById('win-typing')?.remove();
}

function sendChip(chip) {
  const input = document.getElementById('win-chat-input');
  input.value = chip.textContent;
  winSendChat();
}

function hideChips() {
  const s = document.getElementById('win-suggestions');
  if (s) s.style.display = 'none';
}

// ── Theme ─────────────────────────────────────────────────────
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

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ── Expose ────────────────────────────────────────────────────
window.toggleChatWindow = toggleChatWindow;
window.winSendChat = winSendChat;
window.sendChip = sendChip;
window.toggleDashTheme = toggleDashTheme;
window.nextTourStep = nextTourStep;
window.endTour = endTour;