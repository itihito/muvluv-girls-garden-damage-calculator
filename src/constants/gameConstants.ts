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
