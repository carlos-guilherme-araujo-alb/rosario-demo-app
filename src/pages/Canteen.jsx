import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData, commonData } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import { useToast } from '../components/common/Toast';
import { Check, UtensilsCrossed } from 'lucide-react';

export default function Canteen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const menu = commonData.weeklyMenu;

  const storageKey = 'rosario_canteen_' + user.id;
  const [selections, setSelections] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : (mockData[user.id].canteenSelections || {});
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selections));
  }, [selections, storageKey]);

  const selectMeal = (day, option) => {
    setSelections(prev => ({ ...prev, [day]: option }));
    addToast(t('canteen.selected') + ' \u2713', 'success');
  };

  const dayNames = {
    mon: t('schedule.days.mon'),
    tue: t('schedule.days.tue'),
    wed: t('schedule.days.wed'),
    thu: t('schedule.days.thu'),
    fri: t('schedule.days.fri'),
  };

  return (
    <div className="page-container">
      <PageHeader title={t('canteen.title')} showBack />
      <div className="px-4 pt-4 pb-4">
        <h2 className="section-title flex items-center gap-2">
          <UtensilsCrossed size={18} className="text-green-600" />
          {t('canteen.weeklyMenu')}
        </h2>
        <div className="space-y-4">
          {menu.map((day) => (
            <div key={day.day} className="card overflow-hidden animate-fade-in">
              <div className="bg-rosario-700 text-white px-4 py-2.5">
                <h3 className="font-semibold text-sm">{dayNames[day.day]}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="pb-2 border-b border-[var(--color-border)]">
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{t('canteen.soup')}</p>
                  <p className="text-sm text-[var(--color-text)] mt-0.5">{day.soup}</p>
                </div>
                {['option1', 'option2', 'vegetarian'].map(opt => {
                  const label = opt === 'option1' ? t('canteen.option1') : opt === 'option2' ? t('canteen.option2') : t('canteen.vegetarian');
                  const isSelected = selections[day.day] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectMeal(day.day, opt)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-rosario-500 bg-rosario-50 dark:bg-rosario-900/20'
                          : 'border-[var(--color-border)] hover:border-rosario-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? 'border-rosario-500 bg-rosario-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[var(--color-text-secondary)]">{label}</p>
                        <p className="text-sm text-[var(--color-text)]">{day[opt]}</p>
                      </div>
                    </button>
                  );
                })}
                <div className="pt-2 border-t border-[var(--color-border)]">
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{t('canteen.dessert')}</p>
                  <p className="text-sm text-[var(--color-text)] mt-0.5">{day.dessert}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
