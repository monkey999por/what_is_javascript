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
};

let allowF = () => {}
//new allowF(); // これはNG:Uncaught TypeError: allowF is not a constructor

// constructorでinit
let m = new Member('takashi' , 'tanaka');
console.log(m.getName());
