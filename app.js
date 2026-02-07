// ─── Rosário App — Vanilla JS ───

const view = document.getElementById("view");
const tabbar = document.getElementById("tabbar");
const header = document.getElementById("header");
const tabs = Array.from(document.querySelectorAll(".tab-item"));
const msgBtn = document.getElementById("msgBtn");
const notifDot = document.getElementById("notifDot");

// ─── Auth ───
const FAKE_USERS = {
  aluno: { pass: "1234", name: "Maria Santos", turma: "10ºA", numero: 14, role: "aluno" },
  prof: { pass: "1234", name: "Prof. Carvalho", turma: null, numero: null, role: "professor" },
};

let currentUser = null;
let currentTab = "home";

function isAuthed() { return sessionStorage.getItem("rosario_authed") === "1"; }
function getStoredUser() { try { return JSON.parse(sessionStorage.getItem("rosario_user")); } catch { return null; } }
function setAuthed(user) {
  if (user) {
    sessionStorage.setItem("rosario_authed", "1");
    sessionStorage.setItem("rosario_user", JSON.stringify(user));
    currentUser = user;
  } else {
    sessionStorage.removeItem("rosario_authed");
    sessionStorage.removeItem("rosario_user");
    currentUser = null;
  }
}

// ─── Data ───
const SCHEDULE = {
  seg: [
    { time: "08:30", end: "09:15", subject: "Matemática A", room: "S12", teacher: "Prof. Carvalho" },
    { time: "09:25", end: "10:10", subject: "Português", room: "S05", teacher: "Prof.ª Mendes" },
    { time: "10:30", end: "11:15", subject: "Física e Química A", room: "Lab2", teacher: "Prof. Sousa" },
    { time: "11:25", end: "12:10", subject: "Inglês", room: "S08", teacher: "Prof.ª Costa" },
    { time: "13:30", end: "14:15", subject: "Filosofia", room: "S03", teacher: "Prof. Almeida" },
    { time: "14:25", end: "15:10", subject: "Educação Física", room: "Pav.", teacher: "Prof. Rocha" },
  ],
  ter: [
    { time: "08:30", end: "09:15", subject: "Português", room: "S05", teacher: "Prof.ª Mendes" },
    { time: "09:25", end: "10:10", subject: "Matemática A", room: "S12", teacher: "Prof. Carvalho" },
    { time: "10:30", end: "11:15", subject: "Biologia e Geologia", room: "Lab1", teacher: "Prof.ª Ferreira" },
    { time: "11:25", end: "12:10", subject: "Biologia e Geologia", room: "Lab1", teacher: "Prof.ª Ferreira" },
    { time: "13:30", end: "14:15", subject: "Inglês", room: "S08", teacher: "Prof.ª Costa" },
  ],
  qua: [
    { time: "08:30", end: "09:15", subject: "Física e Química A", room: "Lab2", teacher: "Prof. Sousa" },
    { time: "09:25", end: "10:10", subject: "Física e Química A", room: "Lab2", teacher: "Prof. Sousa" },
    { time: "10:30", end: "11:15", subject: "Matemática A", room: "S12", teacher: "Prof. Carvalho" },
    { time: "11:25", end: "12:10", subject: "Português", room: "S05", teacher: "Prof.ª Mendes" },
    { time: "13:30", end: "14:15", subject: "Educação Física", room: "Pav.", teacher: "Prof. Rocha" },
    { time: "14:25", end: "15:10", subject: "Educação Física", room: "Pav.", teacher: "Prof. Rocha" },
  ],
  qui: [
    { time: "08:30", end: "09:15", subject: "Inglês", room: "S08", teacher: "Prof.ª Costa" },
    { time: "09:25", end: "10:10", subject: "Filosofia", room: "S03", teacher: "Prof. Almeida" },
    { time: "10:30", end: "11:15", subject: "Português", room: "S05", teacher: "Prof.ª Mendes" },
    { time: "11:25", end: "12:10", subject: "Matemática A", room: "S12", teacher: "Prof. Carvalho" },
    { time: "13:30", end: "14:15", subject: "Biologia e Geologia", room: "Lab1", teacher: "Prof.ª Ferreira" },
  ],
  sex: [
    { time: "08:30", end: "09:15", subject: "Matemática A", room: "S12", teacher: "Prof. Carvalho" },
    { time: "09:25", end: "10:10", subject: "Biologia e Geologia", room: "Lab1", teacher: "Prof.ª Ferreira" },
    { time: "10:30", end: "11:15", subject: "Filosofia", room: "S03", teacher: "Prof. Almeida" },
    { time: "11:25", end: "12:10", subject: "Português", room: "S05", teacher: "Prof.ª Mendes" },
  ],
};

const DAY_NAMES = { seg: "Segunda", ter: "Terça", qua: "Quarta", qui: "Quinta", sex: "Sexta" };
const DAY_KEYS = ["seg", "ter", "qua", "qui", "sex"];

const CAFETERIA = [
  { day: "seg", soup: "Creme de cenoura", main: "Bacalhau à Brás", veg: "Tofu grelhado c/ legumes", dessert: "Fruta da época" },
  { day: "ter", soup: "Sopa de legumes", main: "Frango grelhado c/ arroz", veg: "Bolonhesa de lentilhas", dessert: "Mousse de chocolate" },
  { day: "qua", soup: "Caldo verde", main: "Douradinhos c/ puré", veg: "Caril de grão", dessert: "Gelatina" },
  { day: "qui", soup: "Creme de ervilhas", main: "Massa à bolonhesa", veg: "Hambúrguer de feijão", dessert: "Fruta da época" },
  { day: "sex", soup: "Sopa de tomate", main: "Peixe espada grelhado", veg: "Risoto de cogumelos", dessert: "Pudim flan" },
];

const GRADES = [
  { subject: "Matemática A", t1: 15, t2: 16, t3: null },
  { subject: "Português", t1: 14, t2: 13, t3: null },
  { subject: "Física e Química A", t1: 17, t2: 18, t3: null },
  { subject: "Biologia e Geologia", t1: 13, t2: 14, t3: null },
  { subject: "Inglês", t1: 16, t2: 17, t3: null },
  { subject: "Filosofia", t1: 14, t2: 15, t3: null },
  { subject: "Educação Física", t1: 17, t2: 16, t3: null },
];

const EVENTS = [
  { title: "Torneio Inter-Turmas de Futsal", date: "2026-02-20", icon: "⚽" },
  { title: "Feira de Ciência", date: "2026-03-05", icon: "🔬" },
  { title: "Semana da Língua Portuguesa", date: "2026-03-18", icon: "📚" },
  { title: "Dia Aberto — Portas Abertas", date: "2026-04-02", icon: "🏫" },
  { title: "Visita de Estudo — Serralves", date: "2026-04-15", icon: "🎨" },
  { title: "Exames Nacionais — 1ª Fase", date: "2026-06-17", icon: "📝" },
];

let messages = [
  { id: 1, from: "Direção", subject: "Alteração de horário — 3ª feira", body: "Informamos que na próxima terça-feira as aulas da tarde terão início às 14h00 devido a uma reunião geral de professores.", date: "2026-02-06", read: false },
  { id: 2, from: "Prof.ª Mendes", subject: "Trabalho de Português", body: "Lembro que o prazo de entrega do trabalho sobre Os Lusíadas é dia 14 de fevereiro. Devem submeter no Teams.", date: "2026-02-05", read: false },
  { id: 3, from: "Secretaria", subject: "Declaração de matrícula", body: "A declaração de matrícula solicitada já se encontra disponível para levantamento na secretaria.", date: "2026-02-03", read: true },
  { id: 4, from: "Prof. Carvalho", subject: "Teste de Matemática", body: "O teste marcado para dia 12 de fevereiro cobrirá os capítulos 4 e 5. Tragam calculadora.", date: "2026-02-01", read: true },
];

// ─── Helpers ───
const SUBJECT_COLORS = {
  "Matemática A": "#2563eb", "Português": "#dc2626", "Física e Química A": "#d97706",
  "Biologia e Geologia": "#16a34a", "Inglês": "#7c3aed", "Filosofia": "#db2777", "Educação Física": "#0891b2",
};

function subjectColor(s) { return SUBJECT_COLORS[s] || "#6b7280"; }
function todayKey() { const d = new Date().getDay(); return d >= 1 && d <= 5 ? DAY_KEYS[d - 1] : "seg"; }
function daysUntil(ds) { const n = new Date(); n.setHours(0,0,0,0); const t = new Date(ds); t.setHours(0,0,0,0); return Math.ceil((t - n) / 86400000); }
function formatDate(ds) { return new Date(ds).toLocaleDateString("pt-PT", { day: "numeric", month: "short" }); }
function unreadCount() { return messages.filter(m => !m.read).length; }
function avgGrade() { return (GRADES.reduce((s, g) => s + (g.t2 ?? g.t1), 0) / GRADES.length).toFixed(1); }

function updateNotifDot() {
  notifDot.classList.toggle("hidden", unreadCount() === 0);
}

// ─── UI Chrome ───
function showChrome() { tabbar.classList.remove("hidden"); header.classList.remove("hidden"); }
function hideChrome() { tabbar.classList.add("hidden"); }

// ─── Renderers ───
function renderLogin(error = "") {
  hideChrome();
  header.classList.add("hidden");
  view.innerHTML = `
    <div class="login-screen fade-up">
      <div class="login-crest">🎓</div>
      <h1 class="login-title">Colégio do Rosário</h1>
      <p class="login-subtitle">Educamos para a Justiça para que todos tenham Vida</p>
      <div class="login-form">
        <input id="loginUser" class="login-input" placeholder="Utilizador" autocomplete="username" />
        <input id="loginPass" class="login-input" placeholder="Palavra-passe" type="password" autocomplete="current-password" />
        <button id="loginBtn" class="login-btn">Entrar</button>
        ${error ? `<p class="login-error">${error}</p>` : ""}
      </div>
      <div class="login-hint"><strong>Demo:</strong> aluno / 1234 &nbsp;ou&nbsp; prof / 1234</div>
    </div>`;

  const userEl = document.getElementById("loginUser");
  const passEl = document.getElementById("loginPass");
  const btnEl = document.getElementById("loginBtn");

  function tryLogin() {
    const u = userEl.value.trim().toLowerCase();
    const p = passEl.value;
    const user = FAKE_USERS[u];
    if (user && user.pass === p) {
      setAuthed(user);
      showChrome();
      setActive("home");
    } else {
      renderLogin("Credenciais inválidas.");
    }
  }

  btnEl.addEventListener("click", tryLogin);
  passEl.addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
  userEl.addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
  userEl.focus();
}

function renderHome() {
  const today = todayKey();
  const sched = SCHEDULE[today] || [];
  const nc = sched[0];
  const menu = CAFETERIA.find(c => c.day === today) || CAFETERIA[0];
  const nextEvent = EVENTS.find(e => daysUntil(e.date) > 0);
  const ur = unreadCount();
  const upcoming = EVENTS.filter(e => daysUntil(e.date) > 0).length;

  view.innerHTML = `
    <div class="welcome-banner fade-up">
      <div class="welcome-greeting">Olá, ${currentUser.name.split(" ")[0]} 👋</div>
      <div class="welcome-sub">${DAY_NAMES[today]}, ${new Date().toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}</div>
    </div>
    <div class="stat-grid fade-up fade-up-1">
      <div class="stat-card" data-goto="schedule"><div class="stat-icon">📚</div><div class="stat-value">${sched.length}</div><div class="stat-label">Aulas hoje</div></div>
      <div class="stat-card" data-goto="grades"><div class="stat-icon">📊</div><div class="stat-value">${avgGrade()}</div><div class="stat-label">Média atual</div></div>
      <div class="stat-card" data-goto="messages"><div class="stat-icon">✉️</div><div class="stat-value">${ur}</div><div class="stat-label">Não lidas</div></div>
      <div class="stat-card" data-goto="events"><div class="stat-icon">📅</div><div class="stat-value">${upcoming}</div><div class="stat-label">Eventos</div></div>
    </div>
    ${nc ? `
    <div class="card fade-up fade-up-2">
      <div class="card-header"><span class="card-title">Próxima aula</span><button class="card-link" data-goto="schedule">Ver horário</button></div>
      <div class="next-class">
        <div class="next-class-bar" style="background:${subjectColor(nc.subject)}"></div>
        <div><div class="next-class-subject">${nc.subject}</div><div class="next-class-meta">${nc.time} — ${nc.room} · ${nc.teacher}</div></div>
      </div>
    </div>` : ""}
    <div class="card fade-up fade-up-3">
      <div class="card-header"><span class="card-title">Cantina hoje</span><button class="card-link" data-goto="cafeteria">Ver ementa</button></div>
      <div style="font-size:14px;color:var(--text-secondary);line-height:1.6">🥣 ${menu.soup} · 🍖 ${menu.main}</div>
    </div>
    ${nextEvent ? `
    <div class="card fade-up fade-up-4">
      <div class="card-header"><span class="card-title">Próximo evento</span><button class="card-link" data-goto="events">Ver todos</button></div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="event-icon">${nextEvent.icon}</div>
        <div style="flex:1"><div style="font-weight:600;font-size:14px">${nextEvent.title}</div><div style="font-size:13px;color:var(--text-secondary)">${formatDate(nextEvent.date)} — daqui a ${daysUntil(nextEvent.date)} dia${daysUntil(nextEvent.date) !== 1 ? "s" : ""}</div></div>
      </div>
    </div>` : ""}`;

  view.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => setActive(el.dataset.goto));
  });
}

function renderSchedule(selectedDay) {
  const day = selectedDay || todayKey();
  const lessons = SCHEDULE[day] || [];
  view.innerHTML = `
    <h1 class="page-title fade-up">Horário</h1>
    <p class="page-sub fade-up">Semana de aulas — ${currentUser.turma || "Docente"}</p>
    <div class="day-tabs fade-up fade-up-1">
      ${DAY_KEYS.map(d => `<button class="day-tab ${d === day ? "active" : ""}" data-day="${d}">${DAY_NAMES[d].slice(0, 3)}</button>`).join("")}
    </div>
    <div class="card fade-up fade-up-2">
      ${lessons.length === 0 ? `<div style="padding:20px;text-align:center;color:var(--text-secondary)">Sem aulas neste dia</div>` :
        lessons.map(l => `
          <div class="lesson-item">
            <div class="lesson-time"><span>${l.time}</span><span class="lesson-time-end">${l.end}</span></div>
            <div class="lesson-bar" style="background:${subjectColor(l.subject)}"></div>
            <div class="lesson-info"><div class="lesson-subject">${l.subject}</div><div class="lesson-meta">${l.room} · ${l.teacher}</div></div>
          </div>`).join("")}
    </div>`;
  view.querySelectorAll(".day-tab").forEach(el => {
    el.addEventListener("click", () => renderSchedule(el.dataset.day));
  });
}

function renderCafeteria(selectedDay) {
  const day = selectedDay || todayKey();
  const menu = CAFETERIA.find(c => c.day === day) || CAFETERIA[0];
  const items = [["soup","🥣","Sopa","#e1ecfb"],["main","🍖","Prato","#edf1f7"],["veg","🥬","Vegetariano","#ecfdf5"],["dessert","🍮","Sobremesa","#fffbeb"]];
  view.innerHTML = `
    <h1 class="page-title fade-up">Cantina</h1>
    <p class="page-sub fade-up">Ementa semanal</p>
    <div class="day-tabs fade-up fade-up-1">
      ${DAY_KEYS.map(d => `<button class="day-tab ${d === day ? "active" : ""}" data-day="${d}">${DAY_NAMES[d].slice(0, 3)}</button>`).join("")}
    </div>
    <div class="card fade-up fade-up-2">
      ${items.map(([k, icon, label, bg]) => `
        <div class="menu-item">
          <div class="menu-icon" style="background:${bg}">${icon}</div>
          <div><div class="menu-label">${label}</div><div class="menu-value">${menu[k]}</div></div>
        </div>`).join("")}
    </div>`;
  view.querySelectorAll(".day-tab").forEach(el => {
    el.addEventListener("click", () => renderCafeteria(el.dataset.day));
  });
}

function renderGrades() {
  view.innerHTML = `
    <h1 class="page-title fade-up">Notas</h1>
    <p class="page-sub fade-up">Avaliações por período — ${currentUser.turma || ""}</p>
    <div class="card fade-up fade-up-1">
      <div class="grade-header">
        <span style="flex:1">Disciplina</span>
        <div class="grade-header-periods"><span>1ºP</span><span>2ºP</span><span>3ºP</span></div>
      </div>
      ${GRADES.map(g => `
        <div class="grade-row">
          <div class="grade-dot" style="background:${subjectColor(g.subject)}"></div>
          <div class="grade-subject">${g.subject}</div>
          <div class="grade-values">
            ${[g.t1, g.t2, g.t3].map(v =>
              `<div class="grade-chip ${v === null ? "na" : v >= 14 ? "good" : "mid"}">${v ?? "—"}</div>`
            ).join("")}
          </div>
        </div>`).join("")}
    </div>
    <div class="card avg-card fade-up fade-up-2">
      <div class="avg-label">Média atual (2º Período)</div>
      <div class="avg-value">${avgGrade()}</div>
      <div class="avg-scale">valores (0-20)</div>
    </div>`;
}

function renderEvents() {
  view.innerHTML = `
    <h1 class="page-title fade-up">Eventos</h1>
    <p class="page-sub fade-up">Atividades e datas importantes</p>
    <div class="card fade-up fade-up-1">
      ${EVENTS.map(e => {
        const d = daysUntil(e.date);
        return `
          <div class="event-item">
            <div class="event-icon">${e.icon}</div>
            <div class="event-info"><div class="event-title">${e.title}</div><div class="event-date">${formatDate(e.date)}</div></div>
            <span class="event-badge ${d <= 30 ? "soon" : "later"}">${d <= 0 ? "Hoje" : d + "d"}</span>
          </div>`;
      }).join("")}
    </div>`;
}

function renderMessages() {
  const ur = unreadCount();
  view.innerHTML = `
    <h1 class="page-title fade-up">Mensagens</h1>
    <p class="page-sub fade-up">${ur} não lida${ur !== 1 ? "s" : ""}</p>
    <div class="card fade-up fade-up-1">
      ${messages.map(m => `
        <div class="msg-item" data-msgid="${m.id}">
          <div class="msg-top">
            <span class="msg-from">${!m.read ? '<span class="msg-unread-dot"></span>' : ""}${m.from}</span>
            <span class="msg-date">${formatDate(m.date)}</span>
          </div>
          <div class="msg-subject" style="font-weight:${m.read ? 400 : 600}">${m.subject}</div>
          <div class="msg-preview">${m.body}</div>
        </div>`).join("")}
    </div>`;
  view.querySelectorAll(".msg-item").forEach(el => {
    el.addEventListener("click", () => renderMessageDetail(parseInt(el.dataset.msgid)));
  });
}

function renderMessageDetail(id) {
  const m = messages.find(x => x.id === id);
  if (!m) return;
  m.read = true;
  updateNotifDot();
  view.innerHTML = `
    <button class="back-btn fade-up" id="backBtn">← Voltar</button>
    <div class="card fade-up fade-up-1">
      <div style="font-weight:600;font-size:16px;margin-bottom:2px">${m.from}</div>
      <div style="font-weight:600;font-size:15px;margin-bottom:4px">${m.subject}</div>
      <div style="font-size:12px;color:var(--text-secondary)">${formatDate(m.date)}</div>
      <div class="msg-body-full">${m.body}</div>
    </div>`;
  document.getElementById("backBtn").addEventListener("click", () => renderMessages());
}

function renderProfile() {
  const u = currentUser;
  const rows = [
    ["Nome", u.name],
    u.turma ? ["Turma", u.turma] : null,
    u.numero ? ["Número", u.numero] : null,
    ["Perfil", u.role.charAt(0).toUpperCase() + u.role.slice(1)],
    ["Ano letivo", "2025/2026"],
  ].filter(Boolean);

  view.innerHTML = `
    <div class="profile-header fade-up">
      <div class="profile-avatar">${u.name[0]}</div>
      <div class="profile-name">${u.name}</div>
      <div class="profile-detail">${u.role === "aluno" ? u.turma + " · Nº " + u.numero : "Docente"}</div>
    </div>
    <div class="card fade-up fade-up-1">
      ${rows.map(([l, v]) => `
        <div class="profile-row">
          <span class="profile-row-label">${l}</span>
          <span class="profile-row-value">${v}</span>
        </div>`).join("")}
    </div>
    <button class="logout-btn fade-up fade-up-2" id="logoutBtn">Terminar sessão</button>`;
  document.getElementById("logoutBtn").addEventListener("click", () => {
    setAuthed(null);
    renderLogin();
  });
}

// ─── Navigation ───
const renderers = {
  home: renderHome,
  schedule: renderSchedule,
  cafeteria: renderCafeteria,
  grades: renderGrades,
  events: renderEvents,
  messages: renderMessages,
  profile: renderProfile,
};

function setActive(tabName) {
  currentTab = tabName;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  view.scrollTo(0, 0);
  updateNotifDot();
  if (renderers[tabName]) renderers[tabName]();
}

// Tab clicks
tabs.forEach(t => t.addEventListener("click", () => {
  if (!currentUser) return;
  setActive(t.dataset.tab);
}));

// Message button
msgBtn.addEventListener("click", () => {
  if (!currentUser) return;
  setActive("messages");
});

// Scroll shadow on header
if (view) {
  view.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", view.scrollTop > 8);
  }, { passive: true });
}

// ─── Init ───
if (isAuthed()) {
  currentUser = getStoredUser();
  if (currentUser) {
    showChrome();
    setActive("home");
  } else {
    renderLogin();
  }
} else {
  renderLogin();
}
