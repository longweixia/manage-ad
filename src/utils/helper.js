// import moment from 'moment'

/**
 * 判断数据类型
 * 
 * @param {any} obj 
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

/**
 * 深度克隆
 * 
 * @param {any} data 
 */


export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 笛卡尔积
 * 
 * @param {Array} list 
 */
export function descartes(list) {
  var point = {};
  var result = [];
  var pIndex = null;
  var tempCount = 0;
  var temp = [];

  for (var index in list) {
    if (typeof list[index] == 'object') {
      point[index] = {
        'parent': pIndex,
        'count': 0
      }
      pIndex = index;
    }
  }

  if (pIndex == null) {
    return list;
  }

  while (true) {
    for (var index in list) {
      tempCount = point[index]['count'];
      temp.push(list[index][tempCount]);
    }
    result.push(temp);
    temp = [];
    while (true) {
      if (point[index]['count'] + 1 >= list[index].length) {
        point[index]['count'] = 0;
        pIndex = point[index]['parent'];
        if (pIndex == null) {
          return result;
        }
        index = pIndex;
      } else {
        point[index]['count']++;
        break;
      }
    }
  }
}

/**
 * 向上查询指定名称的组件
 * 
 * (查询父组件)
 * 
 * @param {object} context 
 * @param {string} componentName 
 * @param {array} componentNames 
 */
export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * 向下查询指定名称的组件
 * 
 * (查询子组件)
 * 
 * @param {object} context 
 * @param {string} componentName 
 */
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

/**
 * 向下查询指定名称的组件集合
 * 
 * (查询子组件集合)
 * 
 * @param {object} context 
 * @param {string} componentName 
 */
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

/**
 * 向上查询指定名称的组件集合
 * 
 * (查询父组件集合)
 * 
 * @param {object} context 
 * @param {string} componentName 
 */
export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

/**
 * 查询兄弟组件集合
 * 
 * @param {object} context 
 * @param {string} componentName 
 * @param {boolean} exceptMe 
 */
export function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

/**
 * 重定向到一个 URL
 * @param {string} url 重定向到 url
 * @param {boolean} asLink  模拟链接点击(true - 默认值) 或 HTTP重定向(false)。
 */
export function redirect(url, asLink = true) {
  asLink ? (window.location.href = url) : window.location.replace(url);
}


// 格式化时间
// export const formatTime = (value = null, format = 'YYYY-MM-DD HH:mm:ss') => {
//   if (!value) return '-'
//   return moment(value).format(format)
// }

// 上传图片限制
export const validImage = function (file, limit = 20) {
  if (!file) return false
  let imageType = file.name.match(/[^.]*$/)[0]
  // 转小写
  imageType = imageType.toLowerCase()
  if (!['jpg', 'jpeg', 'png'].includes(imageType)) {
    this.$Message.error('图片格式为.jpg或.png')
    return false
  }
  let size = Math.round(file.size * 100 / 1024 / 1024) / 100
  // 大于20M
  if (size > limit) {
    this.$Message.error(`图片大小不能大于${limit}M`)
    return false
  }
  return true
}


// 针对UMS给的时间对象格式化
// export const DateObjformatTime = (timeObj, format = 'YYYY-MM-DD HH:mm:ss') => {
//   if (!timeObj) return '-'
//   let {
//     year,
//     monthValue,
//     dayOfMonth,
//     hour,
//     minute,
//     second
//   } = timeObj,
//   date = `${year}-${monthValue}-${dayOfMonth} ${hour}:${minute}:${second}`
//   return moment(date).format(format)
// }
