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