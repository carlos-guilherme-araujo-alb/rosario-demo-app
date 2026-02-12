import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Avatar from '../components/common/Avatar';
import PageHeader from '../components/common/PageHeader';
import { Mail, Hash, Users, GraduationCap } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const infoItems = [
    { icon: Hash, label: t('profile.studentNumber'), value: user.studentNumber },
    { icon: Users, label: t('profile.class'), value: user.class },
    { icon: GraduationCap, label: t('profile.year'), value: user.year },
    { icon: Mail, label: t('profile.email'), value: user.email },
  ];

  return (
    <div className="page-container">
      <PageHeader title={t('profile.title')} showBack />

      <div className="px-4 pt-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <Avatar name={user.name} color={user.avatarColor} size="xl" className="mb-3 shadow-lg" />
          <h2 className="text-xl font-display font-bold text-[var(--color-text)]">{user.name}</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">{user.class}</p>
        </div>

        {/* Info card */}
        <div className="card">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{t('profile.personalInfo')}</h3>
          </div>
          {infoItems.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < infoItems.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
              <div className="w-9 h-9 rounded-xl bg-rosario-50 dark:bg-rosario-900/20 flex items-center justify-center">
                <item.icon size={18} className="text-rosario-600 dark:text-rosario-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--color-text-secondary)]">{item.label}</p>
                <p className="text-sm font-medium text-[var(--color-text)] truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
