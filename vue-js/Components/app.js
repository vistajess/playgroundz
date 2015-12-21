Vue.component('coupon', {
  template: '#coupon-template',

  props: ['applied'],

  data: function() {
    return {
      coupon: '',
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
        console.log(this);
        this.applied(this.coupon);
        return this.text = '20% OFF!!';
      }

      return this.text = 'that coupon doesn`t exists';
    }
  }
});

new Vue({
  el: '#demo',

  methods: {
    setCoupon: function(coupon) {
      this.$set('coupon', coupon);
    }
  }
});

