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
 * 計算式:
 * 1. 基礎ダメージ = 総攻撃力 - 敵防御力
 * 2. 会心倍率 = 1.5 + 会心強化%
 * 3. 属性倍率 = 1.25 + 属性強化%
 * 4. 最終ダメージ = 基礎ダメージ × 各種倍率 × ヒット数
 */

/**
 * メインダメージ計算関数
 */
export function calculateDamage(
  totalAttack: number,
  battleSettings: BattleSettings,
  _skill: Skill | null = null,
  _skillLevel: number = 1,
  hitCount: number = 1,
  advancedSettings?: AdvancedSettings
): { results: DamageResults; steps: CalculationSteps } {
  const { enemyDefense, criticalDamageBonus, advantageDamageBonus } = battleSettings;
  const roundingMode = advancedSettings?.roundingMode || 'floor';

  // Step 1: 基礎ダメージ計算
  const baseDamageRaw = totalAttack - enemyDefense;
  const baseDamage = Math.max(0, baseDamageRaw); // 負数は0に

  // Step 2: 倍率計算
  const criticalMultiplier = 1.5 + (criticalDamageBonus / 100);
  const advantageMultiplier = 1.25 + (advantageDamageBonus / 100);

  // Step 3: 最終ダメージ計算 (端数処理付き)
  const finalDamages = {
    normal: applyRounding(baseDamage * hitCount, roundingMode),
    critical: applyRounding(baseDamage * criticalMultiplier * hitCount, roundingMode),
    advantageNormal: applyRounding(baseDamage * advantageMultiplier * hitCount, roundingMode),
    advantageCritical: applyRounding(
      baseDamage * criticalMultiplier * advantageMultiplier * hitCount,
      roundingMode
    ),
  };

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
    advantageDamageBonus
  );

  return { results, steps };
}

/**
 * スキル威力計算
 */
export function getSkillPowerAtLevel(skill: Skill, level: number): number {
  if (!skill || level < 1 || level > 15) return 0;

  const powerPerLevel = skill.power_per_level;
  const skillPower = powerPerLevel[level - 1]; // 0-indexed

  return skillPower || 0;
}

/**
 * 総攻撃力計算
 */
export function calculateTotalAttack(
  baseAttack: number,
  skillPower: number,
  manualAttackPower?: number | null
): number {
  // 手動入力が有効な場合はそれを使用
  if (manualAttackPower !== null && manualAttackPower !== undefined) {
    return manualAttackPower;
  }

  return baseAttack + skillPower;
}

/**
 * 属性相性チェック (将来の拡張用)
 */
export function checkAttributeAdvantage(
  _attackerAttribute: string,
  _defenderAttribute: string
): boolean {
  // 現在は常にfalseを返す (手動で設定するため)
  // 将来的には属性相性表を実装可能
  return false;
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
  advantageDamageBonus: number
): CalculationSteps {
  return {
    step1: {
      label: "基礎ダメージ計算",
      formula: "総攻撃力 - 敵防御力",
      calculation: `${totalAttack} - ${enemyDefense}`,
      result: baseDamage,
    },
    step2: {
      label: "会心倍率計算",
      formula: "1.5 + 会心強化%",
      calculation: `1.5 + ${(criticalDamageBonus / 100).toFixed(2)}`,
      result: Number(criticalMultiplier.toFixed(3)),
    },
    step3: {
      label: "属性倍率計算",
      formula: "1.25 + 属性強化%",
      calculation: `1.25 + ${(advantageDamageBonus / 100).toFixed(2)}`,
      result: Number(advantageMultiplier.toFixed(3)),
    },
    step4: {
      label: "最終ダメージ計算",
      formulas: {
        normal: hitCount > 1 ? "基礎ダメージ × ヒット数" : "基礎ダメージ",
        critical: hitCount > 1 ? "基礎ダメージ × 会心倍率 × ヒット数" : "基礎ダメージ × 会心倍率",
        advantageNormal: hitCount > 1 ? "基礎ダメージ × 属性倍率 × ヒット数" : "基礎ダメージ × 属性倍率",
        advantageCritical: hitCount > 1
          ? "基礎ダメージ × 会心倍率 × 属性倍率 × ヒット数"
          : "基礎ダメージ × 会心倍率 × 属性倍率",
      },
      calculations: {
        normal: hitCount > 1 ? `${baseDamage} × ${hitCount}` : `${baseDamage}`,
        critical: hitCount > 1
          ? `${baseDamage} × ${criticalMultiplier.toFixed(2)} × ${hitCount}`
          : `${baseDamage} × ${criticalMultiplier.toFixed(2)}`,
        advantageNormal: hitCount > 1
          ? `${baseDamage} × ${advantageMultiplier.toFixed(2)} × ${hitCount}`
          : `${baseDamage} × ${advantageMultiplier.toFixed(2)}`,
        advantageCritical: hitCount > 1
          ? `${baseDamage} × ${criticalMultiplier.toFixed(2)} × ${advantageMultiplier.toFixed(2)} × ${hitCount}`
          : `${baseDamage} × ${criticalMultiplier.toFixed(2)} × ${advantageMultiplier.toFixed(2)}`,
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

  for (let level = 1; level <= 15; level++) {
    const skillPower = getSkillPowerAtLevel(skill, level);
    const totalAttack = baseAttack + skillPower;
    const hitCount = skill.hit_count || 1;

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