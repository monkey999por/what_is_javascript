## What is

javascript, typescriptのあれこれ

## javascript

- [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript)

## typescript

- 基本的にはここから見るのがよさげ  
[公式](https://www.typescriptlang.org/docs/handbook/intro.html)

- 汎用型　typescriptが提供するいろんな型。かっこいい  
[汎用型](https://www.typescriptlang.org/docs/handbook/utility-types.html)

- [YY Typescreipt](https://typescriptbook.jp/overview)

## description

`gulp`(タスクランナー)で`browser-sync`と`tsc`を動かしてる。  

- javascriptの場合  
js/配下に適当にファイルを作って、js/main.htmlから読み込む  
- typescriptの場合  
ts/ディレクトリでts書いて、それをjs/ts_out/に出力している
js/main.htmlからはjs_ts_outのjsファイルを読みこむ

## build & deploy  

```
npm ci
npm run gulp
```

`.ts`をnode.jsで確認する場合はの実行はこれでもいい

```
npx ts-node {file.ts}
```
