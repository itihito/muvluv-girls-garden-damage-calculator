import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { calculateDamage, getSkillPowerAtLevel, calculateTotalAttack } from '../utils/damageCalculator';
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
  showFormula: true,
  animateResults: true,
};


// Zustand ストア作成
export const useCalculatorStore = create<CalculatorStore>()(
  devtools(
    (set, get) => ({
      // === 初期状態 ===
      selectedCharacter: null,
      selectedSkill: null,
      skillLevel: 1,
      selectedAttributeFilter: 'all',

      manualAttackPower: null,
      skillPower: null, // 現在の威力値（スキル選択時に自動設定、手動編集可能）
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
        // 自動計算実行
        setTimeout(() => get().calculateDamage(), 0);
      },

      setSkill: (skill) => {
        const newSkillPower = skill ? getSkillPowerAtLevel(skill, get().skillLevel) : null;
        set({
          selectedSkill: skill,
          skillPower: newSkillPower
        });
        setTimeout(() => get().calculateDamage(), 0);
      },

      setSkillLevel: (level) => {
        const state = get();
        const newLevel = Math.max(1, Math.min(15, level));
        const newSkillPower = state.selectedSkill ? getSkillPowerAtLevel(state.selectedSkill, newLevel) : null;
        set({
          skillLevel: newLevel,
          skillPower: newSkillPower
        });
        setTimeout(() => get().calculateDamage(), 0);
      },

      setAttributeFilter: (filter) => {
        set({ selectedAttributeFilter: filter });
      },

      // === 手動入力アクション ===
      setManualAttackPower: (power) => {
        set({ manualAttackPower: power });
        setTimeout(() => get().calculateDamage(), 0);
      },

      setSkillPower: (power) => {
        set({ skillPower: power });
        setTimeout(() => get().calculateDamage(), 0);
      },

      toggleManualAttackMode: (enabled) => {
        set({ isManualAttackMode: enabled });
        if (!enabled) {
          set({ manualAttackPower: null });
        }
        setTimeout(() => get().calculateDamage(), 0);
      },

      // === 設定アクション ===
      updateBattleSettings: (settings) => {
        set((state) => ({
          battleSettings: { ...state.battleSettings, ...settings },
        }));
        setTimeout(() => get().calculateDamage(), 0);
      },

      updateAdvancedSettings: (settings) => {
        set((state) => ({
          advancedSettings: { ...state.advancedSettings, ...settings },
        }));
        setTimeout(() => get().calculateDamage(), 0);
      },

      // === UI アクション ===
      setDetailsDialogOpen: (open) => {
        set({ isDetailsDialogOpen: open });
      },

      // === 計算アクション ===
      calculateDamage: () => {
        const state = get();
        const { selectedCharacter, selectedSkill, skillLevel } = state;

        if (!selectedCharacter || !selectedSkill) {
          set({ results: null, calculationSteps: null });
          return;
        }

        // 攻撃力計算
        const totalAttack = state.getEffectiveAttackPower();
        const hitCount = selectedSkill.hit_count || 1;

        // ダメージ計算実行
        const { results, steps } = calculateDamage(
          totalAttack,
          state.battleSettings,
          selectedSkill,
          skillLevel,
          hitCount,
          state.advancedSettings,
          state.skillPower
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
        const { selectedCharacter, selectedSkill, isManualAttackMode, manualAttackPower } = state;

        if (isManualAttackMode && manualAttackPower !== null) {
          return manualAttackPower;
        }

        if (!selectedCharacter) return 0;

        // 新しい計算式では、総攻撃力はキャラクター攻撃力のみ
        const baseAttack = 1000; // 仮の基礎攻撃力 (後でキャラクターデータから取得)
        const skillPower = state.getCurrentSkillPower();
        const hitCount = selectedSkill?.hit_count || 1;

        return calculateTotalAttack(baseAttack, skillPower, hitCount, manualAttackPower);
      },

      getCurrentSkillPower: () => {
        const state = get();
        return state.skillPower || 0;
      },

      getBarChartData: () => {
        const state = get();
        const { results } = state;

        if (!results) return [];

        const barChartData: BarChartData[] = [
          {
            name: '通常',
            damage: results.finalDamages.normal,
            color: '#8884d8',
          },
          {
            name: '会心',
            damage: results.finalDamages.critical,
            color: '#82ca9d',
          },
          {
            name: '有利',
            damage: results.finalDamages.advantageNormal,
            color: '#ffc658',
          },
          {
            name: '有利会心',
            damage: results.finalDamages.advantageCritical,
            color: '#ff7300',
          },
        ];

        return barChartData;
      },
    }),
    {
      name: 'calculator-store', // Redux DevTools での名前
    }
  )
);