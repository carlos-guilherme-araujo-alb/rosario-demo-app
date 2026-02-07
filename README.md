# Rosário App 🎓

App PWA do Colégio do Rosário — demo para workshop.

## Funcionalidades
- 🏠 Dashboard com resumo do dia
- 📅 Horário semanal por dia
- 🍽 Ementa da cantina
- 📊 Notas e média por período
- 📅 Eventos e datas importantes
- ✉️ Mensagens com estado lido/não lido
- 👤 Perfil do aluno
- 📱 Instalável como app (PWA)
- 🔄 Funciona offline

## Credenciais demo
- **Aluno:** `aluno` / `1234`
- **Professor:** `prof` / `1234`

## Como usar

### GitHub Pages
1. Faz push deste repo para o GitHub
2. Vai a **Settings → Pages → Source: main branch**
3. A app fica disponível em `https://teu-user.github.io/rosario-demo-app/`
4. No telemóvel, abre o link e clica em **"Adicionar ao ecrã inicial"**

### Local
Basta abrir `index.html` num browser ou usar um servidor local:
```bash
npx serve .
```

## Tecnologias
- HTML5 / CSS3 / JavaScript (vanilla, sem frameworks)
- Service Worker para offline
- Web App Manifest para instalação
- Fonts: DM Sans + Playfair Display (Google Fonts)

## Estrutura
```
├── index.html      # Página principal
├── styles.css      # Estilos (branding azul Rosário)
├── app.js          # Lógica da aplicação
├── sw.js           # Service Worker
├── manifest.json   # Manifesto PWA
└── icons/
    ├── icon-192.png
    └── icon-512.png
```
