import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData, subjectColors } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { Upload, FileText, Image, Heart, Download, Plus } from 'lucide-react';

export default function Notes() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [tab, setTab] = useState('shared');
  const [showUpload, setShowUpload] = useState(false);

  // Load notes from mock + localStorage
  const baseNotes = mockData[user.id].notes;
  const extraNotes = JSON.parse(localStorage.getItem('rosario_notes_' + user.id) || '[]');
  const allNotes = [...baseNotes, ...extraNotes];

  const sharedNotes = allNotes.filter(n => !n.isOwner);
  const myNotes = allNotes.filter(n => n.isOwner);
  const displayNotes = tab === 'shared' ? sharedNotes : myNotes;

  const formatDate = (d) => new Date(d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newNote = {
      id: Date.now(),
      title: file.name.replace(/\.[^.]+$/, ''),
      subject: 'Geral',
      author: user.name,
      date: new Date().toISOString().split('T')[0],
      type: file.type.includes('image') ? 'image' : 'pdf',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      likes: 0,
      isOwner: true,
    };
    const existing = JSON.parse(localStorage.getItem('rosario_notes_' + user.id) || '[]');
    localStorage.setItem('rosario_notes_' + user.id, JSON.stringify([...existing, newNote]));
    setShowUpload(false);
    setTab('mine');
    addToast(t('notes.upload') + ' ✓', 'success');
    // Force re-render
    window.dispatchEvent(new Event('storage'));
  };

  const handleLike = (noteId) => {
    addToast('❤️ Like!', 'info');
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('notes.title')}
        showBack
        rightAction={
          <button onClick={() => setShowUpload(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Plus size={22} />
          </button>
        }
      />

      {/* Tab selector */}
      <div className="px-4 pt-4">
        <div className="flex bg-[var(--color-card)] rounded-xl p-1 border border-[var(--color-border)]">
          {[
            { key: 'shared', label: t('notes.shared') },
            { key: 'mine', label: t('notes.mine') },
          ].map(tb => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === tb.key ? 'bg-rosario-700 text-white shadow-sm' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes list */}
      <div className="px-4 py-4 space-y-2">
        {displayNotes.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">{t('notes.noNotes')}</p>
          </div>
        ) : (
          displayNotes.map((note, i) => (
            <div key={note.id} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rosario-50 dark:bg-rosario-900/20 flex items-center justify-center flex-shrink-0">
                  {note.type === 'image' ? <Image size={18} className="text-rosario-600" /> : <FileText size={18} className="text-rosario-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">{note.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: (subjectColors[note.subject] || '#666') + '15', color: subjectColors[note.subject] || '#666' }}>
                      {note.subject}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">{note.size}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {note.author} • {formatDate(note.date)}
                    </span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleLike(note.id)} className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors">
                        <Heart size={14} />{note.likes}
                      </button>
                      <button onClick={() => addToast('Download simulado ✓', 'success')} className="text-[var(--color-text-secondary)] hover:text-rosario-500 transition-colors">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload modal */}
      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title={t('notes.uploadNew')}>
        <div className="py-4">
          <label className="block">
            <div className="card border-2 border-dashed border-rosario-300 dark:border-rosario-700 p-8 text-center cursor-pointer hover:bg-rosario-50 dark:hover:bg-rosario-900/10 transition-colors rounded-xl">
              <Upload size={32} className="mx-auto text-rosario-500 mb-3" />
              <p className="text-sm font-medium text-[var(--color-text)]">{t('notes.selectFile')}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">PDF, Images, Documents</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={handleUpload} />
          </label>
        </div>
      </Modal>
    </div>
  );
}
