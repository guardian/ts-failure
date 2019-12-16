const failureSymbol = Symbol("failure");

export interface Failure {
  [failureSymbol]: unknown;
  error: Error;
}

// type NotPromise = Exclude<{}, PromiseLike<unknown>>;
type NotPromise<T> = Exclude<T, PromiseLike<unknown>>;

type NotFailure<T> = Exclude<T, Failure>;
// type NotString<T> = Exclude<T, string>;
export type Success<T> = NotFailure<T> & NotPromise<T>;
// & NotString<T>;

export type Attempt<T> = Failure | Success<T>;

export const hasFailed = <T>(attempt: Attempt<T>): attempt is Failure =>
  Object.getOwnPropertySymbols(attempt).includes(failureSymbol);

/**
 *
 * @param attempt Attempt<T>
 * So Promise<?> would meet this, but then you won't get anything useful out.
 */
export const hasSucceeded = <T>(attempt: Attempt<T>): attempt is Success<T> =>
  !hasFailed(attempt);

export const attempt = <T>(promise: Promise<Success<T>>): Promise<Attempt<T>> =>
  new Promise(resolve => {
    promise
      .then(success => resolve(success))
      .catch(error => {
        resolve({ [failureSymbol]: true, error });
      });
  });
