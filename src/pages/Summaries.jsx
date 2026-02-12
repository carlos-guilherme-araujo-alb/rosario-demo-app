import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData, subjectColors } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { Filter, BookOpen } from 'lucide-react';

export default function Summaries() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const summaries = mockData[user.id].summaries;
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const subjects = [...new Set(summaries.map(s => s.subject))];

  const filtered = useMemo(() => {
    const list = filter === 'all' ? summaries : summaries.filter(s => s.subject === filter);
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [summaries, filter]);

  const formatDate = (d) => new Date(d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });

  return (
    <div className="page-container">
      <PageHeader title={t('summaries.title')} showBack />

      {/* Filter */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-rosario-700 text-white' : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
            }`}
          >
            {t('common.all')} ({summaries.length})
          </button>
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === s ? 'text-white' : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
              style={filter === s ? { backgroundColor: subjectColors[s] || '#0066CC' } : {}}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Summaries list */}
      <div className="px-4 py-3 space-y-2">
        {filtered.map((sum, i) => (
          <button
            key={sum.id}
            onClick={() => setSelected(sum)}
            className="card w-full p-4 text-left hover:shadow-md transition-all active:scale-[0.99] animate-fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-1.5 rounded-full self-stretch flex-shrink-0" style={{ backgroundColor: subjectColors[sum.subject] || '#0066CC' }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: (subjectColors[sum.subject] || '#0066CC') + '15', color: subjectColors[sum.subject] || '#0066CC' }}>
                    {sum.subject}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">{formatDate(sum.date)}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">{t('summaries.lesson')} {sum.lesson}</p>
                <p className="text-sm text-[var(--color-text)] line-clamp-2">{sum.content}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.subject || ''}>
        {selected && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-rosario-500" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">{t('summaries.lesson')} {selected.lesson} • {formatDate(selected.date)}</span>
            </div>
            <p className="text-[var(--color-text)] leading-relaxed">{selected.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
