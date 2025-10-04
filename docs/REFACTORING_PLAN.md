# リファクタリング実装計画書

**プロジェクト名:** マブラヴ ガールズガーデン ダメージ計算機
**作成日:** 2025-10-04
**対象バージョン:** v1.0.0 → v1.1.0
**目的:** コードの可読性、保守性、パフォーマンスの向上

---

## 📊 エグゼクティブサマリー

### 現状分析
- ✅ 適切な技術選定(React + TypeScript + Zustand)
- ✅ 明確な責務分離(コンポーネント、状態管理、ビジネスロジック)
- ✅ 型安全性の高い実装
- ⚠️ パフォーマンス最適化の余地あり
- ⚠️ コードの重複と保守性改善の余地あり

### 改善効果の見積もり
- **パフォーマンス向上:** 入力時の応答性 50-70% 改善
- **コード品質向上:** 保守性スコア +30点
- **開発効率向上:** 新機能追加時の工数 20-30% 削減

### 総工数見積もり
- **Phase 1 (パフォーマンス改善):** 3時間
- **Phase 2 (保守性向上):** 4時間
- **Phase 3 (構造改善、任意):** 5.5時間
- **合計:** 7-12.5時間

---

## 🎯 実装方針

### 基本原則
1. **段階的な実装:** Phase 1 → Phase 2 → Phase 3 の順で実施
2. **後方互換性の維持:** 既存機能を壊さない
3. **テスト優先:** 各Phase完了後に動作確認
4. **ドキュメント更新:** コード変更と同時にドキュメント更新

### 品質基準
- TypeScript型チェックエラー: 0件
- ESLintエラー: 0件
- コンソールエラー・警告: 0件（本番環境）
- 既存機能の動作: 100%維持

---

## 📋 Phase 1: パフォーマンス改善（優先度: 🔴 高）

**目標:** ユーザー入力時の応答性を50-70%改善
**工数:** 3時間
**担当領域:** `src/stores/calculatorStore.ts`, `src/App.tsx`, `src/utils/damageCalculator.ts`

### タスク1.1: 再計算のdebounce化

**優先度:** 🔴 最優先
**工数:** 0.5時間
**難易度:** 🟢 低

#### 現状の問題
```typescript
// stores/calculatorStore.ts:84-97
setManualAttackPower: (power) => {
  set({ manualAttackPower: power });
  setTimeout(() => get().calculateDamage(), 0); // 毎回即座に計算
},
```

#### 実装内容

**Step 1: 依存関係の追加**
```bash
npm install lodash-es
npm install -D @types/lodash-es
```

**Step 2: debounce関数の実装**
```typescript
// src/stores/calculatorStore.ts
import { debounce } from 'lodash-es';

// ストア内で debounced 関数を作成
const debouncedCalculate = debounce((get) => {
  get().calculateDamage();
}, 100); // 100ms待機

// 各アクションを更新
setManualAttackPower: (power) => {
  set({ manualAttackPower: power });
  debouncedCalculate(get);
},

setSkillPower: (power) => {
  set({ skillPower: power });
  debouncedCalculate(get);
},

setHitCount: (count) => {
  set({ hitCount: count });
  debouncedCalculate(get);
},
```

**Step 3: setTimeout の削除**
- `setCharacter`, `setSkill`, `setSkillLevel`, `toggleManualAttackMode`, `updateBattleSettings`, `updateAdvancedSettings` から `setTimeout(() => get().calculateDamage(), 0)` を削除
- 即座に計算が必要な場合のみ直接 `get().calculateDamage()` を呼び出す

#### 検証方法
1. 数値入力時に計算が100ms後に実行されることを確認
2. 連続入力時に不要な計算がスキップされることを確認
3. DevToolsのPerformanceタブで再レンダリング回数を確認

#### 期待効果
- 入力時の計算回数: 80-90%削減
- UIの応答性: 50%向上

---

### タスク1.2: コンポーネントのメモ化

**優先度:** 🔴 高
**工数:** 2時間
**難易度:** 🟡 中

#### 現状の問題
```typescript
// App.tsx:11-40
function App() {
  const { /* 14個のストア値 */ } = useCalculatorStore();
  // 全ての状態変更で App 全体が再レンダリング
}
```

#### 実装内容

**Step 1: Zustand セレクターの導入**
```typescript
// src/App.tsx
import React, { useCallback } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  // セレクターを使用して必要な値のみ取得
  const battleSettings = useCalculatorStore(state => state.battleSettings);
  const advancedSettings = useCalculatorStore(state => state.advancedSettings);
  const results = useCalculatorStore(state => state.results);
  const calculationSteps = useCalculatorStore(state => state.calculationSteps);
  const isDetailsDialogOpen = useCalculatorStore(state => state.isDetailsDialogOpen);

  const skillPower = useCalculatorStore(state => state.skillPower);
  const hitCount = useCalculatorStore(state => state.hitCount);
  const manualAttackPower = useCalculatorStore(state => state.manualAttackPower);

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

  // ... rest of the component
}
```

**Step 2: コンポーネントのメモ化**
```typescript
// src/components/SettingsPanel.tsx
export const SettingsPanel = React.memo<SettingsPanelProps>(({ ... }) => {
  // ...
});

// src/components/DamageResults.tsx
export const DamageResults = React.memo<DamageResultsProps>(({ ... }) => {
  // ...
});

// src/components/DetailsDialog.tsx
export const DetailsDialog = React.memo<DetailsDialogProps>(({ ... }) => {
  // ...
});
```

**Step 3: コールバックの最適化**
```typescript
// src/App.tsx
const handleLanguageChange = useCallback((lang: string) => {
  i18n.changeLanguage(lang);
}, [i18n]);

const handleDetailsClick = useCallback(() => {
  setDetailsDialogOpen(true);
}, [setDetailsDialogOpen]);

const handleDetailsClose = useCallback(() => {
  setDetailsDialogOpen(false);
}, [setDetailsDialogOpen]);
```

**Step 4: barChartData の最適化**
```typescript
// src/App.tsx
const barChartData = React.useMemo(() =>
  getBarChartData({
    normal: t('damage.normal'),
    critical: t('damage.critical'),
    advantage: t('damage.advantage'),
    advantageCritical: t('damage.advantageCritical')
  }),
  [getBarChartData, t]
);
```

#### 検証方法
1. React DevToolsのProfilerで再レンダリング回数を測定
2. 入力変更時に不要なコンポーネントが再レンダリングされないことを確認
3. `why-did-you-render` ライブラリで詳細分析（開発時のみ）

#### 期待効果
- コンポーネント再レンダリング: 60-70%削減
- UIの応答性: 30-40%向上

---

### タスク1.3: 過剰なconsole.logの削減

**優先度:** 🟡 中
**工数:** 0.5時間
**難易度:** 🟢 低

#### 現状の問題
```typescript
// utils/damageCalculator.ts:38-102
console.log('🔍 ダメージ計算開始');
console.log('📊 入力値:', { ... });
// 計算のたびに12箇所でログ出力
```

#### 実装内容

**Step 1: Logger ユーティリティの作成**
```typescript
// src/utils/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

const isDev = import.meta.env.DEV;

export const logger: Logger = {
  debug: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  info: (...args: any[]) => {
    if (isDev) console.info(...args);
  },
  warn: (...args: any[]) => {
    console.warn(...args); // 本番でも表示
  },
  error: (...args: any[]) => {
    console.error(...args); // 本番でも表示
  },
};
```

**Step 2: damageCalculator.ts の更新**
```typescript
// src/utils/damageCalculator.ts
import { logger } from './logger';

export function calculateDamage(...) {
  logger.debug('🔍 ダメージ計算開始');
  logger.debug('📊 入力値:', { ... });
  // ...
  logger.debug('✅ 端数処理後の最終結果:', finalDamages);
}
```

#### 検証方法
1. 開発環境: console.logが表示されることを確認
2. `import.meta.env.DEV`が正しく機能することを確認

#### 期待効果
- 本番環境のconsole.log: 100%削減
- バンドルサイズ: 1-2KB削減

---

### Phase 1 完了チェックリスト

- [ ] タスク1.1: debounce実装完了
- [ ] タスク1.2: メモ化実装完了
- [ ] タスク1.3: logger実装完了
- [ ] 全機能の動作確認（正常系・異常系）
- [ ] TypeScript型チェック通過
- [ ] ESLint エラー0件
- [ ] パフォーマンステスト実施
- [ ] ドキュメント更新（CHANGELOG.md）

---

## 📋 Phase 2: 保守性向上（優先度: 🟡 中）

**目標:** コードの保守性と可読性を向上
**工数:** 4時間
**担当領域:** 全体

### タスク2.1: マジックナンバーの定数化

**優先度:** 🟡 中
**工数:** 1時間
**難易度:** 🟢 低

#### 実装内容

**Step 1: 定数ファイルの作成**
```typescript
// src/constants/gameConstants.ts

/**
 * ゲーム内の固定値定数
 */
export const GAME_CONSTANTS = {
  /** スキルレベル関連 */
  SKILL_LEVEL: {
    MIN: 1,
    MAX: 15,
  },

  /** ダメージ倍率 */
  DAMAGE_MULTIPLIERS: {
    /** 会心ダメージの基礎倍率 */
    CRITICAL_BASE: 1.5,
    /** 有利属性ダメージの基礎倍率 */
    ADVANTAGE_BASE: 1.25,
  },

  /** 攻撃力設定 */
  ATTACK_POWER: {
    /** デフォルト攻撃力 */
    DEFAULT: 1000,
    MIN: 0,
    MAX: 1000000,
  },

  /** スキル威力設定 */
  SKILL_POWER: {
    /** デフォルトスキル威力 */
    DEFAULT: 100,
    MIN: 0,
    MAX: 10000,
    /** 威力を%に変換する除数 */
    PERCENT_DIVISOR: 100,
  },

  /** ヒット数設定 */
  HIT_COUNT: {
    DEFAULT: 1,
    MIN: 1,
    MAX: 20,
  },

  /** 強化ボーナス設定 */
  BONUS: {
    CRITICAL_MAX: 1000,
    ADVANTAGE_MAX: 1000,
    STEP: 0.01,
  },

  /** 防御力設定 */
  DEFENSE: {
    MIN: 0,
    MAX: 1000000,
    STEP: 10,
  },
} as const;

/** 端数処理モード */
export const ROUNDING_MODES = {
  FLOOR: 'floor',
  CEIL: 'ceil',
  ROUND: 'round',
} as const;

export type RoundingMode = typeof ROUNDING_MODES[keyof typeof ROUNDING_MODES];
```

**Step 2: 既存コードの置き換え**
```typescript
// src/stores/calculatorStore.ts
import { GAME_CONSTANTS } from '../constants/gameConstants';

setSkillLevel: (level) => {
  const state = get();
  const newLevel = Math.max(
    GAME_CONSTANTS.SKILL_LEVEL.MIN,
    Math.min(GAME_CONSTANTS.SKILL_LEVEL.MAX, level)
  );
  // ...
},

getEffectiveAttackPower: () => {
  const state = get();
  const { manualAttackPower } = state;
  return manualAttackPower !== null
    ? manualAttackPower
    : GAME_CONSTANTS.ATTACK_POWER.DEFAULT;
},
```

```typescript
// src/utils/damageCalculator.ts
import { GAME_CONSTANTS } from '../constants/gameConstants';

export function calculateDamage(...) {
  const criticalMultiplier =
    GAME_CONSTANTS.DAMAGE_MULTIPLIERS.CRITICAL_BASE +
    (criticalDamageBonus / GAME_CONSTANTS.SKILL_POWER.PERCENT_DIVISOR);

  const advantageMultiplier =
    GAME_CONSTANTS.DAMAGE_MULTIPLIERS.ADVANTAGE_BASE +
    (advantageDamageBonus / GAME_CONSTANTS.SKILL_POWER.PERCENT_DIVISOR);
  // ...
}
```

**Step 3: InputButtonコンポーネントの更新**
```typescript
// src/components/SettingsPanel.tsx
import { GAME_CONSTANTS } from '../constants/gameConstants';

<InputButton
  label={t('battle.attackPower')}
  value={manualAttackPower || effectiveAttackPower}
  min={GAME_CONSTANTS.ATTACK_POWER.MIN}
  max={GAME_CONSTANTS.ATTACK_POWER.MAX}
  step={1}
  onValueChange={onManualAttackPowerChange}
  unit=""
/>
```

#### 検証方法
1. すべてのマジックナンバーが定数化されていることを確認
2. 定数変更時に関連する箇所が正しく動作することを確認
3. TypeScriptの型推論が正しく機能することを確認

---

### タスク2.2: 型定義の一元化

**優先度:** 🟡 中
**工数:** 1時間
**難易度:** 🟢 低

#### 実装内容

**Step 1: 型定義の整理**
```typescript
// src/types/models.ts (新規作成)

/** キャラクター属性 */
export type AttributeType =
  | 'アグレッシブ'
  | 'スマート'
  | 'シャイ'
  | 'キュート'
  | 'コミカル'
  | 'クレバー';

/** スキルタイプ */
export type SkillType = 'EX' | 'AS' | 'PS';

/** キャラクター情報 */
export interface Character {
  id: string;
  name: string;
  attribute: AttributeType;
  rarity: number;
  attack: number;
  detail_link: string;
  skills?: Skill[];
}

/** スキル情報 */
export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  power_lv1: number;
  power_lv15: number;
  power_per_level: number[];
  hit_count: number;
}
```

**Step 2: characterData.ts の更新**
```typescript
// src/characterData.ts
import type { Character, Skill } from './types/models';

// 型定義は削除、データのみ保持
export const characters: Character[] = [
  // ...
];
```

**Step 3: types/index.ts の更新**
```typescript
// src/types/index.ts
// モデル型をインポート
export type { Character, Skill, AttributeType, SkillType } from './models';

// 既存の型定義（BattleSettings, DamageResults等）はそのまま
```

#### 検証方法
1. 全ファイルのインポート文が正しく動作することを確認
2. TypeScript型チェックエラーがないことを確認
3. IDE の型補完が正しく機能することを確認

---

### タスク2.3: 重複コードの削除とユーティリティ化

**優先度:** 🟡 中
**工数:** 1時間
**難易度:** 🟢 低

#### 実装内容

**Step 1: フォーマッターユーティリティの作成**
```typescript
// src/utils/formatters.ts

/**
 * 数値を単位付きでフォーマット
 */
export const formatValue = (val: number, unit?: string): string => {
  return unit ? `${val}${unit}` : val.toString();
};

/**
 * 数値を3桁区切りでフォーマット
 */
export const formatNumber = (value: number): string => {
  return Math.floor(value).toLocaleString();
};

/**
 * 小数点以下を指定桁数でフォーマット
 */
export const formatDecimal = (value: number, digits: number = 2): string => {
  return value.toFixed(digits);
};

/**
 * パーセント表示用フォーマット
 */
export const formatPercent = (value: number, digits: number = 1): string => {
  return `${value.toFixed(digits)}%`;
};
```

**Step 2: 既存コードの置き換え**
```typescript
// src/components/InputButton.tsx
import { formatValue } from '../utils/formatters';

export const InputButton: React.FC<InputButtonProps> = ({ ... }) => {
  // formatValue関数を削除

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={`input-${label}`}>
          {label}
        </Label>
        <span className="text-sm text-muted-foreground">
          {formatValue(value, unit)}
        </span>
      </div>
      {/* ... */}
    </div>
  );
};
```

```typescript
// src/components/DamageResults.tsx
import { formatNumber, formatDecimal } from '../utils/formatters';

export const DamageResults: React.FC<DamageResultsProps> = ({ ... }) => {
  // formatNumber関数を削除

  return (
    // formatNumber, formatDecimal を使用
  );
};
```

#### 検証方法
1. すべてのフォーマット関数が正しく動作することを確認
2. 重複コードが削除されていることを確認
3. エッジケース（null, undefined, 極端な値）のテスト

---

### タスク2.4: エラーハンドリングの追加

**優先度:** 🟡 中
**工数:** 1時間
**難易度:** 🟢 低

#### 実装内容

**Step 1: カスタムエラークラスの作成**
```typescript
// src/utils/errors.ts

/**
 * ダメージ計算エラーの基底クラス
 */
export class DamageCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DamageCalculationError';
  }
}

/**
 * 不正なスキルレベルエラー
 */
export class InvalidSkillLevelError extends DamageCalculationError {
  constructor(level: number) {
    super(`Invalid skill level: ${level}. Must be between 1 and 15`);
    this.name = 'InvalidSkillLevelError';
  }
}

/**
 * スキルデータ不足エラー
 */
export class MissingSkillDataError extends DamageCalculationError {
  constructor(skillId: string, level: number) {
    super(`No power data for skill ${skillId} at level ${level}`);
    this.name = 'MissingSkillDataError';
  }
}
```

**Step 2: damageCalculator.ts の更新**
```typescript
// src/utils/damageCalculator.ts
import { logger } from './logger';
import { InvalidSkillLevelError, MissingSkillDataError } from './errors';
import { GAME_CONSTANTS } from '../constants/gameConstants';

/**
 * スキル威力計算（エラーハンドリング強化版）
 */
export function getSkillPowerAtLevel(skill: Skill, level: number): number {
  // バリデーション
  if (!skill) {
    logger.error('Skill is required');
    throw new Error('Skill is required');
  }

  const { MIN, MAX } = GAME_CONSTANTS.SKILL_LEVEL;
  if (level < MIN || level > MAX) {
    throw new InvalidSkillLevelError(level);
  }

  // スキル威力取得
  const skillPower = skill.power_per_level[level - 1];

  if (skillPower === undefined || skillPower === null) {
    logger.warn(`No power data for skill ${skill.id} at level ${level}`);
    throw new MissingSkillDataError(skill.id, level);
  }

  return skillPower;
}

/**
 * ダメージ計算（エラーハンドリング追加）
 */
export function calculateDamage(...args): { results: DamageResults; steps: CalculationSteps } {
  try {
    // 既存の計算ロジック
    // ...

    return { results, steps };
  } catch (error) {
    logger.error('Damage calculation failed:', error);

    // デフォルト値を返す（計算失敗時）
    const fallbackResults: DamageResults = {
      totalAttack: 0,
      enemyDefense: 0,
      baseDamage: 0,
      criticalMultiplier: GAME_CONSTANTS.DAMAGE_MULTIPLIERS.CRITICAL_BASE,
      advantageMultiplier: GAME_CONSTANTS.DAMAGE_MULTIPLIERS.ADVANTAGE_BASE,
      finalDamages: {
        normal: 0,
        critical: 0,
        advantageNormal: 0,
        advantageCritical: 0,
      },
    };

    const fallbackSteps: CalculationSteps = {
      /* デフォルト値 */
    };

    return { results: fallbackResults, steps: fallbackSteps };
  }
}
```

**Step 3: ストアでのエラーハンドリング**
```typescript
// src/stores/calculatorStore.ts
import { logger } from '../utils/logger';

calculateDamage: () => {
  try {
    const state = get();
    // ...

    const { results, steps } = calculateDamage(/* ... */);
    set({ results, calculationSteps: steps });
  } catch (error) {
    logger.error('Failed to calculate damage:', error);

    // エラー時はUIにデフォルト値を表示
    set({
      results: null,
      calculationSteps: null
    });
  }
},
```

#### 検証方法
1. 不正なスキルレベル入力時にエラーが適切にハンドリングされることを確認
2. スキルデータ不足時に警告ログが出力されることを確認
3. 計算失敗時にアプリがクラッシュしないことを確認

---

### Phase 2 完了チェックリスト

- [ ] タスク2.1: 定数化完了
- [ ] タスク2.2: 型定義一元化完了
- [ ] タスク2.3: ユーティリティ化完了
- [ ] タスク2.4: エラーハンドリング完了
- [ ] 全機能の動作確認
- [ ] TypeScript型チェック通過
- [ ] ESLint エラー0件
- [ ] ドキュメント更新

---

## 📋 Phase 3: 構造改善（優先度: 🔵 低、任意）

**目標:** コードの構造を改善し、長期的な保守性を向上
**工数:** 5.5時間
**担当領域:** 全体のアーキテクチャ

### タスク3.1: カスタムフックの抽出

**優先度:** 🔵 低
**工数:** 0.5時間
**難易度:** 🟢 低

#### 実装内容

**Step 1: useLanguage フックの作成**
```typescript
// src/hooks/useLanguage.ts
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 多言語切り替え用カスタムフック
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    availableLanguages: ['ja', 'en', 'zh'] as const,
  };
};
```

**Step 2: App.tsx での使用**
```typescript
// src/App.tsx
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  // ...

  <Select value={currentLanguage} onValueChange={changeLanguage}>
    {/* ... */}
  </Select>
}
```

---

### タスク3.2: ストアのスライス化

**優先度:** 🔵 低
**工数:** 3時間
**難易度:** 🟡 中

#### 実装内容

**Step 1: スライスファイルの作成**
```typescript
// src/stores/slices/battleSettingsSlice.ts
import type { StateCreator } from 'zustand';
import type { CalculatorStore } from '../../types';

export interface BattleSettingsSlice {
  battleSettings: BattleSettings;
  updateBattleSettings: (settings: Partial<BattleSettings>) => void;
}

export const createBattleSettingsSlice: StateCreator<
  CalculatorStore,
  [],
  [],
  BattleSettingsSlice
> = (set, get) => ({
  battleSettings: defaultBattleSettings,

  updateBattleSettings: (settings) => {
    set((state) => ({
      battleSettings: { ...state.battleSettings, ...settings },
    }));
    get().calculateDamage();
  },
});
```

```typescript
// src/stores/slices/calculationSlice.ts
import type { StateCreator } from 'zustand';
import { calculateDamage } from '../../utils/damageCalculator';
import type { CalculatorStore } from '../../types';

export interface CalculationSlice {
  results: DamageResults | null;
  calculationSteps: CalculationSteps | null;
  calculateDamage: () => void;
  getBarChartData: (labels?: {...}) => BarChartData[];
}

export const createCalculationSlice: StateCreator<
  CalculatorStore,
  [],
  [],
  CalculationSlice
> = (set, get) => ({
  results: null,
  calculationSteps: null,

  calculateDamage: () => {
    // 計算ロジック
  },

  getBarChartData: (labels) => {
    // グラフデータ生成
  },
});
```

**Step 2: メインストアの統合**
```typescript
// src/stores/calculatorStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createBattleSettingsSlice } from './slices/battleSettingsSlice';
import { createCalculationSlice } from './slices/calculationSlice';
import { createInputSlice } from './slices/inputSlice';
import { createUISlice } from './slices/uiSlice';

export const useCalculatorStore = create<CalculatorStore>()(
  devtools(
    (...a) => ({
      ...createBattleSettingsSlice(...a),
      ...createCalculationSlice(...a),
      ...createInputSlice(...a),
      ...createUISlice(...a),
    }),
    { name: 'calculator-store' }
  )
);
```

#### 検証方法
1. すべての機能が正常に動作することを確認
2. Zustand DevToolsで状態が正しく管理されていることを確認
3. 型安全性が保たれていることを確認

---

### タスク3.3: コンポーネント階層の最適化

**優先度:** 🔵 低
**工数:** 2時間
**難易度:** 🟡 中

#### 実装内容

**Step 1: レイアウトコンポーネントの作成**
```typescript
// src/layouts/MainLayout.tsx
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};
```

```typescript
// src/layouts/Header.tsx
import React from 'react';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
            {t('app.title')}
          </h1>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={currentLanguage} onValueChange={changeLanguage}>
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
    </header>
  );
};
```

**Step 2: Feature コンポーネントの作成**
```typescript
// src/features/DamageCalculator/index.tsx
import React from 'react';
import { SettingsPanelContainer } from './SettingsPanelContainer';
import { DamageResultsContainer } from './DamageResultsContainer';

export const DamageCalculator: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SettingsPanelContainer />
      <DamageResultsContainer />
    </div>
  );
};
```

**Step 3: App.tsx の簡素化**
```typescript
// src/App.tsx
import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './layouts/Header';
import { DamageCalculator } from './features/DamageCalculator';
import { DetailsDialog } from './components/DetailsDialog';
import { useCalculatorStore } from './stores/calculatorStore';
import './utils/i18n';

function App() {
  const { init } = useCalculatorStore();

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <MainLayout>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <DamageCalculator />
      </main>
      <DetailsDialog />
    </MainLayout>
  );
}

export default App;
```

#### 検証方法
1. コンポーネント階層が適切に分離されていることを確認
2. 各コンポーネントの責務が明確であることを確認
3. すべての機能が正常に動作することを確認

---

### Phase 3 完了チェックリスト

- [ ] タスク3.1: カスタムフック抽出完了
- [ ] タスク3.2: ストアスライス化完了
- [ ] タスク3.3: コンポーネント階層最適化完了
- [ ] 全機能の動作確認
- [ ] TypeScript型チェック通過
- [ ] ESLint エラー0件
- [ ] ドキュメント更新

---

## 📊 テスト計画

### テストシナリオ

#### 機能テスト
1. **ダメージ計算の正確性**
   - [ ] 通常ダメージ計算
   - [ ] 会心ダメージ計算
   - [ ] 有利属性ダメージ計算
   - [ ] 有利会心ダメージ計算

2. **入力値のバリデーション**
   - [ ] 最小値・最大値チェック
   - [ ] 数値以外の入力拒否
   - [ ] 境界値テスト

3. **言語切り替え**
   - [ ] 日本語→英語→中国語の切り替え
   - [ ] 翻訳の正確性確認

#### パフォーマンステスト
1. **レンダリングパフォーマンス**
   - [ ] 初回レンダリング時間
   - [ ] 入力時の再レンダリング回数
   - [ ] メモリ使用量

2. **計算パフォーマンス**
   - [ ] 計算実行時間
   - [ ] 連続入力時の処理速度

#### ブラウザ互換性テスト
- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)

#### レスポンシブデザインテスト
- [ ] デスクトップ (1920x1080)
- [ ] タブレット (768x1024)
- [ ] モバイル (375x667)

---

## 📈 品質メトリクス

### パフォーマンス指標

| 指標 | 現状 | 目標 | 測定方法 |
|------|------|------|----------|
| 初回レンダリング時間 | - | < 1秒 | Lighthouse |
| 入力応答時間 | - | < 100ms | React DevTools Profiler |
| 再レンダリング回数 | - | 30%削減 | React DevTools Profiler |
| バンドルサイズ | - | < 300KB (gzip) | Vite build |

### コード品質指標

| 指標 | 現状 | 目標 | 測定方法 |
|------|------|------|----------|
| TypeScriptエラー | 0 | 0 | tsc --noEmit |
| ESLintエラー | 0 | 0 | npm run lint |
| コードカバレッジ | - | > 70% | Vitest (将来) |
| 循環的複雑度 | - | < 10 | ESLint complexity |

---

## 🚀 デプロイメント計画

### リリース手順

#### 1. Phase 1 リリース (v1.1.0)
```bash
# 1. ブランチ作成
git checkout -b feature/refactoring-phase1

# 2. 実装
# タスク1.1-1.3を実施

# 3. テスト
npm run typecheck
npm run lint

# 4. コミット
git add .
git commit -m "feat: Phase 1 パフォーマンス改善

- debounce導入で入力時の計算を最適化
- コンポーネントメモ化で再レンダリング削減
- logger導入で本番環境のログ削減"

# 5. マージ
git checkout main
git merge feature/refactoring-phase1
git tag v1.1.0
git push origin main --tags
```

#### 2. Phase 2 リリース (v1.2.0)
```bash
git checkout -b feature/refactoring-phase2
# 実装・テスト・コミット
git checkout main
git merge feature/refactoring-phase2
git tag v1.2.0
git push origin main --tags
```

#### 3. Phase 3 リリース (v1.3.0、任意)
```bash
git checkout -b feature/refactoring-phase3
# 実装・テスト・コミット
git checkout main
git merge feature/refactoring-phase3
git tag v1.3.0
git push origin main --tags
```

### ロールバック計画

各Phaseで問題が発生した場合:
```bash
# タグに戻す
git checkout v1.0.0

# または直前のコミットに戻す
git revert HEAD
```

---

## 📝 ドキュメント更新

### 更新対象ドキュメント

1. **CHANGELOG.md** (新規作成)
```markdown
# Changelog

## [1.3.0] - 2025-01-XX (Phase 3)
### Changed
- コンポーネント階層の最適化
- ストアのスライス化
- カスタムフックの抽出

## [1.2.0] - 2025-01-XX (Phase 2)
### Added
- ゲーム定数の一元管理
- エラーハンドリング機能
- ユーティリティ関数の追加

### Changed
- 型定義の一元化
- 重複コードの削除

## [1.1.0] - 2025-01-XX (Phase 1)
### Added
- debounce による再計算の最適化
- logger ユーティリティの追加

### Changed
- コンポーネントメモ化によるパフォーマンス改善
- 本番環境のconsole.log削減

## [1.0.0] - 2025-01-04
### Added
- 初回リリース
```

2. **README.md**
   - パフォーマンス改善内容の追記
   - 新しい定数ファイルの説明追加

3. **DIRECTORY_STRUCTURE.md**
   - 新しいディレクトリ構造の反映
   - constants/, hooks/ フォルダの説明追加

---

## 🎯 成功基準

### Phase 1 成功基準
- ✅ 入力時の計算回数が80%以上削減
- ✅ 再レンダリング回数が60%以上削減
- ✅ 本番環境でdebugログが0件
- ✅ すべての既存機能が正常動作

### Phase 2 成功基準
- ✅ マジックナンバーが定数化されている
- ✅ 型定義が一元化されている
- ✅ 重複コードが削除されている
- ✅ エラーハンドリングが実装されている

### Phase 3 成功基準
- ✅ コンポーネント階層が最適化されている
- ✅ ストアがスライス化されている
- ✅ カスタムフックが適切に抽出されている

---

## 📅 スケジュール

### 推奨実装スケジュール

| Phase | 期間 | 担当 | 備考 |
|-------|------|------|------|
| Phase 1 | 1日目 | 開発者 | 最優先で実施 |
| Phase 2 | 2-3日目 | 開発者 | Phase 1完了後 |
| Phase 3 | 4-5日目 | 開発者 | 任意実施 |
| テスト・QA | 6日目 | QA担当 | 全Phase完了後 |
| リリース | 7日目 | DevOps | デプロイ実施 |

---

## 🔧 トラブルシューティング

### よくある問題と解決策

#### 1. debounce導入後に計算が遅延する
**原因:** debounce時間が長すぎる
**解決策:** `debounce(fn, 100)` の100msを調整（50-150ms）

#### 2. メモ化後も再レンダリングが発生する
**原因:** セレクターが毎回新しいオブジェクトを返している
**解決策:** shallow equality check を使用
```typescript
import { shallow } from 'zustand/shallow';
const { value1, value2 } = useCalculatorStore(
  state => ({ value1: state.value1, value2: state.value2 }),
  shallow
);
```

#### 3. 定数変更後にビルドエラー
**原因:** import文の更新漏れ
**解決策:** IDEの自動インポート機能を使用、またはgrep検索

#### 4. エラーハンドリング追加後に型エラー
**原因:** 戻り値の型が変更されている
**解決策:** 型定義を確認し、必要に応じて更新

---

## 📚 参考資料

### 公式ドキュメント
- [React 公式ドキュメント](https://react.dev/)
- [Zustand ドキュメント](https://github.com/pmndrs/zustand)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Vite ガイド](https://vitejs.dev/guide/)

### パフォーマンス最適化
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Zustand Best Practices](https://github.com/pmndrs/zustand#best-practices)

### コーディング規約
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

---

## ✅ 最終チェックリスト

### 実装前確認
- [ ] このドキュメントを全て読んだ
- [ ] 現在のコードをバックアップした
- [ ] git status がクリーンな状態
- [ ] 依存パッケージが最新

### 実装中確認
- [ ] 各タスク完了後にコミット
- [ ] TypeScript型チェックが通る
- [ ] ESLintエラーが0件
- [ ] 手動テストを実施

### 実装後確認
- [ ] すべての機能が正常動作
- [ ] パフォーマンステスト実施
- [ ] ドキュメント更新完了
- [ ] CHANGELOG.md 更新
- [ ] git tag 付与

---

**作成者:** Claude Code
**最終更新:** 2025-10-04
**バージョン:** 1.0.0
