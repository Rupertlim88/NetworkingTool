export type StarColor = 'yellow' | 'blue';

export interface StarLevelUpAnimationProps {
  fromStars: 1 | 2;
  toStars: 2 | 3;
  contactPhoto: string;
  contactName: string;
  starColor: StarColor;
  onComplete: () => void;
}
