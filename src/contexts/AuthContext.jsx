import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, users } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('rosario_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Re-validate against current users (password might have changed)
        const storedPw = localStorage.getItem('rosario_pw_' + parsed.id);
        const currentUser = users.find(u => u.id === parsed.id);
        if (currentUser) {
          setUser({ ...currentUser, password: storedPw || currentUser.password });
        }
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = (emailOrNumber, password) => {
    // Check if password was changed in localStorage
    const found = users.find(
      u => u.email === emailOrNumber || u.studentNumber === emailOrNumber
    );
    if (found) {
      const storedPw = localStorage.getItem('rosario_pw_' + found.id);
      const checkPw = storedPw || found.password;
      if (checkPw === password) {
        setUser(found);
        localStorage.setItem('rosario_user', JSON.stringify(found));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rosario_user');
  };

  const changePassword = (currentPw, newPw) => {
    if (!user) return false;
    const storedPw = localStorage.getItem('rosario_pw_' + user.id) || user.password;
    if (storedPw !== currentPw) return false;
    localStorage.setItem('rosario_pw_' + user.id, newPw);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
