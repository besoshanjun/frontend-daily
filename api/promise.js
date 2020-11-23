class MyPromise {
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
      this.reject(error)
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
        this.onFulfilledArray.forEach(func => {
          func(this.value)
        });
      }
    })
  };

  // 定义在this上
  reject = (reason) => {
    // 讲reject的执行放在setTimeout里面，模拟异步执行（并不严谨），因为setTimeout是宏任务，Promise应该属于微任务
    setTimeout(() => {
      if (this.state === "pending") {
        this.reason = reason;
        this.state = "rejected";
  
        this.onRejectedArray.forEach(func => {
          func(this.reason)
        });
      }
    })
  };

  // 定义在类的prototype属性上
  // 每个 promise 实例的 then 方法逻辑是一致的，在实例调用该方法时，可以通过原型（Promise.prototype）找到，
  // 而不需要每次实例化都新创建一个 then 方法，这样节省内存，显然更合适
  then(onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === "function" ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : (error) => {
            throw error;
          };
    if (this.state === "fulfilled") {
      onfulfilled(this.value);
    }
    if (this.state === "rejected") {
      onrejected(this.reason);
    }

    if (this.state === "pending") {
      this.onFulfilledArray.push(onfulfilled);
      this.onRejectedArray.push(onrejected);
    }
  }
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("data");
  }, 2000);
});

promise.then(
  (res) => {
    console.log("res: ", res);
  },
  (err) => {
    console.log("err: ", err);
  }
);

promise.then(res => {
  console.log('res2', res)
})
