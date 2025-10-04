import React from 'react';
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

  const {
    // 手動入力状態
    skillPower,
    hitCount,
    manualAttackPower,

    // 設定
    battleSettings,
    advancedSettings,

    // 結果
    results,
    calculationSteps,
    isDetailsDialogOpen,

    // アクション
    setManualAttackPower,
    setSkillPower,
    setHitCount,
    updateBattleSettings,
    updateAdvancedSettings,
    setDetailsDialogOpen,
    getEffectiveAttackPower,
    getBarChartData,
    // reset,
    init,
  } = useCalculatorStore();

  // 初期化実行
  React.useEffect(() => {
    init();
  }, [init]);

  // 言語変更ハンドラー
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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
              effectiveAttackPower={getEffectiveAttackPower()}
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
              barChartData={getBarChartData({
                normal: t('damage.normal'),
                critical: t('damage.critical'),
                advantage: t('damage.advantage'),
                advantageCritical: t('damage.advantageCritical')
              })}
              onDetailsClick={() => setDetailsDialogOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* 詳細設定ダイアログ */}
      <DetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        calculationSteps={calculationSteps}
        advancedSettings={advancedSettings}
        onAdvancedSettingsChange={updateAdvancedSettings}
      />

    </div>
  );
}

export default App;