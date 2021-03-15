// race控制请求并发数 以加载img为例
const limitLoad = (urls = [], handle = () => {}, limit = 1) => {
  // 拷贝一份数据，避免影响修改原数组
  const sequence = [].concat(urls);
  console.log("sequence: ", sequence); //! dhj test
  let promises = [];
  // 取出最大并发的数组并执行handle返回对应的下表
  promises = sequence.splice(0, limit).map((url, index) => {
    return handle(url).then(() => {
      return index;
    });
  });

  // 开始并发
  let p = Promise.race(promises);
  // 链式调用修改p。for同步执行完以后会形成 p.then().then.then。。。。的结果
  for (let index = 0; index < sequence.length; index++) {
    // 当有最先执行完的Promise返回以后替换promises对应返回下标的handle
    p = p.then((res) => {
      promises[res] = handle(sequence[index]).then(() => {
        // 再次返回上次的下标，以共下次替换需要
        return res;
      });
      
      // 继续并发
      return Promise.race(promises);
    });
  }
  console.log('p: ', p); //! dhj test
};
const urls = [
  {
    info: "img1",
    time: 2000,
  },
  {
    info: "img2",
    time: 1000,
  },
  {
    info: "img3",
    time: 4000,
  },
  {
    info: "img4",
    time: 2000,
  },
  {
    info: "im5",
    time: 1000,
  },
  {
    info: "img6",
    time: 4000,
  },
  {
    info: "img7",
    time: 3000,
  },
  {
    info: "img8",
    time: 1000,
  },
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("---start   " + url.info);
    setTimeout(() => {
      console.log(url.info + "   OK");
      resolve();
    }, url.time);
  });
}

limitLoad(urls, loadImg, 3);
