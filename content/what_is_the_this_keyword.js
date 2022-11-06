/**
 * 'this'について（https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this）
 * javascriptのthisはコンテキストによって意味が異なるので
 * 
 * 
 */

/**
 * global context
 *  */ 
// 'this'はグローバルオブジェクト（例：）を参照する。
console.log(this === window); // ※ブラウザ環境の場合 true

// var：関数スコープまたはグローバルスコープの変数を宣言
var a = 11;
// let : ブロックスコープのローカル変数
let b = 12;
// const : ブロックスコープのローカル変数
const c = 13;

this.d = 14

console.log(window.a);
console.log(window.b);
console.log(window.c);

console.log(globalThis); // Window
console.log(globalThis === this); // true

/**
 * function context
 */
function fc() {
    return this;
}
console.log(fc() === this);  // true
console.log(fc() === window);  // true

function fc2() {
    'use strict';
    return this;
}
console.log(fc2() === undefined); // true

/**
 * class context
 */
class Cc {
    constructor(){
        const proto = Object.getPrototypeOf(this);
        console.log(Object.getOwnPropertyNames(proto));
    }
    first(){};
    second(){};
    static third(){};
}

new Cc(); // ['constructor', 'first', 'second']
// ※静的メソッドは this のプロパティではありません。クラス自身のプロパティです。


