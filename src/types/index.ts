import type { Character, Skill } from '../characterData';

// 既存のCharacter, Skill型を再エクスポート
export type { Character, Skill } from '../characterData';

// 属性タイプ定義
export type AttributeType =
  | 'アグレッシブ'
  | 'スマート'
  | 'シャイ'
  | 'キュート'
  | 'コミカル'
  | 'クレバー';

// スキルタイプ定義
export type SkillType = 'EX' | 'AS' | 'PS';

// 戦闘設定型
export interface BattleSettings {
  enemyDefense: number;           // 敵防御力
  criticalDamageBonus: number;    // 会心強化% (基本1.5に追加)
  advantageDamageBonus: number;   // 属性強化% (基本1.25に追加)
}

// ダメージ計算結果型
export interface DamageResults {
  totalAttack: number;            // 総攻撃力
  enemyDefense: number;           // 敵防御力
  baseDamage: number;             // 基礎ダメージ
  criticalMultiplier: number;     // 会心倍率
  advantageMultiplier: number;    // 有利倍率
  finalDamages: {
    normal: number;               // 通常ダメージ
    critical: number;             // 会心ダメージ
    advantageNormal: number;      // 有利通常ダメージ
    advantageCritical: number;    // 有利会心ダメージ
  };
}

// 計算過程記録型
export interface CalculationSteps {
  step1: {
    label: string;                // "基礎ダメージ計算"
    formula: string;              // "総攻撃力 - 防御力"
    calculation: string;          // "1500 - 300"
    result: number;               // 1200
  };
  step2: {
    label: string;                // "スキル威力(%)"
    formula: string;              // "スキル威力 / 100"
    calculation: string;          // "150.0 / 100"
    result: number;               // 1.5
  };
  step3: {
    label: string;                // "会心倍率"
    formula: string;              // "1.5 + 会心強化%"
    calculation: string;          // "1.5 + 0.15"
    result: number;               // 1.65
  };
  step4: {
    label: string;                // "属性倍率"
    formula: string;              // "1.25 + 属性強化%"
    calculation: string;          // "1.25 + 0.10"
    result: number;               // 1.35
  };
  step5: {
    label: string;                // "最終ダメージ計算"
    formula: string;              // "(基礎ダメージ × スキル威力(%) × 属性補正 × 会心(%) × ヒット数)"
    formulas: {
      normal: string;             // "基礎ダメージ × スキル威力(%) × ヒット数"
      critical: string;           // "基礎ダメージ × スキル威力(%) × 会心倍率 × ヒット数"
      advantageNormal: string;    // "基礎ダメージ × スキル威力(%) × 属性倍率 × ヒット数"
      advantageCritical: string;  // "基礎ダメージ × スキル威力(%) × 会心倍率 × 属性倍率 × ヒット数"
    };
    calculations: {
      normal: string;             // "1200 × 1.500 × 1"
      critical: string;           // "1200 × 1.500 × 1.65 × 1"
      advantageNormal: string;    // "1200 × 1.500 × 1.35 × 1"
      advantageCritical: string;  // "1200 × 1.500 × 1.65 × 1.35 × 1"
    };
    results: {
      normal: number;             // 1800
      critical: number;           // 2970
      advantageNormal: number;    // 2430
      advantageCritical: number;  // 4009
    };
  };
}

// 棒グラフ用データ型
export interface BarChartData {
  name: string;                   // "通常", "会心", "有利", "有利会心"
  damage: number;                 // ダメージ値
  color: string;                  // バーの色 (#hex)
}

// 高度な設定型
export interface AdvancedSettings {
  baseCriticalRate: number;       // 基本会心率 (%)
  roundingMode: 'floor' | 'ceil' | 'round'; // 端数処理方法
  showFormula: boolean;           // 計算式表示
  animateResults: boolean;        // 結果アニメーション
}

// アプリケーション全体の状態型
export interface AppState {
  // 選択状態
  selectedCharacter: Character | null;
  selectedSkill: Skill | null;
  skillLevel: number;                       // 1-15
  selectedAttributeFilter: AttributeType | 'all';

  // 手動入力値
  manualAttackPower: number | null;
  skillPower: number | null;  // 現在の威力値（スキル選択時に自動設定、手動編集可能）
  isManualAttackMode: boolean;

  // 戦闘設定
  battleSettings: BattleSettings;

  // 詳細設定
  advancedSettings: AdvancedSettings;

  // 計算結果
  results: DamageResults | null;
  calculationSteps: CalculationSteps | null;

  // UI状態
  isDetailsDialogOpen: boolean;
}

// アクション型定義
export interface CalculatorActions {
  // 選択アクション
  setCharacter: (character: Character | null) => void;
  setSkill: (skill: Skill | null) => void;
  setSkillLevel: (level: number) => void;
  setAttributeFilter: (filter: AttributeType | 'all') => void;

  // 手動入力アクション
  setManualAttackPower: (power: number | null) => void;
  setSkillPower: (power: number | null) => void;
  toggleManualAttackMode: (enabled: boolean) => void;

  // 戦闘設定アクション
  updateBattleSettings: (settings: Partial<BattleSettings>) => void;

  // 詳細設定アクション
  updateAdvancedSettings: (settings: Partial<AdvancedSettings>) => void;

  // UI アクション
  setDetailsDialogOpen: (open: boolean) => void;

  // 計算アクション
  calculateDamage: () => void;
  reset: () => void;

  // ヘルパー関数
  getEffectiveAttackPower: () => number;
  getCurrentSkillPower: () => number;
  getBarChartData: () => BarChartData[];
}

// Zustand ストア型 (AppState + Actions)
export type CalculatorStore = AppState & CalculatorActions;