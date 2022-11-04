const cloneFun = (value) => {
  const isFun = typeof value === "function";
  if (isFun) {
    return value;
  }
};

const cloneSymbol = (symbol) => {
  // 缓存方法
  const symbolValue = Symbol.prototype.valueOf;
  return Object(symbolValue.call(symbol));
};

const cloneStatic = (target) => {
  const Ctor = target.constructor;
  return new Ctor(target);
};

const cloneRegExp = (regexp) => {
  const reFlags = /\w*$/;
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
};

const getType = (attr) => {
  const type = Object.prototype.toString.call(attr);
  const newType = type.substr(8, type.length - 9);
  return newType;
};

const isObject = (value) => {
  const type = typeof value;
  // 过滤null
  return value !== null && (type === "object" || type === "function");
};

const cloneDeep = (target, map = new WeakMap()) => {
  // 判断传入的类型是否为object
  if (!isObject(target)) {
    return target;
  }

  let newTarget = {};

  switch (getType(target)) {
    case "Number":
    case "String":
    case "Boolean":
    case "Date":
      return cloneStatic(target);
    case "RegExp":
      return cloneRegExp(target);
    case "Function":
      return cloneFun(target);
    case "Array":
      newTarget = [];
      break;
    case "Map":
      newTarget = new Map();
      break;
    case "Set":
      newTarget = new Set();
      break;
  }

  // 查询map中是否有存在原对象（target），如果存在直接返回
  if (map.has(target)) {
    return target;
  }
  // 如果map中不存在原对像target，则储存进map中
  map.set(target, newTarget);
  if (getType(target) === "Map") {
    target.forEach((value, key) => {
      newTarget.set(key, cloneDeep(value, map));
    });
    return newTarget;
  }
  if (getType(target) === "Set") {
    target.forEach((value, key) => {
      newTarget.add(key, cloneDeep(value, map));
    });
    return newTarget;
  }
  for (const key in target) {
    // 判断属性是否在对象本身上
    if (target.hasOwnProperty(key)) {
      newTarget[key] = cloneDeep(target[key], map);;
    }
  }
  return newTarget;
};

// 测试代码

function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
    temp = temp["data"] = {};
    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }
  return data;
}

let oneSymbol = Symbol("name");

let newMap = new Map();
newMap.set("name", { name: "everybody" });
// 实例化Set
let newSet = new Set();
newSet.add("age", { age: 18 });
const target = {
  val1: 1,
  val2: undefined,
  val4: "target",
  val5: {
    name: "target",
    age: function() {
      console.log("永远18岁");
    },
    sym: Symbol("setter")
  },
  val32: new Boolean(true),
  val23: new String(true),
  val443: new Number(true),
  date: new Date(),
  reg: /\d+/,
  empty: null,
  newMap,
  newSet,
  arrowFunc: () => {
    console.log("test111");
  },
  deepObj: createData(10, 100)
};
target[oneSymbol] = "name";
console.time();
const ss = cloneDeep(target);
console.timeEnd();

console.log(ss);
