import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { InputButton } from './InputButton';
import { SkillSelectionDialog } from './SkillSelectionDialog';
import { cn } from '../lib/utils';
import type { BattleSettings } from '../types';

interface SettingsPanelProps {
  battleSettings: BattleSettings;
  onBattleSettingsChange: (settings: Partial<BattleSettings>) => void;
  manualAttackPower: number | null;
  effectiveAttackPower: number;
  skillPower: number | null;
  hitCount: number | null;
  onManualAttackPowerChange: (power: number | null) => void;
  onSkillPowerChange: (power: number) => void;
  onHitCountChange: (count: number) => void;
  className?: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  battleSettings,
  onBattleSettingsChange,
  manualAttackPower,
  effectiveAttackPower,
  skillPower,
  hitCount,
  onManualAttackPowerChange,
  onSkillPowerChange,
  onHitCountChange,
  className = '',
}) => {
  const { t } = useTranslation();
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

  const handleEnemyDefenseChange = (value: number) => {
    onBattleSettingsChange({ enemyDefense: value });
  };

  const handleCriticalBonusChange = (value: number) => {
    onBattleSettingsChange({ criticalDamageBonus: value });
  };

  const handleAdvantageBonusChange = (value: number) => {
    onBattleSettingsChange({ advantageDamageBonus: value });
  };

  const handleSkillPowerSelect = (power: number, hitCount: number) => {
    onSkillPowerChange(power);
    onHitCountChange(hitCount);
    setIsSkillDialogOpen(false);
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

          {/* スキル威力設定 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">スキル威力</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSkillDialogOpen(true)}
                className="text-xs"
              >
                キャラクタースキルから入力
              </Button>
            </div>
            <InputButton
              label=""
              value={skillPower || 100}
              min={0}
              max={10000}
              step={0.1}
              onValueChange={onSkillPowerChange}
              unit=""
              className=""
            />
          </div>

          {/* ヒット数設定 */}
          <InputButton
            label="ヒット数"
            value={hitCount || 1}
            min={1}
            max={20}
            step={1}
            onValueChange={onHitCountChange}
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

      {/* スキル選択ダイアログ */}
      <SkillSelectionDialog
        isOpen={isSkillDialogOpen}
        onClose={() => setIsSkillDialogOpen(false)}
        onSkillPowerSelect={handleSkillPowerSelect}
      />
    </div>
  );
};

export default SettingsPanel;