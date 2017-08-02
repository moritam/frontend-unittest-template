# Jestによるテストコードサンプル一式

## Jestの特徴

JestはFacebookが公開しているJavaScriptの単体テスト用フレームワーク

- テスト用フォルダーから自動的にテストスイート(テスト用の設定ファイル)を見つけて実行する
- テストを実行するときに、自動的に依存関係をモックで解決する
- 非同期のテストを同期的に実行する
- jsdomを利用して、擬似的なDOMを実装してテストを実行する。（コマンドラインでDOM操作のテストができる）

アサーションライブラリやテストランナー、テストダブル（スタブ）などの色々なテストツールを組み合わせる必要がなく jest のインストールのみで単体テストの実行環境が整う。
これまでは、このツール選択や環境構築がJavascriptテスト導入の敷居になっているため、Jestの全部入りで導入が手軽な点はメリットと言える。

# 環境構築
基本的にjestさえあればテスト環境が整う

1. jestのインストール
npm install -D jest

2. package.jsonの追加
npm init

```package.json
{
  ･･･
  "scripts": {
    "test": "jest"
  },
  ･･･
}
```

3. ES6を使用する場合（Babelを使用する場合）

npm install -D babel-preset-es2015 babel-jest babel-polyfill

```.babelrc
{
  "presets": ["es2015"]
}
```
