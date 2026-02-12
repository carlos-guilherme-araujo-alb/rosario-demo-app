import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import {
  Globe, Moon, Sun, Bell, Lock, LogOut, ChevronRight, Info, Shield
} from 'lucide-react';

export default function Settings() {
  const { user, logout, changePassword } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });

  // Notification preferences
  const notifKey = 'rosario_notif_prefs_' + user.id;
  const [notifPrefs, setNotifPrefs] = useState(() => {
    const saved = localStorage.getItem(notifKey);
    return saved ? JSON.parse(saved) : { enabled: true, tests: true, summaries: true, announcements: true };
  });

  const updateNotifPref = (key) => {
    const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
    setNotifPrefs(updated);
    localStorage.setItem(notifKey, JSON.stringify(updated));
  };

  const handleChangePassword = () => {
    if (pwForm.newPw !== pwForm.confirm) {
      addToast(t('settings.passwordMismatch'), 'error');
      return;
    }
    if (pwForm.newPw.length < 4) {
      addToast('Password too short', 'error');
      return;
    }
    const ok = changePassword(pwForm.current, pwForm.newPw);
    if (ok) {
      addToast(t('settings.passwordChanged'), 'success');
      setShowPassword(false);
      setPwForm({ current: '', newPw: '', confirm: '' });
    } else {
      addToast(t('settings.passwordError'), 'error');
    }
  };

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-all flex items-center px-0.5 ${
        value ? 'bg-rosario-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : ''}`} />
    </button>
  );

  return (
    <div className="page-container">
      <PageHeader title={t('settings.title')} showBack />

      <div className="px-4 py-4 space-y-4">
        {/* Preferences Section */}
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 px-1">
            {t('settings.preferences')}
          </p>
          <div className="card overflow-hidden">
            {/* Language */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Globe size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-[var(--color-text)]">{t('settings.language')}</span>
              </div>
              <div className="flex bg-[var(--color-bg-secondary)] rounded-lg p-0.5">
                <button
                  onClick={() => setLang('pt')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${lang === 'pt' ? 'bg-rosario-700 text-white' : 'text-[var(--color-text-secondary)]'}`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${lang === 'en' ? 'bg-rosario-700 text-white' : 'text-[var(--color-text-secondary)]'}`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  {isDark ? <Moon size={18} className="text-purple-600 dark:text-purple-400" /> : <Sun size={18} className="text-amber-500" />}
                </div>
                <span className="text-sm font-medium text-[var(--color-text)]">{t('settings.theme')}</span>
              </div>
              <div className="flex bg-[var(--color-bg-secondary)] rounded-lg p-0.5">
                <button
                  onClick={() => isDark && toggleTheme()}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${!isDark ? 'bg-rosario-700 text-white' : 'text-[var(--color-text-secondary)]'}`}
                >
                  {t('settings.lightTheme')}
                </button>
                <button
                  onClick={() => !isDark && toggleTheme()}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${isDark ? 'bg-rosario-700 text-white' : 'text-[var(--color-text-secondary)]'}`}
                >
                  {t('settings.darkTheme')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 px-1">
            {t('settings.notifications')}
          </p>
          <div className="card overflow-hidden">
            {[
              { key: 'enabled', label: t('settings.enableNotifications') },
              { key: 'tests', label: t('settings.testReminders') },
              { key: 'summaries', label: t('settings.summaryAlerts') },
              { key: 'announcements', label: t('settings.announcementAlerts') },
            ].map((item, i, arr) => (
              <div key={item.key} className={`flex items-center justify-between p-4 ${i < arr.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                <span className="text-sm font-medium text-[var(--color-text)]">{item.label}</span>
                <Toggle value={notifPrefs[item.key]} onChange={() => updateNotifPref(item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 px-1">
            {t('settings.account')}
          </p>
          <div className="card overflow-hidden">
            <button
              onClick={() => setShowPassword(true)}
              className="w-full flex items-center justify-between p-4 border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                  <Lock size={18} className="text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm font-medium text-[var(--color-text)]">{t('settings.changePassword')}</span>
              </div>
              <ChevronRight size={16} className="text-[var(--color-text-secondary)]" />
            </button>
            <button
              onClick={() => setShowLogout(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <LogOut size={18} className="text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{t('settings.logout')}</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <Info size={16} className="text-[var(--color-text-secondary)]" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Ros\u00e1rio Mobile</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{t('settings.version')} 1.0.0 \u2022 Col\u00e9gio N. Sra. do Ros\u00e1rio, Porto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal isOpen={showPassword} onClose={() => setShowPassword(false)} title={t('settings.changePassword')}>
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-1">{t('settings.currentPassword')}</label>
            <input type="password" className="input-field" value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-1">{t('settings.newPassword')}</label>
            <input type="password" className="input-field" value={pwForm.newPw} onChange={e => setPwForm(p => ({ ...p, newPw: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-1">{t('settings.confirmPassword')}</label>
            <input type="password" className="input-field" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} />
          </div>
          <button onClick={handleChangePassword} className="btn-primary w-full" disabled={!pwForm.current || !pwForm.newPw || !pwForm.confirm}>
            {t('common.save')}
          </button>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={showLogout} onClose={() => setShowLogout(false)} title={t('settings.logout')}>
        <div className="text-center py-4">
          <p className="text-[var(--color-text)] mb-6">{t('settings.logoutConfirm')}</p>
          <div className="flex gap-3">
            <button onClick={() => setShowLogout(false)} className="btn-secondary flex-1">{t('common.cancel')}</button>
            <button onClick={logout} className="btn-primary flex-1 !bg-red-600 hover:!bg-red-700">{t('settings.logout')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
