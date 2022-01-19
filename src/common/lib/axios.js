/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2021-04-07 10:46:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 15:36:18
 */
import axios from 'axios';
import qs from 'qs';
import LocalService from './localService';
import { Loading, Message, MessageBox } from 'element-ui';

// 网络错误MAP
const NETWORK_ERROR = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时'
};

/**
 * 创建axios实例
 * @param {Object} params
 * @param {boolean} params.loading - 是否显示加载器
 * @param {boolean} params.cancelable - 是否需要取消相同请求
 * @returns instance
 */
function createInstance({ loading, cancelable }) {
  // 创建实例
  const instance = axios.create();

  // baseURL
  instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  // 超时(1000秒)
  instance.defaults.timeout = 1000000;

  // 允许携带cookie
  instance.defaults.withCredentials = false;

  // 为已知需要花费很长时间的请求覆写超时设置
  // instance.get('/longRequest', {
  //   timeout: 5000000
  // });

  // 添加请求拦截器
  instance.interceptors.request.use(function(config) {
    // 添加请求token
    const auth = LocalService.get('token');
    if (auth) config.headers.Authorization = auth;

    // 添加cancel token, 并且将请求地址和队友的cancel token 存入，cancelTokenList
    if (cancelable) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      config.cancelToken = source.token;
      cancelTokenQueue.add(config, source);
    }

    // 加载器数量+1
    if (loading) requestLoading.add();

    return config;
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function(response) {
    // 删除cancel token
    if (cancelable) cancelTokenQueue.delete(response.config);

    // 加载器数量-1
    if (loading) requestLoading.delete();

    // 对响应数据做点什么
    if (response.status === 200) {
      return customResponse(response.data);
    }
    return Promise.reject(NETWORK_ERROR(response.status));
  }, function(error) {
    // 加载器数量-1
    if (loading) requestLoading.delete();

    // 对响应错误做点什么
    return Promise.reject(error);
  });

  return instance;
}

// 请求加载器
const requestLoading = {
  requestNumber: 0,
  loading: null,
  add: function() {
    this.requestNumber += 1;
    this.calcLoading();
  },
  delete: function() {
    this.requestNumber -= 1;
    this.calcLoading();
  },
  // 计算显示与否
  calcLoading: function() {
    if (this.requestNumber > 0) {
      this.loadingOpen();
    } else {
      this.loadingClose();
    }
  },
  // 打开加载器
  loadingOpen: function() {
    this.loading = Loading.service({
      target: 'body',
      background: 'transparent',
      text: '载入中'
    });
  },
  // 关闭加载器
  loadingClose: function() {
    if (this.loading) this.loading.close();
  }
};

/**
 * 请求取消
 * 在请求拦截阶段添加get请求到取消队列
 * 如果有添加的存在相同的请求则先取消旧请求，然后重新添加新请求
 * 在响应阶段删除队友的取消队列
 */
const cancelTokenQueue = {
  cancelTokenList: {},
  add: function(request, source) {
    if (request.method !== 'get') {
      return;
    }

    // 如果有参数则拼接参数然后加入到请求队列中
    const { url, params } = request;
    const requestUrl = params ? `${url}?${qs.stringify(params)}` : url;

    // 如果原本存在相同的请求则先取消旧请求，然后重新添加新请求
    if (this.cancelTokenList[requestUrl]) {
      this.cancelTokenList[requestUrl].cancel(`请求 ${requestUrl} 已经被取消`);
    }
    this.cancelTokenList[requestUrl] = source;
  },
  delete: function(request) {
    if (request.method !== 'get') {
      return;
    }

    const { url, params } = request;
    const requestUrl = params ? `${url}?${qs.stringify(params)}` : url;
    if (this.cancelTokenList[requestUrl]) {
      delete this.cancelTokenList[requestUrl];
    }
  }
};

// 自定义返回结果处理
function customResponse(data) {
  const { status, message } = data;
  if (status === '401') {
    loginOverdue();
  } else if (status === '1000') {
    googleError(data);
  } else if (status !== '0' && status !== '401' && status !== '1000') {
    normalError(message);
  }

  return data;
}

// 登陆过期
const loginOverdue = (function() {
  let isAlert = false;
  return function() {
    if (!isAlert) {
      MessageBox.alert('你的登陆已经过期，请先登录后继续操作！', '登陆过期', {
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {
          isAlert = false;
          logout();
        }
      });
      isAlert = true;
    }
    return Promise.reject('登陆过期');
  };
})();

// Google报错
const googleError = (function(error) {
  let isAlert = false;
  return function() {
    if (!isAlert) {
      const { data = [] } = error;
      const errorStr = data.map((text, index) => `<li>${index + 1}: ${text}</li>`).join('');
      MessageBox.alert(`<ul>${errorStr}</ul>`, 'Google服务器报错', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {
          isAlert = false;
        }
      });
      isAlert = true;
    }
    return Promise.reject('Google报错');
  };
})();

// 一般错误信息
const normalError = (function() {
  let isAlert = false;
  return function(message) {
    if (!isAlert) {
      Message({
        showClose: true,
        message: message || '请求失败',
        type: 'error',
        onClose: function() {
          isAlert = false;
        }
      });
      isAlert = true;
    }
    return Promise.reject(message);
  };
})();

// 注销
function logout() {
  LocalService.remove('token');
  LocalService.remove('menu');
  location.replace('/');
}

// 带加载器
const request = createInstance({ loading: true, cancelable: false });
// 不带加载器
const requestWidthoutLoading = createInstance({ loading: false, cancelable: false });

export {
  request,
  requestWidthoutLoading
};
