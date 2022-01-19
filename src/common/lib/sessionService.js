/**
 * Created by myzony@qq.com on 2019/5/7.
 * sessionStorage
 */
class SessionService {
  mystorage = null;
  constructor() {
    if (!window.sessionStorage) {
      this.mystorage = {};
      throw new Error('Current browser does not support Local Storage');
    } else {
      this.mystorage = window.sessionStorage;
    }
  }
  /**
   * @description 设置sessionStorage
   * @param {String} key
   * @param {Any} value
   */
  set(key, value) {
    this.mystorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description 获取sessionStorage
   * @param {String} key
   * @returns {Any}
   */
  get(key) {
    return this.mystorage.getItem(key) || false;
  }

  /**
   * @description 删除sessionStorage
   * @param {String} key
   */
  remove(key) {
    this.mystorage.removeItem(key);
  }

  /**
   * @description 清除所有sessionStorage
   */
  removeAll() {
    this.mystorage.clear();
  }
}
export default new SessionService();
