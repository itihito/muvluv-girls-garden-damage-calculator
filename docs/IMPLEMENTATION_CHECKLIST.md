# 🎮 ダメージ計算機 実装チェックリスト

## 📋 プロジェクト現状分析

### ✅ 完了済み項目
- [x] React 18 + TypeScript + Vite プロジェクト構築
- [x] Tailwind CSS 導入・設定完了
- [x] shadcn/ui セットアップ（Button コンポーネント追加済み）
- [x] キャラクターデータ定義（Character/Skill型, 28キャラクター）
- [x] 詳細実装計画書作成完了（docs/IMPLEMENTATION_PLAN.md）

### 📁 現在のファイル構造
```
src/
├── components/
│   └── ui/
│       └── button.tsx          # shadcn/ui Button
├── lib/
│   ├── utils.ts               # shadcn/ui ユーティリティ
│   └── button-variants.ts     # Button バリアント
├── characterData.ts           # キャラクター・スキルデータ
├── App.tsx                    # メインアプリ（基本的なテスト）
├── main.tsx                   # エントリーポイント
└── index.css                  # Tailwind CSS
```

---

## 🎯 Phase 1: 必須コンポーネント・依存関係追加

### 1.1 shadcn/ui コンポーネント追加
実行コマンド: `npx shadcn@latest add [コンポーネント名]`

- [ ] **tabs** - 属性フィルター用
  ```bash
  npx shadcn@latest add tabs
  ```
- [ ] **card** - レイアウト構造用
  ```bash
  npx shadcn@latest add card
  ```
- [ ] **input** - 数値入力用
  ```bash
  npx shadcn@latest add input
  ```
- [ ] **switch** - 手動入力モード切替用
  ```bash
  npx shadcn@latest add switch
  ```
- [ ] **dialog** - 詳細設定用
  ```bash
  npx shadcn@latest add dialog
  ```
- [ ] **slider** - スライダー入力用
  ```bash
  npx shadcn@latest add slider
  ```
- [ ] **label** - ラベル表示用
  ```bash
  npx shadcn@latest add label
  ```

### 1.2 npm依存関係追加
- [ ] **Zustand** - 状態管理
  ```bash
  npm install zustand
  ```
- [ ] **Recharts** - チャート表示
  ```bash
  npm install recharts
  ```
- [ ] **react-i18next** - 多言語対応
  ```bash
  npm install react-i18next i18next
  ```
- [ ] **lucide-react** - 追加アイコン（既存確認）
  ```bash
  # 既にインストール済みを確認
  ```

---

## 🏗️ Phase 2: コア機能実装

### 2.1 型定義・ユーティリティ
- [ ] **src/types/index.ts** - 型定義ファイル作成
  - [ ] DamageResults 型
  - [ ] CalculationSteps 型
  - [ ] BattleSettings 型
  - [ ] AttributeType 型

### 2.2 状態管理構築
- [ ] **src/stores/calculatorStore.ts** - Zustand ストア作成
  - [ ] キャラクター選択状態
  - [ ] スキル選択・レベル設定
  - [ ] 手動入力モード管理
  - [ ] 戦闘設定（敵防御力、補正値）
  - [ ] 計算結果管理
  - [ ] アクション関数定義

### 2.3 ダメージ計算エンジン
- [ ] **src/utils/damageCalculator.ts** - 計算ロジック実装
  - [ ] Alterios式実装
  - [ ] 4パターン計算（通常、会心、有利、有利会心）
  - [ ] ヒット数対応
  - [ ] 計算過程記録機能

### 2.4 多言語設定
- [ ] **src/utils/i18n.ts** - i18next設定
  - [ ] 日本語・英語・中国語対応
  - [ ] 翻訳キー定義

---

## 🧩 Phase 3: カスタムコンポーネント作成

### 3.1 共通コンポーネント
- [ ] **src/components/InputButton.tsx** - スライダー+手動入力統合
  - [ ] Switch による入力モード切替
  - [ ] Slider と Input の統合UI
  - [ ] 値の同期処理

- [ ] **src/components/Rating.tsx** - スキルレベル選択（1-15）
  - [ ] 星型アイコン表示
  - [ ] クリック選択機能
  - [ ] 現在値ハイライト

### 3.2 メインコンポーネント
- [ ] **src/components/CharacterSelector.tsx** - キャラクター選択
  - [ ] 属性タブフィルター（6属性 + 全て）
  - [ ] キャラクターカード表示
  - [ ] 選択状態管理
  - [ ] レスポンシブグリッド

- [ ] **src/components/SkillPanel.tsx** - スキル設定
  - [ ] 選択キャラクターのスキル一覧
  - [ ] スキルレベル選択（Rating使用）
  - [ ] 手動スキル威力入力（InputButton使用）
  - [ ] スキルタイプ別表示

- [ ] **src/components/SettingsPanel.tsx** - 戦闘設定
  - [ ] 攻撃力設定（手動入力対応）
  - [ ] 敵防御力設定
  - [ ] 会心強化・属性強化設定
  - [ ] InputButton コンポーネント使用

### 3.3 結果表示コンポーネント
- [ ] **src/components/DamageResults.tsx** - ダメージ結果表示
  - [ ] 棒グラフ表示（Recharts使用）
  - [ ] 4パターンダメージ表示
  - [ ] 詳細設定ボタン配置
  - [ ] ダメージ値数値表示

- [ ] **src/components/DetailsDialog.tsx** - 詳細設定ダイアログ
  - [ ] 計算過程表示タブ
  - [ ] 高度な設定タブ
  - [ ] Dialog コンポーネント使用
  - [ ] Tabs 切替機能

---

## 📱 Phase 4: メインレイアウト構築

### 4.1 App.tsx リファクタリング
- [ ] **src/App.tsx** - メインレイアウト実装
  - [ ] ヘッダー（タイトル、言語切替）
  - [ ] 3カラムグリッドレイアウト
    - [ ] 左: キャラクター選択
    - [ ] 中央: スキル・設定パネル
    - [ ] 右: ダメージ結果
  - [ ] レスポンシブ対応（モバイル: 縦積み）
  - [ ] 状態管理統合

### 4.2 スタイリング調整
- [ ] **src/index.css** - グローバルスタイル調整
  - [ ] カスタムCSS変数
  - [ ] レスポンシブブレークポイント
  - [ ] ダークモード対応（オプション）

---

## 🌐 Phase 5: 多言語・最適化

### 5.1 国際化完全対応
- [ ] **翻訳ファイル作成**
  - [ ] public/locales/ja/translation.json
  - [ ] public/locales/en/translation.json
  - [ ] public/locales/zh/translation.json

- [ ] **言語切替コンポーネント**
  - [ ] src/components/LanguageSwitch.tsx
  - [ ] ヘッダーに配置

### 5.2 パフォーマンス最適化
- [ ] **React最適化**
  - [ ] React.memo 適用（重いコンポーネント）
  - [ ] useCallback/useMemo 最適化
  - [ ] 不要なレンダリング防止

- [ ] **画像・アセット最適化**
  - [ ] キャラクター画像遅延ロード
  - [ ] アイコン最適化
  - [ ] バンドルサイズ最適化

---

## 🚀 Phase 6: デプロイ準備

### 6.1 ビルド設定
- [ ] **vite.config.ts 更新**
  ```typescript
  export default defineConfig({
    plugins: [react()],
    base: '/damage-calc/',  // GitHub Pages用
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  })
  ```

- [ ] **GitHub Actions設定**
  - [ ] .github/workflows/deploy.yml 作成
  - [ ] 自動ビルド・デプロイ設定

### 6.2 品質管理
- [ ] **ESLint/TypeScript チェック**
  ```bash
  npm run lint
  npm run typecheck
  ```

- [ ] **ブラウザテスト**
  - [ ] Chrome デスクトップ
  - [ ] Chrome モバイル
  - [ ] レスポンシブデザイン確認

---

## 📊 進捗管理

### 完了予定ファイル構造
```
src/
├── components/
│   ├── ui/                    # shadcn/ui コンポーネント群
│   ├── CharacterSelector.tsx  # キャラクター選択
│   ├── SkillPanel.tsx         # スキル設定パネル
│   ├── SettingsPanel.tsx      # 戦闘設定パネル
│   ├── DamageResults.tsx      # ダメージ結果表示
│   ├── DetailsDialog.tsx      # 詳細設定ダイアログ
│   ├── InputButton.tsx        # カスタムスライダー入力
│   ├── Rating.tsx             # スキルレベル選択
│   └── LanguageSwitch.tsx     # 言語切替
├── stores/
│   └── calculatorStore.ts     # Zustand 状態管理
├── utils/
│   ├── damageCalculator.ts    # ダメージ計算エンジン
│   └── i18n.ts               # 多言語設定
├── types/
│   └── index.ts              # TypeScript 型定義
├── characterData.ts          # キャラクターデータ
└── App.tsx                   # メインアプリケーション
```

### 推定作業時間
- **Phase 1**: 1-2時間（コンポーネント・依存関係追加）
- **Phase 2**: 3-4時間（コア機能・状態管理）
- **Phase 3**: 6-8時間（コンポーネント実装）
- **Phase 4**: 2-3時間（レイアウト構築）
- **Phase 5**: 2-3時間（多言語・最適化）
- **Phase 6**: 1-2時間（デプロイ準備）

**総計**: 15-22時間

### 注意事項
- [ ] 各フェーズ完了後に `npm run dev` でテスト確認
- [ ] TypeScript エラーは随時解決
- [ ] コンポーネント単位でテスト実装
- [ ] Git コミットは機能単位で実行

---

## 🔗 関連ドキュメント
- [詳細実装計画書](./IMPLEMENTATION_PLAN.md) - 設計仕様・技術詳細
- [CLAUDE.md](../CLAUDE.md) - プロジェクト概要・開発ガイド