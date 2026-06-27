/* ====================================
   O.R.C.A — Login Page Logic
   Firebase Auth + i18n + Theme + UI
   ==================================== */

'use strict';

// ── Firebase ──────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

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

// ── Translations ──────────────────────────────────────────────
const translations = {
  en: {
    ksp_full: 'Organised Crime Analysis Authority',
    scrb: 'State Crime Records Bureau',
    auth_title: 'Secure Access Portal',
    auth_subtitle: 'Authorised personnel only — Government of Karnataka',
    login: 'Login',
    signup: 'Sign Up',
    officer_id: 'Officer ID / Badge Number',
    password: 'Password',
    remember: 'Remember this device',
    forgot: 'Forgot Password?',
    login_btn: 'Login to Portal',
    or_continue: 'or continue with',
    demo_access: 'Demo Access',
    first_name: 'First Name',
    last_name: 'Last Name',
    badge_no: 'Badge / Officer ID',
    rank: 'Rank & Designation',
    select_rank: 'Select Rank',
    station: 'Police Station / Unit',
    gov_email: 'Government Email',
    create_password: 'Create Password',
    agree_terms: 'I agree to the Official Secrets Act obligations and O.R.C.A data policy',
    request_access: 'Request Access',
    approval_note: '⚠️ Account requires approval from your Station House Officer (SHO) before activation.',
    legal_note: 'This system is for authorised Organised Crime Analysis Authority personnel only. Unauthorised access is a punishable offence under IT Act 2000 & IPC.',
  },
  hi: {
    ksp_full: 'कर्नाटक राज्य पुलिस',
    scrb: 'राज्य अपराध अभिलेख ब्यूरो',
    auth_title: 'सुरक्षित प्रवेश पोर्टल',
    auth_subtitle: 'केवल अधिकृत कार्मिक — कर्नाटक सरकार',
    login: 'लॉगिन',
    signup: 'पंजीकरण',
    officer_id: 'अधिकारी ID / बैज नंबर',
    password: 'पासवर्ड',
    remember: 'इस डिवाइस को याद रखें',
    forgot: 'पासवर्ड भूल गए?',
    login_btn: 'पोर्टल में लॉगिन करें',
    or_continue: 'या इसके साथ जारी रखें',
    demo_access: 'डेमो एक्सेस',
    first_name: 'पहला नाम',
    last_name: 'अंतिम नाम',
    badge_no: 'बैज / अधिकारी ID',
    rank: 'पद एवं पदनाम',
    select_rank: 'पद चुनें',
    station: 'पुलिस स्टेशन / यूनिट',
    gov_email: 'सरकारी ईमेल',
    create_password: 'पासवर्ड बनाएं',
    agree_terms: 'मैं आधिकारिक गोपनीयता अधिनियम और O.R.C.A डेटा नीति से सहमत हूं',
    request_access: 'एक्सेस के लिए अनुरोध करें',
    approval_note: '⚠️ खाते को SHO की स्वीकृति के बाद ही सक्रिय किया जाएगा।',
    legal_note: 'यह प्रणाली केवल अधिकृत कर्नाटक पुलिस कार्मिकों के लिए है।',
  },
  kn: {
    ksp_full: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್',
    scrb: 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆ ಬ್ಯೂರೋ',
    auth_title: 'ಸುರಕ್ಷಿತ ಪ್ರವೇಶ ಪೋರ್ಟಲ್',
    auth_subtitle: 'ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಮಾತ್ರ — ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    login: 'ಲಾಗಿನ್',
    signup: 'ನೋಂದಣಿ',
    officer_id: 'ಅಧಿಕಾರಿ ID / ಬ್ಯಾಡ್ಜ್ ಸಂಖ್ಯೆ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    remember: 'ಈ ಸಾಧನವನ್ನು ನೆನಪಿಡಿ',
    forgot: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    login_btn: 'ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    or_continue: 'ಅಥವಾ ಮುಂದುವರಿಸಿ',
    demo_access: 'ಡೆಮೋ ಪ್ರವೇಶ',
    first_name: 'ಮೊದಲ ಹೆಸರು',
    last_name: 'ಕೊನೆಯ ಹೆಸರು',
    badge_no: 'ಬ್ಯಾಡ್ಜ್ / ಅಧಿಕಾರಿ ID',
    rank: 'ಹುದ್ದೆ ಮತ್ತು ಪದನಾಮ',
    select_rank: 'ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ',
    station: 'ಪೊಲೀಸ್ ಠಾಣೆ / ಘಟಕ',
    gov_email: 'ಸರ್ಕಾರಿ ಇಮೇಲ್',
    create_password: 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
    agree_terms: 'ನಾನು ಅಧಿಕೃತ ರಹಸ್ಯ ಕಾಯ್ದೆ ಮತ್ತು O.R.C.A ಡೇಟಾ ನೀತಿಗೆ ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ',
    request_access: 'ಪ್ರವೇಶಕ್ಕಾಗಿ ವಿನಂತಿ ಮಾಡಿ',
    approval_note: '⚠️ ಖಾತೆಯನ್ನು ನಿಮ್ಮ SHO ಅನುಮೋದನೆ ನಂತರ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ.',
    legal_note: 'ಈ ವ್ಯವಸ್ಥೆ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಸಿಬ್ಬಂದಿಗಾಗಿ ಮಾತ್ರ.',
  }
};

// ── Firebase Error Messages ───────────────────────────────────
function getFriendlyError(code) {
  const errors = {
    'auth/user-not-found':      'No account found with this email.',
    'auth/wrong-password':      'Incorrect password. Please try again.',
    'auth/invalid-email':       'Please enter a valid email address.',
    'auth/email-already-in-use':'This email is already registered.',
    'auth/weak-password':       'Password must be at least 6 characters.',
    'auth/too-many-requests':   'Too many attempts. Please wait and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/invalid-credential':  'Invalid credentials. Check your email and password.',
  };
  return errors[code] || 'Something went wrong. Please try again.';
}

// ── State ─────────────────────────────────────────────────────
let currentLang = localStorage.getItem('ksp-lang') || 'en';
let currentTheme = localStorage.getItem('ksp-theme') || 'light';

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLang(currentLang);
  setupPasswordStrength();

  // If user is already logged in, go straight to dashboard
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = 'dashboard.html';
    }
  });
});

// ── Theme ─────────────────────────────────────────────────────
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('ksp-theme', currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
}

// ── Language ──────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  applyLang(lang);
  localStorage.setItem('ksp-lang', lang);
}

function applyLang(lang) {
  const t = translations[lang] || translations.en;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  ['en', 'hi', 'kn'].forEach(l => {
    const btnMini = document.getElementById(`lang-${l}-mini`);
    if (btnMini) btnMini.classList.toggle('active', l === lang);
  });
}

// ── Tab Switcher ──────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.id === `tab-${tab}`);
    t.setAttribute('aria-selected', t.id === `tab-${tab}` ? 'true' : 'false');
  });
  document.querySelectorAll('.auth-panel').forEach(p => {
    p.classList.toggle('active', p.id === `panel-${tab}`);
  });
}

// ── Login Handler (Firebase) ──────────────────────────────────
function handleLogin(e) {
  e.preventDefault();

  const emailInput = document.getElementById('login-id');
  const passInput  = document.getElementById('login-pass');
  const btn        = document.getElementById('login-btn');
  const text       = btn.querySelector('.btn-text');
  const loader     = btn.querySelector('.btn-loader');

  const email    = emailInput.value.trim();
  const password = passInput.value;

  if (!email || !password) {
    showToast('Please enter your email and password.', 'error');
    return;
  }

  // Show loading state
  text.classList.add('hidden');
  loader.classList.remove('hidden');
  btn.disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showToast('✅ Access granted. Welcome, Officer!', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    })
    .catch((error) => {
      text.classList.remove('hidden');
      loader.classList.add('hidden');
      btn.disabled = false;
      showToast('❌ ' + getFriendlyError(error.code), 'error');
    });
}

// ── Signup Handler (Firebase) ─────────────────────────────────
function handleSignup(e) {
  e.preventDefault();

  const email    = document.getElementById('su-email').value.trim();
  const password = document.getElementById('su-pass').value;
  const fname    = document.getElementById('su-fname').value.trim();
  const lname    = document.getElementById('su-lname').value.trim();

  if (!email || !password || !fname || !lname) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const submitBtn = document.querySelector('#signup-form .auth-btn.primary');
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Creating account...';

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showToast('✅ Account created! Redirecting to dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent =
        translations[currentLang]?.request_access || 'Request Access';
      showToast('❌ ' + getFriendlyError(error.code), 'error');
    });
}

// ── Demo Login ────────────────────────────────────────────────
function handleDemoLogin() {
  // Sign in with a demo account — create this in Firebase console
  signInWithEmailAndPassword(auth, 'demo@orca.gov.in', 'Demo@1234')
    .then(() => {
      showToast('🎯 Demo mode activated. Welcome to O.R.C.A!', 'info');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    })
    .catch(() => {
      // If demo account doesn't exist yet, just navigate
      showToast('🎯 Demo mode — redirecting...', 'info');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
}

// ── Password Visibility ───────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

// ── Password Strength ─────────────────────────────────────────
function setupPasswordStrength() {
  const passInput = document.getElementById('su-pass');
  const fill = document.getElementById('strength-fill');
  if (!passInput || !fill) return;

  passInput.addEventListener('input', () => {
    const v = passInput.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    const pct = (score / 4) * 100;
    fill.style.width = `${pct}%`;
    const colors = ['#ef4444', '#f97316', '#eab308', '#16a34a'];
    fill.style.backgroundColor = colors[score - 1] || '#ef4444';
  });
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#1a3a6e; color:#fff; padding:12px 24px; border-radius:8px;
      font-size:0.9rem; font-weight:600; z-index:9999; opacity:0;
      transition:opacity 0.3s; pointer-events:none; white-space:nowrap;
    `;
  }
  const colors = { success:'#16a34a', error:'#dc2626', info:'#1a3a6e' };
  toast.style.background = colors[type] || colors.info;
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}

// ── Keyboard Accessibility ────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // On login page, Escape does nothing (no overlay to close)
  }
});

// ── Expose functions to HTML onclick ─────────────────────────
window.handleLogin      = handleLogin;
window.handleSignup     = handleSignup;
window.handleDemoLogin  = handleDemoLogin;
window.switchTab        = switchTab;
window.togglePassword   = togglePassword;
window.toggleTheme      = toggleTheme;
window.setLang          = setLang;