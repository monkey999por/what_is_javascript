/**
 * 'this'について（https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this）
 * javascriptのthisはコンテキストによって意味が異なるので
 */

// ※いずれもブラウザで実行
// これはあんまり見ないほうがいいかも this意味わからん
/**
 * global context
 * 'this'はグローバルオブジェクトを参照する。
 *  */
console.log(this === window); // ※ブラウザ環境の場合 true

// var：関数スコープまたはグローバルスコープの変数を宣言
var a = 11; console.log(window.a); // 11 ※グローバルスコープ(=window)に設定しているため
// let : ブロックスコープのローカル変数
let b = 12; console.log(window.b); // undefined ※ブロックスコープが有効なため
// const : ブロックスコープのローカル変数
const c = 13; console.log(window.c); // undefined ※ブロックスコープが有効なため
// windowsにdを設定
this.d = 14; console.log(window.d); // 14 ※グローバルスコープ(=window)に設定しているため


// 余談：globalThis：これの解説が分かりやすい
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis
// どこから呼んでもglobalオブジェクトにアクセス
console.log(globalThis); // Window
(function () {
    console.log(globalThis); // Window
})();
class ClassGlobalThis {
    constructor(field) {
        this.field = field;
    }
    someMethod() {
        console.log(globalThis);
    }
    static stfunc() { console.log(globalThis); }
}
new ClassGlobalThis().someMethod(); // Window
ClassGlobalThis.stfunc(); // Window
console.log(globalThis === this); // true

/**
 * function context
 * これわかりやすい　https://qiita.com/mejileben/items/69e5facdb60781927929
 * function()の場合、呼び出された場所でthisが決まる
 * ただし、"use strict"の場合はundefined
 * アロー関数の場合は定義した場所でthisが決まる
 */

(function functhis() {
    console.log(this); // Window
})();
(function fc2() {
    "use strict";
    console.log(this); // undefined
})();
(() => { console.log(this); })(); // Window

var key = 'global_key';
const thisobj = {
    key: 'local_key',
    functhis() {
        console.log(this.key); // local_key
    },
    arrowthis: () => {console.log(this.key);} // global_key
};
thisobj.functhis();
thisobj.arrowthis(); 

class Thisc {
    constructor(){
        this.key = 'class_constructor_key'
        this.constructor_arrow_f = () => {console.log(this.key);};
    }
    aaa() {
        return () => {console.log(this.key);};
    }
}
new Thisc().constructor_arrow_f(); // class_constructor_key
new Thisc().aaa()(); // class_constructor_key


/**
 * class context
 */
class Cc {
    constructor() {
        this.a = 'aaa';
        const proto = Object.getPrototypeOf(this);
        console.log(Object.getOwnPropertyNames(proto));
    }
    first() {console.log(this.a); };
    second() { };
    static third() { console.log(this.a);};
}
// ※静的メソッドは this のプロパティではありません。クラス自身のプロパティです。z
const cc = new Cc(); // ['constructor', 'first', 'second']

// 基本的に生成されたインスタンス = thisだと思っとけばいい
cc.first(); // aaa
Cc.third(); // undefined