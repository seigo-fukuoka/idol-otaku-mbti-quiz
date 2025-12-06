# デプロイ手順

このプロジェクトをデプロイする方法を説明します。以下の3つの方法から選択できます。

## 方法1: Vercel（推奨・最も簡単）

VercelはGitHubと連携して自動デプロイが可能で、設定が簡単です。

### 手順

1. **Vercelにアカウント作成・ログイン**
   - https://vercel.com にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - ダッシュボードで「Add New...」→「Project」を選択
   - GitHubリポジトリ `seigo-fukuoka/idol-otaku-mbti-quiz` を選択
   - 「Import」をクリック

3. **ビルド設定（自動検出されるはずですが確認）**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **環境変数の設定（Supabaseを使用する場合）**
   - 「Environment Variables」セクションで以下を追加：
     - `VITE_SUPABASE_URL`: あなたのSupabaseプロジェクトURL
     - `VITE_SUPABASE_ANON_KEY`: あなたのSupabase Anon Key

5. **デプロイ**
   - 「Deploy」をクリック
   - 数分でデプロイが完了します
   - 自動的にURLが発行されます（例: `https://idol-otaku-mbti-quiz.vercel.app`）

6. **今後の自動デプロイ**
   - `main`ブランチにプッシュするたびに自動的にデプロイされます

---

## 方法2: Netlify

NetlifyもGitHubと連携して自動デプロイが可能です。

### 手順

1. **Netlifyにアカウント作成・ログイン**
   - https://www.netlify.com にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - 「Add new site」→「Import an existing project」を選択
   - GitHubリポジトリ `seigo-fukuoka/idol-otaku-mbti-quiz` を選択

3. **ビルド設定**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **環境変数の設定（Supabaseを使用する場合）**
   - 「Site settings」→「Environment variables」で以下を追加：
     - `VITE_SUPABASE_URL`: あなたのSupabaseプロジェクトURL
     - `VITE_SUPABASE_ANON_KEY`: あなたのSupabase Anon Key

5. **デプロイ**
   - 「Deploy site」をクリック
   - デプロイが完了するとURLが発行されます

---

## 方法3: GitHub Pages

GitHub Pagesは無料ですが、設定が少し複雑です。

### 手順

1. **vite.config.tsを更新**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/idol-otaku-mbti-quiz/', // リポジトリ名に合わせる
     optimizeDeps: {
       exclude: ['lucide-react'],
     },
   });
   ```

2. **GitHub Actionsのワークフローファイルを作成**
   - `.github/workflows/deploy.yml` を作成（下記参照）

3. **GitHubの設定**
   - リポジトリの「Settings」→「Pages」
   - Source: `GitHub Actions` を選択

4. **環境変数の設定（Supabaseを使用する場合）**
   - リポジトリの「Settings」→「Secrets and variables」→「Actions」
   - 以下を追加：
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **デプロイ**
   - `main`ブランチにプッシュすると自動的にデプロイされます

---

## ローカルでビルドをテストする

デプロイ前に、ローカルでビルドが正常に動作するか確認：

```bash
# ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

`http://localhost:4173` でプレビューできます。

---

## 環境変数について

Supabaseを使用する場合は、デプロイ先のプラットフォームで環境変数を設定してください：

- `VITE_SUPABASE_URL`: SupabaseプロジェクトのURL
- `VITE_SUPABASE_ANON_KEY`: Supabaseの匿名キー

環境変数が設定されていない場合でも、アプリは動作しますが、診断結果のログ保存機能は無効になります。

---

## トラブルシューティング

### ビルドエラーが発生する場合

1. ローカルで `npm run build` を実行してエラーを確認
2. TypeScriptの型エラーがないか確認: `npm run typecheck`
3. リンターエラーがないか確認: `npm run lint`

### デプロイ後、ページが真っ白になる場合

1. ブラウザの開発者ツール（F12）でコンソールエラーを確認
2. ネットワークタブで404エラーがないか確認
3. ビルドが正常に完了しているか確認

### 環境変数が反映されない場合

1. デプロイ先のプラットフォームで環境変数が正しく設定されているか確認
2. 環境変数名が `VITE_` で始まっているか確認（Viteの要件）
3. デプロイを再実行（環境変数を追加した後は再デプロイが必要）

