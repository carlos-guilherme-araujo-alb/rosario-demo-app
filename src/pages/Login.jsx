import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../components/common/Logo';
import { Eye, EyeOff, LogIn, KeyRound } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [showRecover, setShowRecover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = login(email.trim(), password);
      if (!success) setError(t('login.invalidCredentials'));
      setLoading(false);
    }, 600);
  };

  const fillCredentials = (em, pw) => {
    setEmail(em);
    setPassword(pw);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rosario-700 via-rosario-700 to-rosario-800">
      <div className="flex flex-col items-center pt-16 pb-8 px-6">
        <Logo size="lg" className="mb-4" />
        <h1 className="text-2xl font-display font-bold text-white">{t('login.title')}</h1>
        <p className="text-rosario-200 text-sm mt-1">{t('login.subtitle')}</p>
      </div>

      <div className="flex-1 bg-[var(--color-bg-secondary)] rounded-t-3xl px-6 pt-8 pb-6">
        <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
              {t('login.email')}
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              placeholder="nome@colegiodorosario.pt"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field pr-12"
                placeholder="••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5 rounded-xl animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!email || !password || loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><LogIn size={18} />{t('login.login')}</>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowRecover(true)}
            className="w-full text-center text-sm text-rosario-500 hover:text-rosario-600 font-medium"
          >
            <KeyRound size={14} className="inline mr-1" />
            {t('login.forgotPassword')}
          </button>
        </form>

        <div className="max-w-sm mx-auto mt-8">
          <p className="text-xs text-center text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider mb-3">
            {t('login.testCredentials')}
          </p>
          <div className="space-y-2.5">
            {[
              { em: 'joao.silva@colegiodorosario.pt', pw: 'joao123', name: 'João Silva', cls: '10º A', bg: 'bg-rosario-500', ini: 'JS' },
              { em: 'maria.santos@colegiodorosario.pt', pw: 'maria123', name: 'Maria Santos', cls: '11º B', bg: 'bg-gold', ini: 'MS' },
            ].map(u => (
              <button
                key={u.em}
                onClick={() => fillCredentials(u.em, u.pw)}
                className="w-full card p-3.5 text-left hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${u.bg} flex items-center justify-center text-white font-bold text-sm`}>{u.ini}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[var(--color-text)]">{u.name} <span className="text-xs font-normal text-[var(--color-text-secondary)]">• {u.cls}</span></p>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate">{u.em} / {u.pw}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showRecover} onClose={() => setShowRecover(false)} title={t('login.recoverTitle')}>
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-rosario-50 dark:bg-rosario-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound size={28} className="text-rosario-600" />
          </div>
          <p className="text-[var(--color-text)] mb-2">{t('login.recoverText')}</p>
          <p className="text-sm text-[var(--color-text-secondary)] italic">{t('login.recoverNote')}</p>
          <button onClick={() => setShowRecover(false)} className="btn-primary mt-6">{t('common.close')}</button>
        </div>
      </Modal>
    </div>
  );
}
