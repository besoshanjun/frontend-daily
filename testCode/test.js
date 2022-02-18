async function async1() {
  console.log('async1 start') // step 4: 直接打印同步代码 async1 start
  await async2() // step 5: 遇见 await，首先执行其右侧逻辑，并在这里中断 async1 函数
  console.log('async1 end') // step 11: 再次回到 async1 函数，await 中断过后，打印代码 async1 end
}

async function async2() {
  console.log('async2') // step 6: 直接打印同步代码 async2，并返回一个 resolve 值为 undefined 的 promise
}

console.log('script start') // step 1: 直接打印同步代码 script start

// step 2: 将 setTimeout 回调放到宏任务中，此时 macroTasks: [setTimeout]
setTimeout(function() {            
  console.log('setTimeout') // step 13: 开始执行宏任务，输出 setTimeout
}, 0)  

async1() // step 3: 执行 async1 

// step 7: async1 函数已经中断，继续执行到这里
new Promise(function(resolve) {
  console.log('promise1') // step 8: 直接打印同步代码 promise1
  resolve()
}).then(function() { // step 9: 将 then 逻辑放到微任务当中
  console.log('promise2') // step 12: 开始执行微任务，输出 promise2
})

console.log('script end') // step 10: 直接打印同步代码 script end，并回到 async1 函数中继续执行 