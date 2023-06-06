/**
 * https://tech.mobilefactory.jp/entry/2021/12/02/000000
 * 型をごちゃごちゃ定義した後に、最終的に出力される型は何なのかを教えてくれる
 */
export type Simple<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: Simple<O[K]> }
    : never
  : T;

/**
 * 深いネストのオブジェクトの項目すべてOptionalにする
 */
export type DeepPartial<T> = { [P in keyof Partial<T>]: DeepPartial<T[P]> };

/**
 * 深いネストのオブジェクトの項目すべてRequiredにする
 */
export type DeepRequired<T> = { [P in keyof Required<T>]: DeepRequired<T[P]> };

// ----test

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

export const QUERY_KEYS = ["users", "post", "comments"] as const;
export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type QueryKeysTypes = Unpacked<typeof QUERY_KEYS>;
