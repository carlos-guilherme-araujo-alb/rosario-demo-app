import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData, subjectColors } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import { MapPin, User } from 'lucide-react';

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri'];

export default function Schedule() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const data = mockData[user.id];

  const todayIdx = Math.max(0, Math.min(4, new Date().getDay() - 1));
  const [selectedDay, setSelectedDay] = useState(todayIdx >= 0 && todayIdx <= 4 ? todayIdx : 0);
  const [viewMode, setViewMode] = useState('day');

  const dayNames = DAY_KEYS.map(k => t(`schedule.daysShort.${k}`));
  const dayNamesFull = DAY_KEYS.map(k => t(`schedule.days.${k}`));

  const classes = data.schedule[DAY_KEYS[selectedDay]] || [];

  return (
    <div className="page-container">
      <PageHeader title={t('schedule.title')} />

      {/* View toggle */}
      <div className="px-4 pt-4">
        <div className="flex bg-[var(--color-card)] rounded-xl p-1 border border-[var(--color-border)]">
          {['day', 'week'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === mode
                  ? 'bg-rosario-700 text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {mode === 'day' ? t('schedule.dayView') : t('schedule.weekView')}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'day' ? (
        <>
          {/* Day selector */}
          <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
            {DAY_KEYS.map((k, i) => (
              <button
                key={k}
                onClick={() => setSelectedDay(i)}
                className={`flex-shrink-0 flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                  selectedDay === i
                    ? 'bg-rosario-700 text-white shadow-md'
                    : 'bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]'
                } ${todayIdx === i ? 'ring-2 ring-gold ring-offset-1' : ''}`}
              >
                <span className="text-xs font-medium opacity-70">{dayNames[i]}</span>
              </button>
            ))}
          </div>

          <div className="px-4 mb-2">
            <h2 className="text-lg font-display font-semibold text-[var(--color-text)]">{dayNamesFull[selectedDay]}</h2>
          </div>

          {/* Classes list */}
          <div className="px-4 space-y-3 pb-4">
            {classes.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-[var(--color-text-secondary)]">{t('schedule.noClasses')}</p>
              </div>
            ) : (
              classes.map((cls, i) => (
                <div key={i} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1.5 rounded-full self-stretch"
                      style={{ backgroundColor: subjectColors[cls.subject] || '#0066CC' }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[var(--color-text)]">{cls.subject}</h3>
                        <span className="text-xs font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded-lg">{cls.time}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                          <User size={12} />{cls.teacher}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                          <MapPin size={12} />{cls.room}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* Week view */
        <div className="px-4 py-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5 gap-2">
              {DAY_KEYS.map((k, i) => (
                <div key={k}>
                  <div className={`text-center py-2 px-1 rounded-t-xl font-medium text-sm ${
                    todayIdx === i ? 'bg-rosario-700 text-white' : 'bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]'
                  }`}>
                    {dayNames[i]}
                  </div>
                  <div className="space-y-1 mt-1">
                    {(data.schedule[k] || []).map((cls, j) => (
                      <div
                        key={j}
                        className="p-1.5 rounded-lg text-white text-center"
                        style={{ backgroundColor: subjectColors[cls.subject] || '#0066CC' }}
                      >
                        <p className="text-[9px] font-medium leading-tight truncate">{cls.subject}</p>
                        <p className="text-[8px] opacity-80">{cls.time.split('-')[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
