/* Dashboard JS — O.R.C.A */
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// ── Groq API (key lives in .env as VITE_GROQ_KEY) ──
const GROQ_API_KEY = import.meta.env.VITE_GROQ_KEY;
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the O.R.C.A Intelligence Assistant — an AI for the Organised Crime Analysis Authority, Karnataka Police. You help authorised law enforcement officers query crime records, identify patterns, analyse suspects, and generate intelligence reports. Be concise, precise, and professional. Use structured responses where helpful. Never fabricate case numbers or personal data; note when you're working from general knowledge vs actual database records. You assist with: crime trend analysis, case status queries, hotspot identification, officer deployment insights, and report generation.`;

// ── Firebase ──
const firebaseConfig = {
  apiKey: "AIzaSyC3Ndt8ev-6mcV4CsYVSrhwatN4iUJpogc",
  authDomain: "orca-49591.firebaseapp.com",
  projectId: "orca-49591",
  storageBucket: "orca-49591.firebasestorage.app",
  messagingSenderId: "851973313915",
  appId: "1:851973313915:web:9bf5d3ae16bc51e8a7d9de"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Theme ──
let currentTheme = localStorage.getItem('orca-dash-theme') || 'light';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  const btn = document.getElementById('dash-theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleDashTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('orca-dash-theme', currentTheme);
}

window.toggleDashTheme = toggleDashTheme;

// ── Chat State ──
let chatHistory = [];
let queryCount  = 0;

// ── Chat: Toggle panel ──
function toggleChat() {
  const wrapper = document.getElementById('chat-wrapper');
  const panel   = document.getElementById('chat-panel');
  wrapper.classList.toggle('is-open');
  panel.classList.toggle('is-open');
  document.getElementById('bubble-badge')?.classList.add('hidden');
  document.getElementById('bubble-tooltip')?.classList.add('hidden');
  if (panel.classList.contains('is-open')) {
    document.getElementById('chat-input')?.focus();
  }
}

// ── Chat: Send suggestion chip ──
function sendSuggestion(btn) {
  const input = document.getElementById('chat-input');
  if (input) input.value = btn.textContent;
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';
  sendMessage();
}

// ── Chat: Append message bubble ──
function appendMsg(role, text) {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'bot') {
    const label = document.createElement('div');
    label.className = 'msg-label';
    label.textContent = 'O.R.C.A AI';
    div.appendChild(label);

    const p = document.createElement('div');
    p.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    div.appendChild(p);
  } else {
    div.textContent = text;
  }

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

// ── Chat: Typing indicator ──
function appendTyping() {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg typing';
  div.innerHTML = `
    <div class="msg-label">O.R.C.A AI</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

// ── Chat: Send message to Groq ──
async function sendMessage() {
  const input   = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const text    = input?.value.trim();
  if (!text) return;

  appendMsg('user', text);
  input.value = '';
  chatHistory.push({ role: 'user', content: text });

  // Update query counter on dashboard
  queryCount++;
  const qc = document.getElementById('query-count');
  if (qc) qc.textContent = queryCount;

  if (sendBtn) sendBtn.disabled = true;
  const typingEl = appendTyping();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...chatHistory
        ],
        max_tokens: 512,
        temperature: 0.4,
        stream: false
      })
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

    const data  = await response.json();
    const reply = data.choices[0].message.content;

    typingEl.remove();
    appendMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });

  } catch (err) {
    typingEl.remove();
    appendMsg('bot', '⚠️ Unable to reach Groq API. Please check your API key or network connection.');
    console.error('Groq error:', err);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    input?.focus();
  }
}

// ── Expose to HTML onclick attributes ──
window.toggleChat    = toggleChat;
window.sendSuggestion = sendSuggestion;
window.sendMessage   = sendMessage;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  // Firebase auth guard
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      const emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = user.email;
    }
  });

  // Logout
  document.querySelector('.logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => { window.location.href = 'login.html'; });
  });

  // Chat input — send on Enter
  document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Show tooltip only on first visit, then auto-hide after 6s
  const hasSeenTooltip = localStorage.getItem('orca-chat-tooltip-seen');
  if (!hasSeenTooltip) {
    const tooltip = document.getElementById('bubble-tooltip');
    if (tooltip) {
      tooltip.classList.remove('hidden');
      setTimeout(() => {
        tooltip.classList.add('hidden');
      }, 6000);
    }
    localStorage.setItem('orca-chat-tooltip-seen', 'true');
  }
});

// ── Re-show tooltip manually via the "?" help button ──
function showBubbleTooltip() {
  const tooltip = document.getElementById('bubble-tooltip');
  if (!tooltip) return;
  tooltip.classList.remove('hidden');
  clearTimeout(window._tooltipHideTimer);
  window._tooltipHideTimer = setTimeout(() => {
    tooltip.classList.add('hidden');
  }, 5000);
}
window.showBubbleTooltip = showBubbleTooltip;