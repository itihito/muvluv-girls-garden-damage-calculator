import { logger } from "./logger";
import { GAME_CONSTANTS } from '../constants/gameConstants';
import { validateInput } from './errors';
import type {
  DamageResults,
  CalculationSteps,
  BattleSettings,
  Skill,
  AdvancedSettings,
} from '../types';

/**
 * Alterios式ダメージ計算エンジン
 *
 * 基礎ダメージ * スキル威力 * 属性倍率 * 会心倍率 * ヒット数
 *
 * 計算手順:
 * 1. 基礎ダメージ = 総攻撃力 - 防御力
 * 2. スキル威力 = スキルの威力値 / 100
 * 3. 属性倍率 = 1.25 + 属性強化% (有利時のみ、通常時は1.0)
 * 4. 会心倍率 = 1.5 + 会心強化% (会心時のみ、通常時は1.0)
 * 5. 最終ダメージ = 基礎ダメージ × スキル威力 × 属性倍率 × 会心倍率 × ヒット数
 */

/**
 * メインダメージ計算関数
 * 計算式: (総攻撃力 - 防御力) * スキル威力 * 属性倍率 * 会心倍率 * ヒット数
 */
export function calculateDamage(
  totalAttack: number,
  battleSettings: BattleSettings,
  skill: Skill | null = null,
  skillLevel: number = 1,
  hitCount: number = 1,
  advancedSettings?: AdvancedSettings,
  manualSkillPower?: number | null
): { results: DamageResults; steps: CalculationSteps } {
  // 入力値検証
  try {
    validateInput.isValidNumber(totalAttack, 'totalAttack');
    validateInput.isPositive(totalAttack, 'totalAttack');
    validateInput.isInRange(totalAttack, GAME_CONSTANTS.ATTACK_POWER.MIN, GAME_CONSTANTS.ATTACK_POWER.MAX, 'totalAttack');

    validateInput.isValidNumber(hitCount, 'hitCount');
    validateInput.isInRange(hitCount, GAME_CONSTANTS.HIT_COUNT.MIN, GAME_CONSTANTS.HIT_COUNT.MAX, 'hitCount');

    if (manualSkillPower !== null && manualSkillPower !== undefined) {
      validateInput.isValidNumber(manualSkillPower, 'manualSkillPower');
      validateInput.isInRange(manualSkillPower, GAME_CONSTANTS.SKILL_POWER.MIN, GAME_CONSTANTS.SKILL_POWER.MAX, 'manualSkillPower');
    }
  } catch (error) {
    logger.error('入力値検証エラー:', error);
    throw error;
  }

  const { enemyDefense, criticalDamageBonus, advantageDamageBonus } = battleSettings;
  const roundingMode = advancedSettings?.roundingMode || 'floor';

  logger.debug('🔍 ダメージ計算開始');
  logger.debug('📊 入力値:', {
    totalAttack,
    enemyDefense,
    criticalDamageBonus,
    advantageDamageBonus,
    skillLevel,
    hitCount,
    skillName: skill?.name || 'None'
  });

  // Step 1: 基礎ダメージ計算 (総攻撃力 - 防御力)
  const baseDamageRaw = totalAttack - enemyDefense;
  const baseDamage = Math.max(0, baseDamageRaw); // 負数は0に
  logger.debug('🔢 基礎ダメージ:', { baseDamageRaw, baseDamage });

  // Step 2: スキル威力取得（手動入力を優先）
  let skillPowerFromLevel: number;
  if (manualSkillPower !== null && manualSkillPower !== undefined) {
    skillPowerFromLevel = manualSkillPower;
    logger.debug('✋ 手動スキル威力使用:', manualSkillPower);
  } else {
    skillPowerFromLevel = skill ? getSkillPowerAtLevel(skill, skillLevel) : GAME_CONSTANTS.SKILL_POWER.DEFAULT;
    logger.debug('📊 レベルからスキル威力取得:', skillPowerFromLevel);
  }

  const skillPowerPercent = skillPowerFromLevel / GAME_CONSTANTS.SKILL_POWER.PERCENT_DIVISOR;
  logger.debug('⚡ スキル威力:', {
    skillPowerFromLevel,
    skillPowerPercent,
    calculation: `${skillPowerFromLevel} / 100 = ${skillPowerPercent}`,
    source: manualSkillPower !== null && manualSkillPower !== undefined ? 'manual' : 'level'
  });

  // Step 3: 会心・属性倍率計算
  const criticalMultiplier = GAME_CONSTANTS.DAMAGE_MULTIPLIERS.CRITICAL_BASE + (criticalDamageBonus / GAME_CONSTANTS.SKILL_POWER.PERCENT_DIVISOR);
  const advantageMultiplier = GAME_CONSTANTS.DAMAGE_MULTIPLIERS.ADVANTAGE_BASE + (advantageDamageBonus / GAME_CONSTANTS.SKILL_POWER.PERCENT_DIVISOR);
  logger.debug('💥 倍率計算:', {
    criticalMultiplier: `1.5 + ${criticalDamageBonus}/100 = ${criticalMultiplier}`,
    advantageMultiplier: `1.25 + ${advantageDamageBonus}/100 = ${advantageMultiplier}`
  });

  // Step 4: 最終ダメージ計算 (正しい計算式適用)
  // ((総攻撃力 - 防御力) * スキル威力(%) * 属性補正 * 会心(%) * ヒット数)

  // 計算前の値をログ出力
  const normalCalc = baseDamage * skillPowerPercent * hitCount;
  const criticalCalc = baseDamage * skillPowerPercent * criticalMultiplier * hitCount;
  const advantageNormalCalc = baseDamage * skillPowerPercent * advantageMultiplier * hitCount;
  const advantageCriticalCalc = baseDamage * skillPowerPercent * criticalMultiplier * advantageMultiplier * hitCount;

  logger.debug('🎯 ダメージ計算詳細:');
  logger.debug('通常:', `${baseDamage} × ${skillPowerPercent} × ${hitCount} = ${normalCalc}`);
  logger.debug('会心:', `${baseDamage} × ${skillPowerPercent} × ${criticalMultiplier} × ${hitCount} = ${criticalCalc}`);
  logger.debug('有利:', `${baseDamage} × ${skillPowerPercent} × ${advantageMultiplier} × ${hitCount} = ${advantageNormalCalc}`);
  logger.debug('有利会心:', `${baseDamage} × ${skillPowerPercent} × ${criticalMultiplier} × ${advantageMultiplier} × ${hitCount} = ${advantageCriticalCalc}`);

  const finalDamages = {
    normal: applyRounding(normalCalc, roundingMode),
    critical: applyRounding(criticalCalc, roundingMode),
    advantageNormal: applyRounding(advantageNormalCalc, roundingMode),
    advantageCritical: applyRounding(advantageCriticalCalc, roundingMode),
  };

  logger.debug('✅ 端数処理後の最終結果:', finalDamages);

  // 結果構築
  const results: DamageResults = {
    totalAttack,
    enemyDefense,
    baseDamage,
    criticalMultiplier,
    advantageMultiplier,
    finalDamages,
  };

  // 計算過程記録
  const steps = buildCalculationSteps(
    totalAttack,
    enemyDefense,
    baseDamage,
    criticalMultiplier,
    advantageMultiplier,
    finalDamages,
    hitCount,
    criticalDamageBonus,
    advantageDamageBonus,
    skillPowerPercent
  );

  return { results, steps };
}

/**
 * スキル威力計算
 */
export function getSkillPowerAtLevel(skill: Skill, level: number): number {
  if (!skill || level < GAME_CONSTANTS.SKILL_LEVEL.MIN || level > GAME_CONSTANTS.SKILL_LEVEL.MAX) return 0;

  const powerPerLevel = skill.power_per_level;
  const skillPower = powerPerLevel[level - 1]; // 0-indexed

  return skillPower || 0;
}

/**
 * 総攻撃力計算
 * 新しい計算式では、総攻撃力 = キャラクター攻撃力のみ
 */
export function calculateTotalAttack(
  baseAttack: number,
  manualAttackPower?: number | null
): number {
  // 手動入力が有効な場合はそれを使用
  if (manualAttackPower !== null && manualAttackPower !== undefined) {
    return manualAttackPower;
  }

  // 新しい計算式では、総攻撃力はキャラクター攻撃力のみ
  return baseAttack;
}

/**
 * 端数処理適用
 */
function applyRounding(
  value: number,
  mode: 'floor' | 'ceil' | 'round'
): number {
  switch (mode) {
    case 'floor':
      return Math.floor(value);
    case 'ceil':
      return Math.ceil(value);
    case 'round':
      return Math.round(value);
    default:
      return Math.floor(value);
  }
}

/**
 * 計算過程構築
 */
function buildCalculationSteps(
  totalAttack: number,
  enemyDefense: number,
  baseDamage: number,
  criticalMultiplier: number,
  advantageMultiplier: number,
  finalDamages: DamageResults['finalDamages'],
  hitCount: number,
  criticalDamageBonus: number,
  advantageDamageBonus: number,
  skillPowerPercent: number
): CalculationSteps {
  return {
    step1: {
      label: "基礎ダメージ計算",
      formula: "総攻撃力 - 防御力",
      calculation: `${totalAttack} - ${enemyDefense}`,
      result: baseDamage,
    },
    step2: {
      label: "スキル威力(%)",
      formula: "スキル威力 / 100",
      calculation: `${(skillPowerPercent * 100).toFixed(1)} / 100`,
      result: Number(skillPowerPercent.toFixed(3)),
    },
    step3: {
      label: "会心倍率",
      formula: "1.5 + 会心強化%",
      calculation: `1.5 + ${(criticalDamageBonus / 100).toFixed(2)}`,
      result: Number(criticalMultiplier.toFixed(3)),
    },
    step4: {
      label: "属性倍率",
      formula: "1.25 + 属性強化%",
      calculation: `1.25 + ${(advantageDamageBonus / 100).toFixed(2)}`,
      result: Number(advantageMultiplier.toFixed(3)),
    },
    step5: {
      label: "最終ダメージ計算",
      formula: "(基礎ダメージ × スキル威力(%) × 属性補正 × 会心(%) × ヒット数)",
      formulas: {
        normal: "基礎ダメージ × スキル威力(%) × ヒット数",
        critical: "基礎ダメージ × スキル威力(%) × 会心倍率 × ヒット数",
        advantageNormal: "基礎ダメージ × スキル威力(%) × 属性倍率 × ヒット数",
        advantageCritical: "基礎ダメージ × スキル威力(%) × 会心倍率 × 属性倍率 × ヒット数",
      },
      calculations: {
        normal: `${baseDamage} × ${skillPowerPercent.toFixed(3)} × ${hitCount}`,
        critical: `${baseDamage} × ${skillPowerPercent.toFixed(3)} × ${criticalMultiplier.toFixed(2)} × ${hitCount}`,
        advantageNormal: `${baseDamage} × ${skillPowerPercent.toFixed(3)} × ${advantageMultiplier.toFixed(2)} × ${hitCount}`,
        advantageCritical: `${baseDamage} × ${skillPowerPercent.toFixed(3)} × ${criticalMultiplier.toFixed(2)} × ${advantageMultiplier.toFixed(2)} × ${hitCount}`,
      },
      results: finalDamages,
    },
  };
}

/**
 * ダメージ比較用ユーティリティ
 */
export function compareDamageScenarios(
  baseScenario: { results: DamageResults; steps: CalculationSteps },
  alternativeScenarios: Array<{ results: DamageResults; steps: CalculationSteps; label: string }>
): Array<{
  label: string;
  damageIncrease: {
    normal: number;
    critical: number;
    advantageNormal: number;
    advantageCritical: number;
  };
  percentageIncrease: {
    normal: number;
    critical: number;
    advantageNormal: number;
    advantageCritical: number;
  };
}> {
  const baseDamages = baseScenario.results.finalDamages;

  return alternativeScenarios.map(scenario => {
    const altDamages = scenario.results.finalDamages;

    const damageIncrease = {
      normal: altDamages.normal - baseDamages.normal,
      critical: altDamages.critical - baseDamages.critical,
      advantageNormal: altDamages.advantageNormal - baseDamages.advantageNormal,
      advantageCritical: altDamages.advantageCritical - baseDamages.advantageCritical,
    };

    const percentageIncrease = {
      normal: baseDamages.normal > 0 ? (damageIncrease.normal / baseDamages.normal) * 100 : 0,
      critical: baseDamages.critical > 0 ? (damageIncrease.critical / baseDamages.critical) * 100 : 0,
      advantageNormal: baseDamages.advantageNormal > 0 ? (damageIncrease.advantageNormal / baseDamages.advantageNormal) * 100 : 0,
      advantageCritical: baseDamages.advantageCritical > 0 ? (damageIncrease.advantageCritical / baseDamages.advantageCritical) * 100 : 0,
    };

    return {
      label: scenario.label,
      damageIncrease,
      percentageIncrease,
    };
  });
}

/**
 * 最適レベル計算 (将来の拡張用)
 */
export function findOptimalSkillLevel(
  skill: Skill,
  baseAttack: number,
  battleSettings: BattleSettings,
  targetDefense: number = battleSettings.enemyDefense
): {
  optimalLevel: number;
  maxDamage: number;
  damageAtEachLevel: Array<{ level: number; damage: number }>;
} {
  const damageAtEachLevel: Array<{ level: number; damage: number }> = [];
  let maxDamage = 0;
  let optimalLevel = 1;

  for (let level = GAME_CONSTANTS.SKILL_LEVEL.MIN; level <= GAME_CONSTANTS.SKILL_LEVEL.MAX; level++) {
    const hitCount = skill.hit_count || GAME_CONSTANTS.HIT_COUNT.DEFAULT;
    const totalAttack = calculateTotalAttack(baseAttack);

    const { results } = calculateDamage(
      totalAttack,
      { ...battleSettings, enemyDefense: targetDefense },
      skill,
      level,
      hitCount
    );

    // 有利会心ダメージを基準とする
    const damage = results.finalDamages.advantageCritical;

    damageAtEachLevel.push({ level, damage });

    if (damage > maxDamage) {
      maxDamage = damage;
      optimalLevel = level;
    }
  }

  return {
    optimalLevel,
    maxDamage,
    damageAtEachLevel,
  };
}