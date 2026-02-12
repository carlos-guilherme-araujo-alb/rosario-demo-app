import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import { subjectColors } from '../data/mockData';
import Avatar from '../components/common/Avatar';
import Logo from '../components/common/Logo';
import {
  Bell, Clock, BookOpen, FileText, CalendarDays, Utensils,
  MessageSquare, ChevronRight, AlertTriangle, GraduationCap, Share2
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const data = mockData[user.id];

  const dayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
  const todayClasses = data.schedule[dayKey] || [];

  const upcomingTests = data.calendar
    .filter(e => e.type === 'test' && new Date(e.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  const recentAnnouncements = data.announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  const unreadNotifs = data.notifications.filter(n => {
    const readIds = JSON.parse(localStorage.getItem('rosario_read_notifs_' + user.id) || '[]');
    return !n.read && !readIds.includes(n.id);
  }).length;

  const quickLinks = [
    { icon: FileText, label: t('summaries.title'), to: '/summaries', color: 'bg-rosario-500' },
    { icon: Share2, label: t('notes.title'), to: '/notes', color: 'bg-purple-500' },
    { icon: MessageSquare, label: t('announcements.title'), to: '/announcements', color: 'bg-amber-500' },
    { icon: Utensils, label: t('canteen.title'), to: '/canteen', color: 'bg-green-500' },
  ];

  const formatDateShort = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const getGreetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return t('lang') === 'en' ? 'Good morning' : 'Bom dia';
    if (h < 18) return t('lang') === 'en' ? 'Good afternoon' : 'Boa tarde';
    return t('lang') === 'en' ? 'Good evening' : 'Boa noite';
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-rosario-700 text-white px-4 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative flex items-center justify-between mb-6">
          <Logo size="sm" />
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Bell size={22} />
            {unreadNotifs > 0 && <span className="badge absolute -top-0.5 -right-0.5">{unreadNotifs}</span>}
          </button>
        </div>
        <div className="relative flex items-center gap-3">
          <Avatar name={user.name} color={user.avatarColor} size="md" />
          <div>
            <p className="text-rosario-200 text-sm">{getGreetingTime()}</p>
            <h1 className="text-xl font-display font-bold">{user.firstName}</h1>
            <p className="text-rosario-300 text-xs">{user.class} • Nº {user.studentNumber}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 space-y-5 relative z-10">
        {/* Today's Classes */}
        <div className="card p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title mb-0 flex items-center gap-2">
              <Clock size={18} className="text-rosario-500" />
              {t('dashboard.todaySchedule')}
            </h2>
            <button onClick={() => navigate('/schedule')} className="text-rosario-500 text-xs font-medium">
              {t('common.view')} <ChevronRight size={14} className="inline" />
            </button>
          </div>
          {todayClasses.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-sm py-4 text-center">{t('dashboard.noClassesToday')}</p>
          ) : (
            <div className="space-y-2">
              {todayClasses.slice(0, 4).map((cls, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-[var(--color-bg-secondary)]">
                  <div className="w-1 h-10 rounded-full" style={{ backgroundColor: subjectColors[cls.subject] || '#0066CC' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{cls.subject}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{cls.room} • {cls.teacher}</p>
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] font-mono whitespace-nowrap">{cls.time}</span>
                </div>
              ))}
              {todayClasses.length > 4 && (
                <p className="text-xs text-center text-[var(--color-text-secondary)]">+{todayClasses.length - 4} {todayClasses.length - 4 === 1 ? 'aula' : 'aulas'}</p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Tests */}
        {upcomingTests.length > 0 && (
          <div className="card p-4 animate-fade-in stagger-1">
            <h2 className="section-title flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              {t('dashboard.upcomingTests')}
            </h2>
            <div className="space-y-2">
              {upcomingTests.map(test => {
                const daysUntil = Math.ceil((new Date(test.startDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={test.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 font-bold text-sm">{daysUntil}d</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">{test.title}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{formatDateShort(test.startDate)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div className="animate-fade-in stagger-2">
          <h2 className="section-title">{t('dashboard.quickAccess')}</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map(link => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className="flex flex-col items-center gap-2 p-3 card hover:shadow-md transition-all active:scale-95"
              >
                <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center`}>
                  <link.icon size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-medium text-[var(--color-text)] text-center leading-tight">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="card p-4 animate-fade-in stagger-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title mb-0 flex items-center gap-2">
              <MessageSquare size={18} className="text-amber-500" />
              {t('dashboard.announcements')}
            </h2>
            <button onClick={() => navigate('/announcements')} className="text-rosario-500 text-xs font-medium">
              {t('common.view')} <ChevronRight size={14} className="inline" />
            </button>
          </div>
          <div className="space-y-2">
            {recentAnnouncements.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-[var(--color-bg-secondary)] cursor-pointer" onClick={() => navigate('/announcements')}>
                <div className="flex items-start gap-2">
                  {!a.read && <div className="w-2 h-2 rounded-full bg-rosario-500 mt-1.5 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{a.title}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{a.author} • {formatDateShort(a.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
