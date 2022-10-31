// ■基本
// ・大文字小文字を区別

// ■ 変数宣言
// var：変数名重複あり、ブロックスコープを無視
// let ：変数名重複なし、ブロックスコープが有効 ES2015
// const: 定数

// ■配列
['123','test']
console.log(typeof ['test','yy']); //object
console.log([123,456,789][0]); // 123
console.log([123,456,789][1]); // 456

// ■オブジェクト
const obj =  {
    x: 123,
    y: 'test',
    z: {
        test:'dummy'
    }
}
console.log(typeof obj); //object
console.log(obj.x); // 123    ※ドット構文
console.log(obj['y']); // y   ※ブラケット構文

// ■定数の注意点
const A = [1,2,3];
A = [] // NG
A[1] = 123 // OK

// ■演算子いろいろ
console.log(typeof 123); // number
console.log(typeof 'test'); // string
class Dummy{}
console.log(typeof new Dummy); // object

console.log(new Dummy instanceof Dummy); // true
console.log('123' instanceof String); // false


// ■分割代入 ES2015
const values =  ['test','hoge','fuga','monkey'];
const [a,b,c,d] = values;
console.log(a); // test
console.log(d); // monkey

const [first, ...other] = values;
console.log(first); // test
console.log(other); // ['hoge', 'fuga', 'monkey']

// ■文字列
"test", 'test', `test` // テンプレートリテラル。
const variable = '999';
console.log(`test${variable}test`); // 変数埋め込みは








