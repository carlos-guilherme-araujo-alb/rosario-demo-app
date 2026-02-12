import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import { ChevronLeft, ChevronRight, BookOpen, PartyPopper, Palmtree } from 'lucide-react';

export default function Calendar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const events = mockData[user.id].calendar;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getDayEvents = (dateStr) => events.filter(e => e.startDate <= dateStr && e.endDate >= dateStr);
  const selectedEvents = getDayEvents(selectedDate);

  const typeIcon = { test: BookOpen, event: PartyPopper, holiday: Palmtree };
  const typeLabel = { test: t('calendar.test'), event: t('calendar.event'), holiday: t('calendar.holiday') };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="page-container">
      <PageHeader title={t('calendar.title')} />

      <div className="px-4 pt-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-[var(--color-card)] transition-colors">
            <ChevronLeft size={20} className="text-[var(--color-text)]" />
          </button>
          <h2 className="text-lg font-display font-semibold text-[var(--color-text)]">
            {t(`calendar.months.${month}`)} {year}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-[var(--color-card)] transition-colors">
            <ChevronRight size={20} className="text-[var(--color-text)]" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="card p-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {t('calendar.weekDays').map(d => (
              <div key={d} className="text-center text-xs font-medium text-[var(--color-text-secondary)] py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvents = getDayEvents(dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all ${
                    isSelected ? 'bg-rosario-700 text-white shadow-md' :
                    isToday ? 'bg-rosario-50 dark:bg-rosario-900/20 text-rosario-700 dark:text-rosario-400 font-bold' :
                    'text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  {day}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.slice(0, 3).map((e, ei) => (
                        <div
                          key={ei}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: isSelected ? '#fff' : e.color }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 px-1">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-xs text-[var(--color-text-secondary)]">{t('calendar.test')}</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gold" /><span className="text-xs text-[var(--color-text-secondary)]">{t('calendar.event')}</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-xs text-[var(--color-text-secondary)]">{t('calendar.holiday')}</span></div>
        </div>

        {/* Selected day events */}
        <div className="mt-5 pb-4">
          <h3 className="section-title">
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString(t('lang') === 'en' ? 'en-GB' : 'pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          {selectedEvents.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-[var(--color-text-secondary)] text-sm">{t('calendar.noEvents')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(event => {
                const Icon = typeIcon[event.type] || PartyPopper;
                return (
                  <div key={event.id} className="card p-4 flex items-center gap-3 animate-fade-in">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: event.color + '20' }}>
                      <Icon size={20} style={{ color: event.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-text)]">{event.title}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{typeLabel[event.type]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
