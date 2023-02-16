import css from './style/base.css';
console.log(css);

console.log('main');

// let body = document.getElementsByTagName('body')[0];
// let style = document.createElement('style');
// style.innerText = css[0][1];
// body.appendChild(style);

function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111);
    }, 0);
  });
}

export default async function main() {
  const result = await test();
  console.log('result: ', result);
}
