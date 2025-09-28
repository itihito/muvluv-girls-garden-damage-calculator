# ゲームダメージ計算機 - 詳細実装計画書

## 1. プロジェクト概要

### 1.1 アプリケーション概要
- **名称**: ゲームダメージ計算機（Game Damage Calculator）
- **目的**: アルテリオス計算式を使用したダメージ計算のビジュアル化
- **対象プラットフォーム**: ウェブブラウザ（レスポンシブ対応）
- **言語対応**: 日本語、英語、中国語

### 1.2 技術スタック
- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **状態管理**: Zustand（軽量で型安全）
- **多言語化**: react-i18next
- **スタイリング**: Tailwind CSS + CSS Modules
- **UI ライブラリ**: shadcn/ui（Radix UI + Tailwind CSS）
- **アイコン**: Lucide React
- **チャート**: Recharts（shadcn/ui Chart コンポーネント）
- **デプロイ**: Vercel または Netlify

## 2. UI/UX 設計

### 2.1 一画面完結型レイアウト設計

#### 2.1.1 デスクトップ表示（横並び統合レイアウト）
```
┌─────────────────────────────────────────────────────────────┐
│ [ヘッダー] ロゴ + 言語切替 + テーマ切替                      │
├─────────────────────────────────────────────────────────────┤
│ [統合メインコンテンツ - 一画面完結]                          │
│ ┌─────────────────────┐ ┌─────────────────────┐           │
│ │ 🎭 キャラクター選択    │ │ 📊 ダメージ結果      │           │
│ │ [🔥すべて][⚔️アグレ] │ │ 通常ダメージ         │           │
│ │ [😊シャイ][💖キュート] │ │ ████████░░ 1,075    │           │
│ │ [👤][👤][👤][👤][👤] │ │ 会心ダメージ         │           │
│ │ [👤][👤][👤][👤][👤] │ │ ████████████░ 1,613 │           │
│ │ 選択中: キャラ名       │ │ 有利通常ダメージ      │           │
│ ├─────────────────────┤ │ █████████░░ 1,181   │           │
│ │ ⚔️ スキル選択         │ │ 有利会心ダメージ      │           │
│ │ [🔥] 火炎斬り 1.5x    │ │ ████████████████ 1,950 │        │
│ │ [❄️] 氷結突き 1.8x    │ │                    │           │
│ │ レベル: [5] ⬅️➡️      │ │ [🔄 リセット]       │           │
│ ├─────────────────────┤ │ [📋 詳細設定]       │           │
│ │ ⚙️ 戦闘設定           │ │                    │           │
│ │ 🛡️ 敵防御: [800]     │ │                    │           │
│ │ 🎯 属性: ●有利 ○通常  │ │                    │           │
│ │ 💎 会心強化: [15%]    │ │                    │           │
│ └─────────────────────┘ └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

#### 2.1.2 モバイル表示（縦積み統合レイアウト）
```
┌──────────────────────┐
│ [ヘッダー] ロゴ + 設定 │
├──────────────────────┤
│ 🎭 キャラクター選択   │
│ [🔥すべて][⚔️アグレ] │
│ [😊シャイ][💖キュート] │
│ [👤][👤][👤]         │
│ [👤][👤][👤]         │
│ 選択: キャラ名        │
├──────────────────────┤
│ ⚔️ スキル選択        │
│ [🔥] 火炎斬り 1.5x   │
│ レベル: [5] ⬅️➡️     │
├──────────────────────┤
│ ⚙️ 戦闘設定          │
│ 敵防御: [800]        │
│ 属性: ●有利 ○通常    │
│ 強化: 会心[15%] 属性[10%] │
├──────────────────────┤
│ 📊 ダメージ結果      │
│ 通常: ██████ 1,075  │
│ 会心: ████████ 1,613│
│ 有利通常: ███████ 1,181│
│ 有利会心: ██████████ 1,950│
│ [🔄 リセット]        │
└──────────────────────┘
```

#### 2.1.3 タブレット表示（中間レイアウト）
```
┌─────────────────────────────────────────┐
│ [ヘッダー] ロゴ + 言語切替 + テーマ切替  │
├─────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ 🎭 キャラ + スキル │ │ 📊 ダメージ結果  │ │
│ │ [🔥すべて][⚔️アグレ] │ │ 通常ダメージ     │ │
│ │ [👤][👤][👤][👤] │ │ ██████ 1,075    │ │
│ │ [👤][👤][👤][👤] │ │ 会心ダメージ     │ │
│ │ 選択: キャラ名     │ │ █████████ 1,613 │ │
│ │ ⚔️ [🔥] 火炎斬り  │ │ 有利通常ダメージ  │ │
│ │ レベル: [5]       │ │ ███████ 1,181   │ │
│ └─────────────────┘ │ 有利会心ダメージ  │ │
│ ┌─────────────────┐ │ ████████████ 1,950│ │
│ │ ⚙️ 戦闘設定       │ │                 │ │
│ │ 敵防御: [800]     │ │ [🔄 リセット]    │ │
│ │ 属性: ●有利 ○通常 │ │                 │ │
│ │ 会心強化: [15%]   │ │                 │ │
│ │ 属性強化: [10%]   │ │                 │ │
│ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────┘
```

### 2.2 統合コンポーネント設計

#### 2.2.1 統合レイアウトコンポーネント（DamageCalculatorLayout）
```typescript
// 一画面完結型の統合レイアウト
<DamageCalculatorLayout>
  <Header />
  <MainContent>
    <LeftPanel>
      <CharacterSelector />
      <SkillSelector />
      <BattleSettings />
    </LeftPanel>
    <RightPanel>
      <DamageResults />
    </RightPanel>
  </MainContent>
</DamageCalculatorLayout>
```

#### 2.2.2 レスポンシブ対応の詳細設計

**デスクトップ（1024px以上）:**
- 2カラムレイアウト（入力エリア | 結果エリア）
- 左パネル: 60% 、右パネル: 40%
- リアルタイム計算結果表示

**タブレット（768px-1023px）:**
- 2カラムレイアウト（調整済み）
- 左パネル: 55% 、右パネル: 45%
- コンパクトな表示

**モバイル（767px以下）:**
- 1カラムレイアウト（縦積み）
- セクション毎に分割表示
- スティッキー結果エリア

#### 2.2.3 統合入力エリア（LeftPanel）

**キャラクター選択（CharacterSelector）:**
```
🎭 キャラクター選択
┌─────────────────────────────────────────┐
│ 🔍 属性フィルター                        │
│ [🔥すべて] [⚔️アグレッシブ] [📚スマート]  │
│ [😊シャイ] [💖キュート] [😄コミカル] [🧠クレバー] │
├─────────────────────────────────────────┤
│ 選択された属性のキャラクター一覧表示        │
│ [👤][👤][👤][👤][👤] ← 選択可能キャラ     │
│ [👤][👤][👤][👤][👤]                    │
│ 選択中: 炎の戦士（アグレッシブ）            │ ← 選択結果表示
│ 基本攻撃力: 1,250                        │ ← リアルタイム表示
└─────────────────────────────────────────┘
```

**スキル選択（SkillSelector）:**
```
⚔️ スキル選択
┌─────────────────────┐
│ [🔥] 火炎斬り   1.5x │ ← クリック選択
│ [❄️] 氷結突き   1.8x │
│ [⚡] 雷鳴撃    2.0x │
│ ────────────────────│
│ レベル: [====●==] 5  │ ← スライダー調整
│ 最終攻撃力: 1,875   │ ← 自動計算表示
└─────────────────────┘
```

**戦闘設定（BattleSettings）:**
```
⚙️ 戦闘設定
┌─────────────────────┐
│ 🛡️ 敵防御力          │
│ [======●====] 800   │ ← スライダー
│ 🎯 属性相性          │
│ ○通常 ●有利 ○不利   │ ← ラジオボタン
│ 💎 ギア強化          │
│ 会心: [===●=] 15%   │ ← スライダー
│ 属性: [==●==] 10%   │ ← スライダー
└─────────────────────┘
```

#### 2.2.4 統合結果エリア（RightPanel）

**ダメージ結果表示（DamageResults）:**
```
📊 ダメージ計算結果
┌─────────────────────────────────────────┐
│ 通常ダメージ                              │
│ ████████████████░░░░░░░░ 1,075           │
│                                         │
│ 会心ダメージ                              │
│ ████████████████████████░░░░ 1,613      │
│                                         │
│ 有利通常ダメージ                          │
│ ██████████████████░░░░░░░░ 1,181        │
│                                         │
│ 有利会心ダメージ                          │
│ ████████████████████████████████ 1,950  │
│                                         │
│ ──────────────────────────────────────── │
│ [🔄 リセット] [📋 詳細設定]              │ ← アクションボタン
└─────────────────────────────────────────┘
```

#### 2.2.5 インタラクションフロー

1. **リアルタイム更新**: 入力値変更時に即座に結果更新
2. **視覚的フィードバック**: 選択状態のハイライト表示
3. **アニメーション**: 数値変更時のスムーズな変化
4. **レスポンシブ**: 画面サイズに応じたレイアウト自動調整

#### 2.2.6 一画面完結の利点

- **操作効率向上**: スクロールやページ遷移不要
- **リアルタイム性**: 設定変更と結果表示が同時確認可能
- **視覚的関連性**: 入力と結果の因果関係が明確
- **モバイル対応**: 縦積みレイアウトでの最適化

### 2.3 カラーパレット・テーマ

#### 2.3.1 ライトテーマ
```
Primary:   #3B82F6 (青)
Secondary: #8B5CF6 (紫)
Success:   #10B981 (緑)
Warning:   #F59E0B (オレンジ)
Error:     #EF4444 (赤)
Background: #F8FAFC (ライトグレー)
Surface:   #FFFFFF (白)
Text:      #1F2937 (ダークグレー)
```

#### 2.3.2 ダークテーマ
```
Primary:   #60A5FA (ライトブルー)
Secondary: #A78BFA (ライトパープル)
Success:   #34D399 (ライトグリーン)
Warning:   #FBBF24 (ライトオレンジ)
Error:     #F87171 (ライトレッド)
Background: #0F172A (ダークブルー)
Surface:   #1E293B (グレー)
Text:      #F1F5F9 (ライトグレー)
```

## 3. 技術実装詳細

### 3.1 プロジェクト構造

```
src/
├── components/          # UIコンポーネント
│   ├── ui/             # shadcn/ui コンポーネント
│   │   ├── tabs.tsx           # 属性フィルタータブ
│   │   ├── input-button.tsx   # 手動入力+スライダー統合UI
│   │   ├── pill.tsx           # 属性・レアリティ表示
│   │   ├── rating.tsx         # レベル選択UI
│   │   ├── bar-chart.tsx      # ダメージ棒グラフ表示
│   │   ├── switch.tsx         # 手動入力モード切替
│   │   ├── badge.tsx          # レアリティバッジ
│   │   └── button.tsx         # アクションボタン
│   ├── CharacterSelector.tsx    # 属性タブ付きキャラ選択（shadcn対応）
│   ├── SkillSelector.tsx        # レーティング+手動入力対応
│   ├── AttackPowerInput.tsx     # InputButton使用の攻撃力入力
│   ├── SettingsPanel.tsx        # shadcn Switch使用の戦闘設定
│   ├── DamageResults.tsx        # shadcn BarChart使用の結果表示
│   ├── LanguageSelector.tsx
│   └── ThemeToggle.tsx
├── stores/             # Zustand ストア
│   ├── calculatorStore.ts
│   ├── uiStore.ts
│   └── themeStore.ts
├── data/               # 静的データ
│   ├── characters.ts
│   ├── skills.ts
│   └── translations/
├── hooks/              # カスタムフック
│   ├── useCalculator.ts
│   ├── useLocalStorage.ts
│   └── useBreakpoint.ts
├── utils/              # ユーティリティ関数
│   ├── calculations.ts
│   ├── formatters.ts
│   └── validators.ts
├── types/              # TypeScript型定義
│   ├── character.ts     # キャラクター型定義（属性含む）
│   ├── skill.ts
│   ├── attribute.ts     # 属性型定義
│   └── calculator.ts
└── styles/             # スタイル関連
    ├── globals.css
    └── components/
```

### 3.1.1 キャラクター属性システム

#### 3.1.1.1 属性型定義
```typescript
// types/attribute.ts
export type AttributeType =
  | 'aggressive'  // アグレッシブ
  | 'smart'       // スマート
  | 'shy'         // シャイ
  | 'cute'        // キュート
  | 'comical'     // コミカル
  | 'clever';     // クレバー

export interface AttributeInfo {
  id: AttributeType;
  nameKey: string;        // i18n用キー
  icon: string;          // アイコン文字列
  color: string;         // 属性カラー
}

export const ATTRIBUTES: Record<AttributeType, AttributeInfo> = {
  aggressive: { id: 'aggressive', nameKey: 'attributes.aggressive', icon: '⚔️', color: '#ef4444' },
  smart: { id: 'smart', nameKey: 'attributes.smart', icon: '📚', color: '#3b82f6' },
  shy: { id: 'shy', nameKey: 'attributes.shy', icon: '😊', color: '#f59e0b' },
  cute: { id: 'cute', nameKey: 'attributes.cute', icon: '💖', color: '#ec4899' },
  comical: { id: 'comical', nameKey: 'attributes.comical', icon: '😄', color: '#10b981' },
  clever: { id: 'clever', nameKey: 'attributes.clever', icon: '🧠', color: '#8b5cf6' }
};
```

#### 3.1.1.2 キャラクター型定義（属性対応）
```typescript
// types/character.ts
import { AttributeType } from './attribute';

export interface Character {
  id: string;
  nameKey: string;        // i18n用キー
  attribute: AttributeType; // 追加：属性
  baseAttack: number;
  avatar: string;         // キャラクター画像パス
  rarity: number;         // レアリティ
}
```

#### 3.1.1.3 棒グラフ表示用型定義
```typescript
// types/calculator.ts
export interface DamageResults {
  normal: number;           // 通常ダメージ
  critical: number;         // 会心ダメージ
  advantageNormal: number;  // 有利通常ダメージ
  advantageCritical: number;// 有利会心ダメージ
}

export interface BarChartData {
  label: string;
  value: number;
  percentage: number;       // 最大値に対する割合（0-100）
  color: string;           // バーの色
}
```

### 3.2 状態管理（Zustand）

#### 3.2.1 Calculator Store
```typescript
interface CalculatorState {
  // 選択状態
  selectedCharacter: Character | null;
  selectedSkill: Skill | null;
  skillLevel: number;

  // 属性フィルター（追加）
  selectedAttributeFilter: AttributeType | 'all';

  // 手動入力値（新要件対応）
  manualAttackPower: number | null;    // 手動攻撃力入力
  manualSkillPower: number | null;     // 手動スキル威力入力
  isManualAttackMode: boolean;         // 手動攻撃力モード
  isManualSkillMode: boolean;          // 手動スキル威力モード

  // 設定値
  enemyDefense: number;
  attributeAdvantage: 'normal' | 'advantage' | 'disadvantage';
  criticalDamageBonus: number;
  advantageDamageBonus: number;

  // 計算結果
  results: DamageResults;

  // アクション
  setCharacter: (character: Character) => void;
  setSkill: (skill: Skill) => void;
  setSkillLevel: (level: number) => void;
  setAttributeFilter: (filter: AttributeType | 'all') => void;

  // 手動入力関連（新追加）
  setManualAttackPower: (power: number | null) => void;
  setManualSkillPower: (power: number | null) => void;
  toggleManualAttackMode: (enabled: boolean) => void;
  toggleManualSkillMode: (enabled: boolean) => void;

  updateSettings: (settings: Partial<Settings>) => void;
  calculateDamage: () => void;

  // 棒グラフデータ生成
  getBarChartData: () => BarChartData[];

  // 計算用ヘルパー（新追加）
  getEffectiveAttackPower: () => number;  // 実際の攻撃力を取得
  getEffectiveSkillPower: () => number;   // 実際のスキル威力を取得
}
```

#### 3.2.2 UI Store
```typescript
interface UIState {
  theme: 'light' | 'dark';
  language: 'ja' | 'en' | 'zh';
  isMobile: boolean;
  isLoading: boolean;

  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (lang: 'ja' | 'en' | 'zh') => void;
  setMobile: (isMobile: boolean) => void;
}
```

### 3.2.3 shadcn/ui対応画面レイアウト例

#### 3.2.3.1 デスクトップ表示（shadcn/ui使用）
```jsx
// components/DamageCalculatorLayout.tsx
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const DamageCalculatorLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">ダメージ計算機</h1>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左パネル：入力エリア */}
          <div className="lg:col-span-3 space-y-6">
            <CharacterSelectorCard />
            <SkillSelectorCard />
            <BattleSettingsCard />
          </div>

          {/* 右パネル：結果エリア */}
          <div className="lg:col-span-2">
            <DamageResultsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

const CharacterSelectorCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        🎭 キャラクター選択
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="all">🔥すべて</TabsTrigger>
          <TabsTrigger value="アグレッシブ">⚔️</TabsTrigger>
          <TabsTrigger value="スマート">📚</TabsTrigger>
          <TabsTrigger value="シャイ">😊</TabsTrigger>
          <TabsTrigger value="キュート">💖</TabsTrigger>
          <TabsTrigger value="コミカル">😄</TabsTrigger>
          <TabsTrigger value="クレバー">🧠</TabsTrigger>
        </TabsList>
        <TabsContents>
          <TabsContent value="all" className="mt-4">
            <CharacterGrid characters={allCharacters} />
          </TabsContent>
          {/* 他の属性タブ */}
        </TabsContents>
      </Tabs>
    </CardContent>
  </Card>
);

const DamageResultsCard = () => (
  <Card className="h-fit lg:sticky lg:top-4">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        📊 ダメージ計算結果
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] mb-4">
        <ResponsiveBar
          data={damageData}
          keys={['value']}
          indexBy="type"
          margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
          padding={0.3}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ダメージ種別',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ダメージ値',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">🔄 リセット</Button>
        <Button variant="outline" size="sm">📋 詳細</Button>
      </div>
    </CardContent>
  </Card>
);
```

#### 3.2.3.2 モバイル表示（shadcn/ui使用）
```jsx
// モバイル専用レイアウト
const MobileDamageCalculator = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">ダメージ計算機</h1>
          <div className="flex items-center gap-1">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* キャラクター選択 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">🎭 キャラクター選択</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">🔥全て</TabsTrigger>
                <TabsTrigger value="アグレッシブ" className="text-xs">⚔️</TabsTrigger>
                <TabsTrigger value="スマート" className="text-xs">📚</TabsTrigger>
                <TabsTrigger value="more" className="text-xs">...</TabsTrigger>
              </TabsList>
              <TabsContents className="mt-3">
                <TabsContent value="all">
                  <div className="grid grid-cols-3 gap-2">
                    {characters.map(character => (
                      <CharacterCardMobile key={character.id} character={character} />
                    ))}
                  </div>
                </TabsContent>
              </TabsContents>
            </Tabs>
          </CardContent>
        </Card>

        {/* スキル選択 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">⚔️ スキル選択</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SkillSelectorMobile />
          </CardContent>
        </Card>

        {/* 戦闘設定 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">⚙️ 戦闘設定</CardTitle>
          </CardHeader>
          <CardContent>
            <BattleSettingsMobile />
          </CardContent>
        </Card>

        {/* ダメージ結果（スティッキー） */}
        <div className="sticky bottom-0 bg-background pt-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">📊 ダメージ結果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-muted-foreground">通常</div>
                  <div className="font-bold">1,075</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-muted-foreground">会心</div>
                  <div className="font-bold">1,613</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-muted-foreground">有利通常</div>
                  <div className="font-bold">1,181</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-muted-foreground">有利会心</div>
                  <div className="font-bold text-primary">1,950</div>
                </div>
              </div>
              <Button className="w-full" size="sm">🔄 リセット</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
```

### 3.2.4 shadcn/ui対応コンポーネント実装例

#### 3.2.3.1 SliderInput 複合コンポーネント
```typescript
// components/ui/SliderInput.tsx
interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  onChange: (value: number) => void;
  className?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label, value, min, max, step = 1, unit = '', onChange, placeholder, className
}) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputSubmit = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
      setIsEditing(false);
    } else {
      setInputValue(value.toString()); // 無効値の場合元に戻す
    }
  };

  return (
    <div className={cn("slider-input-container", className)}>
      <label className="text-sm font-medium mb-2">{label}</label>
      <div className="space-y-2">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={([newValue]) => handleSliderChange(newValue)}
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={handleInputSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
            placeholder={placeholder}
            className="flex-1 px-3 py-1 border rounded text-center"
            min={min}
            max={max}
            step={step}
          />
          <span className="text-sm text-gray-500">{unit}</span>
          {isEditing && (
            <button
              onClick={handleInputSubmit}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
            >
              適用
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

#### 3.2.3.2 AttackPowerInput コンポーネント
```typescript
// components/AttackPowerInput.tsx
interface AttackPowerInputProps {
  character: Character | null;
  manualValue: number | null;
  isManualMode: boolean;
  onManualValueChange: (value: number | null) => void;
  onModeToggle: (enabled: boolean) => void;
}

export const AttackPowerInput: React.FC<AttackPowerInputProps> = ({
  character, manualValue, isManualMode, onManualValueChange, onModeToggle
}) => {
  const baseAttack = character ? getBaseAttackFromCharacter(character) : 0;
  const effectiveValue = isManualMode ? (manualValue || 0) : baseAttack;

  return (
    <div className="attack-power-input">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">🔢 攻撃力設定</h3>
        <ToggleSwitch
          checked={isManualMode}
          onChange={onModeToggle}
          label="手動入力モード"
        />
      </div>

      {isManualMode ? (
        <NumberInput
          label="攻撃力"
          value={manualValue || baseAttack}
          min={1}
          max={9999}
          onChange={onManualValueChange}
          placeholder="攻撃力を入力"
        />
      ) : (
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-600 mb-1">
            キャラクター基本攻撃力
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {baseAttack.toLocaleString()}
          </div>
          {character && (
            <div className="text-xs text-gray-500 mt-1">
              {character.name}
            </div>
          )}
        </div>
      )}

      <div className="mt-2 text-sm text-gray-600">
        ※手動入力でダメージ計算をカスタマイズできます
      </div>
    </div>
  );
};
```

### 3.3 ダメージ計算ロジック

```typescript
// utils/calculations.ts
export class DamageCalculator {
  static calculateBaseDamage(attackPower: number, defense: number): number {
    return Math.max(1, attackPower - defense);
  }

  static calculateCriticalDamage(
    baseDamage: number,
    criticalBonus: number
  ): number {
    return baseDamage * (1.5 + criticalBonus / 100);
  }

  static calculateAttributeDamage(
    baseDamage: number,
    attributeType: AttributeType,
    attributeBonus: number
  ): number {
    if (attributeType === 'advantage') {
      return baseDamage * (1.25 + attributeBonus / 100);
    }
    return baseDamage;
  }

  static calculateAllPatterns(params: CalculationParams): DamageResults {
    const { character, skill, skillLevel, settings } = params;

    const attackPower = character.baseAttack * skill.getMultiplier(skillLevel);
    const baseDamage = this.calculateBaseDamage(attackPower, settings.enemyDefense);

    return {
      normal: baseDamage,
      critical: this.calculateCriticalDamage(baseDamage, settings.criticalBonus),
      advantageNormal: this.calculateAttributeDamage(
        baseDamage,
        settings.attributeType,
        settings.attributeBonus
      ),
      advantageCritical: this.calculateAttributeDamage(
        this.calculateCriticalDamage(baseDamage, settings.criticalBonus),
        settings.attributeType,
        settings.attributeBonus
      )
    };
  }
}
```

### 3.4 多言語対応実装

#### 3.4.1 i18next 設定
```typescript
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ja',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
```

#### 3.4.2 翻訳ファイル構造
```
public/locales/
├── ja/
│   ├── common.json
│   ├── characters.json
│   ├── skills.json
│   └── ui.json
├── en/
│   ├── common.json
│   ├── characters.json
│   ├── skills.json
│   └── ui.json
└── zh/
    ├── common.json
    ├── characters.json
    ├── skills.json
    └── ui.json
```

### 3.5 一画面完結型レスポンシブ対応

#### 3.5.1 統合レイアウト用ブレークポイント
```css
/* 一画面完結型レイアウト専用ブレークポイント */
module.exports = {
  theme: {
    screens: {
      'mobile': '375px',    // モバイル（縦積み）
      'tablet': '768px',    // タブレット（2カラム調整）
      'desktop': '1024px',  // デスクトップ（2カラム最適）
      'wide': '1440px',     // ワイド（余白調整）
    }
  }
}
```

#### 3.5.2 レイアウト切り替えフック
```typescript
// hooks/useResponsiveLayout.ts
export const useResponsiveLayout = () => {
  const [layout, setLayout] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) setLayout('desktop');
      else if (width >= 768) setLayout('tablet');
      else setLayout('mobile');
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return {
    layout,
    isMobile: layout === 'mobile',
    isTablet: layout === 'tablet',
    isDesktop: layout === 'desktop',
    showSideBySide: layout !== 'mobile',
    gridCols: layout === 'mobile' ? 1 : 2,
    leftPanelWidth: layout === 'desktop' ? '60%' : '55%',
    rightPanelWidth: layout === 'desktop' ? '40%' : '45%',
  };
};
```

#### 3.5.3 統合レイアウトコンポーネント
```typescript
// components/DamageCalculatorLayout.tsx
const DamageCalculatorLayout: React.FC = () => {
  const { layout, showSideBySide, gridCols } = useResponsiveLayout();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main
        className={cn(
          "container mx-auto p-4",
          "grid gap-6",
          showSideBySide ? "grid-cols-2" : "grid-cols-1",
          layout === 'mobile' && "space-y-4"
        )}
      >
        {/* 左パネル：入力エリア */}
        <section className={cn(
          "space-y-4",
          layout === 'mobile' && "order-1"
        )}>
          <CharacterSelector />
          <SkillSelector />
          <BattleSettings />
        </section>

        {/* 右パネル：結果エリア */}
        <section className={cn(
          layout === 'mobile' && "order-2 sticky top-4"
        )}>
          <DamageResults />
        </section>
      </main>
    </div>
  );
};
```

## 4. 開発工程

### 3.4 shadcn/ui セットアップ・設定

#### 3.4.1 必要なライブラリのインストール
```bash
# プロジェクト初期化
npm create vite@latest . --template react-ts
npm install

# shadcn/ui セットアップ
npx shadcn@latest init

# 必要なshadcn/uiコンポーネントのインストール
npx shadcn@latest add tabs
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add badge
npx shadcn@latest add switch
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add slider
npx shadcn@latest add chart

# 追加の依存関係
npm install recharts lucide-react
npm install @radix-ui/react-use-controllable-state
npm install motion framer-motion
```

#### 3.4.2 shadcn/ui コンポーネント活用指針

**使用するshadcnコンポーネントの組み合わせ:**

1. **Tabs** - 属性フィルター
2. **Card** - セクション区切り
3. **Badge** - レアリティ・属性表示
4. **Button** - アクション
5. **Switch** - 手動入力モード切替
6. **Input** + **InputButton** - 手動値入力
7. **Rating** - スキルレベル選択
8. **Chart** - ダメージ棒グラフ

**shadcn/ui使用の利点:**
- **一貫したデザインシステム**: 全コンポーネントが統一感を持つ
- **アクセシビリティ対応**: Radix UIベースで高いアクセシビリティ
- **カスタマイズ性**: CSS変数による柔軟なテーマ対応
- **TypeScript対応**: 型安全性の確保
- **モダンなUI**: アニメーション・インタラクション対応

## 4. 開発工程

### 4.1 Phase 1: 基盤構築（1週間）
1. **プロジェクト初期化**
   - Vite + React + TypeScript セットアップ
   - 必要なライブラリのインストール
   - ESLint、Prettier 設定

2. **基本構造作成**
   - フォルダ構造の構築
   - 基本的な型定義
   - 基本コンポーネントの枠組み

3. **デザインシステム構築**
   - Tailwind CSS 設定
   - カラーパレット定義
   - 基本UIコンポーネント作成

### 4.2 Phase 2: コア機能実装（2週間）
1. **データレイヤー実装**
   - キャラクター・スキルデータ定義
   - Zustand ストア実装
   - ダメージ計算ロジック実装

2. **UI コンポーネント実装**
   - キャラクター選択コンポーネント
   - スキル選択コンポーネント
   - 設定パネルコンポーネント
   - 結果表示コンポーネント

3. **多言語対応実装**
   - i18next セットアップ
   - 翻訳ファイル作成
   - 言語切替機能実装

### 4.3 Phase 3: UI/UX 改善（1週間）
1. **レスポンシブ対応**
   - モバイル表示最適化
   - タブレット表示調整
   - デスクトップ表示改善

2. **アニメーション・インタラクション**
   - ページ遷移アニメーション
   - 数値変更アニメーション
   - ホバー・フォーカス効果

3. **アクセシビリティ対応**
   - キーボードナビゲーション
   - スクリーンリーダー対応
   - カラーコントラスト調整

### 4.4 Phase 4: テスト・デプロイ（1週間）
1. **テスト実装**
   - ユニットテスト（Vitest）
   - コンポーネントテスト（React Testing Library）
   - E2Eテスト（Playwright）

2. **パフォーマンス最適化**
   - バンドルサイズ最適化
   - 画像最適化
   - キャッシュ戦略

3. **デプロイ・CI/CD**
   - Vercel/Netlify デプロイ設定
   - GitHub Actions CI/CD パイプライン
   - プロダクション環境テスト

## 5. 今後の拡張可能性

### 5.1 追加機能候補
- **ダメージシミュレーター**: 複数回攻撃のダメージ分布表示
- **ビルド比較機能**: 異なるギア構成でのダメージ比較
- **ダメージログ**: 計算履歴の保存・閲覧機能
- **チーム戦闘計算**: 複数キャラクターでの計算
- **確率計算**: 会心率を考慮した期待ダメージ計算

### 5.2 技術的改善
- **PWA対応**: オフライン利用可能
- **データベース連携**: ユーザー設定保存
- **API連携**: ゲームデータの動的取得
- **モバイルアプリ**: React Native での実装

## 6. 確認事項・質問

実装前に以下の点についてご確認をお願いします：

1. **キャラクター・スキルデータ**: 具体的なキャラクター名やスキル名、数値設定はありますか？
2. **ブランディング**: アプリのロゴやアイコンデザインの要望はありますか？
3. **追加機能**: 上記の基本機能以外に必要な機能はありますか？
4. **デプロイ環境**: 特定のホスティングサービスの希望はありますか？
5. **対応ブラウザ**: サポートする最小ブラウザバージョンの指定はありますか？

この計画書に基づいて開発を進めますが、ご不明な点や変更希望がございましたらお聞かせください。