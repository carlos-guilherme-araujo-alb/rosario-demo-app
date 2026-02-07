const view = document.getElementById("view");
const tabs = Array.from(document.querySelectorAll(".tab"));
const darkToggle = document.getElementById("darkToggle");

const data = {
  schedule: [
    { time: "08:30", subject: "Matemática" },
    { time: "09:25", subject: "Português" },
    { time: "10:20", subject: "Física e Química" },
    { time: "11:15", subject: "Inglês" },
    { time: "12:10", subject: "História" },
    { time: "13:05", subject: "Educação Física" }
  ],
  cafeteria: {
    soup: "Sopa de legumes",
    main: "Frango grelhado com arroz",
    veg: "Bolonhesa de lentilhas",
    dessert: "Fruta da época"
  },
  events: [
    { title: "Torneio Inter-Turmas", date: "2026-02-20" },
    { title: "Feira de Ciência", date: "2026-03-05" },
    { title: "Semana da Língua Portuguesa", date: "2026-03-18" },
    { title: "Dia Aberto", date: "2026-04-02" }
  ],
  reminders: [
    { subject: "Português", due: "2026-02-10" },
    { subject: "Matemática", due: "2026-02-11" },
    { subject: "FQ", due: "2026-02-12" },
    { subject: "História", due: "2026-02-13" },
    { subject: "Inglês", due: "2026-02-14" }
  ]
};

function card(title, innerHtml) {
  return `
    <section class="card">
      <p class="h2">${title}</p>
      ${innerHtml}
    </section>
  `;
}

function renderHome() {
  view.innerHTML =
    card("Bem-vindo", `<h2 style="margin:0 0 6px;">Olá 👋</h2><p style="margin:0;color:var(--muted);">Esta é a tua Rosário App. Usa o menu para navegar.</p>`) +
    card("Atalhos", `
      <div class="list">
        <div class="row"><span>Horário de hoje</span><span class="badge">Ver</span></div>
        <div class="row"><span>Menu da cantina</span><span class="badge">Ver</span></div>
        <div class="row"><span>Próximos eventos</span><span class="badge">Ver</span></div>
        <div class="row"><span>Lembretes</span><span class="badge">Ver</span></div>
      </div>
    `);
}

function renderSchedule() {
  view.innerHTML = card("Horário", `
    <div class="list">
      ${data.schedule.map(x => `<div class="row"><span>${x.subject}</span><span class="badge">${x.time}</span></div>`).join("")}
    </div>
  `);
}

function renderCafeteria() {
  view.innerHTML = card("Cantina", `
    <div class="list">
      <div class="row"><span>Sopa</span><span class="badge">${data.cafeteria.soup}</span></div>
      <div class="row"><span>Prato</span><span class="badge">${data.cafeteria.main}</span></div>
      <div class="row"><span>Vegetariano</span><span class="badge">${data.cafeteria.veg}</span></div>
      <div class="row"><span>Sobremesa</span><span class="badge">${data.cafeteria.dessert}</span></div>
    </div>
  `);
}

function renderEvents() {
  view.innerHTML = card("Eventos", `
    <div class="list">
      ${data.events.map(e => `<div class="row"><span>${e.title}</span><span class="badge">${e.date}</span></div>`).join("")}
    </div>
  `);
}

function renderReminders() {
  view.innerHTML = card("Lembretes", `
    <div class="list">
      ${data.reminders.map(r => `<div class="row"><span>${r.subject}</span><span class="badge">até ${r.due}</span></div>`).join("")}
    </div>
  `);
}

const renderers = {
  home: renderHome,
  schedule: renderSchedule,
  cafeteria: renderCafeteria,
  events: renderEvents,
  reminders: renderReminders
};

function setActive(tabName) {
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  renderers[tabName]();
}

tabs.forEach(t => t.addEventListener("click", () => setActive(t.dataset.tab)));

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
});

setActive("home");
