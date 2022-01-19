/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-03-23 17:40:43
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2020-11-05 19:55:51
 */
import { request, requestWidthoutLoading } from '@/common/js/axios';
import qs from 'qs';

class ApiHelper {
  /**
   * @description GET 请求
   * @param {String} _url 请求路径
   * @param {Object} _params 请求参数
   * @returns {Promise}
   */
  get(_url, _params) {
    return new Promise((resolve, reject) => {
      request.get(_url, { params: _params })
        .then(response => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getWidthoutLoading(_url, _params) {
    return new Promise((resolve, reject) => {
      requestWidthoutLoading.get(_url, { params: _params })
        .then(response => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description POST 请求
   * @param {String} _url 请求路径
   * @param {Object} _params 请求参数
   * @returns {Promise}
   */
  post(_url, _params) {
    return new Promise((resolve, reject) => {
      request.post(_url, _params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  postWidthoutLoading(_url, _params) {
    return new Promise((resolve, reject) => {
      requestWidthoutLoading.post(_url, _params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description PUT 请求
   * @param {String} _url 请求路径
   * @param {Object} _params 请求参数
   * @returns {Promise}
   */
  put(_url, _params) {
    return new Promise((resolve, reject) => {
      request.put(_url, _params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description DELETE 请求
   * @param {String} _url 请求路径
   * @param {Object} _params 请求参数
   * @returns {Promise}
   */
  delete(_url, _params) {
    return new Promise((resolve, reject) => {
      const url = _params ? `${_url}?${qs.stringify(_params)}` : _url;
      request.delete(url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description 终止所有的请求
   */
  clearFetch() {
  }
}

export default new ApiHelper();
