const resolvePromise = (promise2, result, resolve, reject) => {
  // 当 result 和 promise2 相等时，也就是说 onfulfilled 返回 promise2 时，进行 reject
  if (result === promise2) {
    reject(new TypeError("error due to circular reference"));
  }

  // 是否已经执行过 onfulfilled 或者 onrejected
  let consumed = false;
  let thenable;

  if (result instanceof Promise) {
    if (result.status === "pending") {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject);
      }, reject);
    } else {
      result.then(resolve, reject);
    }
    return;
  }

  let isComplexResult = (target) =>
    (typeof target === "function" || typeof target === "object") &&
    target !== null;

  // 如果返回的是疑似 Promise 类型
  if (isComplexResult(result)) {
    try {
      thenable = result.then;
      // 如果返回的是 Promise 类型，具有 then 方法
      if (typeof thenable === "function") {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return;
            }
            consumed = true;

            return resolvePromise(promise2, data, resolve, reject);
          },
          function (error) {
            if (consumed) {
              return;
            }
            consumed = true;

            return reject(error);
          }
        );
      } else {
        resolve(result);
      }
    } catch (e) {
      if (consumed) {
        return;
      }
      consumed = true;
      return reject(e);
    }
  } else {
    resolve(result);
  }
};

class MyPromise {
  static resolve = new Promise((resolve, reject) => {
    resolve(this.value);
  });

  static reject = new Promise((resolve, reject) => {
    reject(this.value);
  });

  constructor(executor) {
    // promise 的状态
    this.state = "pending";
    // 完成后的值
    this.value = null;
    // 失败后的值
    this.reason = null;

    this.onFulfilledArray = [];
    this.onRejectedArray = [];

    try {
      // 错误捕获，当构造promise出错时，直接执行this.reject改变Promise状态
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (value instanceof MyPromise) {
      value.then(this.resolve, this.reject);
    }
    // 讲resolve的执行放在setTimeout里面，模拟异步执行（并不严谨，因为setTimeout是宏任务，Promise应该属于微任务）
    setTimeout(() => {
      if (this.state === "pending") {
        this.value = value;
        this.state = "fulfilled";
        this.onFulfilledArray.forEach((func) => {
          func(this.value);
        });
      }
    });
  };

  // 定义在this上
  reject = (reason) => {
    // 讲reject的执行放在setTimeout里面，模拟异步执行（并不严谨），因为setTimeout是宏任务，Promise应该属于微任务
    setTimeout(() => {
      if (this.state === "pending") {
        this.reason = reason;
        this.state = "rejected";

        this.onRejectedArray.forEach((func) => {
          func(this.reason);
        });
      }
    });
  };

  // 定义在类的prototype属性上
  // 每个 promise 实例的 then 方法逻辑是一致的，在实例调用该方法时，可以通过原型（Promise.prototype）找到，
  // 而不需要每次实例化都新创建一个 then 方法，这样节省内存，显然更合适
  then(onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === "function" ? onfulfilled : (data) => data; // 实现promise穿透 .then(null).then(res => console.log(res)) 输出res
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : (error) => {
            throw error;
          };
    let _promise;

    if (this.state === "fulfilled") {
      return (_promise = new MyPromise((resolve, reject) => {
        try {
          // 这个新的 _promise resolved 的值为 onfulfilled 的执行结果
          let result = onfulfilled(this.value);
          resolvePromise(_promise, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }));
    }
    if (this.state === "rejected") {
      return (_promise = new MyPromise((resolve, reject) => {
        try {
          let result = onrejected(this.reason);
          resolvePromise(_promise, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }));
    }

    if (this.state === "pending") {
      return (_promise = new MyPromise((resolve, reject) => {
        this.onFulfilledArray.push(() => {
          try {
            let result = onfulfilled(this.value);
            resolvePromise(_promise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedArray.push(() => {
          try {
            let result = onrejected(this.reason);
            resolvePromise(_promise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }
  }

  catch(catchFunc) {
    return this.then(null, catchFunc);
  }
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("data");
  }, 2000);
});

// promise
console.log("promise: ", MyPromise.obj);
