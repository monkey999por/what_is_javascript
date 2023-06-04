/**
 * Generics
 */
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

/**
 * keyof
 */

/*
■Tipes
/あああ/
@types/hogeとかは　{@link https://github.com/DefinitelyTyped/DefinitelyTyped}の機能らしい

これらの演算子は、型が消去された出力コードに存在する値に対して引き続き動作することに注意してください。

extends

typeof
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof
https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#handbook-content


declear

is

void型：
voidは関数が明示的に値を返さない場合に使用される型です。つまり、関数がreturnステートメントを持たないか、またはreturnの後に何も続かない場合、その関数の返り値の型はvoidです。voidは値そのものではなく、値の欠如を示す型で、それ自体が何かを表現することはありません。

never型：
一方、never型は関数が絶対に返らないことを示すために使用されます。これは、関数が常にエラーをスローするか、無限ループに陥るときなどです。つまり、never型の関数から制御が戻ることは決してありません。これはvoidとは対照的で、void型の関数は値を返さないものの、呼び出し元に制御を返すことがあります。

keyof
https://zenn.dev/oreo2990/articles/5f75eaa285f2f9#1-typeof%E6%BC%94%E7%AE%97%E5%AD%90
any
変数の使用前に型のチェックが不要
unknown
変数の使用前に型のチェックが必要

in
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in

[T in keyof X]: X[T]

keyof typeof


as
as const 
asserts x is T

instanceof
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof

infer


mapped type 

Intersection Types & 
union type  | 
leteral type





*/

// https://tech.mobilefactory.jp/entry/2021/12/02/000000
type A = {
  name: string;
};

type B = {
  id: number;
};
type C = Required<A & B>;

function cFun(params: C): void {}
