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

