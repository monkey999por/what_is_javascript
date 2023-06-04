// https://tech.mobilefactory.jp/entry/2021/12/02/000000
// 型をごちゃごちゃ定義した後に、最終的に出力される型は何なのかを教えてくれる
type Simple<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: Simple<O[K]> }
    : never
  : T;

type DeepPartial<T> = { [P in keyof Partial<T>]: DeepPartial<T[P]> };

const testaabbbbb = {
  name: "111",
  o: {
    g: 2,
    h: {
      gg: 6,
      test: {
        hello: "world",
      },
    },
  },
};

const bnb: Simple<DeepPartial<typeof testaabbbbb>> = {
  o: {
    h: {},
  },
};

console.log(testaabbbbb);

//   まず、マップドタイプとは、他の型から新しい型を生成する強力な機能です。そして、テンプレートリテラル型は、テンプレートリテラルの構文を利用して文字列型を組み合わせる機能です。

// これらを組み合わせた一例を以下に示します：

// typescript
// Copy code
type EventTypes = "click" | "mouseover";

type EventMap = {
  [K in EventTypes as `${K}Handler`]: (event: K) => void;
};

// 上記の型は以下と同じ意味になります。
// type EquivalentEventMap = {
//     clickHandler: (event: 'click') => void;
//     mouseoverHandler: (event: 'mouseover') => void;
// };
