// ==================== HELPER ====================
const today = new Date();
const getDate = (daysOffset) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

const formatDate = (dateStr) => dateStr;

// ==================== SCHEDULES ====================
const joaoSchedule = {
  mon: [
    { time: '08:30-09:15', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '09:15-10:00', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '10:20-11:05', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '11:05-11:50', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '12:00-12:45', subject: 'Física e Química A', teacher: 'Prof. Rita Sousa', room: 'Lab. 1' },
    { time: '14:00-14:45', subject: 'Inglês', teacher: 'Prof. John Mitchell', room: 'Sala 302' },
    { time: '14:45-15:30', subject: 'Inglês', teacher: 'Prof. John Mitchell', room: 'Sala 302' },
  ],
  tue: [
    { time: '08:30-09:15', subject: 'História', teacher: 'Prof. Manuel Oliveira', room: 'Sala 108' },
    { time: '09:15-10:00', subject: 'História', teacher: 'Prof. Manuel Oliveira', room: 'Sala 108' },
    { time: '10:20-11:05', subject: 'Física e Química A', teacher: 'Prof. Rita Sousa', room: 'Lab. 1' },
    { time: '11:05-11:50', subject: 'Física e Química A', teacher: 'Prof. Rita Sousa', room: 'Lab. 1' },
    { time: '12:00-12:45', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
    { time: '14:00-14:45', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
    { time: '14:45-15:30', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
  ],
  wed: [
    { time: '08:30-09:15', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '09:15-10:00', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '10:20-11:05', subject: 'Geografia A', teacher: 'Prof. Beatriz Costa', room: 'Sala 110' },
    { time: '11:05-11:50', subject: 'Geografia A', teacher: 'Prof. Beatriz Costa', room: 'Sala 110' },
    { time: '12:00-12:45', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '14:00-14:45', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
    { time: '14:45-15:30', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
  ],
  thu: [
    { time: '08:30-09:15', subject: 'Inglês', teacher: 'Prof. John Mitchell', room: 'Sala 302' },
    { time: '09:15-10:00', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '10:20-11:05', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '11:05-11:50', subject: 'História', teacher: 'Prof. Manuel Oliveira', room: 'Sala 108' },
    { time: '12:00-12:45', subject: 'Geografia A', teacher: 'Prof. Beatriz Costa', room: 'Sala 110' },
    { time: '14:00-14:45', subject: 'Física e Química A', teacher: 'Prof. Rita Sousa', room: 'Lab. 1' },
    { time: '14:45-15:30', subject: 'Física e Química A', teacher: 'Prof. Rita Sousa', room: 'Lab. 1' },
  ],
  fri: [
    { time: '08:30-09:15', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '09:15-10:00', subject: 'Português', teacher: 'Prof. Carlos Mendes', room: 'Sala 105' },
    { time: '10:20-11:05', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
    { time: '11:05-11:50', subject: 'Matemática A', teacher: 'Prof. Ana Ferreira', room: 'Sala 201' },
    { time: '12:00-12:45', subject: 'Inglês', teacher: 'Prof. John Mitchell', room: 'Sala 302' },
  ],
};

const mariaSchedule = {
  mon: [
    { time: '08:30-09:15', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '09:15-10:00', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '10:20-11:05', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '11:05-11:50', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '12:00-12:45', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '14:00-14:45', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
    { time: '14:45-15:30', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
  ],
  tue: [
    { time: '08:30-09:15', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '09:15-10:00', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '10:20-11:05', subject: 'Inglês', teacher: 'Prof. Sarah Williams', room: 'Sala 305' },
    { time: '11:05-11:50', subject: 'Inglês', teacher: 'Prof. Sarah Williams', room: 'Sala 305' },
    { time: '12:00-12:45', subject: 'EMRC', teacher: 'Prof. Padre António', room: 'Sala 101' },
    { time: '14:00-14:45', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
    { time: '14:45-15:30', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
  ],
  wed: [
    { time: '08:30-09:15', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '09:15-10:00', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '10:20-11:05', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '11:05-11:50', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '12:00-12:45', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '14:00-14:45', subject: 'Inglês', teacher: 'Prof. Sarah Williams', room: 'Sala 305' },
  ],
  thu: [
    { time: '08:30-09:15', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
    { time: '09:15-10:00', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '10:20-11:05', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '11:05-11:50', subject: 'EMRC', teacher: 'Prof. Padre António', room: 'Sala 101' },
    { time: '12:00-12:45', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '14:00-14:45', subject: 'Educação Física', teacher: 'Prof. Pedro Alves', room: 'Pavilhão' },
  ],
  fri: [
    { time: '08:30-09:15', subject: 'Inglês', teacher: 'Prof. Sarah Williams', room: 'Sala 305' },
    { time: '09:15-10:00', subject: 'Matemática A', teacher: 'Prof. Luís Pereira', room: 'Sala 203' },
    { time: '10:20-11:05', subject: 'Biologia e Geologia', teacher: 'Prof. Sofia Martins', room: 'Lab. 2' },
    { time: '11:05-11:50', subject: 'Português', teacher: 'Prof. Isabel Duarte', room: 'Sala 107' },
    { time: '12:00-12:45', subject: 'Filosofia', teacher: 'Prof. Teresa Lima', room: 'Sala 204' },
  ],
};

// ==================== GRADES ====================
const joaoGrades = {
  'Matemática A': { p1: 16, p2: 15, p3: 17 },
  'Português': { p1: 14, p2: 15, p3: 15 },
  'Inglês': { p1: 17, p2: 18, p3: 18 },
  'Física e Química A': { p1: 15, p2: 14, p3: 16 },
  'Educação Física': { p1: 16, p2: 17, p3: 17 },
  'História': { p1: 14, p2: 15, p3: 16 },
  'Geografia A': { p1: 15, p2: 16, p3: 15 },
  'Filosofia': { p1: 14, p2: 14, p3: 15 },
};

const mariaGrades = {
  'Matemática A': { p1: 18, p2: 19, p3: 19 },
  'Português': { p1: 17, p2: 17, p3: 18 },
  'Inglês': { p1: 18, p2: 19, p3: 19 },
  'Biologia e Geologia': { p1: 17, p2: 18, p3: 18 },
  'Filosofia': { p1: 16, p2: 17, p3: 17 },
  'Educação Física': { p1: 18, p2: 18, p3: 19 },
  'EMRC': { p1: 17, p2: 18, p3: 18 },
};

// ==================== SUMMARIES ====================
const joaoSummaries = [
  { id: 1, subject: 'Matemática A', lesson: 45, date: getDate(-1), content: 'Estudo das funções trigonométricas inversas. Resolução de equações trigonométricas.' },
  { id: 2, subject: 'Matemática A', lesson: 44, date: getDate(-3), content: 'Funções trigonométricas: seno, cosseno e tangente. Gráficos e propriedades.' },
  { id: 3, subject: 'Português', lesson: 38, date: getDate(-1), content: 'Análise de "Os Lusíadas" de Luís de Camões - Canto I. Proposição e Invocação.' },
  { id: 4, subject: 'Português', lesson: 37, date: getDate(-3), content: 'Contexto histórico da literatura renascentista portuguesa. Introdução à obra camoniana.' },
  { id: 5, subject: 'Português', lesson: 36, date: getDate(-8), content: 'Conclusão do estudo da poesia trovadoresca. Ficha de avaliação formativa.' },
  { id: 6, subject: 'Inglês', lesson: 30, date: getDate(-2), content: 'Reading comprehension: "Climate Change and Youth Activism". Vocabulary expansion.' },
  { id: 7, subject: 'Inglês', lesson: 29, date: getDate(-5), content: 'Grammar review: Conditional sentences (Types 1, 2, and 3). Practice exercises.' },
  { id: 8, subject: 'Física e Química A', lesson: 35, date: getDate(-2), content: 'Leis de Newton. Aplicação da 2ª lei à resolução de problemas de dinâmica.' },
  { id: 9, subject: 'Física e Química A', lesson: 34, date: getDate(-4), content: 'Atividade laboratorial: determinação do coeficiente de atrito estático.' },
  { id: 10, subject: 'Física e Química A', lesson: 33, date: getDate(-7), content: 'Forças de atrito: estático e cinético. Resolução de exercícios.' },
  { id: 11, subject: 'Educação Física', lesson: 25, date: getDate(-2), content: 'Voleibol: técnica de passe e manchete. Jogo reduzido 3x3.' },
  { id: 12, subject: 'Educação Física', lesson: 24, date: getDate(-5), content: 'Atletismo: técnica de corrida de barreiras. Aquecimento específico.' },
  { id: 13, subject: 'História', lesson: 28, date: getDate(-2), content: 'A Revolução Francesa: causas económicas e sociais. A queda da Bastilha.' },
  { id: 14, subject: 'História', lesson: 27, date: getDate(-5), content: 'O Iluminismo: principais pensadores e influência política.' },
  { id: 15, subject: 'Geografia A', lesson: 22, date: getDate(-3), content: 'Os recursos hídricos em Portugal. Bacias hidrográficas e gestão da água.' },
  { id: 16, subject: 'Geografia A', lesson: 21, date: getDate(-6), content: 'Clima e formações vegetais. O clima em Portugal continental e insular.' },
  { id: 17, subject: 'Filosofia', lesson: 20, date: getDate(-3), content: 'A ética utilitarista de John Stuart Mill. O princípio da maior felicidade.' },
  { id: 18, subject: 'Filosofia', lesson: 19, date: getDate(-6), content: 'Introdução à ética: a distinção entre moral e ética. Dilemas éticos.' },
  { id: 19, subject: 'Matemática A', lesson: 43, date: getDate(-6), content: 'Resolução de triângulos. Teorema dos senos e teorema dos cossenos.' },
  { id: 20, subject: 'Inglês', lesson: 28, date: getDate(-9), content: 'Essay writing: argumentative essay structure. Topic: "Technology in Education".' },
];

const mariaSummaries = [
  { id: 101, subject: 'Matemática A', lesson: 52, date: getDate(-1), content: 'Cálculo diferencial: regras de derivação. Derivada da função composta.' },
  { id: 102, subject: 'Matemática A', lesson: 51, date: getDate(-3), content: 'Introdução ao conceito de derivada. Taxa de variação e declive da reta tangente.' },
  { id: 103, subject: 'Português', lesson: 42, date: getDate(-1), content: 'Análise de "Frei Luís de Sousa" de Almeida Garrett - Ato I. A tragédia romântica.' },
  { id: 104, subject: 'Português', lesson: 41, date: getDate(-3), content: 'O Romantismo em Portugal: contexto histórico e características literárias.' },
  { id: 105, subject: 'Inglês', lesson: 35, date: getDate(-2), content: 'Debate preparation: "Artificial Intelligence - Opportunities and Threats". Research phase.' },
  { id: 106, subject: 'Inglês', lesson: 34, date: getDate(-5), content: 'Academic writing: Report writing structure and formal register.' },
  { id: 107, subject: 'Biologia e Geologia', lesson: 40, date: getDate(-2), content: 'Ciclo celular: mitose e suas fases. Observação microscópica de células em divisão.' },
  { id: 108, subject: 'Biologia e Geologia', lesson: 39, date: getDate(-4), content: 'Estrutura do DNA e replicação semiconservativa. Modelo de Watson e Crick.' },
  { id: 109, subject: 'Biologia e Geologia', lesson: 38, date: getDate(-7), content: 'Ácidos nucleicos: DNA e RNA. Estrutura e funções.' },
  { id: 110, subject: 'Filosofia', lesson: 25, date: getDate(-3), content: 'A teoria da justiça de John Rawls. O véu da ignorância.' },
  { id: 111, subject: 'Filosofia', lesson: 24, date: getDate(-6), content: 'Ética deontológica de Immanuel Kant. O imperativo categórico.' },
  { id: 112, subject: 'Educação Física', lesson: 28, date: getDate(-2), content: 'Ginástica: sequência gímnica no solo. Elementos de equilíbrio e flexibilidade.' },
  { id: 113, subject: 'EMRC', lesson: 18, date: getDate(-2), content: 'A dignidade da pessoa humana na Doutrina Social da Igreja.' },
  { id: 114, subject: 'EMRC', lesson: 17, date: getDate(-5), content: 'Ecologia e responsabilidade: a Encíclica "Laudato Si" do Papa Francisco.' },
  { id: 115, subject: 'Matemática A', lesson: 50, date: getDate(-6), content: 'Limites de funções reais. Teoremas sobre limites.' },
  { id: 116, subject: 'Português', lesson: 40, date: getDate(-8), content: 'Análise estilística: figuras de retórica em textos românticos.' },
  { id: 117, subject: 'Biologia e Geologia', lesson: 37, date: getDate(-10), content: 'Constituintes moleculares dos seres vivos: proteínas, lípidos e glícidos.' },
  { id: 118, subject: 'Inglês', lesson: 33, date: getDate(-9), content: 'Literature analysis: George Orwell\'s "1984" - Themes of surveillance and control.' },
];

// ==================== NOTES/APONTAMENTOS ====================
const joaoNotes = [
  { id: 1, title: 'Resumo Trigonometria', subject: 'Matemática A', author: 'João Silva', date: getDate(-2), type: 'pdf', size: '2.4 MB', likes: 5, isOwner: true },
  { id: 2, title: 'Esquema Os Lusíadas', subject: 'Português', author: 'João Silva', date: getDate(-5), type: 'pdf', size: '1.1 MB', likes: 8, isOwner: true },
  { id: 3, title: 'Exercícios Dinâmica', subject: 'Física e Química A', author: 'João Silva', date: getDate(-3), type: 'pdf', size: '3.2 MB', likes: 3, isOwner: true },
  { id: 4, title: 'Vocabulary List Unit 5', subject: 'Inglês', author: 'Ana Costa', date: getDate(-4), type: 'pdf', size: '0.8 MB', likes: 12, isOwner: false },
  { id: 5, title: 'Resumo Revolução Francesa', subject: 'História', author: 'Pedro Santos', date: getDate(-6), type: 'pdf', size: '1.5 MB', likes: 7, isOwner: false },
  { id: 6, title: 'Mapa Mental - Clima Portugal', subject: 'Geografia A', author: 'Beatriz Almeida', date: getDate(-7), type: 'image', size: '4.1 MB', likes: 9, isOwner: false },
  { id: 7, title: 'Notas de Filosofia - Ética', subject: 'Filosofia', author: 'Miguel Ferreira', date: getDate(-8), type: 'pdf', size: '0.6 MB', likes: 4, isOwner: false },
  { id: 8, title: 'Formulário FQ', subject: 'Física e Química A', author: 'Catarina Lima', date: getDate(-1), type: 'pdf', size: '0.3 MB', likes: 15, isOwner: false },
];

const mariaNotes = [
  { id: 101, title: 'Resumo Derivadas', subject: 'Matemática A', author: 'Maria Santos', date: getDate(-1), type: 'pdf', size: '1.8 MB', likes: 10, isOwner: true },
  { id: 102, title: 'Frei Luís de Sousa - Análise', subject: 'Português', author: 'Maria Santos', date: getDate(-3), type: 'pdf', size: '2.1 MB', likes: 6, isOwner: true },
  { id: 103, title: 'DNA Replication Diagram', subject: 'Biologia e Geologia', author: 'Maria Santos', date: getDate(-5), type: 'image', size: '3.5 MB', likes: 11, isOwner: true },
  { id: 104, title: 'Essay Template', subject: 'Inglês', author: 'Tomás Rodrigues', date: getDate(-2), type: 'pdf', size: '0.5 MB', likes: 8, isOwner: false },
  { id: 105, title: 'Resumo Kant vs Mill', subject: 'Filosofia', author: 'Inês Carvalho', date: getDate(-4), type: 'pdf', size: '1.2 MB', likes: 7, isOwner: false },
];

// ==================== ANNOUNCEMENTS ====================
const commonAnnouncements = [
  {
    id: 'c1', type: 'general',
    title: 'Celebração do Dia do Colégio',
    content: 'No próximo dia 7 de março celebramos o Dia do Colégio Nossa Senhora do Rosário. O programa inclui Eucaristia às 10h na Capela, seguida de atividades culturais e desportivas. Todos os alunos devem comparecer com o uniforme de cerimónia.',
    author: 'Direção do Colégio', date: getDate(-2), read: false,
  },
  {
    id: 'c2', type: 'general',
    title: 'Campanha de Solidariedade - Quaresma',
    content: 'Decorre até ao final de março a Campanha de Solidariedade da Quaresma. Este ano apoiamos a Comunidade Vida e Paz. Pedimos a colaboração de todos na recolha de alimentos não perecíveis e produtos de higiene. Os pontos de recolha encontram-se no átrio principal.',
    author: 'Pastoral do Colégio', date: getDate(-5), read: true,
  },
  {
    id: 'c3', type: 'general',
    title: 'Inscrições Atividades Extracurriculares 2º Semestre',
    content: 'Estão abertas as inscrições para as atividades extracurriculares do 2º semestre: Robótica, Teatro, Coro, Xadrez, Voluntariado e Desporto Escolar. Inscrições na secretaria até dia 28 de fevereiro.',
    author: 'Coordenação de Atividades', date: getDate(-8), read: true,
  },
];

const joaoAnnouncements = [
  ...commonAnnouncements,
  {
    id: 'j1', type: 'class',
    title: 'Visita de Estudo - Museu de Serralves',
    content: 'A turma 10ºA realizará uma visita de estudo ao Museu de Serralves no dia 20 de fevereiro. Saída às 9h do colégio. Regresso previsto às 16h. Autorização dos encarregados de educação deve ser entregue até dia 15.',
    author: 'Prof. Carlos Mendes (Dir. Turma)', date: getDate(-1), read: false,
  },
  {
    id: 'j2', type: 'class',
    title: 'Teste de Matemática A - Alteração de Data',
    content: 'Informamos que o teste de Matemática A previsto para dia 18 foi adiado para dia 21 de fevereiro. A matéria mantém-se: Trigonometria (cap. 4 e 5).',
    author: 'Prof. Ana Ferreira', date: getDate(-3), read: false,
  },
];

const mariaAnnouncements = [
  ...commonAnnouncements,
  {
    id: 'm1', type: 'class',
    title: 'Projeto Interdisciplinar - Biologia e Inglês',
    content: 'O 11ºB participará num projeto interdisciplinar sobre Biotecnologia. Apresentação em inglês no dia 5 de março. Grupos de 3 alunos, escolha de tema até 20 de fevereiro.',
    author: 'Prof. Sofia Martins', date: getDate(-1), read: false,
  },
  {
    id: 'm2', type: 'class',
    title: 'Olimpíadas de Matemática - Fase Regional',
    content: 'Parabéns aos alunos selecionados para a Fase Regional das Olimpíadas de Matemática! A prova realiza-se no dia 8 de março na Universidade do Porto. Lista de selecionados afixada no painel do 11ºB.',
    author: 'Prof. Luís Pereira', date: getDate(-2), read: false,
  },
  {
    id: 'm3', type: 'class',
    title: 'Retiro Espiritual 11º Ano',
    content: 'O retiro espiritual do 11º ano terá lugar nos dias 12 e 13 de março no Centro Pastoral de Vilar. Programa e autorizações serão enviados por email aos encarregados de educação.',
    author: 'Prof. Padre António', date: getDate(-4), read: true,
  },
  {
    id: 'm4', type: 'general',
    title: 'Conferência: Carreiras em Ciência',
    content: 'No dia 25 de fevereiro, às 15h no Auditório, decorrerá a conferência "Carreiras em Ciência e Tecnologia" com oradores da Universidade do Porto e da indústria. Inscrições obrigatórias na secretaria.',
    author: 'Gabinete de Orientação Vocacional', date: getDate(-6), read: true,
  },
];

// ==================== CALENDAR ====================
const commonEvents = [
  { id: 'ce1', title: 'Férias de Carnaval', type: 'holiday', startDate: '2026-02-16', endDate: '2026-02-18', color: '#16a34a' },
  { id: 'ce2', title: 'Férias da Páscoa', type: 'holiday', startDate: '2026-03-30', endDate: '2026-04-13', color: '#16a34a' },
  { id: 'ce3', title: 'Dia do Colégio', type: 'event', startDate: '2026-03-07', endDate: '2026-03-07', color: '#D4AF37' },
  { id: 'ce4', title: 'Missa Mensal', type: 'event', startDate: '2026-02-20', endDate: '2026-02-20', color: '#D4AF37' },
  { id: 'ce5', title: 'Peregrinação a Santiago', type: 'event', startDate: '2026-05-15', endDate: '2026-05-17', color: '#D4AF37' },
];

const joaoCalendar = [
  ...commonEvents,
  { id: 'jt1', title: 'Teste Matemática A', type: 'test', startDate: getDate(5), endDate: getDate(5), color: '#dc2626', subject: 'Matemática A' },
  { id: 'jt2', title: 'Teste Física e Química A', type: 'test', startDate: getDate(10), endDate: getDate(10), color: '#dc2626', subject: 'Física e Química A' },
  { id: 'jt3', title: 'Teste Português', type: 'test', startDate: getDate(18), endDate: getDate(18), color: '#dc2626', subject: 'Português' },
  { id: 'jt4', title: 'Teste Inglês', type: 'test', startDate: getDate(25), endDate: getDate(25), color: '#dc2626', subject: 'Inglês' },
  { id: 'je1', title: 'Eucaristia Mensal', type: 'event', startDate: getDate(8), endDate: getDate(8), color: '#D4AF37' },
  { id: 'je2', title: 'Retiro Espiritual 10º Ano', type: 'event', startDate: getDate(15), endDate: getDate(16), color: '#D4AF37' },
  { id: 'je3', title: 'Campeonato Inter-turmas Futsal', type: 'event', startDate: getDate(20), endDate: getDate(20), color: '#0066CC' },
];

const mariaCalendar = [
  ...commonEvents,
  { id: 'mt1', title: 'Teste Biologia e Geologia', type: 'test', startDate: getDate(4), endDate: getDate(4), color: '#dc2626', subject: 'Biologia e Geologia' },
  { id: 'mt2', title: 'Teste Matemática A', type: 'test', startDate: getDate(12), endDate: getDate(12), color: '#dc2626', subject: 'Matemática A' },
  { id: 'mt3', title: 'Teste Português', type: 'test', startDate: getDate(22), endDate: getDate(22), color: '#dc2626', subject: 'Português' },
  { id: 'me1', title: 'Retiro Espiritual 11º Ano', type: 'event', startDate: getDate(28), endDate: getDate(29), color: '#D4AF37' },
  { id: 'me2', title: 'Conferência Carreiras em Ciência', type: 'event', startDate: getDate(14), endDate: getDate(14), color: '#0066CC' },
];

// ==================== CANTEEN ====================
const weeklyMenu = [
  {
    day: 'mon', dayName: 'Segunda-feira',
    soup: 'Creme de legumes',
    option1: 'Frango grelhado com arroz e salada',
    option2: 'Bacalhau à Brás',
    vegetarian: 'Tofu salteado com legumes e arroz integral',
    dessert: 'Fruta da época',
  },
  {
    day: 'tue', dayName: 'Terça-feira',
    soup: 'Sopa de feijão verde',
    option1: 'Esparguete à bolonhesa',
    option2: 'Peixe espada grelhado com batata cozida',
    vegetarian: 'Lasanha de legumes',
    dessert: 'Gelatina',
  },
  {
    day: 'wed', dayName: 'Quarta-feira',
    soup: 'Caldo verde',
    option1: 'Carne de porco à alentejana',
    option2: 'Filetes de pescada com arroz de tomate',
    vegetarian: 'Hambúrguer de grão com salada',
    dessert: 'Mousse de chocolate',
  },
  {
    day: 'thu', dayName: 'Quinta-feira',
    soup: 'Sopa de legumes',
    option1: 'Arroz de pato',
    option2: 'Salmão grelhado com puré de batata',
    vegetarian: 'Curry de legumes com arroz basmati',
    dessert: 'Fruta da época',
  },
  {
    day: 'fri', dayName: 'Sexta-feira',
    soup: 'Creme de cenoura',
    option1: 'Almôndegas com esparguete',
    option2: 'Caldeirada de peixe',
    vegetarian: 'Pizza vegetariana',
    dessert: 'Pudim',
  },
];

// ==================== NOTIFICATIONS ====================
const joaoNotifications = [
  { id: 'n1', type: 'test', title: 'Teste de Matemática A em 5 dias', message: 'Não te esqueças de estudar para o teste de Matemática A!', date: getDate(0), read: false },
  { id: 'n2', type: 'summary', title: 'Novo sumário disponível', message: 'Prof. Ana Ferreira adicionou o sumário da aula 45 de Matemática A.', date: getDate(-1), read: false },
  { id: 'n3', type: 'announcement', title: 'Novo comunicado', message: 'Visita de Estudo ao Museu de Serralves - consulte os detalhes.', date: getDate(-1), read: false },
  { id: 'n4', type: 'grade', title: 'Nova nota publicada', message: 'A nota do teste de Filosofia já está disponível.', date: getDate(-3), read: true },
  { id: 'n5', type: 'event', title: 'Eucaristia Mensal', message: 'Lembrete: Eucaristia mensal às 10h na Capela do Colégio.', date: getDate(-5), read: true },
  { id: 'n6', type: 'announcement', title: 'Campanha de Solidariedade', message: 'Participa na Campanha de Solidariedade da Quaresma!', date: getDate(-5), read: true },
];

const mariaNotifications = [
  { id: 'n101', type: 'test', title: 'Teste de Biologia em 4 dias', message: 'Prepara-te para o teste de Biologia e Geologia!', date: getDate(0), read: false },
  { id: 'n102', type: 'announcement', title: 'Projeto Interdisciplinar', message: 'Novo projeto de Biologia e Inglês - consulta os detalhes.', date: getDate(-1), read: false },
  { id: 'n103', type: 'summary', title: 'Novo sumário disponível', message: 'Prof. Luís Pereira adicionou o sumário da aula 52 de Matemática A.', date: getDate(-1), read: true },
  { id: 'n104', type: 'event', title: 'Conferência Carreiras em Ciência', message: 'Inscreve-te na conferência sobre Carreiras em Ciência e Tecnologia.', date: getDate(-3), read: true },
];

// ==================== EXPORT ====================
export const mockData = {
  1: { // João
    schedule: joaoSchedule,
    grades: joaoGrades,
    summaries: joaoSummaries,
    notes: joaoNotes,
    announcements: joaoAnnouncements,
    calendar: joaoCalendar,
    notifications: joaoNotifications,
    canteenSelections: { mon: 'option1', wed: 'option2', fri: 'vegetarian' },
  },
  2: { // Maria
    schedule: mariaSchedule,
    grades: mariaGrades,
    summaries: mariaSummaries,
    notes: mariaNotes,
    announcements: mariaAnnouncements,
    calendar: mariaCalendar,
    notifications: mariaNotifications,
    canteenSelections: {},
  },
};

export const commonData = {
  weeklyMenu,
};

export const subjectColors = {
  'Matemática A': '#0066CC',
  'Português': '#8B5E3C',
  'Inglês': '#E63946',
  'Física e Química A': '#6B21A8',
  'Educação Física': '#16a34a',
  'História': '#D4AF37',
  'Geografia A': '#059669',
  'Filosofia': '#7C3AED',
  'Biologia e Geologia': '#0891B2',
  'EMRC': '#92400E',
};
