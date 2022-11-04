import {useState} from 'react'
/**
* 用 hooks 和 class 分别实现倒计时功能
* 封装一个React hook, 实现计时器功能, 支持启动，暂停，取消
initValue 为倒计时时间
*/
export function useTimer(initValue = 0) {
  const [curTime, setTime] = useState(initValue);
  const timerInstance = useRef(null);
  const timer = {
    start: () => {
      if (curTime > 0) {
        timerInstance.current = setTimeout(() => {
          setTime(p => --p);
          this.start();
        }, 1000);
      }
    },
    pause: () => {
      if (timerInstance.current) {
        clearTimeout(timerInstance.current);
      }
    },
    reset: () => {
      setTime(initValue);
    },
  };
  return timer;
}
