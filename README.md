# マブラヴ ガールズガーデン ダメージ計算機

ゲームのダメージ計算を行うWebアプリケーションです。

## 🚀 デプロイ

本プロジェクトはGitHub Pagesにデプロイされています。

- **本番URL**: https://itihito.github.io/muvluv-girls-garden-damage-calculator/

### 自動デプロイ

`prd`ブランチへのpush時に、GitHub Actionsが自動的にビルド＆デプロイを実行します。

```bash
# prdブランチにプッシュ
git push origin prd
```

デプロイ状況は [Actions](https://github.com/itihito/muvluv-girls-garden-damage-calculator/actions) タブで確認できます。

### 初回セットアップ

GitHub Pagesを有効化するには、リポジトリ設定で以下を実施してください：

1. リポジトリの **Settings** > **Pages** に移動
2. **Source** を **GitHub Actions** に設定

## 🛠️ 開発

### 必要環境

- Node.js 20.x 以上
- npm

### ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 型チェック
npm run typecheck

# リント
npm run lint
npm run lint:fix

# ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

### デプロイプレビュー

本番環境と同じbase pathでローカルプレビューする場合：

```bash
npm run deploy:preview
```

## 📦 技術スタック

- **フレームワーク**: React 19.1.1
- **言語**: TypeScript 5.8.3
- **ビルドツール**: Vite 7.1.7
- **状態管理**: Zustand 5.0.8
- **国際化**: i18next 25.5.2, react-i18next 16.0.0
- **UIライブラリ**: shadcn/ui (Radix UI)
- **スタイリング**: Tailwind CSS 4.1.13
- **チャート**: Recharts 3.2.1

## 📁 プロジェクト構造

詳細は [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md) を参照してください。

## 📝 開発ドキュメント

- [PLAN.md](./PLAN.md) - プロジェクト仕様書
- [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md) - ディレクトリ構造ドキュメント
- [docs/IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md) - 詳細実装計画書
- [CLAUDE.md](./CLAUDE.md) - Claude Code用プロジェクト説明

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
