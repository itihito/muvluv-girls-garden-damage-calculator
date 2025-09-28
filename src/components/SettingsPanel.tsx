import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { InputButton } from './InputButton';
import { cn } from '../lib/utils';
import type { BattleSettings } from '../types';

interface SettingsPanelProps {
  battleSettings: BattleSettings;
  onBattleSettingsChange: (settings: Partial<BattleSettings>) => void;
  isManualAttackMode: boolean;
  manualAttackPower: number | null;
  effectiveAttackPower: number;
  onManualAttackModeToggle: (enabled: boolean) => void;
  onManualAttackPowerChange: (power: number | null) => void;
  className?: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  battleSettings,
  onBattleSettingsChange,
  isManualAttackMode,
  manualAttackPower,
  effectiveAttackPower,
  onManualAttackModeToggle,
  onManualAttackPowerChange,
  className = '',
}) => {
  const { t } = useTranslation();

  const handleEnemyDefenseChange = (value: number) => {
    onBattleSettingsChange({ enemyDefense: value });
  };

  const handleCriticalBonusChange = (value: number) => {
    onBattleSettingsChange({ criticalDamageBonus: value });
  };

  const handleAdvantageBonusChange = (value: number) => {
    onBattleSettingsChange({ advantageDamageBonus: value });
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('battle.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 攻撃力設定 */}
          <InputButton
            label={t('battle.attackPower')}
            value={manualAttackPower || effectiveAttackPower}
            min={0}
            max={1000000}
            step={1}
            onValueChange={onManualAttackPowerChange}
            unit=""
            className="space-y-2"
          />

          {/* 敵防御力設定 */}
          <InputButton
            label={t('battle.enemyDefense')}
            value={battleSettings.enemyDefense}
            min={0}
            max={1000000}
            step={10}
            onValueChange={handleEnemyDefenseChange}
            unit=""
            className="space-y-2"
          />

          {/* 会心強化設定 */}
          <InputButton
            label={t('battle.criticalBonus')}
            value={battleSettings.criticalDamageBonus}
            min={0}
            max={1000}
            step={0.01}
            onValueChange={handleCriticalBonusChange}
            unit="%"
            className="space-y-2"
          />

          {/* 属性強化設定 */}
          <InputButton
            label={t('battle.advantageBonus')}
            value={battleSettings.advantageDamageBonus}
            min={0}
            max={1000}
            step={0.01}
            onValueChange={handleAdvantageBonusChange}
            unit="%"
            className="space-y-2"
          />

          {/* 計算式説明 */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-sm">ダメージ計算</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="bg-primary/10 p-2 rounded">
                基礎ダメージ × スキル威力 × 属性倍率 × 会心倍率 × ヒット数
              </p>
              <div className="mt-2 space-y-1">
                <p>1. 基礎ダメージ = 総攻撃力 - 防御力</p>
                <p>2. スキル威力 = スキルの威力 / 100</p>
                <p>3. 属性倍率 = 1.25 + ギアによる有利属性ダメージ</p>
                <p>4. 会心倍率 = 1.5 + ギアによる会心ダメージ</p>
              </div>
            </div>
          </div>

          {/* 現在の設定値表示 */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-sm">現在の戦闘設定</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">総攻撃力:</span>
                <span className="font-medium">{effectiveAttackPower}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">敵防御力:</span>
                <span className="font-medium">{battleSettings.enemyDefense}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">会心倍率:</span>
                <span className="font-medium">
                  {(1.5 + battleSettings.criticalDamageBonus / 100).toFixed(2)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">属性倍率:</span>
                <span className="font-medium">
                  {(1.25 + battleSettings.advantageDamageBonus / 100).toFixed(2)}x
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;