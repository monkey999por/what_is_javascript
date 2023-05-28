import { isZero } from "./survival_typescript";

test("description", () => {
  const result = isZero(10);
  expect(result).toBe(false);
});
test("description", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});
