/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-03-02 10:04:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2020-06-05 10:42:14
 */
class LocalService {
  mystorage = null;
  constructor() {
    if (!window.localStorage) {
      this.mystorage = {};
      throw new Error('Current browser does not support Local Storage');
    } else {
      this.mystorage = window.localStorage;
    }
  }

  /**
   * @description 设置localStorage
   * @param {String} key
   * @param {Any} value
   */
  set(key, value) {
    this.mystorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description 获取localStorage
   * @param {String} key
   * @returns {Any}
   */
  get(key) {
    return this.mystorage.getItem(key) ? JSON.parse(this.mystorage.getItem(key)) : false;
  }

  /**
   * @description 删除localStorage
   * @param {String} key
   */
  remove(key) {
    this.mystorage.removeItem(key);
  }

  /**
   * @description 清除所有localStorage
   */
  removeAll() {
    this.mystorage.clear();
  }
}

export default new LocalService();
