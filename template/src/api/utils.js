import Vue from 'vue';
import VueResource from 'vue-resource';
import { Message } from 'element-ui';

Vue.use(VueResource);

function access(url, param, method) {
  /* eslint-disable no-param-reassign */
  param = param || {};
  let ret = null;
  const upperMethod = method.toUpperCase();
  if (upperMethod === 'POST') {
    ret = Vue.http.post(url, param);
  } else if (upperMethod === 'PUT') {
    ret = Vue.http.put(url, param);
  } else if (upperMethod === 'DELETE') {
    ret = Vue.http.delete(url, { params: param });
  } else {
    ret = Vue.http.get(url, { params: param });
  }
  return ret.then((res) => {
    if (res.body.ok) {
      return res.body;
    }

    Message.error({
      message: res.body.reason,
    });

    throw new Error(res.body.reason);
  }, (res) => {
    Message.error({
      message: res.body,
    });
  });
}

export default {
  get(url, param) {
    return access(url, param, 'get');
  },
  delete(url, param) {
    return access(url, param, 'delete');
  },
  post(url, param) {
    return access(url, param, 'post');
  },
  put(url, param) {
    return access(url, param, 'put');
  },
};
