interface Todo {
  title: string;
  description?: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

const todo3 = (arg: Partial<Todo>) => {
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
const todo4 = (arg: Required<Readonly<Todo>>, test: Uppercase<string>) => {
  console.log(test);

  console.log(arg.title);
  console.log(arg.description);
};
todo4({ title: "dd", description: "g" }, "TE");

function firstElement1<T>(arr: T[]) {
  return arr[0];
}

firstElement1(["test", 12]);

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);

type Test = {
  name: string;
};
type Test2 = Test & {
  hello: number;
};

function sname(params: Test2) {
  const { name, hello } = params;
  console.log(name);
  console.log(hello);
}
sname({
  name: "takashi",
  hello: 1,
});

function f(params: [string, number]) {
  console.log(params[0]);
  console.log(params[1]);
}

// 型操作
// https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
function getProperty<T, Key extends keyof T>(obj: T, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
// getProperty(x, "m");

type MapLike = { [K: string]: any };
type MapKeys = keyof MapLike;
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;

type Person = { age: number; name: string; alive: boolean };
type I1 = Person["age" | "name"];

const person: Person = { age: 1, name: "te", alive: false };

const a: I1 = person.age;
console.log(a);

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function sealeda(target) {
  console.log("new");
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

// @sealeda
// class ExampleClass {
//   @first()
//   @second()
//   smethod() {
//     console.log("main method");
//   }
// }

// const b = new ExampleClass();
// b.smethod();

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type Testtype = Required<string>;

function testaa(params: Testtype) {}
type mystring = string;
testaa("");
console.log(typeof testaa);

type MapLikes = { [K in "x" | "y" | "z"]: any };
type MapLikes2 = { [K in keyof MapLikes]: any };
type MapKeyss = keyof MapLike;

type 野獣先輩 = {
  name: string;
  age: number;
  like: "男" | "女";
};
type 野獣先輩遠野スキー = Error;

function func5(x: 野獣先輩) {
  console.log(x.name);
  console.log(x.age);
  if (x.like === "男") {
    console.log(x.like);
  } else {
    throw "ほらほらほらほら" as any as 野獣先輩遠野スキー;
  }
}

func5({ name: "tono", age: 24, like: "女" });
