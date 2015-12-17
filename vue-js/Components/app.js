Vue.component('coupon', {
  template: document.querySelector('#coupon-template'),

  data: function() {
    return {
      coupon: "FOOBAR",
      invalid: false,
      text: ''
    } 
  },

  methods: {
    whenCouponHasBeenEntered: function() {
      this.validate();
    },

    validate: function() {
      if( this.coupon == 'FOOBAR') {
        return this.text = '20% OFF!!';
      }

      return this.text = 'that coupon doesn`t exists';
    }
  }
});

new Vue({
  el: '#demo'
});