/* eslint-disable default-case */

class CustomPromise {
  constructor(handleFunc) {
    this.state = "pending";
    this.value = undefined;

    this.fulfilledList = [];

    handleFunc(this.triggerResolve);
  }

  triggerResolve = (val) => {
    // 这里使用setTimeout是为了有时间收集所有的依赖，不至于new完Promise以后直接执行resolve
    setTimeout(() => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = val;
      this.fulfilledList.forEach((item) => item(val));
      this.fulfilledList = [];
    }, 0);
  };

  then(onFulfilled, onRejected) {
    const { value, state } = this;
    // 每个then方法都会返回一个promise
    return  new CustomPromise(
      (onNextFulfilled, onNextRejected) => {
        // 让我们的方法串联起来 串联当前的onFulfilled和下一次的onNextFulfilled，
        function onFinalFulfilled(val) {
          // 不是function时，跳过当前的onFulfilled
          if (typeof onFulfilled !== "function") {
            onNextFulfilled(val);
          } else {
            const res = onFulfilled(val);
            
            if (res && typeof res.then === "function") {
              // res 是一个promise
              res.then(onNextFulfilled);
            } else {
              onNextFulfilled(res);
            }
          }
        }

        switch (state) {
          case "pending": {
            this.fulfilledList.push(onFinalFulfilled);
            break;
          }
        }
      }
    );
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static all(list) {
    return new CustomPromise((resolve, reject) => {
      let count = 0;
      const values = [];
      for (const [i, customPromise] of list.entries()) {
        customPromise.then(
          (res) => {
            values[i] = res;
            count++;
            if (count === list.length) resolve(values);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  static resolve(val) {
    return new CustomPromise((resolve) => resolve(val));
  }
}

const createPromise = function (time) {
  return new CustomPromise(function (resolve, reject) {
    console.log("resolve: ", resolve);
    setTimeout(resolve, time);
  });
};

const promiseInstance = createPromise(1000);

promiseInstance.then(function () {
  console.log("hello world");
  return "123";
});
