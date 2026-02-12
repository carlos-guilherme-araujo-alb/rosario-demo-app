// Users database
export const users = [
  {
    id: 1,
    name: 'João Silva',
    firstName: 'João',
    email: 'joao.silva@colegiodorosario.pt',
    studentNumber: '2024001',
    password: 'joao123',
    class: '10º A',
    year: '10º',
    avatar: null, // Will use initials
    avatarColor: '#0066CC',
  },
  {
    id: 2,
    name: 'Maria Santos',
    firstName: 'Maria',
    email: 'maria.santos@colegiodorosario.pt',
    studentNumber: '2024045',
    password: 'maria123',
    class: '11º B',
    year: '11º',
    avatar: null,
    avatarColor: '#D4AF37',
  },
];

export function authenticateUser(emailOrNumber, password) {
  return users.find(
    (u) =>
      (u.email === emailOrNumber || u.studentNumber === emailOrNumber) &&
      u.password === password
  );
}
