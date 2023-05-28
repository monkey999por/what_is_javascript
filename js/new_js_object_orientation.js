/**
 * ## ES2015以降のclassやオブジェクトリテラルの記法
 * ※今のとこ雑にしかまとめてないですがどんどん整理していきます。
 * 概要
 * > `class`は内部的には`function()`のシンタクスシュガー
 * > javascript本来のprototypeベースのオブジェクト指向を疑似的にclassで内包しているだけ
 * > ※ただし`function`と違い`class`は定義前には呼び出せない（要するに`new`演算子はclass定義より後にしか使えない）
 */

/**
 * ### クラス(class), アクセサ(get,set)
 */
class Member {
  // constructor
  constructor(value) {
    // field
    this.value = value;
  }

  // get accesser
  // _temp：内部的にのみ持つ一時的な変数。
  // valueにsetterで直接アクセスできないため、
  // setterでは_tempに値をセットしている。そのため、getterでも_tempを返す。
  // 一時変数名がなんでもよいことを明示的にするために名前を_tempとしているが、本来は_value（アンダースコア + アクセサ名）にすべき
  // こういうこと　https://ginpen.com/2017/12/05/javascript-getter-setter/
  get value() {
    return `${this._temp} : call get`;
  }
  // set accesser
  // _temp：内部的にのみ持つ一時的な変数。
  // なぜvalueではなく_tempを返すのか？
  // ⇒仮にthis.value = valueとしてしまうと。this.valueにセットしようとした時点でset valueアクセサを介してしまう
  // ため、setが無限回呼ばれることになってしまう。
  set value(_temp) {
    this._temp = `${_temp} : call set`;
  }

  // static method
  static staticMethod() {
    console.log(`this is static method`);
  }

  // instance method
  someMethod() {
    return this.value;
  }
}
let m = new Member("aaa");
// ※以下のような結果になる理由
// 1. new Member('aaa'); ⇒これの中に定義してるthis.value = valueが
//     setter(set value)を呼ぶ
// 2. m.valueがgetter(get value)を呼ぶため
console.log(m.value); //"aaa : call set : call get"
console.log(m.someMethod()); // "aaa : call set : call get"
Member.staticMethod(); // "this is static method"

/**
 * ### classを変数に入れることも可能
 */
const Test = class {
  // 中身は同じ
};

/**
 * ### 継承(extends)
 */
class Animal {
  constructor(value) {
    this.animalV = value;
  }
  getValue() {
    return `${this.animalV} (get with animal)`;
  }
  getAnimalValue() {
    return `${this.animalV} URYYYY`;
  }
}
class Cat extends Animal {
  constructor(animalV, value) {
    // 親コンストラクタ呼び出し
    super(animalV);
    this.catV = value;
  }
  // override
  getValue() {
    // 親のプロパティはthisでアクセス
    // 親のメソッドはsuperでアクセス
    return `${this.animalV} override by cat : ${
      this.catV
    } : ${super.getValue()}`;
  }
}
const cat = new Cat("あにまる", "ねーこ");
console.log(cat.getValue()); // "あにまる override by cat : ねーこ : あにまる (get with animal)"
console.log(cat.getAnimalValue()); // "あにまる URYYYY"

/**
 * ### オブジェクトリテラル(object literal)
 */
let objC = {
  firstName: "takashi",
  lastName: "honda",
  toString() {
    return `${this.firstName} : toString`;
  },
  oldFunc: () => {console.log('古い書き方');}
};
console.log(objC.toString()); // "takashi : toString"
objC.oldFunc(); // "古い書き方"

/**
 * ### プロパティの動的生成
 */
let i = 0;
let dynamicVars = {
  name: "test",
  ["a" + ++i]: "memo1",
  ["a" + ++i]: "memo2",
  ["a" + ++i]: "memo3",
};
console.log(dynamicVars.a1); // memo1
console.log(dynamicVars.a2); // memo2

/**
 * ### モジュール(export/import)について
 * いろいろ書くよりこれ見るのが一番
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export
 */

/**
 * ### プライベート変数 (Private class fields)
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields
 */
class ClassWithPrivateField {
  // private field
  #privateField;

  constructor() {
    this.#privateField = 42;
    //   delete this.#privateField;   // Syntax error
    //   this.#undeclaredField = 444; // Syntax error
  }
  getPrivateField() {
    return this.#privateField;
  }
}
//instance.#privateField === 42;   // Syntax error
const instance = new ClassWithPrivateField();
console.log(instance.getPrivateField()); // 42

/**
 * ### イテレータ(Iterator)
 * 例えば`for of`とかは内部的にこの仕組みを使ってる
 * 
 */
const ary = [1, 2, 3];
const itr = ary[Symbol.iterator]();
let d;
while ((d = itr.next())) {
  if (d.done) break;
  console.log(d.value); // 1,2,3
}
/**
 *もしiteratbleなクラスを自作したいならこういうのが参考になる
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols
 */

/**
 * ### ジェネレータ(Generator), yieldキーワード
 */
function* myGen() {
  // function「*」でジェネレータになる
  let val = "aaa";
  yield val; // yield: myGenの呼び出しごとに処理を一時停止し、myGenが呼ばれると次のyieldまで実行される
  val += " add after";
  yield val;
  yield "ccc";
}

console.log(myGen().next().value); // aaa
for (const iterator of myGen()) {
  console.log(iterator); // "aaa","aaa add after","ccc"
}

// ### プロキシ（Proxy）
const dataP = {
  red: "赤色",
  yellow: "黄色",
};
const proxy = new Proxy(dataP, {
  get(target, prop) {
    console.log(target); // 対象のオブジェクト（=dataP） 例：{red: '赤色', yellow: '黄色'}
    console.log(prop); // 例：呼び出し側でproxy.redとした場合は、"red"
    return prop in target ? target[prop] : "?";
  },
});
console.log(proxy.red); // "赤色"
console.log(proxy.aaa); // "?"

proxy.blue = "青色";
console.log(proxy.blue); // "青色"

/**
 * ### 参考
 * https://www.amazon.co.jp/s?k=javascript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80&adgrpid=60120324664&gclid=Cj0KCQiApb2bBhDYARIsAChHC9twpeiPSkR1T6yzjpSE3YWpCYlYKT6C8yKAgBeg_xlhdVfOC-HIN9YaAiQ9EALw_wcB&hvadid=618553085031&hvdev=c&hvlocphy=1009221&hvnetw=g&hvqmt=e&hvrand=10456938282411633299&hvtargid=kwd-332716054270&hydadcr=27268_14598057&jp-ad-ap=0&tag=googhydr-22&ref=pd_sl_3eoosl5iqa_e
 */