function runMain(event) {
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

    // P240




}

