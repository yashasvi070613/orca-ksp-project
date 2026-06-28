/* Dashboard JS — O.R.C.A with Chatbot */
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

// ── Catalyst Function URL ──────────────────────────────────────
const CATALYST_URL = 'https://orca-60075642287.development.catalystserverless.in/server/orca-chat/';

// ── State ─────────────────────────────────────────────────────
let queryCount = 0;
let isTyping = false;
let currentTheme = localStorage.getItem('orca-dash-theme') || 'light';

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Apply saved theme
  applyTheme(currentTheme);

  // Auth guard
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      const emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = user.email;
    }
  });

  // Logout
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.href = 'login.html';
      });
    });
  }
});

// ── Send Chat ─────────────────────────────────────────────────
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

    // Update query count
    queryCount++;
    const countEl = document.getElementById('query-count');
    if (countEl) countEl.textContent = queryCount;

  } catch (err) {
    removeTyping();
    appendMessage('bot', '⚠️ Unable to connect to O.R.C.A AI. Please check your connection and try again.');
  }

  isTyping = false;
  document.getElementById('send-btn').disabled = false;
  document.getElementById('chat-input').focus();
}

// ── Append Message ────────────────────────────────────────────
function appendMessage(role, text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'bot') {
    div.innerHTML = `<div class="msg-label">O.R.C.A AI</div>${escapeHtml(text)}`;
  } else {
    div.innerHTML = `<div class="msg-label">You</div>${escapeHtml(text)}`;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// ── Typing Indicator ──────────────────────────────────────────
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
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

// ── Suggestions ───────────────────────────────────────────────
function sendSuggestion(chip) {
  const input = document.getElementById('chat-input');
  input.value = chip.textContent;
  sendChat();
}

function hideSuggestions() {
  const s = document.getElementById('suggestions');
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

// ── Escape HTML ───────────────────────────────────────────────
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ── Expose to window ──────────────────────────────────────────
window.sendChat = sendChat;
window.sendSuggestion = sendSuggestion;
window.toggleDashTheme = toggleDashTheme;