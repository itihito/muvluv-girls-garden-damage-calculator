import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface InputButtonProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  unit?: string;
  className?: string;
}

export const InputButton: React.FC<InputButtonProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  disabled = false,
  unit = '',
  className = '',
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onValueChange(newValue);
    }
  };

  const formatValue = (val: number): string => {
    return unit ? `${val}${unit}` : val.toString();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* ラベル */}
      <div className="flex items-center justify-between">
        <Label htmlFor={`input-${label}`} className="text-sm font-medium">
          {label}
        </Label>
        <span className="text-sm text-muted-foreground">
          {formatValue(value)}
        </span>
      </div>

      {/* 手動入力 */}
      <div className="relative">
        <Input
          id={`input-${label}`}
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={unit ? "pr-12" : ""}
          aria-label={`${label}の入力`}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </div>
        )}
      </div>

      {/* 範囲外値の警告 */}
      {(value < min || value > max) && (
        <div className="text-xs text-destructive">
          値は {min} から {max} の範囲で入力してください
        </div>
      )}

      {/* 範囲表示 */}
      <div className="text-xs text-muted-foreground">
        範囲: {formatValue(min)} - {formatValue(max)}
      </div>
    </div>
  );
};

export default InputButton;