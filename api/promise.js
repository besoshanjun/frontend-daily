const PEDDING = 'PEDDING';
const REFULLED = 'REFULLED';
const REJECTED = 'REJECTED';

class ZPromise {
  constructor() {
    let self = this;
    self._param = null; // 返回值
    self._status = PEDDING; // 添加状态
    // then方法返回的promise对象的resolve和reject
    self.nextResolve = null;
    self.nextReject = null;
    // 记录then的方法参数
    self.asynFulliled = null;
    self.asynRejected = null;

    self.then = function(onFulliled, onReject) {

    }

  }

}