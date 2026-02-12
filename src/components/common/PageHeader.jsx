import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, showBack = false, rightAction = null }) {
  const navigate = useNavigate();

  return (
    <div className="bg-rosario-700 text-white safe-top">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-display font-semibold">{title}</h1>
        </div>
        {rightAction}
      </div>
    </div>
  );
}
