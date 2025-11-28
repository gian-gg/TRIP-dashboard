import { useState } from 'react';
import { X } from 'lucide-react';

export function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="border-muted-foreground/20 bg-muted/30 fixed right-4 bottom-4 z-50 max-w-xs rounded-lg border px-4 py-3 text-xs shadow-lg backdrop-blur-sm">
      <button
        onClick={() => setIsVisible(false)}
        className="text-muted-foreground hover:text-foreground absolute top-2 right-2 transition-colors"
        aria-label="Close disclaimer"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="text-muted-foreground mb-1 pr-6 font-medium">
        Academic Project Disclaimer
      </p>
      <p className="text-muted-foreground/80 mb-2 text-[10px] leading-relaxed">
        This is a class project for <strong>CIS2102: Web Development 2</strong>.
        All information presented is a proof of concept prototype and not a real
        product.
      </p>
      <p className="text-muted-foreground/60 text-[9px]">
        By Geri Gian Epanto, Czachary Xavier Villarin, Ryan Reynolds Romero,
        Emmanuel Cañete
      </p>
    </div>
  );
}
