import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { CharacterSelector } from './components/CharacterSelector';
import { SkillPanel } from './components/SkillPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { DamageResults } from './components/DamageResults';
import { DetailsDialog } from './components/DetailsDialog';
import { useCalculatorStore } from './stores/calculatorStore';
import './utils/i18n';

function App() {
  const { t, i18n } = useTranslation();

  const {
    // 選択状態
    selectedCharacter,
    selectedSkill,
    skillLevel,
    selectedAttributeFilter,

    // 手動入力状態
    isManualAttackMode,
    isManualSkillMode,
    manualAttackPower,
    manualSkillPower,

    // 設定
    battleSettings,
    advancedSettings,

    // 結果
    results,
    calculationSteps,
    isDetailsDialogOpen,

    // アクション
    setCharacter,
    setSkill,
    setSkillLevel,
    setAttributeFilter,
    toggleManualAttackMode,
    toggleManualSkillMode,
    setManualAttackPower,
    setManualSkillPower,
    updateBattleSettings,
    updateAdvancedSettings,
    setDetailsDialogOpen,
    getEffectiveAttackPower,
    getBarChartData,
    reset,
  } = useCalculatorStore();

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
              <p className="text-sm text-muted-foreground">
                {t('app.description')}
              </p>
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

              {/* リセットボタン */}
              <Button variant="outline" onClick={reset}>
                {t('ui.reset')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左カラム: キャラクター選択 */}
          <div className="lg:col-span-1">
            <CharacterSelector
              selectedCharacter={selectedCharacter}
              onSelectCharacter={setCharacter}
              attributeFilter={selectedAttributeFilter}
              onAttributeFilterChange={setAttributeFilter}
            />
          </div>

          {/* 中央カラム: スキル設定・戦闘設定 */}
          <div className="lg:col-span-1 space-y-6">
            <SkillPanel
              selectedCharacter={selectedCharacter}
              selectedSkill={selectedSkill}
              skillLevel={skillLevel}
              isManualSkillMode={isManualSkillMode}
              manualSkillPower={manualSkillPower}
              onSelectSkill={setSkill}
              onSkillLevelChange={setSkillLevel}
              onManualSkillModeToggle={toggleManualSkillMode}
              onManualSkillPowerChange={setManualSkillPower}
            />

            <SettingsPanel
              battleSettings={battleSettings}
              onBattleSettingsChange={updateBattleSettings}
              isManualAttackMode={isManualAttackMode}
              manualAttackPower={manualAttackPower}
              effectiveAttackPower={getEffectiveAttackPower()}
              onManualAttackModeToggle={toggleManualAttackMode}
              onManualAttackPowerChange={setManualAttackPower}
            />
          </div>

          {/* 右カラム: ダメージ結果 */}
          <div className="lg:col-span-1">
            <DamageResults
              results={results}
              barChartData={getBarChartData()}
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

      {/* フッター */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Damage Calculator - Alterios Formula Implementation</p>
            <p className="mt-1">React + TypeScript + Vite + shadcn/ui</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;