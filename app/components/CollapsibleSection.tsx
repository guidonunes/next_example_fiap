"use client";

import { useState } from 'react';

export default function CollapsibleSection({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-lg p-4 mt-6">
      <button onClick={() => setIsOpen(!isOpen)} className="text-xl font-bold w-full text-left">
        {title} {isOpen ? '▲' : '▼'} {/* Setas para cima/baixo */}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
