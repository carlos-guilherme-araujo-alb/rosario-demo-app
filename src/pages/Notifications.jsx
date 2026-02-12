import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import { useToast } from '../components/common/Toast';
import { Bell, BookOpen, FileText, MessageSquare, Award, CalendarDays, CheckCheck } from 'lucide-react';

const typeIcons = {
  test: BookOpen,
  summary: FileText,
  announcement: MessageSquare,
  grade: Award,
  event: CalendarDays,
};
const typeColors = {
  test: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  summary: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  announcement: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  grade: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  event: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
};

export default function Notifications() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const notifications = mockData[user.id].notifications;

  const storageKey = 'rosario_read_notifs_' + user.id;
  const [readIds, setReadIds] = useState(() => JSON.parse(localStorage.getItem(storageKey) || '[]'));

  const isRead = (n) => n.read || readIds.includes(n.id);
  const unreadCount = notifications.filter(n => !isRead(n)).length;

  const markRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };

  const markAllRead = () => {
    const updated = [...new Set([...readIds, ...notifications.map(n => n.id)])];
    setReadIds(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    addToast(t('notifications.markAllRead') + ' \u2713', 'success');
  };

  const formatDate = (d) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return t('common.today');
    if (diff === 1) return t('common.yesterday');
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
  };

  const sorted = [...notifications].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page-container">
      <PageHeader
        title={t('notifications.title')}
        showBack
        rightAction={
          unreadCount > 0 ? (
            <button onClick={markAllRead} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <CheckCheck size={20} />
            </button>
          ) : null
        }
      />

      <div className="px-4 py-4 space-y-2">
        {sorted.length === 0 ? (
          <div className="card p-8 text-center">
            <Bell size={32} className="mx-auto text-[var(--color-text-secondary)] mb-3 opacity-30" />
            <p className="text-[var(--color-text-secondary)]">{t('notifications.empty')}</p>
          </div>
        ) : (
          sorted.map((notif, i) => {
            const Icon = typeIcons[notif.type] || Bell;
            const read = isRead(notif);
            return (
              <button
                key={notif.id}
                onClick={() => markRead(notif.id)}
                className={`card w-full p-4 text-left transition-all active:scale-[0.99] animate-fade-in ${!read ? 'border-l-4 border-l-rosario-500' : ''}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type] || 'bg-gray-100 text-gray-500'}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!read ? 'font-semibold' : 'font-medium'} text-[var(--color-text)] truncate`}>{notif.title}</p>
                      {!read && <span className="text-[9px] bg-rosario-500 text-white px-1.5 py-0.5 rounded-full font-bold">{t('notifications.new')}</span>}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">{notif.message}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 opacity-60">{formatDate(notif.date)}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
