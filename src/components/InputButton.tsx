import React from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface InputButtonProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  isManualMode: boolean;
  onValueChange: (value: number) => void;
  onModeToggle: (isManual: boolean) => void;
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
  isManualMode,
  onValueChange,
  onModeToggle,
  disabled = false,
  unit = '',
  className = '',
}) => {
  const handleSliderChange = (values: number[]) => {
    onValueChange(values[0]);
  };

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
    <div className={`space-y-3 ${className}`}>
      {/* ラベルと手動モード切替 */}
      <div className="flex items-center justify-between">
        <Label htmlFor={`input-${label}`} className="text-sm font-medium">
          {label}
        </Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`manual-${label}`} className="text-xs text-muted-foreground">
            手動入力
          </Label>
          <Switch
            id={`manual-${label}`}
            checked={isManualMode}
            onCheckedChange={onModeToggle}
            disabled={disabled}
            aria-label={`${label}の手動入力モード切替`}
          />
        </div>
      </div>

      {/* 入力コントロール */}
      <div className="space-y-2">
        {isManualMode ? (
          /* 手動入力モード */
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
              className="pr-12"
              aria-label={`${label}の手動入力`}
            />
            {unit && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {unit}
              </div>
            )}
          </div>
        ) : (
          /* スライダーモード */
          <div className="space-y-2">
            <Slider
              id={`slider-${label}`}
              value={[value]}
              onValueChange={handleSliderChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="w-full"
              aria-label={`${label}のスライダー入力`}
            />
            {/* 値表示 */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatValue(min)}</span>
              <span className="font-medium text-foreground">
                {formatValue(value)}
              </span>
              <span>{formatValue(max)}</span>
            </div>
          </div>
        )}
      </div>

      {/* 範囲外値の警告 */}
      {(value < min || value > max) && (
        <div className="text-xs text-destructive">
          値は {min} から {max} の範囲で入力してください
        </div>
      )}
    </div>
  );
};

export default InputButton;