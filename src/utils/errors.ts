/**
 * カスタムエラークラスとエラーハンドリング
 */

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
 * 無効な入力値エラー
 */
export class InvalidInputError extends DamageCalculationError {
  constructor(field: string, value: unknown, reason: string) {
    super(`Invalid input for ${field}: ${value} (${reason})`);
    this.name = 'InvalidInputError';
  }
}

/**
 * 計算範囲外エラー
 */
export class CalculationOutOfRangeError extends DamageCalculationError {
  constructor(field: string, value: number, min: number, max: number) {
    super(`${field} value ${value} is out of range (${min}-${max})`);
    this.name = 'CalculationOutOfRangeError';
  }
}

/**
 * 入力値検証ヘルパー
 */
export const validateInput = {
  /**
   * 数値が範囲内かチェック
   */
  isInRange(value: number, min: number, max: number, fieldName: string): void {
    if (value < min || value > max) {
      throw new CalculationOutOfRangeError(fieldName, value, min, max);
    }
  },

  /**
   * 数値が有効かチェック
   */
  isValidNumber(value: unknown, fieldName: string): void {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new InvalidInputError(fieldName, value, 'must be a valid number');
    }
  },

  /**
   * 正の数値かチェック
   */
  isPositive(value: number, fieldName: string): void {
    if (value < 0) {
      throw new InvalidInputError(fieldName, value, 'must be positive');
    }
  },
};
