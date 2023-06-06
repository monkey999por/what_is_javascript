/**
 * intrinsicキーワードで定義されているので、自分で新たに定義したりは不可能。これ使うしかない
 * Uppercase     文字列リテラル型をすべて大文字に
 * Lowercase     文字列リテラル型をすべて大文字に
 * Capitalize    文字列リテラル型の一文字目を大文字に
 * Uncapitalize  文字列リテラル型の一文字目を大文字に
 *
 */

type Up = Uppercase<"up" | "hh">; // UP | HH
type Capi = Capitalize<"aaa">; // Aaa
type Uncap = Uncapitalize<"aaa" | "BBB">; // aaa | bBB

// https://www.typescriptlang.org/docs/handbook/2/functions.html#void
/**
 * void
 */
// voidは関数が明示的に値を返さない場合に使用される型です。つまり、関数がreturnステートメントを持たないか、またはreturnの後に何も続かない場合、その関数の返り値の型はvoidです。voidは値そのものではなく、値の欠如を示す型で、それ自体が何かを表現することはありません。

/**
 * never
 */
// 一方、never型は関数が絶対に返らないことを示すために使用されます。これは、関数が常にエラーをスローするか、無限ループに陥るときなどです。つまり、never型の関数から制御が戻ることは決してありません。これはvoidとは対照的で、void型の関数は値を返さないものの、呼び出し元に制御を返すことがあります。

/**
Q.

neverには値を返さない性質があるため、以下が成り立つのですか？

type Exclude<T, U> = T extends U ? never : T;

A.
そのとおりです。その型Exclude<T, U>は、型TからUに割り当て可能な要素を除外します。これはTypeScriptの組み込み型として実装されています。

この型は条件付き型を使用し、T extends Uである場合、つまりTがUに割り当て可能である場合はneverを返します。neverは特殊な型で、その変数に値が割り当てられないことを示します。

したがって、Exclude<string | number, number>はstringになります。なぜなら、number型はstring | numberから削除されてしまうからです。

なお、neverは値を返さない性質があるので、一般的には関数が例外を投げるか、決して終了しないことを示すために使用されます。しかし、型システム内での使用では、ある型から他の型を除外するための便利なメカニズムとなります。
 */

/**
 * any
 * 変数の使用前に型のチェックが不要
 */

/**
 * unknown
 * 変数の使用前に型のチェックが必要
 * 利用時に型ガードを強制する
 */
