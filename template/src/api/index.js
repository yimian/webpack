// import request from './utils';

const urlPrefix = '';
const urls = {
};

Object.keys(urls).map((url) => {
  urls[url] = urlPrefix + urls[url];
  return url;
});

export default new function API() {
}();
