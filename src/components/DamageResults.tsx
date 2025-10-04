import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatNumber } from '../utils/formatters';
import type { DamageResults as DamageResultsType, BarChartData } from '../types';

interface DamageResultsProps {
  results: DamageResultsType | null;
  barChartData: BarChartData[];
  onDetailsClick: () => void;
  className?: string;
}

export const DamageResults: React.FC<DamageResultsProps> = React.memo(({
  results,
  barChartData,
  onDetailsClick,
  className = '',
}) => {
  const { t } = useTranslation();

  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            {t('damage.damageLabel')}: {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!results) {
    return (
      <Card className={cn('h-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg">{t('damage.title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground text-center">
            {t('damage.noResults')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">{t('damage.title')}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onDetailsClick}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            {t('damage.details')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ダメージ結果バー */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                {t('damage.normal')}
              </div>
              <div className="text-lg font-bold text-blue-600">
                {formatNumber(results.finalDamages.normal)}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                {t('damage.critical')}
              </div>
              <div className="text-lg font-bold text-orange-600">
                {formatNumber(results.finalDamages.critical)}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                {t('damage.advantage')}
              </div>
              <div className="text-lg font-bold text-green-600">
                {formatNumber(results.finalDamages.advantageNormal)}
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                {t('damage.advantageCritical')}
              </div>
              <div className="text-lg font-bold text-red-600">
                {formatNumber(results.finalDamages.advantageCritical)}
              </div>
            </div>
          </div>

          {/* 棒グラフ */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="damage"
                  radius={[4, 4, 0, 0]}
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 基礎情報 */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-sm">{t('damage.baseInfo')}</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('damage.totalAttack')}:</span>
                <span className="font-medium">{formatNumber(results.totalAttack)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('battle.enemyDefense')}:</span>
                <span className="font-medium">{formatNumber(results.enemyDefense)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('damage.baseDamage')}:</span>
                <span className="font-medium">{formatNumber(results.baseDamage)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('damage.criticalMultiplier')}:</span>
                <span className="font-medium">{results.criticalMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('damage.advantageMultiplier')}:</span>
                <span className="font-medium">{results.advantageMultiplier.toFixed(2)}x</span>
              </div>
            </div>
          </div>

          {/* 倍率情報 */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {t('damage.critical')}: {results.criticalMultiplier.toFixed(2)}x
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {t('damage.advantage')}: {results.advantageMultiplier.toFixed(2)}x
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {t('damage.advantageCritical')}: {(results.criticalMultiplier * results.advantageMultiplier).toFixed(2)}x
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default DamageResults;