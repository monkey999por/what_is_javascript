async function runMain(event) {
  const target = {
    v1: "v1 val",
    f1() {
      console.log("f1 run");
    },

  };
  const handler1 = {
    get: (target, property) => {
      console.log(target[property]);
      return "proxy v1";
    },
  };

  const proxy1 = new Proxy(target, handler1);
  const proxyFunc = new Proxy(target.f1, {
    apply: (target, thisArg, argumentsList) => {
      console.log("apply");
      target();
    },
  });
  // value
  console.log(proxy1.v1); // 1. "v1 val" 2. "proxy v1"
  proxyFunc(); // 1. "apply" 2. "f1 run"
  // これはできない。なぜならproxy1はtargetオブジェクトに対してのものであり、target.f1関数にはプロキシとして機能しない
//   proxy.f1(); error


}
