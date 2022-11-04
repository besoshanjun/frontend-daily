function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (name, callback) {
  if (!this._events) this._events = {};
  const eventList = this._events[name] || (this._events[name] = []);
  eventList.push(callback);
};

EventEmitter.prototype.emit = function (name, ...params) {
  this._events[name] &&
    this._events[name].forEach((cb) => {
      cb(...params);
    });
};

EventEmitter.prototype.off = function (name, callback) {
  this._events[name] = this._events[name].filter((cb) => cb !== callback);
};

EventEmitter.prototype.once = function (name, callback) {
  const once = (...reset) => {
    callback(...reset);
    this.off(name, once);
  };
  this.on(name, once);
};

const e = new EventEmitter();

const handle = (event) => {
  console.log('handle', event);
};
const handle2 = (event) => {
  console.log('handle2', event);
};
e.on('test', handle);
e.once('test', handle2);
setTimeout(() => {
  e.emit('test', 'dhj');
  e.emit('test', 'luyi');
}, 500);
