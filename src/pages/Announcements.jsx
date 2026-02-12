import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { Globe, Users, CheckCircle, Circle } from 'lucide-react';

export default function Announcements() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const announcements = mockData[user.id].announcements;
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  // Read state from localStorage
  const getReadIds = () => JSON.parse(localStorage.getItem('rosario_read_ann_' + user.id) || '[]');
  const [readIds, setReadIds] = useState(getReadIds);

  const isRead = (a) => a.read || readIds.includes(a.id);
  const toggleRead = (id) => {
    const current = getReadIds();
    const updated = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
    localStorage.setItem('rosario_read_ann_' + user.id, JSON.stringify(updated));
    setReadIds(updated);
  };

  const filtered = announcements
    .filter(a => filter === 'all' || a.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (d) => new Date(d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="page-container">
      <PageHeader title={t('announcements.title')} showBack />

      {/* Filter */}
      <div className="px-4 pt-4">
        <div className="flex gap-2">
          {[
            { key: 'all', label: t('common.all') },
            { key: 'general', label: t('announcements.general'), icon: Globe },
            { key: 'class', label: t('announcements.classSpecific'), icon: Users },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === f.key ? 'bg-rosario-700 text-white' : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              {f.icon && <f.icon size={12} />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-2">
        {filtered.map((ann, i) => (
          <button
            key={ann.id}
            onClick={() => { setSelected(ann); if (!isRead(ann)) toggleRead(ann.id); }}
            className="card w-full p-4 text-left hover:shadow-md transition-all active:scale-[0.99] animate-fade-in"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex items-start gap-3">
              {!isRead(ann) ? (
                <div className="w-2.5 h-2.5 rounded-full bg-rosario-500 mt-1.5 flex-shrink-0" />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-transparent mt-1.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${ann.type === 'general' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>
                    {ann.type === 'general' ? t('announcements.general') : t('announcements.classSpecific')}
                  </span>
                </div>
                <p className={`text-sm ${!isRead(ann) ? 'font-semibold' : 'font-medium'} text-[var(--color-text)]`}>{ann.title}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{ann.content}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">{ann.author} • {formatDate(ann.date)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''}>
        {selected && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-0.5 rounded-full ${selected.type === 'general' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>
                {selected.type === 'general' ? t('announcements.general') : t('announcements.classSpecific')}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)]">{formatDate(selected.date)}</span>
            </div>
            <p className="text-[var(--color-text)] leading-relaxed">{selected.content}</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 pt-3 border-t border-[var(--color-border)]">
              {t('announcements.from')}: {selected.author}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
