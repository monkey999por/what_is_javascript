// これいいぞ
// https://www.tohoho-web.com/js/
// https://developer.mozilla.org/ja/docs/Web/JavaScript
// これはECMAのドラフト？なのかな
// https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

// ■基本
// ・大文字小文字を区別

// ■ 変数宣言
// var：変数名重複あり、ブロックスコープを無視 ※varは基本的にスコープがくそすぎるので使用禁止
// let ：変数名重複なし、ブロックスコープが有効 ES2015
// const: 定数

// ■配列 
const array = ['123', 'test']
// 他の方法
const ar = Array(10); // result : (10) [empty × 10] ※この場合、10を要素に持った長さ1の配列ではなく、要素が空の長さ10の配列が生成される
const arr = [10]; // result [10] 10という要素が一つの長さ1の配列
// 以上のことから、配列を作るときは[]リテラルを使用すること。Arrayだと意図しないような動きになるので。
console.log(typeof ar); // object
console.log(typeof arr); // object
console.log(Array.isArray(ar)); // true
console.log(Array.isArray(arr)); // true

console.log(typeof ['test', 'yy']); //object
console.log([123, 456, 789][0]); // 123
console.log([123, 456, 789][1]); // 456

// ■オブジェクト
const obj = {
    x: 123,
    y: 'test',
    z: {
        test: 'dummy'
    }
}
console.log(typeof obj); //object
console.log(obj.x); // 123    ※ドット構文
console.log(obj['y']); // y   ※ブラケット構文

// ■定数の注意点
const A = [1, 2, 3];
//A = [] // NG
A[1] = 123 // OK

// ■演算子いろいろ
console.log(typeof 123); // number
console.log(typeof 'test'); // string
class Dummy { }
console.log(typeof new Dummy); // object

console.log(new Dummy instanceof Dummy); // true
console.log('123' instanceof String); // false


// ■分割代入 ES2015
const values = ['test', 'hoge', 'fuga', 'monkey'];
const [a, b, c, d] = values;
console.log(a); // test
console.log(d); // monkey

const [first, ...other] = values;
console.log(first); // test
console.log(other); // ['hoge', 'fuga', 'monkey']

// ■文字列
"test", 'test', `test` // テンプレートリテラル。
const variable = '999';
console.log(`test${variable}test`); // 変数埋め込みは

// ■for in
// "loop with object key",
//     "※オブジェクトのキーを列挙するときに使う。主にはデバッグ用らしい",
//     "※要素の順番を保証しない",
//     "※配列の列挙には使用しないこと。",
// expected output:
// "a: 1"
// "b: 2"
// "c: 3"
const object = { a: 1, b: 2, c: 3 };
for (const property in object) {
    console.log(`${property}: ${object[property]}`);
}

// ■forof
// loop for iterable object
// expected output: "a"
// expected output: "b"
// expected output: "c" 
const array1 = ['a', 'b', 'c'];
for (const element of array1) {
    console.log(element);
}

// ■try catch
// ※オーバーヘッドが高いのでforループの中で使ったりしないこと
// output: 
// "Error"
// "final"
try {
	throw new Error('oops');
} catch (e) {
	if (e instanceof Error) {
		console.log('Error');
	} else {
		console.log('not Error');
		throw e
	}
} finally {
	console.log('final');
}

// ■new : instanceを作成
// const name = new type(arguments);
// クラスの場合
class DClass {
    value = 0;
    constructor(param) {
        this.value = param;
    }
    add(num) {
        if (num != null && num != null)
            this.value += num
        console.log(this.value);
    }
}

const d1 = new DClass(5);
d1.add();// 5
d1.add(100);// 105
const d2 = new DClass(10);
d2.add(2); // 12
d1.add(100);// 205
d2.add(10);// 22

// Functionの場合
function Fn(str) {
    this.str = str;
    this.f = (s) => console.log(this.str + s);
}

const f1 = new Fn('f1');
f1.f(' f1 add') // "f1 f1 add"
const f2 = new Fn('f2');
f2.f(' f2 add') // "f2 f2 add"

// これはできないっぽい
const Obj = {
    x: 123,
    y: 456
}
// できない
// const ob = new Obj();
// これもダメっぽい？なんでだろう
// const name = new Math(); // Math is not a constructor

// 余談：プロトタイプ(prototype)について
// こんなことも可能:　プロトタイプのメソッドの書き換え。
// https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Object_prototypes
DClass.prototype.valueOf = function(){console.log('kakikae')}
d1.valueOf() // kakikae
d2.valueOf() // kakikae

// ■Symbol javascript組み込みオブジェクト（StringとかNumberとかと同列。こいつだけ概念が他の言語にないので書いとく）
// https://qiita.com/naruto/items/312adeb6145eb6221be7
let Sym1 = Symbol("Sym")
let Sym2 = Symbol("Sym")
// 一旦作ったシンボルは、それ自身とのみ等しくなる。
console.log(Sym1 === Sym2) // false
console.log(Sym1 === Sym1); // true

// ■any function
// 関数定義方法いろいろ
// function命令
function basicFn(params) {
    console.log(params);
}
basicFn('basic'); // basic
// Function constructor ※基本的にこの形。まず使うことはない
const FuncCon = new Function('base', 'height', 'return base * height;');
console.log(FuncCon(10, 5)); // 50

// 関数リテラル
// 内部的には1.匿名関数を定義, 2.変数に代入　の流れらしい
const fnLiteral = function (params) {
    console.log(params);
}
fnLiteral('fnLiteral'); // fnLiteral

// arrow function
// 他の関数定義との違いとして、thisが固定される（？）
// 例えばこんな感じの違い
// 1. 
// document.addEventListener('DOMContentLoaded', () => {
//     let input_zone = document.getElementById('inputs');
//     input_zone.addEventListener('click', function () {
//         console.log(this); // ★input_zoneが取れる
//         this.classList.toggle('black');
//     }, false);
// }, false);

// 2. 
// document.addEventListener('DOMContentLoaded', () => {
//     let input_zone = document.getElementById('inputs');
//     input_zone.addEventListener('mouseover', () => {
//         console.log(this); // ★Windowがとれる　windowってなに・・
//     }, false);
// }, false);
const arrowFn = (args) => {
    console.log(args);
};
arrowFn('arrowFn'); // arrowFn

console.log(typeof basicFn); // function
console.log(typeof FuncCon); // function
console.log(typeof fnLiteral); // function
console.log(typeof arrowFn); // function

console.log(basicFn instanceof Function); // true
console.log(FuncCon instanceof Function); // true
console.log(fnLiteral instanceof Function); // true
console.log(arrowFn instanceof Function); // true

// 引数の参照について
let value = 123
let refvalue = { x: 123, y: 456 };
// 即時関数（定義と同時に実行）
(function (val, refval) {
    val = 000
    refval.x = 999
}(value, refvalue));

console.log(value); // 123 ※基本データ型の場合
console.log(refvalue); // 999　※参照型

// 可変長引数 Argumentsオブジェクト
function test(){
    console.log(`arguments.length : ${arguments.length}`); // 4
    for (const iterator of arguments) {
        console.log(iterator); 
    }
}
test(1,2,3,4);// 1,2,3,4

// 名前付き引数 関数呼び出し時に引数名を明記
// メリット：呼び出し時に引数の順番を変えて呼び出せる（中間の引数だけに値を与えることも可能
function show({name = '設定されていません', age = 0}){
    console.log('名前　' + name);   // 名前　Lowell
    console.log('年齢　' + age);    // 年齢　34
}
show({age : 34, name : 'Lowell'});

// default arguments
function defaultArgs(param = 10) {
    console.log(param); 
}
defaultArgs() // 10
defaultArgs(99) // 99
// こんなこともできる
function da(param = 5, nextParam = param){
    console.log(param); 
    console.log(nextParam);
}

da() // 5; 5;
da(10) // 10;10;
da(1,2) // 1; 2;

//-------------まだあと
// name?　みたいなやつ　オプショナルチェーン
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining

// 関数の引数は未指定の場合はundefinedが自動で渡される。エラーにはならない。
// オーバーロード的なことはできない　：Identifier 'testa' has already been declared (at main.js:16:1)
// function testa(p1) {
//     console.log(p1);
    
// }

// function testa(p1,p2) {
//     console.log(p1);
//     console.log(p2);  
// }

// この辺の組み込みオブジェクトは後で見とく 3章当たり
// Array,Map,Set,Date,Math,RegExp,Object,Promise






