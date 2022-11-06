function runMain(event) {
    // ES2015以降のclassとかもろもろ
    // classは内部的には関数（つまり古い書き方（=functionを使う）のシンタクスシュガー）
    // javascript本来のprototypeベースのオブジェクト指向を疑似的にclassで内包しているだけ
    // ※ただし注意として、クラスは定義前には呼び出せない（=new演算子はclass定義より後にしか使えない）
    //ちなみにこんな書き方もできる
    // const Test = class {
    //     // 中身は同じ
    // };

    class Member {
        // constructor
        constructor(value) {
            // field
            this.value = value;
        }

        // get accesser
        // _temp：内部的にのみ持つ一時的な変数。
        // valueフィールドにアクセスsetterでvalueに直接アクセスできないため、setterでは_temp
        // に値をセットしている。そのため、getterでも_tempを返す。
        // ここでは分かりやすさのために名前を_tempとしているが、本来は_value（アンダースコア + アクセサ名）にすべき
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

    //結果 "aaa : call set : call get"
    // なぜ？⇒内部的な動きとしては
    // 1. 「new Member('aaa');」⇒これの中に定義してる「this.value = value」が
    //     setter(set value)を呼ぶ
    // 2. 「m.value」がgetter(get value)を呼ぶため
    let m = new Member('aaa');
    console.log(m.value);
    //結果 "aaa : call set : call get"
    console.log(m.someMethod());

    Member.staticMethod(); // "this is static method"

    // 継承
    class Animal {
        constructor(value) {
            this.animalV = value
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
            return `${this.animalV} override by cat : ${this.catV} : ${super.getValue()}`;
        }
    }
    const cat = new Cat('あにまる', 'ねーこ');
    console.log(cat.getValue()); // "あにまる override by cat : ねーこ : あにまる (get with animal)"
    console.log(cat.getAnimalValue()); // "あにまる URYYYY"


    //object litaral
    let objC = {
        firstName: 'takashi',
        lastName: 'honda',
        toString() {
            return `${this.name} : toString`;
        }
    }
    console.log(objC.toString()); // "takashi : toString"

    //プロパティの動的生成
    let i = 0
    let dynamicVars = {
        name: 'test',
        ['a' + ++i]: 'memo1',
        ['a' + ++i]: 'memo2',
        ['a' + ++i]: 'memo3'
    }
    console.log(dynamicVars.a1); // memo1
    console.log(dynamicVars.a2); // memo2

    // モジュール(export/import)についてはこれ見とけ
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export

    // private 
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    class ClassWithPrivateField {
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
    const instance = new ClassWithPrivateField()
    console.log(instance.getPrivateField()); // 42


    // イテレータの仕組み的な
    // 例えばfor ofとかは内部的にこうなってる
    const ary = [1, 2, 3];
    const itr = ary[Symbol.iterator]();
    let d;
    while (d = itr.next()) {
        if (d.done) break;
        console.log(d.value); // 1,2,3
    }

    // iteratebleなクラスを自作するなら　https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols

    // ジェネレータ
    function* myGen() { // function「*」でジェネレータになる
        let val = 'aaa';
        yield val;// yield: myGenの呼び出しごとに処理を一時停止し、myGenが呼ばれると次のyieldまで実行される
        val += ' add after'
        yield val;
        yield 'ccc';
    }

    console.log(myGen().next().value);// aaa
    for (const iterator of myGen()) {
        console.log(iterator);// "aaa","aaa add after","ccc"
    }

    // Proxy




}

