const { L0Promise, L1Promise, promiseArrGenerator, promiseChain, promisePipe } = require('./promise');
// 没办法使用 setTimeout 无法链式调用
// console.log(1);
// let p = new L1Promise((resolve, reject) => {
//   console.log(3);
//   setTimeout(() => resolve('test'), 1000);
// });

// p.then((data) => {
//   console.log(6);
//   console.log('data: ', data);
// });

const proArr = promiseArrGenerator(100);

// Promise.all(proArr.map((p) => p())).then((data) => {
//   console.log(data);
// });

// promiseChain(proArr);

promisePipe(proArr, 10);
