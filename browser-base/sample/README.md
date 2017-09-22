# 診断型データ整合チェック（AdviceValidator）単体テストコード
診断型のデータ整合チェックの関数をテストする単体テストコードです。
テストフレームワークとして mocha と chai を使用しています。

## ファイルの説明
/test/plan/advice/validator
    ├── README.md : 本ドキュメント
    ├── config.js : テスト用のconfig.js
    ├── index.html  : ブラウザ用テスト実行ページ
    └── test.advice_validator.js  : テストコード本体
    
## 環境構築手順
### mocha のインストール
```
npm install mocha
```
### chaiのインストール
```
npm install chai
```
## テスト実行方法
ブラウザで index.html を表示します
