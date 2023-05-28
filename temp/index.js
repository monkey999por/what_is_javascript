var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function updateTodo(todo, fieldsToUpdate) {
    return __assign(__assign({}, todo), fieldsToUpdate);
}
var todo1 = {
    title: "organize desk",
    description: "clear clutter"
};
var todo2 = updateTodo(todo1, {
    description: "throw out trash"
});
var todo3 = function (arg) {
    console.log(arg.title);
    console.log(arg.description);
};
todo3({ title: "takas" });
/**
 * https://zenn.dev/qnighy/articles/dde3d980b5e386#%3F
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 * Requiredで定義されている -? とかはこの辺の機能らしい
 *
 */
var todo4 = function (arg, test) {
    console.log(test);
    console.log(arg.title);
    console.log(arg.description);
};
todo4({ title: "dd", description: "g" }, "TE");
function firstElement1(arr) {
    return arr[0];
}
firstElement1(["test", 12]);
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
var d1 = makeDate(12345678);
var d2 = makeDate(5, 5, 5);
function sname(params) {
    var name = params.name, hello = params.hello;
    console.log(name);
    console.log(hello);
}
sname({
    name: "takashi",
    hello: 1
});
function f(params) {
    console.log(params[0]);
    console.log(params[1]);
}
// 型操作
// https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
var person = { age: 1, name: "te", alive: false };
var a = person.age;
console.log(a);
function first() {
    console.log("first(): factory evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("first(): called");
    };
}
function sealeda(target) {
    console.log("new");
}
function second() {
    console.log("second(): factory evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("second(): called");
    };
}
function testaa(params) { }
testaa("");
console.log(typeof testaa);
function func5(x) {
    console.log(x.name);
    console.log(x.age);
    if (x.like === "男") {
        console.log(x.like);
    }
    else {
        throw "ほらほらほらほら";
    }
}
func5({ name: "tono", age: 24, like: "女" });
