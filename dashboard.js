/* Dashboard JS — O.R.C.A */
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_KEY;
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the O.R.C.A Intelligence Assistant — an AI for the Organised Crime Analysis Authority, Karnataka Police. You help authorised law enforcement officers query crime records, identify patterns, analyse suspects, and generate intelligence reports. Be concise, precise, and professional.`;

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

let currentTheme = localStorage.getItem('orca-dash-theme') || 'light';
let chatHistory = [];
let queryCount = 0;
let tourSteps = [];
let currentTourStep = 0;

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

function toggleChat() {
  const wrapper = document.getElementById('chat-wrapper');
  const panel = document.getElementById('chat-panel');
  wrapper?.classList.toggle('is-open');
  panel?.classList.toggle('is-open');
  document.getElementById('bubble-badge')?.classList.add('hidden');
  document.getElementById('bubble-tooltip')?.classList.add('hidden');
  if (panel?.classList.contains('is-open')) {
    document.getElementById('chat-input')?.focus();
  }
}
window.toggleChat = toggleChat;

function sendSuggestion(btn) {
  const input = document.getElementById('chat-input');
  if (input) input.value = btn.textContent;
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';
  sendMessage();
}
window.sendSuggestion = sendSuggestion;

function appendMsg(role, text) {
  const box = document.getElementById('chat-messages');
  if (!box) return null;
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'bot') {
    const label = document.createElement('div');
    label.className = 'msg-label';
    label.textContent = 'O.R.C.A AI';
    div.appendChild(label);

    const p = document.createElement('div');
    p.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    div.appendChild(p);
  } else {
    div.textContent = text;
  }

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function appendTyping() {
  const box = document.getElementById('chat-messages');
  if (!box) return null;
  const div = document.createElement('div');
  div.className = 'msg typing';
  div.innerHTML = `
    <div class="msg-label">O.R.C.A AI</div>
    <div class="typing-dots"><span></span><span></span><span></span></div>
  `;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const text = input?.value.trim();
  if (!text) return;

  appendMsg('user', text);
  input.value = '';
  chatHistory.push({ role: 'user', content: text });

  queryCount++;
  const qc = document.getElementById('query-count');
  if (qc) qc.textContent = queryCount;

  if (sendBtn) sendBtn.disabled = true;
  const typingEl = appendTyping();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...chatHistory],
        max_tokens: 512,
        temperature: 0.4,
        stream: false
      })
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`);
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'No response received.';

    typingEl?.remove();
    appendMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    typingEl?.remove();
    appendMsg('bot', '⚠️ Unable to reach Groq API. Please check your API key or network connection.');
    console.error(err);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    input?.focus();
  }
}
window.sendMessage = sendMessage;

/* ───────── Onboarding ───────── */
const TOUR_STORAGE_KEY = 'orca-dashboard-tour-completed';

function getTourSteps() {
  return [
    { target: '.sidebar', title: 'Navigation Sidebar', text: 'Use this sidebar to move across modules.' },
    { target: '.metrics-grid', title: 'Live Metrics', text: 'These cards show active KPIs and status.' },
    { target: '#crime-logs', title: 'Recent Crime Logs', text: 'Track case entries and statuses here.' },
    { target: '#chat-wrapper', title: 'AI Assistant', text: 'Use this for quick intelligence queries.' }
  ];
}

function createTourDots(total, active) {
  const wrap = document.getElementById('spotlight-dots');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('span');
    d.className = `dot ${i === active ? 'active' : ''}`;
    wrap.appendChild(d);
  }
}

function clearTourHighlight() {
  document.querySelectorAll('.onboard-ring').forEach(el => el.classList.remove('onboard-ring'));
}

function positionTooltipNear(targetEl, stepIndex) {
  const tooltip = document.getElementById('spotlight-tooltip');
  if (!tooltip) return;

  // hard pin for chat step
  if (stepIndex === 3) {
    tooltip.style.left = '24px';
    tooltip.style.bottom = '24px';
    tooltip.style.top = 'auto';
    return;
  }

  const rect = targetEl.getBoundingClientRect();
  const pad = 16;
  tooltip.style.bottom = 'auto';
  tooltip.style.top = `${Math.max(pad, rect.top)}px`;
  tooltip.style.left = `${Math.max(pad, rect.left + rect.width + 12)}px`;

  const t = tooltip.getBoundingClientRect();
  if (t.right > window.innerWidth - pad) {
    tooltip.style.left = `${Math.max(pad, rect.left - t.width - 12)}px`;
  }
  if (t.bottom > window.innerHeight - pad) {
    tooltip.style.top = `${Math.max(pad, window.innerHeight - t.height - pad)}px`;
  }
}

function renderTourStep(index) {
  const step = tourSteps[index];
  if (!step) return finishTour();

  const targetEl = document.querySelector(step.target);
  if (!targetEl) return nextTourStep();

  clearTourHighlight();
  targetEl.classList.add('onboard-ring');
  targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

  const label = document.getElementById('spotlight-step-label');
  const title = document.getElementById('spotlight-title');
  const text = document.getElementById('spotlight-text');
  const nextBtn = document.getElementById('spotlight-next-btn');

  if (label) label.textContent = `Step ${index + 1} of ${tourSteps.length}`;
  if (title) title.textContent = step.title;
  if (text) text.textContent = step.text;
  if (nextBtn) nextBtn.textContent = index === tourSteps.length - 1 ? 'Finish' : 'Next';

  createTourDots(tourSteps.length, index);
  setTimeout(() => positionTooltipNear(targetEl, index), 80);
}

function openTourOverlay() {
  const overlay = document.getElementById('spotlight-overlay');
  overlay?.classList.add('active');
  overlay?.setAttribute('aria-hidden', 'false');
}
function closeTourOverlay() {
  const overlay = document.getElementById('spotlight-overlay');
  overlay?.classList.remove('active');
  overlay?.setAttribute('aria-hidden', 'true');
  clearTourHighlight();
}
function nextTourStep() {
  currentTourStep += 1;
  if (currentTourStep >= tourSteps.length) finishTour();
  else renderTourStep(currentTourStep);
}
function finishTour() {
  localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  closeTourOverlay();
}
function skipTour() { finishTour(); }

function startOnboarding(force = false) {
  const completed = localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  if (completed && !force) return;
  tourSteps = getTourSteps();
  currentTourStep = 0;
  openTourOverlay();
  renderTourStep(currentTourStep);
}
window.startOnboarding = startOnboarding;

function showBubbleTooltip() {
  const tooltip = document.getElementById('bubble-tooltip');
  if (!tooltip) return;
  tooltip.classList.remove('hidden');
  clearTimeout(window._tooltipHideTimer);
  window._tooltipHideTimer = setTimeout(() => tooltip.classList.add('hidden'), 5000);
}
window.showBubbleTooltip = showBubbleTooltip;

/* ───────── Init ───────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = 'login.html';
    else {
      const emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = user.email;
    }
  });

  document.querySelector('.logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => { window.location.href = 'login.html'; });
  });

  document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  const hasSeenTooltip = localStorage.getItem('orca-chat-tooltip-seen');
  if (!hasSeenTooltip) {
    const t = document.getElementById('bubble-tooltip');
    if (t) {
      t.classList.remove('hidden');
      setTimeout(() => t.classList.add('hidden'), 6000);
    }
    localStorage.setItem('orca-chat-tooltip-seen', 'true');
  }

  document.getElementById('spotlight-next-btn')?.addEventListener('click', nextTourStep);
  document.getElementById('spotlight-skip-btn')?.addEventListener('click', skipTour);

  setTimeout(() => startOnboarding(false), 700);

  window.addEventListener('resize', () => {
    const overlay = document.getElementById('spotlight-overlay');
    if (overlay?.classList.contains('active') && tourSteps[currentTourStep]) {
      const currentEl = document.querySelector(tourSteps[currentTourStep].target);
      if (currentEl) positionTooltipNear(currentEl, currentTourStep);
    }
  });
});