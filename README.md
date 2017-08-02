# Javascriptユニットテストコードサンプル（※ES6対応）
## 単体テストを行なう意義・目的

- 繰り返し手動テストを行なう手間を省力する（検証工数の削減）

  同じテストを手動で何度も行なうコストを削減できる。

- 確実なテストを行なう（機能品質の担保）

  手動テストで発生する人的なミスやテスト漏れなどをリスクを低減する。

- プログラムコードの品質を向上させる（保守性の担保）

　実装者が「テスト可能な（testable）コード」を意識することで、適切な粒度・責務に分割されたコードになり、メンテナンス性の向上が期待できる。

 
## 環境構築

### 使用するフレームワーク

- テスティングフレームワーク: `mocha`

  テストの基本機能（describe, it等）を提供します。
  
- アサーションライブラリ:  `assert`

  テスト評価部分のAPI（assert, equalメソッド等）を提供します。
  
- テストランナー： `karma`

  CUIコマンドだけで、ブラウザを使ってテストを動かしてくれるツールです。
  ブラウザで動かすためにはbrowserifyなどの前処理も必要ですが、このような前処理の機能も提供してくれます。

- テストダブル： `sinon`

  テスト対象が依存しているモジュールやリソースの代役を務めてくれるライブラリです。
  例）ajax通信におけるサーバ、

### 選定基準

- 導入が容易であること
- ブラウザでのテスト（DOM操作系のテスト）が可能であること
- jQueryを使用するケースのテストが容易であること

代替のフレームワークとして新しいjestも検討候補に挙がったが、jestはいわゆるオールインワンのフレームワークで、上述のテスティングフレームワーク、アサーション機能、テストランナー、テストダブルの機能が全部jestのみで揃うため、導入の容易さについてはjestが最も優れている印象だった。
だだし、一方でReactなどを利用したコンポーネントベースの実装を前提としている部分が大きく、jQueryベースでDOMを操作する実装のテストには不向きであることから採用を見送ることとした。
jQueryを利用するシーンはまだまだ多いことを鑑みて、jQueryを使用したDOM操作を行なう実装でのテストを行なうことを想定し、上記のフレームーワークを組合せた構成を選定した。
逆に、ReactやAngularなどのコンポーネント思考の新しいフレームワークを利用した実装が前提なら、jestの利用が第1候補になる印象。

### インストール

1. 必要npmモジュールのインストール

```
npm install
```

2. .babelrcの作成（ES6用）

```.babelrc
{
    "presets": ["es2015"],
}
```

3. npmコマンドでのテスト実行設定（package.json）

```package.json
// test コマンドにkarmaの実行コマンドを設定します
"scripts": {
    "test": "$(npm bin)/karma start"
},
```

### テストの実行

下記のコマンドでテストを実行できます

```
npm test
```

ターミナルに以下のようにテスト結果が表示されればテスト成功です。

![./img/npm-test.png](./img/npm-test.png)

----


## サンプルコードのディレクトリ構成

#### テスト対象コードサンプル（Sample.js）
```
import $ from 'jquery';

export default class Sample {
  
  constructor() {
    
  }
  
  /**
   * 通常のfunction
   */
  addNumber(num1, num2) {
    return num1 + num2;
  }
  
  /**
   *  DOMを操作するfunction
   */
  appendList(container, text) {
    let li = document.createElement('li');
    li.textContent = text;
    container.appendChild(li);
  }
  
  /**
   *  jQueryを使うfunctionのテスト
   */
  showMessage(container, message) {
    $(container).text(message);
  }
  
  
  /**
   *  setTimeoutを使用するfuntion
   *    メッセージを表示し一定時間後に消します
   */
  timeoutMessage(container, message, timeout) {
    container.textContent = message;
    
    setTimeout(function() {
      container.textContent = '';
    }, timeout);
  }
  
  /**
   *  ajaxを使用するfunction
   */
  loadServerHTML(container, url) {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 1) {
        // openしたらloading表示
        container.innerHTML = 'loading...';
      } else if (xhr.readyState === 4) {
        // 取得したHTMLを表示
        container.innerHTML = xhr.responseText;
      }
    };
    
    xhr.open('GET', url);
    xhr.send();
    
  }
  
}

```

## テストコードパターン

### 1. 通常の関数のテスト

#### テスト対象コード

```
/**
 * 通常のfunction
 */
addNumber(num1, num2) {
  return num1 + num2;
}
```

##### テストコード

```
// 単体functionのテスト
describe('通常の関数のテスト',function() {
  it('addNumber', function() {
    
    // ここで関数を実行して期待値をassert.equalメソッドでテストする
    assert.equal(sample.addNumber(1, 2), 3, '1 + 2 = 3');
    assert.equal(sample.addNumber(10, -2), 8, '10 + -2 = 8');
  })
});
```

### ポイント

`assert.equal`の第1引数にテスト対象コードを実行、第2引数に期待値を記述する


### 2. DOM操作を行なう関数のテスト（jQuery非使用）

#### テスト対象コード

```
/**
 *  DOMを操作するfunction
 */
appendList(container, text) {
  let li = document.createElement('li');
  li.textContent = text;
  container.appendChild(li);
}
```

#### テストコード

```
// DOM操作を行なうfunctionのテスト
describe('DOM操作を行なうfunctionのテスト', function() {
  it('appendList', function() {
    
    // テスト用HTMLのロード
    document.body.innerHTML = __html__['src/js/test/html/append-list.test.html'];
    
    let container = document.querySelector('.list');
    
    assert.equal(container.children.length, 0, '最初は0件');
    
    // テスト対象のファンクションを実行
    sample.appendList(container, 'リスト1');
    
    assert.equal(container.children.length, 1, '件数が1件に')
    assert.equal(container.children[0].textContent, 'リスト1', '1件目のテキストが追加したテキストになっている');
    
    // テスト対象のファンクションを実行
    sample.appendList(container, 'リスト2');
    
    assert.equal(container.children.length, 2, '件数が2件に')
    assert.equal(container.children[0].textContent, 'リスト1', '1件目のテキストはそのまま');
    assert.equal(container.children[1].textContent, 'リスト2', '2件目のテキストは指定したものに');
    
  })
  
});
```

### ポイント
- `karma-html2js-preprocessor`を使用してテスト用のHTMLをロードする（外部ファイルのHTMLをロードすることが可能）

```
// テスト用HTMLのロード
document.body.innerHTML = __html__['src/js/test/html/append-list.test.html'];
```

`assert.equal`の第1引数にテスト対象コードを実行、第2引数に期待値を記述する

### 3. DOM操作を行なう関数のテスト（jQuery使用）

#### テスト対象コード

```
/**
 *  jQueryを使うfunctionのテスト
 */
showMessage(container, message) {
  $(container).text(message);
}
```

#### テストコード

```
// jQueryを使うfunctionのテスト
describe('jQueryを使うfunctionのテスト', function() {
  it('showMessage', function() {
    
    // テスト用HTMLのロード
    document.body.innerHTML = __html__['src/js/test/html/jquery.test.html'];
    
    assert.equal($('#message').text(), '', '最初はテキストなし');
    
    sample.showMessage($('#message'), 'Hello');
    
    assert.equal($('#message').text(), 'Hello', 'テキストが表示されている');
  });
});
```

### ポイント

- jQueryをインポートすることでテストコード内でもjQueryが利用できる

```
import $ from 'jquery';
```

### 4. setTimeoutなどtimerを使用する関数のテスト

#### テスト対象コード

```
/**
 *  setTimeoutを使用するfuntion
 *    メッセージを表示し一定時間後に消します
 */
timeoutMessage(container, message, timeout) {
  container.textContent = message;
  
  setTimeout(function() {
    container.textContent = '';
  }, timeout);
}
```

#### テストコード

```
// setTimeoutなどtimerを使用する関数のテスト
describe('setTimeoutなどtimerを使用する関数のテスト', function() {
  it('timeoutMessage', function() {
    
    // テスト用HTMLのロード
    document.body.innerHTML = __html__['src/js/test/html/timeout-message.test.html'];
    
    // useFakeTimersを使うことで、JS上の時間がストップする
    let clock = sinon.useFakeTimers();
    
    let container = document.querySelector('.js-timeout-message');

    // 3秒間メッセージを表示するようにする
    sample.timeoutMessage(container, 'メッセージ', 3000);
    assert.equal(container.textContent, 'メッセージ', '指定した文章が表示');

    // tickを利用することで、時間を経過させることができる
    clock.tick(1000);
    assert.equal(container.textContent, 'メッセージ', '1000ms後も表示中');

    clock.tick(2500);
    assert.equal(container.textContent, '', '3500ms後はきえる');

    // restoreを使うことで、時間を通常に戻すことができる
    clock.restore();
  });
});
```

### ポイント

- sinon.jsのfake機能を使用することでタイマー（時間の経過）を擬似的に実現する

```
// useFakeTimersを使うことで、JS上の時間がストップする
let clock = sinon.useFakeTimers();
```

```
// tickを利用することで、時間を経過させることができる
clock.tick(1000);
```

```
// restoreを使うことで、時間を通常に戻すことができる
clock.restore();
```


### 5. ajaxを使用する関数のテスト

### テスト対象

```
/**
 *  ajaxを使用するfunction
 */
loadServerHTML(container, url) {
  let xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 1) {
      // openしたらloading表示
      container.innerHTML = 'loading...';
    } else if (xhr.readyState === 4) {
      // 取得したHTMLを表示
      container.innerHTML = xhr.responseText;
    }
  };
  
  xhr.open('GET', url);
  xhr.send();
  
}
```

#### テストコード

```
// ajaxを使う関数のテスト
describe('ajaxを使う関数のテスト', function() {
  it('loadServerHTML', function() {
    document.body.innerHTML = __html__['src/js/test/html/load-server-html.test.html'];

    // XMLHttpRequestの処理をフェイクして、
    // 配信サーバのように動くオブジェクトを作成する
    let server = sinon.fakeServer.create();

    let container = document.querySelector('.js-container');

    assert.equal(container.innerHTML, '', '最初は何も存在しない');

    // loadServerHTMLを実行すると、最初はloading状態にになるはず
    sample.loadServerHTML(container, '/path/to/server_html');
    assert.equal(container.innerHTML, 'loading...', 'リクエストを送ったら中身がloadingに');

    // サーバがレスポンスを返したらHTMLが表示されるはず
    // fakeServerを用いて以下のように書ける
    server.respondWith([
      200, { "Content-Type": "text/html" }, '<p>サーバから返したHTMLです</p>'
    ]);
    server.respond();

    assert.equal(container.innerHTML, '<p>サーバから返したHTMLです</p>', '返ってきたHTMLがロードされる');

    // フェイクしていた処理を元に戻す
    server.restore();
  });
});
```

### ポイント

- sinon.jsのfake機能を使用してサーバ側の実装を疑似的に動作させる

```
// XMLHttpRequestの処理をフェイクして、
// 配信サーバのように動くオブジェクトを作成する
let server = sinon.fakeServer.create();
```

```
// サーバがレスポンスを返したらHTMLが表示されるはず
// fakeServerを用いて以下のように書ける
server.respondWith([
  200, { "Content-Type": "text/html" }, '<p>サーバから返したHTMLです</p>'
]);
server.respond();
```

```
// フェイクしていた処理を元に戻す
server.restore();
```


## テスト用の設定ファイル（karma.conf.js）

### 主な設定値
- 使用するフレームワーク

本サンプルではmochaとbrowserifyを使用

```
// frameworks to use
// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
frameworks: ['mocha', 'browserify'],
```

- テストコードのJSファイルの指定

```
// list of files / patterns to load in the browser
files: [
  'src/js/test/*.js',
  'src/js/test/html/*.html',
],
```

- テストを実施する前の事前処理の指定

本サンプルではES6からブラウザで実行可能な形に変換するbrowserifyと、HTMLファイルをJS内にロードするhtml2jsを使用

```
// preprocess matching files before serving them to the browser
// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
preprocessors: {
  'src/js/test/*.js': ['browserify'],
  'src/js/test/html/*.html': ['html2js']
},
```

- テスト結果の表示スタイル

デフォルトは`progress`だが、本サンプルではより見やすい出力にするために`karma-mocha-reporter`を使用している

```
// test results reporter to use
// possible values: 'dots', 'progress'
// available reporters: https://npmjs.org/browse/keyword/karma-reporter
// reporters: ['progress'],
reporters:  ['mocha'],
```

- ログレベルの指定

```
// level of logging
// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
// logLevel: config.LOG_INFO,
```

- 自動監視のON/OFF

```
// enable / disable watching file and executing tests whenever any file changes
autoWatch: true,
```

- karmaで使用するブラウザ

複数指定することで、複数ブラウザでの同時実行テストも可能。

```
// start these $s
// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
browsers: ['Chrome'],
```



## 参考資料

## 一から始めるJavaScriptユニットテスト
http://developer.hatenastaff.com/entry/2016/12/05/102351

## フロントエンドユニットテスト
https://github.com/takahashiakira/tech_for_web/wiki/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%83%A6%E3%83%8B%E3%83%83%E3%83%88%E3%83%86%E3%82%B9%E3%83%88

### 追加

- karmaの出力を見やすくする
npm install karma-mocha-reporter --save-dev 

- jqueryを使うfunctionのテスト
npm install --save-dev jquery
 

## mocha ブラウザベースのテスト
http://d.hatena.ne.jp/Kazuhira/20160307/1457337741

## karma でexportなし
http://qiita.com/hosomichi/items/311e3eac4f55183b62c2