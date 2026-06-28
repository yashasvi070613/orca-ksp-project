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

// Tour disabled for now

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      const emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = user.email;

      // Tour disabled for now
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

// Tour functions removed — to be re-added later

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