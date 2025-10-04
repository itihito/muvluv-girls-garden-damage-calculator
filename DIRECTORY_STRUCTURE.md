# ディレクトリ構造ドキュメント

## 📁 プロジェクト概要

マブラヴ ガールズガーデン ダメージ計算機 - React + TypeScript + Vite で構築されたSPA

---

## 🗂️ ディレクトリ構成

```
damage-calc/
├── 📄 設定・ドキュメントファイル
│   ├── CLAUDE.md                 # Claude Code用のプロジェクト説明
│   ├── PLAN.md                   # プロジェクト仕様書
│   ├── README.md                 # プロジェクトREADME
│   ├── DIRECTORY_STRUCTURE.md    # このファイル
│   ├── package.json              # npm依存関係とスクリプト
│   ├── tsconfig.json             # TypeScript設定（アプリ用）
│   ├── tsconfig.app.json         # TypeScript設定（アプリケーション）
│   ├── tsconfig.node.json        # TypeScript設定（Node.js用）
│   ├── vite.config.ts            # Vite設定
│   ├── eslint.config.js          # ESLint設定
│   ├── components.json           # shadcn/ui設定
│   ├── .gitignore                # Git除外設定
│   └── .mcp.json                 # MCP設定
│
├── 📂 public/                    # 静的ファイル
│   └── vite.svg
│
├── 📂 src/                       # ソースコード
│   ├── main.tsx                  # エントリーポイント
│   ├── App.tsx                   # ルートコンポーネント（React.memo最適化済み）
│   ├── index.css                 # グローバルスタイル
│   │
│   ├── 📂 components/            # Reactコンポーネント
│   │   ├── CharacterSelector.tsx      # キャラクター選択UI
│   │   ├── SkillPanel.tsx             # スキル表示パネル
│   │   ├── SkillSelectionDialog.tsx   # スキル選択ダイアログ
│   │   ├── SettingsPanel.tsx          # 戦闘設定パネル（React.memo最適化済み）
│   │   ├── DamageResults.tsx          # ダメージ結果表示（React.memo最適化済み）
│   │   ├── DetailsDialog.tsx          # 詳細設定・計算過程ダイアログ（React.memo最適化済み）
│   │   ├── InputButton.tsx            # 入力ボタンコンポーネント
│   │   ├── Rating.tsx                 # レーティング表示
│   │   │
│   │   └── 📂 ui/                     # shadcn/ui コンポーネント
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       └── tabs.tsx
│   │
│   ├── 📂 stores/                # 状態管理（Zustand）
│   │   └── calculatorStore.ts         # 計算機の状態管理（debounce最適化済み）
│   │
│   ├── 📂 utils/                 # ユーティリティ関数
│   │   ├── damageCalculator.ts        # ダメージ計算ロジック
│   │   ├── i18n.ts                    # 国際化設定（i18next）
│   │   ├── logger.ts                  # ロギングユーティリティ
│   │   ├── formatters.ts              # 数値フォーマット関数
│   │   └── errors.ts                  # エラーハンドリング・バリデーション
│   │
│   ├── 📂 lib/                   # ライブラリヘルパー
│   │   ├── utils.ts                   # ユーティリティ関数（cn等）
│   │   └── button-variants.ts         # ボタンバリエーション
│   │
│   ├── 📂 types/                 # TypeScript型定義
│   │   ├── index.ts                   # 型定義エントリーポイント
│   │   └── models.ts                  # ビジネスロジック型定義
│   │
│   ├── 📂 constants/             # 定数定義
│   │   └── gameConstants.ts           # ゲーム定数（倍率、範囲、デフォルト値）
│   │
│   ├── 📂 assets/                # 画像・静的アセット
│   │   └── 2025-09-27_194928.webp
│   │
│   └── characterData.ts          # キャラクター・スキルデータ
│
└── 📂 dist/                      # ビルド出力（gitignore対象）
```

---

## 🏗️ アーキテクチャ概要

### **技術スタック**

| カテゴリ | 技術 |
|---------|------|
| **フレームワーク** | React 19.1.1 |
| **言語** | TypeScript 5.8.3 |
| **ビルドツール** | Vite 7.1.7 |
| **状態管理** | Zustand 5.0.8 |
| **国際化** | i18next 25.5.2, react-i18next 16.0.0 |
| **UIライブラリ** | shadcn/ui (Radix UI) |
| **スタイリング** | Tailwind CSS 4.1.13 |
| **チャート** | Recharts 3.2.1 |
| **アイコン** | lucide-react 0.544.0 |
| **ユーティリティ** | lodash-es 4.17.21 |

---

## 📋 主要ファイル詳細

### **エントリーポイント・ルート**

#### `src/main.tsx`
- Reactアプリケーションのエントリーポイント
- `App.tsx`をDOMにマウント

#### `src/App.tsx`
- ルートコンポーネント（React.memo最適化済み）
- ヘッダー（タイトル、言語切替）
- メインレイアウト（戦闘設定、ダメージ結果）
- 詳細設定ダイアログの制御
- **パフォーマンス最適化**:
  - Zustandセレクターによる細粒度購読
  - useMemo/useCallbackによるメモ化

---

### **コンポーネント構成**

#### **1. 設定系コンポーネント**

##### `SettingsPanel.tsx`
戦闘設定を入力するパネル（React.memo最適化済み）
- 攻撃力
- 敵防御力
- スキル威力
- ヒット数
- 会心強化
- 有利属性強化
- **最適化**: GAME_CONSTANTSを使用した定数化

##### `SkillSelectionDialog.tsx`
キャラクターのスキルから威力を選択（現在は非表示）
- キャラクター選択
- スキル選択
- 威力とヒット数の自動設定

#### **2. 結果表示コンポーネント**

##### `DamageResults.tsx`
ダメージ計算結果を表示（React.memo最適化済み）
- 4パターンのダメージ（通常、会心、有利、有利会心）
- 棒グラフによる可視化
- 基礎計算情報（総攻撃力、防御力、倍率等）
- 詳細設定ダイアログを開くボタン
- **最適化**:
  - React.memoによる不要な再レンダリング防止
  - 共通formatNumber関数使用

##### `DetailsDialog.tsx`
詳細設定・計算過程を表示するダイアログ（React.memo最適化済み）
- **計算過程タブ**: 5ステップの計算詳細
  - Step1: 基礎ダメージ計算
  - Step2: スキル威力計算
  - Step3: 会心倍率計算
  - Step4: 属性倍率計算
  - Step5: 最終ダメージ計算（4パターン）
- **高度な設定タブ**: 端数処理モード選択
- **最適化**:
  - React.memoによる不要な再レンダリング防止
  - 共通formatNumber関数使用

#### **3. 共通UIコンポーネント**

##### `InputButton.tsx`
数値入力とボタンを組み合わせたカスタムコンポーネント
- 増減ボタン
- 直接入力
- バリデーション

##### `components/ui/`
shadcn/uiベースのUIコンポーネント群
- すべてRadix UIベース
- Tailwind CSSでスタイリング

---

### **状態管理**

#### `stores/calculatorStore.ts`
Zustandで実装された全体状態管理（debounce最適化済み）

**管理している状態:**
- キャラクター選択状態
- スキル選択状態
- 手動入力値（攻撃力、スキル威力、ヒット数）
- 戦闘設定（防御力、会心強化、属性強化）
- 高度な設定（端数処理モード）
- 計算結果とステップ
- UIダイアログ状態

**主要アクション:**
- `setManualAttackPower()` - 攻撃力設定
- `setSkillPower()` - スキル威力設定
- `setHitCount()` - ヒット数設定
- `updateBattleSettings()` - 戦闘設定更新
- `calculateDamage()` - ダメージ再計算
- `getBarChartData()` - 棒グラフデータ生成

**パフォーマンス最適化:**
- lodash-es debounceによる入力遅延（100ms）
- 頻繁な計算の実行頻度を抑制
- 細粒度のセレクター購読サポート

**保守性改善:**
- GAME_CONSTANTSによるデフォルト値管理
- ROUNDING_MODESによる端数処理モード定義

---

### **ビジネスロジック**

#### `utils/damageCalculator.ts`
ダメージ計算の核心ロジック

**計算式:**
```
最終ダメージ = (総攻撃力 - 防御力) × スキル威力(%) × 属性倍率 × 会心倍率 × ヒット数

会心倍率 = 1.5 + 会心強化%
属性倍率 = 1.25 + 属性強化% (有利時のみ)
```

**出力:**
- 4パターンのダメージ値
- 5ステップの計算過程詳細

**保守性改善:**
- GAME_CONSTANTSによるマジックナンバー排除
- 入力値バリデーションの追加
- カスタムエラークラスによるエラーハンドリング
- logger.tsによる詳細なデバッグログ

**エラー処理:**
- InvalidInputError: 不正な入力値検出
- CalculationOutOfRangeError: 範囲外の値検出
- validateInput: 型チェック、範囲チェック、正数チェック

---

### **ユーティリティ**

#### `utils/logger.ts`
ロギングユーティリティ

**機能:**
- 環境別ログレベル制御（開発時のみ詳細ログ出力）
- debug, info, warn, error メソッド
- 計算過程のトレーシング

**使用例:**
```typescript
logger.debug('🔍 ダメージ計算開始');
logger.error('入力値検証エラー:', error);
```

#### `utils/formatters.ts`
数値フォーマット関数（重複コード削除）

**関数:**
- `formatNumber(value)`: 整数カンマ区切り
- `formatNumberWithDecimals(value, decimals)`: 小数点付き
- `formatPercentage(value, decimals)`: パーセント表示
- `formatDamage(value)`: ダメージ値表示

**導入効果:**
- DamageResults.tsxとDetailsDialog.tsxの重複formatNumber削除
- 一貫したフォーマットロジック

#### `utils/errors.ts`
エラーハンドリング・バリデーション

**カスタムエラークラス:**
- `DamageCalculationError`: 基底エラークラス
- `InvalidInputError`: 不正入力エラー
- `CalculationOutOfRangeError`: 範囲外エラー

**バリデーションヘルパー:**
- `validateInput.isInRange()`: 範囲チェック
- `validateInput.isValidNumber()`: 数値型チェック
- `validateInput.isPositive()`: 正数チェック

**使用箇所:**
- damageCalculator.tsの入力値検証

---

### **定数定義**

#### `constants/gameConstants.ts`
ゲーム定数の一元管理

**定義内容:**
```typescript
export const GAME_CONSTANTS = {
  SKILL_LEVEL: { MIN: 1, MAX: 15 },
  DAMAGE_MULTIPLIERS: {
    CRITICAL_BASE: 1.5,
    ADVANTAGE_BASE: 1.25,
  },
  ATTACK_POWER: { DEFAULT: 1000, MIN: 0, MAX: 1000000 },
  SKILL_POWER: { DEFAULT: 100, MIN: 0, MAX: 10000, PERCENT_DIVISOR: 100 },
  HIT_COUNT: { DEFAULT: 1, MIN: 1, MAX: 20 },
  BONUS: { CRITICAL_MAX: 1000, ADVANTAGE_MAX: 1000, STEP: 0.01 },
  DEFENSE: { MIN: 0, MAX: 1000000, STEP: 10 },
} as const;

export const ROUNDING_MODES = {
  FLOOR: 'floor',
  CEIL: 'ceil',
  ROUND: 'round',
} as const;
```

**導入効果:**
- マジックナンバーの排除
- 一元的な定数管理
- 型安全性の向上（as const）

**使用箇所:**
- calculatorStore.ts: デフォルト値、範囲チェック
- damageCalculator.ts: 計算式の定数
- SettingsPanel.tsx: InputButtonのmin/max/step

---

### **国際化**

#### `utils/i18n.ts`
i18nextによる多言語対応

**対応言語:**
- 日本語（デフォルト）
- 英語
- 中国語

**翻訳カテゴリ:**
- アプリ全般
- キャラクター
- スキル
- 戦闘設定
- ダメージ結果
- 詳細設定
- UI共通
- エラーメッセージ

**翻訳構造:**
```typescript
{
  ja: { translation: { ... } },
  en: { translation: { ... } },
  zh: { translation: { ... } }
}
```

---

### **型定義**

#### `types/index.ts`
型定義エントリーポイント

**役割:**
- models.tsからビジネスロジック型を再エクスポート
- ストア型定義（AppState, CalculatorActions, CalculatorStore）
- 単一のインポート元を提供

#### `types/models.ts`
ビジネスロジック型定義（型分離）

**主要な型:**
- `AttributeType` - キャラクター属性
- `SkillType` - スキル種別（EX/AS/PS）
- `BattleSettings` - 戦闘設定
- `DamageResults` - ダメージ結果
- `CalculationSteps` - 計算過程
- `AdvancedSettings` - 高度な設定
- `BarChartData` - グラフデータ

**導入効果:**
- ビジネスロジック型とストア型の分離
- 型定義の見通し向上
- 循環参照の防止

---

### **データ**

#### `characterData.ts`
キャラクターとスキルのマスターデータ

**構造:**
```typescript
export interface Character {
  id: string;
  name: string;
  attribute: AttributeType;
  rarity: number;
  attack: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  power_lv1: number;
  power_lv15: number;
  hit_count?: number;
}
```

---

## 🎯 開発ワークフロー

### **開発コマンド**

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run typecheck

# リント
npm run lint
npm run lint:fix

# ビルド
npm run build

# プレビュー
npm run preview
```

### **コード品質チェック**

- **TypeScript**: 厳密な型チェック
- **ESLint**: React Hooks、React Refresh対応
- **コミットメッセージ**: Conventional Commits形式

---

## 🔧 設定ファイル

### **TypeScript設定**

#### `tsconfig.json`
プロジェクト全体のTypeScript設定
- `tsconfig.app.json`と`tsconfig.node.json`を参照

#### `tsconfig.app.json`
アプリケーション用のTypeScript設定
- `target: ES2020`
- `lib: ES2020, DOM, DOM.Iterable`
- 厳格な型チェック有効

#### `tsconfig.node.json`
Vite設定ファイル用のTypeScript設定

### **Vite設定**

#### `vite.config.ts`
```typescript
- React plugin
- Tailwind CSS plugin
- React Compiler (babel-plugin-react-compiler)
```

### **ESLint設定**

#### `eslint.config.js`
- TypeScript ESLint
- React Hooks ルール
- React Refresh ルール

---

## 📦 主要依存パッケージ

### **UI関連**
- `@radix-ui/*` - アクセシブルなUIプリミティブ
- `lucide-react` - アイコンライブラリ
- `recharts` - チャートライブラリ

### **ユーティリティ**
- `clsx` - クラス名結合
- `tailwind-merge` - Tailwindクラスマージ
- `class-variance-authority` - バリアント管理
- `lodash-es` - ユーティリティ関数（debounce）

### **開発ツール**
- `@vitejs/plugin-react` - React高速リフレッシュ
- `babel-plugin-react-compiler` - React Compiler
- `typescript-eslint` - TypeScript用ESLint

---

## 🚀 今後の拡張ポイント

### **現在未実装/計画中**
- キャラクターアイコン画像の読み込み
- スキル選択機能の再有効化（現在は手動入力のみ）
- 計算結果のアニメーション
- ローカルストレージへの設定保存
- PWA対応

### **改善候補**
- パフォーマンス最適化（メモ化、仮想化）→ **Phase 1で一部完了**
- テストの追加（Vitest、React Testing Library）
- アクセシビリティ強化
- エラーハンドリングの改善 → **Phase 2.4で完了**

---

## 📝 メモ

### **重要な設計決定**
1. **状態管理**: Zustandを採用（Reduxより軽量、Context APIより高機能）
2. **国際化**: i18nextで日英中対応
3. **UI**: shadcn/uiで一貫性のあるデザイン
4. **計算ロジック**: ストアから分離して`utils/`に配置
5. **型安全性**: すべての状態・プロップスに型定義
6. **パフォーマンス**: debounce + React.memo + Zustandセレクター
7. **保守性**: 定数化 + 型分離 + 共通化 + エラーハンドリング

### **コーディング規約**
- コンポーネント名: PascalCase
- ファイル名: PascalCase（コンポーネント）、camelCase（ユーティリティ）
- フック: `use`プレフィックス
- 型定義: インターフェースを優先
- インポート順序: React → 外部ライブラリ → 内部モジュール → 型定義

---

**最終更新**: 2025-01-04
