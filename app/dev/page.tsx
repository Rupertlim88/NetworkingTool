'use client';

import { useState } from 'react';
import { StarLevelUpAnimation } from '@/components/StarLevelUpAnimation';

export default function DevPage() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div>
        <div className="w-32 h-[170px] bg-gray-600 rounded-2xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">RL</span>
        </div>
        <div className="mt-2 p-4 bg-gray-800 rounded">
          <p className="text-white text-sm mb-2">Rupert Lim</p>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold"
            onClick={() => setIsAnimating(true)}
          >
            Level Up
          </button>
        </div>
      </div>
      {isAnimating && (
        <StarLevelUpAnimation
          fromStars={1}
          toStars={2}
          starColor="yellow"
          contactName="Rupert Lim"
          contactPhoto=""
          onComplete={() => setIsAnimating(false)}
        />
      )}
    </div>
  );
}
