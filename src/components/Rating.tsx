import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 15,
  size = 'md',
  disabled = false,
  className = '',
  showLabel = true,
  label = 'スキルレベル',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const containerSizeClasses = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  const handleStarClick = (starValue: number) => {
    if (disabled) return;
    onChange(starValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starValue);
    } else if (e.key === 'ArrowRight' && starValue < max) {
      e.preventDefault();
      onChange(starValue + 1);
    } else if (e.key === 'ArrowLeft' && starValue > 1) {
      e.preventDefault();
      onChange(starValue - 1);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* ラベルと現在値表示 */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-muted-foreground">
            レベル {value}/{max}
          </span>
        </div>
      )}

      {/* 星の表示 */}
      <div className={cn('flex flex-wrap', containerSizeClasses[size])}>
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= value;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => handleStarClick(starValue)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              disabled={disabled}
              className={cn(
                'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm',
                {
                  'cursor-pointer hover:scale-110': !disabled,
                  'cursor-not-allowed opacity-50': disabled,
                }
              )}
              aria-label={`スキルレベル ${starValue} を選択`}
              tabIndex={disabled ? -1 : 0}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  'transition-colors duration-200',
                  {
                    'fill-yellow-400 text-yellow-400': isFilled && !disabled,
                    'fill-gray-300 text-gray-300': isFilled && disabled,
                    'text-gray-300 hover:text-yellow-300': !isFilled && !disabled,
                    'text-gray-200': !isFilled && disabled,
                  }
                )}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>

      {/* スキルレベル詳細情報 */}
      <div className="text-xs text-muted-foreground">
        クリックでレベルを選択 (1-{max})
      </div>
    </div>
  );
};

export default Rating;