interface Todo {
    title: string;
    description?: string;
}
declare function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): {
    title: string;
    description?: string;
};
declare const todo1: {
    title: string;
    description: string;
};
declare const todo2: {
    title: string;
    description?: string;
};
declare const todo3: (arg: Partial<Todo>) => void;
/**
 * https://zenn.dev/qnighy/articles/dde3d980b5e386#%3F
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 * Requiredで定義されている -? とかはこの辺の機能らしい
 *
 */
declare const todo4: (arg: Required<Readonly<Todo>>, test: Uppercase<string>) => void;
declare function firstElement1<T>(arr: T[]): T;
declare function makeDate(timestamp: number): Date;
declare function makeDate(m: number, d: number, y: number): Date;
declare const d1: Date;
declare const d2: Date;
type Test = {
    name: string;
};
type Test2 = Test & {
    hello: number;
};
declare function sname(params: Test2): void;
declare function f(params: [string, number]): void;
declare function getProperty<T, Key extends keyof T>(obj: T, key: Key): T[Key];
declare let x: {
    a: number;
    b: number;
    c: number;
    d: number;
};
type MapLike = {
    [K: string]: any;
};
type MapKeys = keyof MapLike;
type Book = {
    title: string;
    price: number;
    rating: number;
};
type BookKey = keyof Book;
type Person = {
    age: number;
    name: string;
    alive: boolean;
};
type I1 = Person["age" | "name"];
declare const person: Person;
declare const a: I1;
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};
type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;
declare function first(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function sealeda(target: any): void;
declare function second(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
type MyRequired<T> = {
    [P in keyof T]-?: T[P];
};
type Testtype = Required<string>;
declare function testaa(params: Testtype): void;
type mystring = string;
type MapLikes = {
    [K in "x" | "y" | "z"]: any;
};
type MapLikes2 = {
    [K in keyof MapLikes]: any;
};
type MapKeyss = keyof MapLike;
type 野獣先輩 = {
    name: string;
    age: number;
    like: "男" | "女";
};
type 野獣先輩遠野スキー = Error;
declare function func5(x: 野獣先輩): void;
