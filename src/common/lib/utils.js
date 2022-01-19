/*
 * @Description: 工具类
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-05-11 13:18:44
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 15:39:52
 */
/**
* 转化为数字
* @param {Number} val 需要转化的数字
* @param {Number} inscriber 保留几位小数 默认2位
* @returns {String}
*/
export function number(val, inscriber = 2) {
  val += ''; // 数字转换为字符
  const x = val.split('.'); // 按照小数点分隔
  let x1 = x[0]; // 整数部分
  const x2 = x.length > 1 ? '.' + x[1] : ''; // 小数部分
  var rgx = /(\d+)(\d{3})/; // 正则式定义
  while (rgx.test(x1)) { // 正则式匹配
    x1 = x1.replace(rgx, '$1' + ',' + '$2'); // 正则式替换
  }
  return x1 + x2.substr(0, inscriber + 1);
}

/**
 * 过滤一遍数组，防止使用数组方法的时候报错
 * @param {Array} arr 需要过滤的数组
 * @returns {Array}
 */
export function filterArray(arr) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    return [];
  }
}

/**
 * 获取文本的长度
 * @param {String} str
 */
export function getTextLength(str) {
  let l = 0;
  for (let i = 0; i < str.length; i++) {
    const text = str.charAt(i);
    const code = text.charCodeAt(0);
    if (code < 299) {
      l++;
    } else {
      l += 2;
    }
  }
  return l;
}

/**
 * 获取网页地址中的参数
 * @param {String} url - 网页地址
 * @return {Object}
 */
export function getUrlQuery(url) {
  const urlArr = url.split('?');
  const host = urlArr[0];
  const queryStr = urlArr[1];
  if (queryStr) {
    const queryItems = queryStr.split('&');
    const query = {};
    queryItems.forEach(queryItem => {
      const arr = queryItem.split('=');
      query[arr[0]] = arr[1];
    });
    return {
      host,
      query
    };
  } else {
    return {
      host
    };
  }
}

/**
 * 获取图片的尺寸
 * @param {String} url - 图片url
 * @return {Promise}
 */
export function getImageSize(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject();
    }

    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
  });
}

// 计算时间覆盖
export function calcOverlapTime(rangeDateList) {
  let timestampList = rangeDateList.map(item => {
    return {
      start: new Date(item.startDate).getTime() / 1000,
      end: new Date(item.endDate).getTime() / 1000
    };
  });
  timestampList = timestampList.sort((a, b) => {
    return a.start - b.start;
  });

  let isOverlap = false;
  for (let i = 1; i < timestampList.length; i++) {
    const currentDate = timestampList[i];
    const prevDate = timestampList[i - 1];
    if (currentDate.start < prevDate.end) {
      isOverlap = true;
      return isOverlap;
    }
  }
  return isOverlap;
}

/**
 * 判断是否是长度大于等于max的数字
 * @param {String,Number} num - 判断的参数
 * @param {Number} max - max
 * @return {Promise}
 */
export function numberMaxLength(num, max) {
  return !isNaN(Number(num)) && num.length >= max;
}

/**
 * 判断是否是长度小于max的数字
 * @param {String,Number} num - 判断的参数
 * @param {Number} max - max
 * @return {Promise}
 */
export function numberMinLength(num, max) {
  return !isNaN(Number(num)) && num.length < max;
}

/**
 * 获取随机数
 * @param {Number} min - 最小随机数
 * @param {Number} max - 最大随机数
 */
export function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * 获取随机的颜色
 * @param {Number} alpha - 色彩透明度
 */
export function randomColor(alpha = 1) {
  const R = Math.floor(randomNumBetween(0, 255));
  const G = Math.floor(randomNumBetween(0, 255));
  const B = Math.floor(randomNumBetween(0, 255));
  return `rgba(${R},${G},${B},${alpha})`;
}

/**
 * 随机ID
 */
export function randomID(length = 8) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

/**
 * 构建树
 * @param {Object} params
 * @param {Array} params.list - 扁平数据
 * @param {String | Number} params.parentValue - 父亲的值
 * @param {String} params.parentValueKey - 父亲的值的字段名
 * @param {String} params.labelKey - label字段名
 * @param {String} params.valueKey - value字段名
 * @param {Number} level - 树的层级
 */
export function createTree(params, level) {
  const { list, parentValue, parentValueKey, labelKey, valueKey } = params;

  const _list = list || [];
  const _parentValue = parentValue;
  const _parentValueKey = parentValueKey || 'parentId';
  const _labelKey = labelKey || 'label';
  const _valueKey = valueKey || 'value';

  function tree(parentVal) {
    return _list
      .filter(item => item[_parentValueKey] === parentVal)
      .map((item) => {
        const children = tree(item[_valueKey]);

        if (children.length > 0) {
          return {
            label: item[_labelKey],
            value: item[_valueKey],
            parent: item[_parentValueKey],
            children
          };
        } else {
          return {
            label: item[_labelKey],
            value: item[_valueKey],
            parent: item[_parentValueKey]
          };
        }
      });
  }
  return tree(_parentValue);
}

/**
 * 获取对象的值
 * @param {Object} form - 表单
 * @param  {...any} selectors - 字段：如studebt.name
 * @returns
 */
export function getValue(form, ...selectors) {
  const res = selectors.map(s => {
    return s
      .replace(/\[(\w+)\]/g, '.$1')
      .split('.')
      .reduce((prev, cur) => {
        return prev && prev[cur];
      }, form);
  });
  return res;
}
