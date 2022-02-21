// 使用 reduce实现
function limitLoad(urls, loadImage, limit) {
  const urlsCopy = [...urls];
  // 如果数组的长度小于最大并发数，直接全部请求
  if(urlsCopy.length < limit) {
    const promiseArray = urls.map(url => loadImage(url))
    return Promise.all(promiseArray)
  }

  // splice会改变原数组
  // 维护index用于替换对应下边的Promise
  const promiseFormat = urlsCopy.splice(0, limit).map((url, index) => ({p: loadImage(url,index), index}))
  const promiseArray = promiseFormat.map(item => item.p)

  urlsCopy.reduce(
    (prevPromise, url) =>
    prevPromise.then(() => Promise.race(promiseArray))
    .catch(error => console.log(error))
    .then(index => {
      console.log('index: ', index); //! dhj test
      // 将index对应的Promise替换掉, 然后继续执行promiseArray
      promiseArray[index] = loadImage(url,index)
    })
  , Promise.resolve())
}

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

function loadImage(url, index) {
  return new Promise((resolve, reject) => {
    console.log("---start   " + url.info);
    setTimeout(() => {
      console.log(url.info + "   OK");
      resolve(index);
    }, url.time);
  });
}
limitLoad(urls, loadImage, 3);