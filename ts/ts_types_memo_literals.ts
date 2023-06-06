import { Simple } from "./ts_types_memo_practice";
// 目次
// ■1.基本的な書き方 namespace Basic
// ■2.応用的な書き方 namespace Advance
namespace Basic {
  /**
   * Generics
   *
   */
  const A = <T>(param: T) => {
    return;
  };

  /**
   * keyof {object or type}
   * 出力: キーの文字列または数値リテラル結合(= Union type)
   */
  type A = { objkey: string };
  type B = { typekey: string };
  type C = Simple<keyof A | keyof B>; // "objkey" | "typekey";

  /**
   * typeof {変数}
   * 出力: 型リテラル文字列
   * ※objectの場合は"object"となるが、内部的には"object"構造を持っていそう？だからkeyof typeof objでキーが取り出せる？
   *
   */
  const valA: Simple<A & B> = { objkey: "", typekey: "test" };
  const typeofVal = typeof valA; // object

  /**
   * extends
   * 要は子に親が含まれるかをチェックする
   *
   * QA. instanceofとの違いは？
   * extends →クラスの継承またはジェネリック型の制約を定義するために使用されます。これは型（コンパイル時の型）の情報を確認するために使用されます。
   * instanceof →行時にオブジェクトが特定のクラスのインスタンスであるかを確認するために使用されるjavaScriptの演算子
   *
   *
   * Conditional Types
   * 要はこんな感じで条件を付けた型定義
   *
   */
  type D = Simple<B & A>;
  type ConditionalTypes = D extends A ? string : number; // string
  /**
   * infer
   */
  function inferFunc(params: A) {}
  type Ret = ReturnType<typeof inferFunc>;

  type Id<T> = T extends { id: infer R } ? R : never;
  type hasID = Id<{ id: string }>; // string
  type noID = Id<{ name: string }>; // never

  /**
   * in
   * 指定されたプロパティが指定されたオブジェクトにあればtrue
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in
   */
  const inResult = "objkey" in A; // true

  /**
   * Indexed Access Types
   * 配列みたいに[key]でアクセス
   * https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
   *
   */
  type IndexedAccessType = { age: number; name: string; alive: boolean };
  type Age = IndexedAccessType["age"]; // number

  /**
   * mapped type
   * 要は任意のキーを指定できるオブジェクト
   */
  type MappedType = {
    [key: string]: number;
  };

  // この書き方の場合は、inがtrueを返せばキーとしてOKらしい
  type MappedTypeWidhGeneric<T> = {
    [P in keyof T]: T[P];
  };
  const mappedObj: Simple<MappedTypeWidhGeneric<A>> = {
    objkey: "fff",
  };

  /**
   * 使い分けは以下だけ。意味合いは一緒？
   *
   * const →変数の宣言。 値が不変であること(参照型の場合は参照値が不変。ただし参照先は可変)
   * readonly →型のプロパティ宣言。一度初期化されたら再代入できないこと
   *
   */

  /**
   * Mapping Modifiers
   * "-"と"?"を識別子として型の中に含ませられる。
   * "-"は削除、"?"はオプショナル
   */
  // readonlyを削除、?を削除
  type MappingModifires<T> = {
    -readonly [P in keyof T]-?: T[P];
  };
  // ?を付与
  type tempA = {
    readonly [P in keyof A]?: A[P];
  };

  type E = MappingModifires<tempA>;

  /**
   * P as T
   * 型アサーション
   * 要は別の型として扱いたいときに使う。
   * 基本的には非推奨
   *
   */
  const asValue: any = "test";
  (asValue as string).length; // 4

  /**
   * Intersection Types (&)
   * Union Types (|)
   */
  type IntersectionTypes = Simple<B & A>;
  type U1 = "a" | "b";
  type U2 = "c" | "d";
  type U3 = U1 | U2;

  /**
   * Template Literal Types
   * 要はオブジェクト型のキーだったりをテンプレートリテラル使って書けますよってやつ
   *
   */
  type Prefix = "pre";
  type G = `${Prefix}_aaa` | `${Prefix}_bbb`;
  // これで同じ。Uniontypeは掛け算的になる
  type H = `${Prefix}${G}`;

  /**
   * declare
   * .d.tsファイルに定義して、typescriptでインテリセンス出せたりする
   * ちなみに@types/hogeとかは{@link https://github.com/DefinitelyTyped/DefinitelyTyped}の機能らしい
   *
   */
  // defineTypeSample.d.tsに定義
  console.log(declareVal);
  declareFunc("test");

  /**
   * is
   * ユーザ定義型ガードでのみ利用
   *
   * assertsありの応用(asserts事態もこれくらいしか使い道ない)
   * asserts x is T
   *
   *
   * 利用方法はこんな感じ。使用頻度は高くない
   * https://www.wakuwakubank.com/posts/767-typescript-user-defined-type-guards/
   */
}
namespace Advance {
  /**
   * keyof typeof {オブジェクト変数}
   * →オブジェクトのキーのユニオン型生成
   *
   */
  const keyofTypeofObj = {
    name: "たかし",
    age: 123,
  };

  const keyofTypeofObjLiteral = {
    name: "たかし",
    age: 123,
  } as const;
  // "name" | "age"
  type KeyOfTypeOfType = keyof typeof keyofTypeofObj;
  // string | number
  type KeyOfTypeOfValueType = (typeof keyofTypeofObj)[KeyOfTypeOfType];
  // "たかし" | 123
  type KeyOfTypeOfLiteralType = (typeof keyofTypeofObj)[KeyOfTypeOfType];

  // ★配列は本質的にindexとlengthを持ったオブジェクト型担ってる。詳細はArray<T>の定義を参照
  const arrayTypeOf = ["aaa", "bbb", "ccc"] as const;
  // Unionにしてみる
  type LiteralArrayToUnion<T> = T extends { [P in keyof T]: infer P }
    ? P
    : never;
  type LiteralArrayToUnionResult = LiteralArrayToUnion<typeof arrayTypeOf>;

  /**
   * as const
   * オブジェクトや配列、リテラルに対してreadonlyな性質を持たせることができる特殊な型アサーション
   *
   * ★Tips
   * Union typeにstringを入れようとしてエラーになるときに、"aaa" as constみたいに渡せばエラーにならない
   */
  const nomalObj = { test: "cal" };
  nomalObj.test = "hello";
  const asConstObj = { text: "Hello", number: 10 } as const;
  // asConstObj.text = "f"; // error
}
