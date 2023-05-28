const gulp = require("gulp");
const ts = require("gulp-typescript");
const browserSync = require("browser-sync").create();

// TypeScriptの設定ファイルの読み込み
const tsProject = ts.createProject("tsconfig.json");

// TypeScriptファイルのトランスパイル
gulp.task("compile", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

// ブラウザのリロード
gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});

// 開発サーバの起動とファイル変更の監視
gulp.task("serve", function () {
  browserSync.init({
    files: ["./MDN/**", "./js/**", "./ts/**"], //監視するファイルを指定
    server: {
      baseDir: "./js", //ファイルまでのディレクトリのパス
      index: "main.html", //ファイル名
    },
    whatchEvents: ["add", "change"],
    proxy: false,
    port: 8000, //使用するポート番号
  });

  gulp.watch("src/**/*.ts", gulp.series("compile", "reload"));
});

// デフォルトタスク
gulp.task("default", gulp.series("compile", "serve"));
