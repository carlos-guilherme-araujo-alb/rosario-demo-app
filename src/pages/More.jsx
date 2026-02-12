import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import Avatar from '../components/common/Avatar';
import PageHeader from '../components/common/PageHeader';
import {
  User, FileText, Share2, MessageSquare, Utensils, Bell, Settings,
  ChevronRight, GraduationCap
} from 'lucide-react';

export default function More() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const unreadNotifs = (mockData[user.id]?.notifications || []).filter(n => {
    const readIds = JSON.parse(localStorage.getItem('rosario_read_notifs_' + user.id) || '[]');
    return !n.read && !readIds.includes(n.id);
  }).length;

  const menuItems = [
    { icon: User, label: t('profile.title'), to: '/profile', color: 'bg-rosario-500' },
    { icon: FileText, label: t('summaries.title'), to: '/summaries', color: 'bg-blue-500' },
    { icon: Share2, label: t('notes.title'), to: '/notes', color: 'bg-purple-500' },
    { icon: MessageSquare, label: t('announcements.title'), to: '/announcements', color: 'bg-amber-500' },
    { icon: Utensils, label: t('canteen.title'), to: '/canteen', color: 'bg-green-500' },
    { icon: Bell, label: t('notifications.title'), to: '/notifications', color: 'bg-red-500', badge: unreadNotifs },
    { icon: Settings, label: t('settings.title'), to: '/settings', color: 'bg-gray-500' },
  ];

  return (
    <div className="page-container">
      <PageHeader title={t('nav.more')} />

      {/* User card */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate('/profile')}
          className="card p-4 w-full text-left flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.99]"
        >
          <Avatar name={user.name} color={user.avatarColor} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[var(--color-text)]">{user.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{user.class} • Nº {user.studentNumber}</p>
          </div>
          <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Menu items */}
      <div className="px-4 py-4 space-y-1.5">
        {menuItems.map(item => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className="card w-full p-3.5 flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center`}>
              <item.icon size={18} className="text-white" />
            </div>
            <span className="flex-1 text-left text-sm font-medium text-[var(--color-text)]">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.badge > 0 && <span className="badge">{item.badge}</span>}
              <ChevronRight size={16} className="text-[var(--color-text-secondary)]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
