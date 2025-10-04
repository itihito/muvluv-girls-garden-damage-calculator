/**
 * 型定義のエントリーポイント
 * 各種型定義を集約してエクスポート
 */

import type { Character, Skill } from '../characterData';

// キャラクター・スキル型を再エクスポート
export type { Character, Skill } from '../characterData';

// モデル型を再エクスポート
export type {
  AttributeType,
  SkillType,
  BattleSettings,
  DamageResults,
  CalculationSteps,
  BarChartData,
  AdvancedSettings,
} from './models';

// ストア定義で使用する型をインポート
import type { AttributeType, BattleSettings, AdvancedSettings, DamageResults, CalculationSteps, BarChartData } from './models';

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
  hitCount: number | null;    // ヒット数（スキル選択時に自動設定、手動編集可能）
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
  setHitCount: (count: number | null) => void;
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
  getBarChartData: (labels?: { normal: string; critical: string; advantage: string; advantageCritical: string }) => BarChartData[];

  // 初期化
  init: () => void;
}

// Zustand ストア型 (AppState + Actions)
export type CalculatorStore = AppState & CalculatorActions;