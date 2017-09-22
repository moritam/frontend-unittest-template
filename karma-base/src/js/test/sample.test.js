import assert from 'assert';
import sinon from 'sinon';
import $ from 'jquery';
import Sample from '../Sample';

let sample = new Sample();

// 単体functionのテスト
describe('通常の関数のテスト',function() {
  it('addNumber', function() {
    assert.equal(sample.addNumber(1, 2), 3, '1 + 2 = 3');
    assert.equal(sample.addNumber(10, -2), 8, '10 + -2 = 8');
  })
});

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