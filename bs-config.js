module.exports = {
  files: ["./MDN/**"], //監視するファイルを指定
  server: {
    //デフォルトで開くファイルを指定
    baseDir: "./MDN/Asynchronous", //ファイルまでのディレクトリのパス
    index: "index.html", //ファイル名
  },
  proxy: false,
  port: 8000, //使用するポート番号
};
