function deepClone(obj) {
  // 本身是数组
  if (Array.isArray(obj)) {
    const newArray = [];
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        newArray.push(deepClone(item))
      } else {
        newArray.push(item);
      }
    }
    return newArray;
  }
  // 本身是对象
  const newObj = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      newObj[key] = deepClone(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

const obj = {
  name: 1,
  deep: {
    x: 2,
    y: 3
  }
}

console.log(deepClone(obj));