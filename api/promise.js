// /* eslint-disable default-case */

// class CustomPromise {
//   constructor(handleFunc) {
//     this.state = "pending";
//     this.value = undefined;

//     this.fulfilledList = [];

//     handleFunc(this.triggerResolve);
//   }

//   triggerResolve = (val) => {
//     // 这里使用setTimeout是为了有时间收集所有的依赖，不至于new完Promise以后直接执行resolve
//     setTimeout(() => {
//       if (this.state !== "pending") return;
//       this.state = "fulfilled";
//       this.value = val;
//       this.fulfilledList.forEach((item) => item(val));
//       this.fulfilledList = [];
//     }, 0);
//   };

//   then(onFulfilled, onRejected) {
//     const { value, state } = this;
//     // 每个then方法都会返回一个promise
//     return  new CustomPromise(
//       (onNextFulfilled, onNextRejected) => {
//         // 让我们的方法串联起来 串联当前的onFulfilled和下一次的onNextFulfilled，
//         function onFinalFulfilled(val) {
//           // 不是function时，跳过当前的onFulfilled
//           if (typeof onFulfilled !== "function") {
//             onNextFulfilled(val);
//           } else {
//             const res = onFulfilled(val);

//             if (res && typeof res.then === "function") {
//               // res 是一个promise
//               res.then(onNextFulfilled);
//             } else {
//               onNextFulfilled(res);
//             }
//           }
//         }

//         switch (state) {
//           case "pending": {
//             this.fulfilledList.push(onFinalFulfilled);
//             break;
//           }
//         }
//       }
//     );
//   }

//   catch(onRejected) {
//     return this.then(null, onRejected);
//   }

//   static all(list) {
//     return new CustomPromise((resolve, reject) => {
//       let count = 0;
//       const values = [];
//       for (const [i, customPromise] of list.entries()) {
//         customPromise.then(
//           (res) => {
//             values[i] = res;
//             count++;
//             if (count === list.length) resolve(values);
//           },
//           (err) => {
//             reject(err);
//           }
//         );
//       }
//     });
//   }

//   static resolve(val) {
//     return new CustomPromise((resolve) => resolve(val));
//   }
// }

// const createPromise = function (time) {
//   return new CustomPromise(function (resolve, reject) {
//     console.log("resolve: ", resolve);
//     setTimeout(resolve, time);
//   });
// };

// const promiseInstance = createPromise(1000);

// promiseInstance.then(function () {
//   console.log("hello world");
//   return "123";
// });

/**
 * 1.Promise 是一个构造函数
 * 2. Promise 接受一个函数，这个函数的参数是(resolve, reject), 也要求事函数
 * 3. Promise 返回的对象，包含一个 then 的函数， then 函数接受来个参数，这两个参数，一般也是函数
 * 4. 我们再使用 new 关键字调用 Promise 构造函数是，在结束时
 *    如果正确执行，调用 resolve 方法，将结果放在 resolve 的参数中执行，这个结果可以再后面的 then  中的第一个函数参数(onFulfilled) 中拿到
 *    如果错误执行，低啊用 reject 方法，将错误信息放在 resolve 的参数中执行，这个结果可以再后面的 then 中的第二个函数参数(onRejected) 中拿到
 *
 *
 */

function L0Promise(execute) {
  this.statue = 'pending';
  this.value = null;
  this.reason = null;
  const resolve = (value) => {
    if (this.statue === 'pending') {
      this.value = value;
      this.statue = 'fulfilled';
    }
  };

  const reject = (reason) => {
    if (this.statue === 'pending') {
      this.reason = reason;
      this.statue = 'rejected';
    }
  };

  // new Promise 时，先执行传入的参数
  execute(resolve, reject);
}

L0Promise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled / onRejected 必须是一个方法
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (err) => {
          throw err;
        };

  if (this.statue === 'fulfilled') {
    onFulfilled(this.value);
  }
  if (this.statue === 'rejected') {
    onRejected(this.reason);
  }
};

// ----------------------------------------------------------------

// 支持异步
function L1Promise(execute) {
  console.log(2);
  this.statue = 'pending';
  this.value = null;
  this.reason = null;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  const resolve = (value) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.value = value;
        this.statue = 'fulfilled';
        console.log(5);
        this.onFulfilledArray.forEach((func) => func(value));
      }
    });
  };

  const reject = (reason) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.reason = reason;
        this.statue = 'rejected';
      }
      this.onRejectedArray.forEach((func) => func(reason));
    });
  };

  execute(resolve, reject);
}

L1Promise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled / onRejected 必须是一个方法
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (err) => {
          throw err;
        };

  if (this.statue === 'fulfilled') {
    console.log(7);
    onFulfilled(this.value);
  }
  if (this.statue === 'rejected') {
    onRejected(this.reason);
  }

  if (this.statue === 'pending') {
    console.log(4);
    // .then 时，要先收集 then 的两个参数
    this.onFulfilledArray.push(onFulfilled);
    this.onRejectedArray.push(onRejected);
  }
};

// ----------------------------------------------------------------

function L2Promise(execute) {
  this.statue = 'pending';
  this.value = null;
  this.reason = null;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  const resolve = (value) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.value = value;
        this.statue = 'fulfilled';
        this.onFulfilledArray.forEach((func) => func(value));
      }
    });
  };

  const reject = (reason) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.reason = reason;
        this.statue = 'rejected';
      }
      this.onRejectedArray.forEach((func) => func(reason));
    });
  };

  execute(resolve, reject);
}

L2Promise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled / onRejected 必须是一个方法
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (err) => {
          throw err;
        };

  let promise2; // then 函数的返回值 必须也是一个 promise
  if (this.statue === 'fulfilled') {
    // onFulfilled(this.value);
    return (promise2 = new L2Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
  if (this.statue === 'rejected') {
    // onRejected(this.reason);
    return (promise2 = new L2Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          // 这里就解释了，上一个 .catch 抛出的异常可以再下一个 .then 中调用
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (this.statue === 'pending') {
    // .then 时，要先收集 then 的两个参数
    // this.onFulfilledArray.push(onFulfilled);
    // this.onRejectedArray.push(onRejected);
    return (promise2 = new L2Promise(function (resolve, reject) {
      this.onFulfilledArray.push(() => {
        try {
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(e);
        }
      });

      this.onRejectedArray.push(() => {
        try {
          let result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(e);
        }
      });
    }));
  }
};
function L3Promise(execute) {
  this.statue = 'pending';
  this.value = null;
  this.reason = null;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  const resolve = (value) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.value = value;
        this.statue = 'fulfilled';
        this.onFulfilledArray.forEach((func) => func(value));
      }
    });
  };

  const reject = (reason) => {
    setTimeout(() => {
      if (this.statue === 'pending') {
        this.reason = reason;
        this.statue = 'rejected';
      }
      this.onRejectedArray.forEach((func) => func(reason));
    });
  };
  try {
    execute(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const resolvePromise = (promise2, result, resolve, reject) => {
  if (result) {
    reject(new TypeError('error due to circular refernce'));
  }
  let consumed = false;
  let thenable;
  if (result instanceof Promise) {
    if (result.status === 'pending') {
      result.then(function (data) {
        resultPromise.resolve(promise2, data, resolve, reject);
      }, reject);
    } else {
      result.then(resolve, reject);
    }
    return;
  }
  let isComplexResult = (target) => typeof target === 'function' || typeof target === 'object';

  if (isComplexResult(result)) {
    try {
      thenable = result.then;

      if (typeof thenable === 'function') {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return;
            }
            consumed = true;
            return resolvePromise(promise2, data, resolved, reject);
          },
          function (err) {
            if (consumed) {
              return;
            }
            consumed = true;
            return reject(err);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (consumed) {
        return;
      }
      consumed = true;
      return reject(error);
    }
  } else {
    resolve(result);
  }
};

L3Promise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled / onRejected 必须是一个方法
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (err) => {
          throw err;
        };

  let promise2; // then 函数的返回值 必须也是一个 promise
  if (this.statue === 'fulfilled') {
    // onFulfilled(this.value);
    return (promise2 = new L2Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
  if (this.statue === 'rejected') {
    // onRejected(this.reason);
    return (promise2 = new L2Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          // 这里就解释了，上一个 .catch 抛出的异常可以再下一个 .then 中调用
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (this.statue === 'pending') {
    // .then 时，要先收集 then 的两个参数
    // this.onFulfilledArray.push(onFulfilled);
    // this.onRejectedArray.push(onRejected);
    return (promise2 = new L2Promise(function (resolve, reject) {
      this.onFulfilledArray.push(() => {
        try {
          let result = onFulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(e);
        }
      });

      this.onRejectedArray.push(() => {
        try {
          let result = onRejected(this.reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(e);
        }
      });
    }));
  }
};

//1. 并发执行
const promiseArrGenerator = (num) => {
  return new Array(num).fill(0).map(
    (iem, index) => () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(index);
        }, Math.random() * 1000);
      })
  );
};

// 2. promiseChain 顺序执行这些 promise

const promiseChain = (proArr) => {
  proArr
    .reduce(
      (proChain, pro) =>
        proChain.then((res) => {
          ~res && console.log('res', res);
          return pro();
        }),
      Promise.resolve(-1)
    )
    .then((res) => console.log('last', res));
};

// 3.pipe 并发量的处理

const promisePipe = (proArr, count) => {
  if (count >= proArr.length) {
    return Promise.all(proArr.map((f) => f())).then((resArr) => console.log(resArr));
  }
  let _arr = [...proArr];
  for (let i = 0; i < count; i++) {
    let fn = _arr.shift();
    run(fn);
  }

  function run(fn) {
    fn().then((res) => {
      console.log(res);
      if (_arr.length) return run(_arr.shift());
    });
  }
};

module.exports = {
  L0Promise,
  L1Promise,
  L2Promise,
  L3Promise,
  promiseArrGenerator,
  promiseChain,
  promisePipe,
};
