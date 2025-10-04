import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { SettingsPanel } from './components/SettingsPanel';
import { DamageResults } from './components/DamageResults';
import { DetailsDialog } from './components/DetailsDialog';
import { useCalculatorStore } from './stores/calculatorStore';
import './utils/i18n';

function App() {
  const { t, i18n } = useTranslation();

  // セレクターを使用して必要な値のみ取得
  const skillPower = useCalculatorStore(state => state.skillPower);
  const hitCount = useCalculatorStore(state => state.hitCount);
  const manualAttackPower = useCalculatorStore(state => state.manualAttackPower);
  
  const battleSettings = useCalculatorStore(state => state.battleSettings);
  const advancedSettings = useCalculatorStore(state => state.advancedSettings);
  
  const results = useCalculatorStore(state => state.results);
  const calculationSteps = useCalculatorStore(state => state.calculationSteps);
  const isDetailsDialogOpen = useCalculatorStore(state => state.isDetailsDialogOpen);

  // アクションのみ取得
  const {
    setManualAttackPower,
    setSkillPower,
    setHitCount,
    updateBattleSettings,
    updateAdvancedSettings,
    setDetailsDialogOpen,
    getEffectiveAttackPower,
    getBarChartData,
    init,
  } = useCalculatorStore();

  // 初期化実行
  React.useEffect(() => {
    init();
  }, [init]);

  // 言語変更ハンドラー（メモ化）
  const handleLanguageChange = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  // 詳細ダイアログハンドラー（メモ化）
  const handleDetailsClick = useCallback(() => {
    setDetailsDialogOpen(true);
  }, [setDetailsDialogOpen]);

  const handleDetailsClose = useCallback(() => {
    setDetailsDialogOpen(false);
  }, [setDetailsDialogOpen]);

  // barChartData の計算をメモ化
  const barChartData = useMemo(() =>
    getBarChartData({
      normal: t('damage.normal'),
      critical: t('damage.critical'),
      advantage: t('damage.advantage'),
      advantageCritical: t('damage.advantageCritical')
    }),
    [results, t] // resultsが変更されたときのみ再計算
  );

  // effectiveAttackPower の計算をメモ化
  const effectiveAttackPower = useMemo(() =>
    getEffectiveAttackPower(),
    [manualAttackPower] // manualAttackPowerが変更されたときのみ再計算
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* 言語切替 */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Select value={i18n.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左カラム: 戦闘設定 */}
          <div className="lg:col-span-1">
            <SettingsPanel
              battleSettings={battleSettings}
              onBattleSettingsChange={updateBattleSettings}
              manualAttackPower={manualAttackPower}
              effectiveAttackPower={effectiveAttackPower}
              skillPower={skillPower}
              hitCount={hitCount}
              onManualAttackPowerChange={setManualAttackPower}
              onSkillPowerChange={setSkillPower}
              onHitCountChange={setHitCount}
            />
          </div>

          {/* 右カラム: ダメージ結果 */}
          <div className="lg:col-span-1">
            <DamageResults
              results={results}
              barChartData={barChartData}
              onDetailsClick={handleDetailsClick}
            />
          </div>
        </div>
      </main>

      {/* 詳細設定ダイアログ */}
      <DetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={handleDetailsClose}
        calculationSteps={calculationSteps}
        advancedSettings={advancedSettings}
        onAdvancedSettingsChange={updateAdvancedSettings}
      />

    </div>
  );
}

export default App;
