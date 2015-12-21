var Vue = require('vue');

new Vue({
  el: '#app',
  data: {
    message: "Hello There"
  },
  filters: {
    reverse: require('./filters/reverse')
  }
});