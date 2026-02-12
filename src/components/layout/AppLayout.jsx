import { NavLink, Outlet } from 'react-router-dom';
import { Home, CalendarDays, BookOpen, Clock, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AppLayout() {
  const { t } = useLanguage();

  const navItems = [
    { to: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { to: '/schedule', icon: Clock, label: t('nav.schedule') },
    { to: '/grades', icon: BookOpen, label: t('nav.grades') },
    { to: '/calendar', icon: CalendarDays, label: t('nav.calendar') },
    { to: '/more', icon: MoreHorizontal, label: t('nav.more') },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-card)] border-t border-[var(--color-border)] safe-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 px-3 min-w-[64px] transition-colors ${
                  isActive
                    ? 'text-rosario-700 dark:text-rosario-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-rosario-50 dark:bg-rosario-900/30' : ''}`}>
                    <item.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  </div>
                  <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
