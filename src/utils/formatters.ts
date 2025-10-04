/**
 * フォーマット関連のユーティリティ関数
 */

/**
 * 数値をカンマ区切りの文字列にフォーマット
 * 小数点以下は切り捨て
 * @param value フォーマットする数値
 * @returns カンマ区切りの文字列 (例: "1,234,567")
 */
export function formatNumber(value: number): string {
  return Math.floor(value).toLocaleString();
}

/**
 * 数値を指定桁数でフォーマット
 * @param value フォーマットする数値
 * @param decimals 小数点以下の桁数 (デフォルト: 0)
 * @returns フォーマットされた文字列
 */
export function formatNumberWithDecimals(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

/**
 * パーセンテージ値をフォーマット
 * @param value フォーマットする数値
 * @param decimals 小数点以下の桁数 (デフォルト: 2)
 * @returns パーセンテージ文字列 (例: "12.34%")
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * ダメージ値をフォーマット
 * 整数部分のみをカンマ区切りで返す
 * @param value ダメージ値
 * @returns フォーマットされたダメージ文字列
 */
export function formatDamage(value: number): string {
  return formatNumber(value);
}
