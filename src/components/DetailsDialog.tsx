import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import type { CalculationSteps, AdvancedSettings } from '../types';

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  calculationSteps: CalculationSteps | null;
  advancedSettings: AdvancedSettings;
  onAdvancedSettingsChange: (settings: Partial<AdvancedSettings>) => void;
  className?: string;
}

export const DetailsDialog: React.FC<DetailsDialogProps> = ({
  isOpen,
  onClose,
  calculationSteps,
  advancedSettings,
  onAdvancedSettingsChange,
  className = '',
}) => {
  const { t } = useTranslation();

  // 数値フォーマット
  const formatNumber = (value: number): string => {
    return Math.floor(value).toLocaleString();
  };

  // 計算ステップのレンダリング
  const renderCalculationStep = (
    step: any,
    stepNumber: number,
    title: string
  ) => (
    <Card key={stepNumber} className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
            {stepNumber}
          </Badge>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('details.calculation.formula')}:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">{step.formula}</code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('details.calculation.calculation')}:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">{step.calculation}</code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('details.calculation.result')}:</span>
            <span className="font-bold text-primary">
              {typeof step.result === 'number' ? formatNumber(step.result) : step.result}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 最終ダメージ計算ステップのレンダリング
  const renderFinalDamageStep = (step: any) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
            4
          </Badge>
          {step.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 通常ダメージ */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-700">{t('damage.normal')}</span>
            <span className="font-bold text-blue-600">{formatNumber(step.results.normal)}</span>
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>公式: {step.formulas.normal}</div>
            <div>計算: {step.calculations.normal}</div>
          </div>
        </div>

        {/* 会心ダメージ */}
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-orange-700">{t('damage.critical')}</span>
            <span className="font-bold text-orange-600">{formatNumber(step.results.critical)}</span>
          </div>
          <div className="text-xs text-orange-600 space-y-1">
            <div>公式: {step.formulas.critical}</div>
            <div>計算: {step.calculations.critical}</div>
          </div>
        </div>

        {/* 有利ダメージ */}
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-green-700">{t('damage.advantage')}</span>
            <span className="font-bold text-green-600">{formatNumber(step.results.advantageNormal)}</span>
          </div>
          <div className="text-xs text-green-600 space-y-1">
            <div>公式: {step.formulas.advantageNormal}</div>
            <div>計算: {step.calculations.advantageNormal}</div>
          </div>
        </div>

        {/* 有利会心ダメージ */}
        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-red-700">{t('damage.advantageCritical')}</span>
            <span className="font-bold text-red-600">{formatNumber(step.results.advantageCritical)}</span>
          </div>
          <div className="text-xs text-red-600 space-y-1">
            <div>公式: {step.formulas.advantageCritical}</div>
            <div>計算: {step.calculations.advantageCritical}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('max-w-4xl max-h-[90vh] overflow-y-auto', className)}>
        <DialogHeader>
          <DialogTitle>{t('details.title')}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="calculation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculation">{t('details.tabs.calculation')}</TabsTrigger>
            <TabsTrigger value="advanced">{t('details.tabs.advanced')}</TabsTrigger>
          </TabsList>

          {/* 計算過程タブ */}
          <TabsContent value="calculation" className="space-y-4">
            {calculationSteps ? (
              <div className="space-y-4">
                {renderCalculationStep(
                  calculationSteps.step1,
                  1,
                  t('details.calculation.step1')
                )}
                {renderCalculationStep(
                  calculationSteps.step2,
                  2,
                  t('details.calculation.step2')
                )}
                {renderCalculationStep(
                  calculationSteps.step3,
                  3,
                  t('details.calculation.step3')
                )}
                {renderCalculationStep(
                  calculationSteps.step4,
                  4,
                  t('details.calculation.step4')
                )}
                {renderFinalDamageStep(calculationSteps.step5)}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                計算結果がありません
              </div>
            )}
          </TabsContent>

          {/* 高度な設定タブ */}
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('details.advanced.roundingMode')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {(['floor', 'ceil', 'round'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onAdvancedSettingsChange({ roundingMode: mode })}
                      className={cn(
                        'p-3 rounded-lg border text-center transition-colors',
                        advancedSettings.roundingMode === mode
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-muted border-border'
                      )}
                    >
                      <div className="font-medium">
                        {t(`details.advanced.roundingOptions.${mode}`)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {mode === 'floor' && '例: 123.7 → 123'}
                        {mode === 'ceil' && '例: 123.3 → 124'}
                        {mode === 'round' && '例: 123.7 → 124'}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">表示設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-formula" className="text-sm font-medium">
                    {t('details.advanced.showFormula')}
                  </Label>
                  <Switch
                    id="show-formula"
                    checked={advancedSettings.showFormula}
                    onCheckedChange={(checked) =>
                      onAdvancedSettingsChange({ showFormula: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animate-results" className="text-sm font-medium">
                    {t('details.advanced.animateResults')}
                  </Label>
                  <Switch
                    id="animate-results"
                    checked={advancedSettings.animateResults}
                    onCheckedChange={(checked) =>
                      onAdvancedSettingsChange({ animateResults: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;