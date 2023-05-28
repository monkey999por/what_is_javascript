export function isZero(value: number): boolean {
  return value === 0;
}

// Overloadサンプル
export function overloadSample(s1: string, s2: string, s3: string);
export function overloadSample(ob: any);
export function overloadSample(s1: string | any, s2?: string, s3?: string) {
  console.log(typeof s1);
  console.log(s2);
}

overloadSample({ name: "takashi" });
overloadSample("1234", "dd", "test");

function protest(params: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1);
  });
}

async function sy(): Promise<boolean> {
  return false;
}
(async (params: string) => {
  const result = await sy();
  console.log(result);
})("dummy");

protest("d").then((val) => {
  console.log("resolve");
  console.log(val);
});
