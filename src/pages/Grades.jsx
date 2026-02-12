import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData, subjectColors } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import { TrendingUp, Award } from 'lucide-react';

export default function Grades() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const grades = mockData[user.id].grades;
  const [period, setPeriod] = useState('all');

  const subjects = Object.keys(grades);

  const getGrade = (subj, p) => {
    if (p === 'all') {
      const vals = [grades[subj].p1, grades[subj].p2, grades[subj].p3].filter(Boolean);
      return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '-';
    }
    return grades[subj]?.[p] ?? '-';
  };

  const allGrades = subjects.flatMap(s => [grades[s].p1, grades[s].p2, grades[s].p3].filter(Boolean));
  const generalAvg = allGrades.length ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1) : 0;

  const gradeColor = (g) => {
    const n = parseFloat(g);
    if (isNaN(n)) return '';
    if (n >= 18) return 'text-green-600 dark:text-green-400';
    if (n >= 14) return 'text-blue-600 dark:text-blue-400';
    if (n >= 10) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Simple bar chart
  const maxGrade = 20;

  return (
    <div className="page-container">
      <PageHeader title={t('grades.title')} />

      {/* General average card */}
      <div className="px-4 -mt-0 pt-4">
        <div className="card p-5 bg-gradient-to-r from-rosario-700 to-rosario-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rosario-200 text-sm">{t('grades.generalAverage')}</p>
              <p className="text-4xl font-display font-bold mt-1">{generalAvg}</p>
              <p className="text-rosario-300 text-xs mt-1">/20</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Award size={32} className="text-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Period selector */}
      <div className="px-4 pt-4">
        <div className="flex bg-[var(--color-card)] rounded-xl p-1 border border-[var(--color-border)] overflow-x-auto scrollbar-hide">
          {[
            { key: 'all', label: t('common.all') },
            { key: 'p1', label: t('grades.period1') },
            { key: 'p2', label: t('grades.period2') },
            { key: 'p3', label: t('grades.period3') },
          ].map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                period === p.key ? 'bg-rosario-700 text-white shadow-sm' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grades list */}
      <div className="px-4 py-4 space-y-2">
        {subjects.map((subj, i) => {
          const grade = getGrade(subj, period);
          const numGrade = parseFloat(grade);
          const pct = isNaN(numGrade) ? 0 : (numGrade / maxGrade) * 100;

          return (
            <div key={subj} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: subjectColors[subj] || '#0066CC' }} />
                  <span className="text-sm font-medium text-[var(--color-text)] truncate">{subj}</span>
                </div>
                <span className={`text-lg font-bold ${gradeColor(grade)}`}>{grade}</span>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: subjectColors[subj] || '#0066CC',
                  }}
                />
              </div>
              {/* Period breakdown when viewing all */}
              {period === 'all' && (
                <div className="flex gap-4 mt-2">
                  {['p1', 'p2', 'p3'].map(p => (
                    <span key={p} className="text-xs text-[var(--color-text-secondary)]">
                      {p.toUpperCase()}: <span className="font-medium text-[var(--color-text)]">{grades[subj][p] ?? '-'}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Evolution chart */}
      <div className="px-4 pb-4">
        <div className="card p-4">
          <h3 className="section-title flex items-center gap-2">
            <TrendingUp size={18} className="text-rosario-500" />
            {t('grades.evolution')}
          </h3>
          <div className="relative h-48 mt-4">
            <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 5, 10, 15, 20].map(v => {
                const y = 170 - (v / 20) * 160;
                return (
                  <g key={v}>
                    <line x1="40" y1={y} x2="380" y2={y} stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4,4" />
                    <text x="35" y={y + 4} textAnchor="end" fill="var(--color-text-secondary)" fontSize="10">{v}</text>
                  </g>
                );
              })}
              {/* Period labels */}
              {['P1', 'P2', 'P3'].map((label, i) => {
                const x = 110 + i * 120;
                return <text key={label} x={x} y="178" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11" fontWeight="500">{label}</text>;
              })}
              {/* Lines for each subject (top 4) */}
              {subjects.slice(0, 4).map((subj, si) => {
                const color = subjectColors[subj] || '#0066CC';
                const points = [grades[subj].p1, grades[subj].p2, grades[subj].p3]
                  .map((v, i) => {
                    if (!v) return null;
                    const x = 110 + i * 120;
                    const y = 170 - (v / 20) * 160;
                    return `${x},${y}`;
                  })
                  .filter(Boolean)
                  .join(' ');

                return (
                  <g key={subj}>
                    <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {[grades[subj].p1, grades[subj].p2, grades[subj].p3].map((v, i) => {
                      if (!v) return null;
                      const x = 110 + i * 120;
                      const y = 170 - (v / 20) * 160;
                      return <circle key={i} cx={x} cy={y} r="3.5" fill={color} stroke="white" strokeWidth="1.5" />;
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {subjects.slice(0, 4).map(subj => (
              <div key={subj} className="flex items-center gap-1.5">
                <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: subjectColors[subj] || '#0066CC' }} />
                <span className="text-[10px] text-[var(--color-text-secondary)]">{subj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
