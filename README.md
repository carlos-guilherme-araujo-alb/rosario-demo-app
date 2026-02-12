# Rosário Mobile 📱


**Aplicação PWA para alunos do Colégio Nossa Senhora do Rosário, Porto**

Uma Progressive Web App moderna e funcional para os alunos do Colégio do Rosário consultarem as suas informações académicas, horários, notas, comunicados e muito mais.

## 🔐 Credenciais de Teste

| Utilizador | Email | Password | Turma |
|-----------|-------|----------|-------|
| João Silva | joao.silva@colegiodorosario.pt | joao123 | 10º A |
| Maria Santos | maria.santos@colegiodorosario.pt | maria123 | 11º B |

> As credenciais também são mostradas no ecrã de login para facilitar o teste.

## ✨ Funcionalidades

- **🔐 Autenticação** — Login com validação, recuperação de password (simulada), persistência de sessão
- **🏠 Dashboard** — Saudação personalizada, aulas do dia, testes próximos, avisos, acesso rápido
- **👤 Perfil** — Dados pessoais do aluno, turma, número, email
- **📅 Horário** — Visualização por dia e semana, disciplinas com cores, informação de professores e salas
- **📊 Notas** — Notas por período (1º, 2º, 3º), média geral, gráfico de evolução
- **📝 Sumários** — Lista cronológica com filtro por disciplina
- **📎 Apontamentos** — Upload (simulado via FileReader), partilha, likes, downloads
- **📆 Calendário** — Visualização mensal, testes, eventos, férias, feriados
- **📢 Comunicados** — Avisos gerais e da turma, lidos/não lidos
- **🍽️ Cantina** — Ementa semanal, seleção de refeições
- **🔔 Notificações** — Centro de notificações com tipos e marcação de lidas
- **⚙️ Definições** — Idioma (PT/EN), tema claro/escuro, notificações, alterar password, logout

## 🌐 Internacionalização

A aplicação suporta **Português** e **Inglês** completos. Pode trocar o idioma nas Definições.

## 🎨 Identidade Visual

- Cores institucionais do Colégio do Rosário (azul escuro, azul médio, dourado)
- Design limpo, profissional e institucional
- Logo CNSR com referência católica
- Tema claro e escuro com adaptação das cores

## 🛠️ Stack Tecnológica

- **React 18** + **Vite 5**
- **Tailwind CSS** (configurado com cores do colégio)
- **React Router** (navegação SPA)
- **Lucide React** (ícones)
- **PWA** (Service Worker, Manifest, instalável)
- **localStorage** (persistência sem backend)

## 📲 Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/SEU_USER/rosario-demo-app.git
cd rosario-demo-app

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Abrir `http://localhost:5173/rosario-demo-app/` no browser.

## 🚀 Deploy no GitHub Pages

### Automático (GitHub Actions)
1. Fazer push para a branch `main`
2. O workflow `.github/workflows/deploy.yml` é executado automaticamente
3. A app fica disponível em `https://SEU_USER.github.io/rosario-demo-app/`

### Manual
```bash
npm run build
npx gh-pages -d dist
```

### Configuração necessária no GitHub:
1. Ir a **Settings > Pages**
2. Em **Source**, selecionar **GitHub Actions**

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── common/        # Avatar, Logo, Modal, PageHeader, Toast
│   └── layout/        # AppLayout (bottom nav)
├── contexts/          # Auth, Language, Theme
├── data/              # Mock data, users
├── i18n/              # Traduções PT e EN
├── pages/             # Todas as páginas da app
├── App.jsx            # Routing principal
├── main.jsx           # Entry point
└── index.css          # Estilos globais + Tailwind
```

## 📱 PWA

A aplicação é totalmente instalável como PWA:
- Manifest.json completo
- Service Worker com cache offline
- Splash screen
- Ícones em múltiplos tamanhos
- Otimizada para Android e iOS

## 💾 Armazenamento

Sem backend — todos os dados são mock e as preferências do utilizador (idioma, tema, seleções de cantina, notificações lidas, passwords alteradas) são persistidas em `localStorage`.

---

**Colégio Nossa Senhora do Rosário** — Porto, Portugal  
*Aplicação desenvolvida para fins educativos e de demonstração.*
