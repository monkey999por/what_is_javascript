(function run() {
  class RepDummy {
    constructor(content) {
      this.content = content;
    }
    replace(old, newval) {
      this.content = this.content.replace(old, newval);
      return this;
    }
    result() {
      return this.content;
    }
  }

  function appendText(node) {
    // 子要素を取得する
    const children = node.children;

    // 要素のtextContentに"ABC"を追加する
    if (node?.innerHTML) {
      const reps = new RepDummy(node.innerHTML);
      reps.replace("、", '<span style="color:red;">ポゥッ！</span>');
      reps.replace("です。", '<span style="color:red;">フォーー！</span>');
      node.innerHTML = reps.result();
      console.log(node?.innerHTML);
    }
    // node.textContent += "ABC";

    // 子要素がある場合、子要素を再帰的に処理する
    if (children && children.length > 0) {
      for (const child of children) {
        appendText(child);
      }
    }
  }
  appendText(document.body);
})();
