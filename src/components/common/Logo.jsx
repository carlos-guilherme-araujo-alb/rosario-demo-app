export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`${sizes[size]} ${className} flex-shrink-0`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#003366" stroke="#D4AF37" strokeWidth="2.5"/>
        <text x="60" y="42" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" fill="#D4AF37">CNSR</text>
        <line x1="28" y1="50" x2="92" y2="50" stroke="#D4AF37" strokeWidth="1.2"/>
        <text x="60" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="400" fontSize="10" fill="#FFFFFF">COLÉGIO</text>
        <text x="60" y="80" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="400" fontSize="8" fill="#FFFFFF">N. Sra. do Rosário</text>
        <text x="60" y="95" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="300" fontSize="7" fill="#D4AF37">Porto</text>
        {/* Cross accent */}
        <line x1="60" y1="10" x2="60" y2="22" stroke="#D4AF37" strokeWidth="1.5"/>
        <line x1="54" y1="15" x2="66" y2="15" stroke="#D4AF37" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}
