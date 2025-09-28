import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻訳リソース定義
const resources = {
  ja: {
    translation: {
      // アプリケーション全般
      app: {
        title: 'ダメージ計算機',
        description: 'ゲームダメージ計算ツール',
      },

      // ナビゲーション
      nav: {
        characters: 'キャラクター',
        skills: 'スキル',
        settings: '設定',
        results: '結果',
      },

      // キャラクター選択
      character: {
        title: 'キャラクター選択',
        filter: {
          all: '全て',
          aggressive: 'アグレッシブ',
          smart: 'スマート',
          shy: 'シャイ',
          cute: 'キュート',
          comical: 'コミカル',
          clever: 'クレバー',
        },
        noSelection: 'キャラクターを選択してください',
        rarity: 'レア度',
        attribute: '属性',
        school: '所属校舎',
        team: 'チーム',
      },

      // スキル設定
      skill: {
        title: 'スキル設定',
        level: 'レベル',
        power: '威力',
        hitCount: 'ヒット数',
        type: {
          EX: 'EXスキル',
          AS: 'アクティブスキル',
          PS: 'パッシブスキル',
        },
        noSkills: 'スキルがありません',
        manualMode: '手動入力モード',
        manualPower: '手動威力',
      },

      // 戦闘設定
      battle: {
        title: '戦闘設定',
        attackPower: '攻撃力',
        enemyDefense: '敵防御力',
        criticalBonus: '会心強化',
        advantageBonus: '属性強化',
        manualMode: '手動入力',
      },

      // ダメージ結果
      damage: {
        title: 'ダメージ結果',
        normal: '通常',
        critical: '会心',
        advantage: '有利',
        advantageCritical: '有利会心',
        totalAttack: '総攻撃力',
        baseDamage: '基礎ダメージ',
        details: '詳細設定',
        noResults: '結果を表示するにはキャラクターとスキルを選択してください',
      },

      // 詳細設定ダイアログ
      details: {
        title: '詳細設定・計算過程',
        tabs: {
          calculation: '計算過程',
          advanced: '高度な設定',
        },
        calculation: {
          step1: '基礎ダメージ計算',
          step2: '会心倍率計算',
          step3: '属性倍率計算',
          step4: '最終ダメージ計算',
          formula: '計算式',
          calculation: '計算',
          result: '結果',
        },
        advanced: {
          roundingMode: '端数処理',
          roundingOptions: {
            floor: '切り捨て',
            ceil: '切り上げ',
            round: '四捨五入',
          },
          showFormula: '計算式表示',
          animateResults: '結果アニメーション',
        },
      },

      // UI共通
      ui: {
        close: '閉じる',
        reset: 'リセット',
        calculate: '計算',
        apply: '適用',
        cancel: 'キャンセル',
        save: '保存',
        loading: '読み込み中...',
        error: 'エラーが発生しました',
      },

      // エラーメッセージ
      error: {
        characterNotSelected: 'キャラクターが選択されていません',
        skillNotSelected: 'スキルが選択されていません',
        invalidInput: '無効な入力です',
        calculationFailed: '計算に失敗しました',
      },
    },
  },

  en: {
    translation: {
      app: {
        title: 'Damage Calculator',
        description: 'Game Damage Calculation Tool',
      },

      nav: {
        characters: 'Characters',
        skills: 'Skills',
        settings: 'Settings',
        results: 'Results',
      },

      character: {
        title: 'Character Selection',
        filter: {
          all: 'All',
          aggressive: 'Aggressive',
          smart: 'Smart',
          shy: 'Shy',
          cute: 'Cute',
          comical: 'Comical',
          clever: 'Clever',
        },
        noSelection: 'Please select a character',
        rarity: 'Rarity',
        attribute: 'Attribute',
        school: 'School',
        team: 'Team',
      },

      skill: {
        title: 'Skill Settings',
        level: 'Level',
        power: 'Power',
        hitCount: 'Hit Count',
        type: {
          EX: 'EX Skill',
          AS: 'Active Skill',
          PS: 'Passive Skill',
        },
        noSkills: 'No skills available',
        manualMode: 'Manual Input Mode',
        manualPower: 'Manual Power',
      },

      battle: {
        title: 'Battle Settings',
        attackPower: 'Attack Power',
        enemyDefense: 'Enemy Defense',
        criticalBonus: 'Critical Bonus',
        advantageBonus: 'Advantage Bonus',
        manualMode: 'Manual Input',
      },

      damage: {
        title: 'Damage Results',
        normal: 'Normal',
        critical: 'Critical',
        advantage: 'Advantage',
        advantageCritical: 'Adv. Critical',
        totalAttack: 'Total Attack',
        baseDamage: 'Base Damage',
        details: 'Details',
        noResults: 'Select character and skill to view results',
      },

      details: {
        title: 'Detailed Settings & Calculation Steps',
        tabs: {
          calculation: 'Calculation',
          advanced: 'Advanced',
        },
        calculation: {
          step1: 'Base Damage Calculation',
          step2: 'Critical Multiplier Calculation',
          step3: 'Advantage Multiplier Calculation',
          step4: 'Final Damage Calculation',
          formula: 'Formula',
          calculation: 'Calculation',
          result: 'Result',
        },
        advanced: {
          roundingMode: 'Rounding Mode',
          roundingOptions: {
            floor: 'Floor',
            ceil: 'Ceiling',
            round: 'Round',
          },
          showFormula: 'Show Formula',
          animateResults: 'Animate Results',
        },
      },

      ui: {
        close: 'Close',
        reset: 'Reset',
        calculate: 'Calculate',
        apply: 'Apply',
        cancel: 'Cancel',
        save: 'Save',
        loading: 'Loading...',
        error: 'An error occurred',
      },

      error: {
        characterNotSelected: 'No character selected',
        skillNotSelected: 'No skill selected',
        invalidInput: 'Invalid input',
        calculationFailed: 'Calculation failed',
      },
    },
  },

  zh: {
    translation: {
      app: {
        title: '伤害计算器',
        description: '游戏伤害计算工具',
      },

      nav: {
        characters: '角色',
        skills: '技能',
        settings: '设置',
        results: '结果',
      },

      character: {
        title: '角色选择',
        filter: {
          all: '全部',
          aggressive: '积极',
          smart: '智慧',
          shy: '害羞',
          cute: '可爱',
          comical: '搞笑',
          clever: '聪明',
        },
        noSelection: '请选择角色',
        rarity: '稀有度',
        attribute: '属性',
        school: '学校',
        team: '队伍',
      },

      skill: {
        title: '技能设置',
        level: '等级',
        power: '威力',
        hitCount: '命中次数',
        type: {
          EX: 'EX技能',
          AS: '主动技能',
          PS: '被动技能',
        },
        noSkills: '没有可用技能',
        manualMode: '手动输入模式',
        manualPower: '手动威力',
      },

      battle: {
        title: '战斗设置',
        attackPower: '攻击力',
        enemyDefense: '敌方防御',
        criticalBonus: '暴击加成',
        advantageBonus: '优势加成',
        manualMode: '手动输入',
      },

      damage: {
        title: '伤害结果',
        normal: '普通',
        critical: '暴击',
        advantage: '优势',
        advantageCritical: '优势暴击',
        totalAttack: '总攻击力',
        baseDamage: '基础伤害',
        details: '详细信息',
        noResults: '请选择角色和技能以查看结果',
      },

      details: {
        title: '详细设置和计算过程',
        tabs: {
          calculation: '计算过程',
          advanced: '高级设置',
        },
        calculation: {
          step1: '基础伤害计算',
          step2: '暴击倍率计算',
          step3: '优势倍率计算',
          step4: '最终伤害计算',
          formula: '公式',
          calculation: '计算',
          result: '结果',
        },
        advanced: {
          roundingMode: '取整模式',
          roundingOptions: {
            floor: '向下取整',
            ceil: '向上取整',
            round: '四舍五入',
          },
          showFormula: '显示公式',
          animateResults: '结果动画',
        },
      },

      ui: {
        close: '关闭',
        reset: '重置',
        calculate: '计算',
        apply: '应用',
        cancel: '取消',
        save: '保存',
        loading: '加载中...',
        error: '发生错误',
      },

      error: {
        characterNotSelected: '未选择角色',
        skillNotSelected: '未选择技能',
        invalidInput: '无效输入',
        calculationFailed: '计算失败',
      },
    },
  },
};

// i18next 初期化
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // デフォルト言語
    fallbackLng: 'ja', // フォールバック言語

    interpolation: {
      escapeValue: false, // ReactはXSS攻撃から保護されているため不要
    },

    // デバッグ設定（開発環境でのみ有効）
    debug: import.meta.env.DEV,

    // 言語検出設定
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // React Suspense対応
    react: {
      useSuspense: false,
    },
  });

export default i18n;

// 翻訳キー型定義（型安全性向上）
export type TranslationKeys = typeof resources.ja.translation;