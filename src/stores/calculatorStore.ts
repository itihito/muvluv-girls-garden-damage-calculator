import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { debounce } from 'lodash-es';
import { calculateDamage, getSkillPowerAtLevel } from '../utils/damageCalculator';
import type {
  CalculatorStore,
  BattleSettings,
  AdvancedSettings,
  BarChartData,
} from '../types';

// デフォルト値定義
const defaultBattleSettings: BattleSettings = {
  enemyDefense: 0,
  criticalDamageBonus: 0, // 0% (基本1.5のみ)
  advantageDamageBonus: 0, // 0% (基本1.25のみ)
};

const defaultAdvancedSettings: AdvancedSettings = {
  baseCriticalRate: 5, // 5%
  roundingMode: 'floor',
};

// Zustand ストア作成
export const useCalculatorStore = create<CalculatorStore>()(
  devtools(
    (set, get) => {
      // debouncedCalculate関数を作成（100ms待機）
      const debouncedCalculate = debounce(() => {
        get().calculateDamage();
      }, 100);

      return {
        // === 初期状態 ===
        selectedCharacter: null,
        selectedSkill: null,
        skillLevel: 1,
        selectedAttributeFilter: 'all',

        manualAttackPower: null,
        skillPower: null, // 現在の威力値（スキル選択時に自動設定、手動編集可能）
        hitCount: null,   // ヒット数（スキル選択時に自動設定、手動編集可能）
        isManualAttackMode: false,

        battleSettings: defaultBattleSettings,
        advancedSettings: defaultAdvancedSettings,

        results: null,
        calculationSteps: null,
        isDetailsDialogOpen: false,

        // === 選択アクション ===
        setCharacter: (character) => {
          set({
            selectedCharacter: character,
            selectedSkill: null, // キャラクター変更時はスキルリセット
            skillLevel: 1,
          });
          // 即座に計算実行（選択時は遅延不要）
          get().calculateDamage();
        },

        setSkill: (skill) => {
          const newSkillPower = skill ? getSkillPowerAtLevel(skill, get().skillLevel) : null;
          const newHitCount = skill?.hit_count || null;
          set({
            selectedSkill: skill,
            skillPower: newSkillPower,
            hitCount: newHitCount
          });
          // 即座に計算実行（選択時は遅延不要）
          get().calculateDamage();
        },

        setSkillLevel: (level) => {
          const state = get();
          const newLevel = Math.max(1, Math.min(15, level));
          const newSkillPower = state.selectedSkill ? getSkillPowerAtLevel(state.selectedSkill, newLevel) : null;
          set({
            skillLevel: newLevel,
            skillPower: newSkillPower
          });
          // 即座に計算実行（選択時は遅延不要）
          get().calculateDamage();
        },

        setAttributeFilter: (filter) => {
          set({ selectedAttributeFilter: filter });
        },

        // === 手動入力アクション（debounce適用） ===
        setManualAttackPower: (power) => {
          set({ manualAttackPower: power });
          debouncedCalculate();
        },

        setSkillPower: (power) => {
          set({ skillPower: power });
          debouncedCalculate();
        },

        setHitCount: (count) => {
          set({ hitCount: count });
          debouncedCalculate();
        },

        toggleManualAttackMode: (enabled) => {
          set({ isManualAttackMode: enabled });
          if (!enabled) {
            set({ manualAttackPower: null });
          }
          get().calculateDamage();
        },

        // === 設定アクション（debounce適用） ===
        updateBattleSettings: (settings) => {
          set((state) => ({
            battleSettings: { ...state.battleSettings, ...settings },
          }));
          debouncedCalculate();
        },

        updateAdvancedSettings: (settings) => {
          set((state) => ({
            advancedSettings: { ...state.advancedSettings, ...settings },
          }));
          debouncedCalculate();
        },

        // === UI アクション ===
        setDetailsDialogOpen: (open) => {
          set({ isDetailsDialogOpen: open });
        },

        // === 計算アクション ===
        calculateDamage: () => {
          const state = get();
          const { skillPower, hitCount } = state;

          // スキル威力とヒット数のデフォルト値を設定
          const effectiveSkillPower = skillPower || 100;
          const effectiveHitCount = hitCount || 1;

          // 攻撃力計算
          const totalAttack = state.getEffectiveAttackPower();

          // ダメージ計算実行
          const { results, steps } = calculateDamage(
            totalAttack,
            state.battleSettings,
            null, // スキルオブジェクトは不要
            1,    // スキルレベルは不要
            effectiveHitCount,
            state.advancedSettings,
            effectiveSkillPower
          );

          set({ results, calculationSteps: steps });
        },

        reset: () => {
          set({
            selectedCharacter: null,
            selectedSkill: null,
            skillLevel: 1,
            selectedAttributeFilter: 'all',
            manualAttackPower: null,
            skillPower: null,
            hitCount: null,
            isManualAttackMode: false,
            battleSettings: defaultBattleSettings,
            advancedSettings: defaultAdvancedSettings,
            results: null,
            calculationSteps: null,
            isDetailsDialogOpen: false,
          });
        },

        // === ヘルパー関数 ===
        getEffectiveAttackPower: () => {
          const state = get();
          const { manualAttackPower } = state;

          // 手動入力がある場合はそれを使用、なければデフォルト値
          return manualAttackPower !== null ? manualAttackPower : 1000;
        },

        getCurrentSkillPower: () => {
          const state = get();
          return state.skillPower || 0;
        },

        getBarChartData: (labels?: { normal: string; critical: string; advantage: string; advantageCritical: string }) => {
          const state = get();
          const { results } = state;

          if (!results) return [];

          const defaultLabels = {
            normal: '通常',
            critical: '会心',
            advantage: '有利',
            advantageCritical: '有利会心'
          };

          const effectiveLabels = labels || defaultLabels;

          const barChartData: BarChartData[] = [
            {
              name: effectiveLabels.normal,
              damage: results.finalDamages.normal,
              color: '#8884d8',
            },
            {
              name: effectiveLabels.critical,
              damage: results.finalDamages.critical,
              color: '#82ca9d',
            },
            {
              name: effectiveLabels.advantage,
              damage: results.finalDamages.advantageNormal,
              color: '#ffc658',
            },
            {
              name: effectiveLabels.advantageCritical,
              damage: results.finalDamages.advantageCritical,
              color: '#ff7300',
            },
          ];

          return barChartData;
        },

        // 初期化時に一度計算を実行
        init: () => {
          get().calculateDamage();
        },
      };
    },
    {
      name: 'calculator-store', // Redux DevTools での名前
    }
  )
);
