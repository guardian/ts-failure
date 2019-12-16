import { hasFailed, attempt } from ".";

const promise = (_) => Promise.resolve();
const a = promise;
const b = promise;
const c = promise;
const d = promise;

promise()
  .then(result => { })
  .catch(error => { });

async () => {
  const A = await a();
  const B = await b(A);
  const C = await c(B);
  const D = await d(C);
};

async () => {
  try {
    const A = await a();
    try {
      const B = await b(A);
      const C = await c(C);
    } catch (e) {
      //handle other error
    }
  } catch (e) {
    //handle error
  }
};

async () => {
  try {
    const A = await a();
    let B;
    try {
      B = await b(A);
    } catch (e) {
      //handle other error
    }
    const C = await c(B);
  } catch (e) {
    //handle error
  }
};

async () => {
  const A = await attempt(a());
  if (hasFailed(A)) {
    //handle your error here
    throw A.error;
  }
  const B = await attempt(b(A));
  if (hasFailed(B)) {
    //handle your error here
    throw B.error;
  }
  const C = await attempt(c(B));
  if (hasFailed(C)) {
    //handle your error here
    throw C.error;
  }
  const D = await attempt(d(C));
};