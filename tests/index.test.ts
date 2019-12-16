import { attempt, hasFailed, hasSucceeded } from "../src";

test("attempt wraps a failed promise in a Failure", async () => {
  const shouldFail = await attempt(Promise.reject("No reason."));
  expect(Object.getOwnPropertySymbols(shouldFail).length).toBe(1);
});

test("attempt does not alter a succesful promise", async () => {
  const value = Promise.resolve("test");
  const shouldSucceed = await attempt(value);
  const resolved = await value;
  expect(shouldSucceed).toBe(resolved);
  expect(hasFailed(shouldSucceed)).toBe(false)
  expect(hasSucceeded(shouldSucceed)).toBe(true)
});

test("a failure should be recognised", async () => {
  const shouldFail = await attempt(Promise.reject("No reason."));
  const failed = hasFailed(shouldFail);
  const succeeded = hasSucceeded(shouldFail);
  expect(failed).toBe(true);
  expect(succeeded).toBe(false);
});

test("a success should not be a failure", async () => {
  const shouldSucceed = await attempt(Promise.resolve({ good: 1 }));
  const failed = hasFailed(shouldSucceed);
  const suceeded = hasSucceeded(shouldSucceed);
  expect(failed).toBe(false);
  expect(suceeded).toBe(true);
});
