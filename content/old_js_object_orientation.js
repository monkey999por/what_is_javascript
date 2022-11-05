// いわゆる昔の書き方
// 今は使うことはないけど、読むことはあるかもなので頭には入れておく

// class ※js
let Member = function (firstName, lastName) {
    // プロパティ (=フィールド)
    this.firstName = firstName;
    this.lastName = lastName;
    // method
    this.getName = function () {
        return `${this.lastName} ${this.firstName}`;
    }

    // 後からプロパティとか追加されない場合はこうする。（オブジェクトの凍結）
    // Object.seal(this);

};

let allowF = () => { }
//new allowF(); // これはNG:Uncaught TypeError: allowF is not a constructor

// constructorでinit
let m = new Member('takashi', 'tanaka');
console.log(m.getName()); // tanaka takashi
m.lastName = 'modify last name';
console.log(m.getName()); // modify last name takashi

// 後から追加することも可能
m.newF = function () {
    console.log('add new function');
}
m.newF(); // log : add new function
let m2 = new Member('test', 'fuga');
// こっちのinstanceには関数追加してないのでエラー
//m2.newF(); //Uncaught TypeError: m2.newF is not a function


// thisの参照先を変えてみる(call/apply使用)
var data = 'data1';
let obj = {
    data: 'objdata',
}
function refThisTest() {
    console.log(this.data);
}
refThisTest.call(null); // data1 ※グローバルオブジェクトを参照しているが、letで宣言したときはまた動きが変わるので注意
refThisTest.call(obj); // objdata

// P232 コンストラクタの問題点
/**
let Member = function (firstName, lastName) {
    // プロパティ (=フィールド)
    this.firstName = firstName;
    this.lastName = lastName;
    // method
    this.getName = function () {
        return `${this.lastName} ${this.firstName}`;
    }
};
let m = new Member('takashi', 'tanaka'); // 自instanceでgetNameを保持
let m2 = new Member('test', 'fuga');     // 自instanceでgetNameを保持
 */
// 上記のようにコンストラクタをそのまま定義するとinstance化したときにメソッドをそれぞれのインスタンで保持することになる
// (javascriptは関数が第一級オブジェクト（要はただの変数と同議）なため)
// 上記のようなやり方はメモリ的に無駄なので、以下のようにする
let Member2 = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};
Member2.prototype.getName = function () {
    return `${this.lastName} ${this.firstName}`;
}
let mm = new Member2('takashi', 'tanaka'); // 自instanceでgetNameを保持
let mm2 = new Member2('test', 'fuga');     // 自instanceでgetNameを保持
console.log(mm.getName()); // tanaka takashi
console.log(mm2.getName()); // fuga test

// プロトタイプチェーンの確認：自instanceになければprototypeから取得
let mm3 = new Member2('m2', 'lastm2');
let mm4 = new Member2('m2', 'lastm2');
// prototypeにsex定義
Member2.prototype.sex = 'man';
console.log(mm3.sex); // man
console.log(mm4.sex); // man

// 自instanceにsex定義
mm4.sex = 'woman';
console.log(mm3.sex); // man　※prototypeのsex参照
console.log(mm4.sex); // woman　※自instanceのsex参照

// プロパティを消してみると
delete mm3.sex // 自instanceのsex削除⇒mm3は自instanceにsexをもたないので何もしない（deleteはprototypeまで遡って削除はしない）
delete mm4.sex // 自instanceのsex削除

console.log(mm3.sex); // man　※prototypeのsex参照
console.log(mm4.sex); // man　※prototypeのsex参照

// 疑似的にprototypeのプロパティを参照しないようにする方法
mm3.sex = undefined;

console.log(mm3.sex); // undefined
console.log(mm4.sex); // man　※prototypeのsex参照

//  こんな感じでまとめてプロトタイプを定義可能
let Member3 = function (name) {
    this.name = name;
}

// Member3.prototype.getA = function () { return `add prototype using dot literal ${this.name}` };

// ↑の書き方との併用はできないっぽい？基本的には↓の書き方で統一した方がよさそう。
Member3.prototype = {
    getB: function () {
        return `add prototype using object literal B ${this.name}`;
    },
    getC: function () {
        return `add prototype using object literal C ${this.name}`;
    }
}

const member3 = new Member3('member3 instance');
// console.log(member3.getA());
console.log(member3.getB()); // add prototype using object literal B member3 instance
console.log(member3.getC()); // add prototype using object literal C member3 instance

//静的メソッドを定義する
let StaticyClass = function () {

}
// define static property
StaticyClass.stValue = 'stval';
// define static method
StaticyClass.stMethod = function (params) {
    return `${StaticyClass.stValue}_${params}`;
}

// use
console.log(StaticyClass.stValue); // stval
console.log(StaticyClass.stMethod('ppp')); // stval_ppp

// 継承
let Animal = function () { }
Animal.prototype = {
    getvalue: function () {
        console.log('animal proto');
    }
}
let Dog = function () {
    // 親クラスのコンストラクタをコール
    Animal.call(this);
}
// これが継承
Dog.prototype = new Animal();

Dog.prototype.bark = function () {
    console.log('dog proto');
}

let dog = new Dog();
dog.getvalue(); // animal proto
dog.bark(); // dog proto

console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog); // true

// プライベートメンバ定義
function PrivateTest() {
    // private field
    var _base;
    // private method
    var _baseWithStr = function () {
        return `${_base} STR`;
    }

    // accesser
    Object.defineProperty(
        this,
        'base',
        {
            get: function () {
                return `${_base} : call get`;
            },
            set: function (val) {
                _base = `${val} :call set`;
            }
        }

    );


    this.getString = function () {
        return _baseWithStr();
    }
}

const pt = new PrivateTest();
pt.base = 'value';
console.log(pt.base); // value :call set : call get
console.log(pt.getString()); // value :call set STR

// 名前空間を定義してみる
var Wings = Wings || {};
// こんな感じでWingsっていう空のオブジェクトにMemberが属すようにする。
Wings.Member = function (params) {
    this.params = params;
}

Wings.Member.prototype = {
    getName: function () {
        return `${this.params} aaa`;
    }
}

var mem = new Wings.Member('namae');
console.log(mem.getName()); // namae aaad
