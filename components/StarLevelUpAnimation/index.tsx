'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { StarLevelUpAnimationProps } from './types';

gsap.registerPlugin(useGSAP);

export function StarLevelUpAnimation(_props: StarLevelUpAnimationProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // animation logic goes here in Phase 2+
  }, { scope: containerRef });

  return <div ref={containerRef} />;
}
