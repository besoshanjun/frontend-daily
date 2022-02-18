function convert(jsonObj) {
  const reg = /_[a-z]/g;
  function walk(oldObj) {
    const obj = {}; 
    // 只改变key，避免全部使用正则替换改变value
    for (const key in oldObj) {
      if (oldObj.hasOwnProperty(key)) {
        const value = oldObj[key];
        const r = key.replace(reg, (m) => {
          return m.substring(1).toUpperCase();
        })
        obj[r] = value;
        if(Array.isArray(value)) {
          const arr = []
          for (const currentObj of value) {
            arr.push(walk(currentObj))
          }
          obj[r] = arr
        }
        return obj
      }
    }
  }
  return walk(jsonObj);
}

console.log(convert({ 'a_bc_def': 1 }));
console.log(convert({ 'a_bc_def': { 'foo_bar': 2 } }));
console.log(convert({ 'a_bc_def': [{ 'foo_bar': 2 }, { 'goo_xyz': 3 }] }));
