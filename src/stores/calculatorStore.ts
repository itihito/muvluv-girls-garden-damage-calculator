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
  enemyDefense: 300,
  criticalDamageBonus: 15, // 15% (基本1.5に+0.15)
  advantageDamageBonus: 10, // 10% (基本1.25に+0.10)
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
      manualSkillPower: null,
      isManualAttackMode: false,
      isManualSkillMode: false,

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
        set({ selectedSkill: skill });
        setTimeout(() => get().calculateDamage(), 0);
      },

      setSkillLevel: (level) => {
        set({ skillLevel: Math.max(1, Math.min(15, level)) });
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

      setManualSkillPower: (power) => {
        set({ manualSkillPower: power });
        setTimeout(() => get().calculateDamage(), 0);
      },

      toggleManualAttackMode: (enabled) => {
        set({ isManualAttackMode: enabled });
        if (!enabled) {
          set({ manualAttackPower: null });
        }
        setTimeout(() => get().calculateDamage(), 0);
      },

      toggleManualSkillMode: (enabled) => {
        set({ isManualSkillMode: enabled });
        if (!enabled) {
          set({ manualSkillPower: null });
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
          state.advancedSettings
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
          manualSkillPower: null,
          isManualAttackMode: false,
          isManualSkillMode: false,
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
        const { selectedCharacter, isManualAttackMode, manualAttackPower } = state;

        if (isManualAttackMode && manualAttackPower !== null) {
          return manualAttackPower;
        }

        if (!selectedCharacter) return 0;

        // キャラクターの基礎攻撃力 + スキル威力
        const baseAttack = 1000; // 仮の基礎攻撃力 (後でキャラクターデータから取得)
        const skillPower = state.getEffectiveSkillPower();

        return calculateTotalAttack(baseAttack, skillPower, manualAttackPower);
      },

      getEffectiveSkillPower: () => {
        const state = get();
        const { selectedSkill, skillLevel, isManualSkillMode, manualSkillPower } = state;

        if (isManualSkillMode && manualSkillPower !== null) {
          return manualSkillPower;
        }

        if (!selectedSkill) return 0;

        // スキルの威力をレベルから取得
        return getSkillPowerAtLevel(selectedSkill, skillLevel);
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