import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 15,
  disabled = false,
  className = '',
  showLabel = true,
  label = 'スキルレベル',
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* ラベル */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <Label htmlFor={`rating-${label}`} className="text-sm font-medium">
            {label}
          </Label>
          <span className="text-sm text-muted-foreground">
            レベル {value}/{max}
          </span>
        </div>
      )}

      {/* 手動入力 */}
      <div className="relative">
        <Input
          id={`rating-${label}`}
          type="number"
          value={value}
          onChange={handleInputChange}
          min={1}
          max={max}
          step={1}
          disabled={disabled}
          className="pr-12"
          aria-label={`${label}の入力`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
          Lv
        </div>
      </div>

      {/* 範囲外値の警告 */}
      {(value < 1 || value > max) && (
        <div className="text-xs text-destructive">
          レベルは 1 から {max} の範囲で入力してください
        </div>
      )}

      {/* 操作説明 */}
      <div className="text-xs text-muted-foreground">
        1-{max} の範囲で入力してください
      </div>
    </div>
  );
};

export default Rating;