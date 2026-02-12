import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import pt from '../i18n/pt';
import en from '../i18n/en';

const translations = { pt, en };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('rosario_lang') || 'pt');

  useEffect(() => {
    localStorage.setItem('rosario_lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt' : 'en';
  }, [lang]);

  const t = useCallback((path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      result = result?.[key];
    }
    return result || path;
  }, [lang]);

  const toggleLang = () => setLang(l => l === 'pt' ? 'en' : 'pt');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
