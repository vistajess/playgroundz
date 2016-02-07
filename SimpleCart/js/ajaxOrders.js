
$('#order_button').click(function() {
	var btnSubmit = $(this);
	var dataObj = {
		"action" : "saveorder",
    "user_info" : user_info,
		"cartItems" : cartItems,
		"total" : parseInt(total)
	};
 dataObj = $(this).serialize() + "&" + $.param(dataObj);
 $.ajax({
      type: "POST",
      dataType: "json",
      url: '../modules/actions.php',
      // contentType: "application/json",
      data: dataObj,
      beforeSend: function() {
        btnSubmit.addClass('disabled').html('<span class="fa fa-spin fa-spinner"></span> Saving');
      },
      success: function(data) {
      	btnSubmit.removeClass('disabled').html('Send Order');
      	$('.actions').hide();
        cartItems = [];
        $('#cart-container').html('Your Order has been sent');
      },
      error: function(xhr, status, error) {
      }
  });

});



$('#register_order').click(function(e) {
  var btnSubmit = $(this);
  var registration_data = $('#registration').serialize();
  var dataObj = {
    "action" : "register_order",
    "registration_data" : {
      "firstname" : $('#registration input[name=firstname]').val(),
      "lastname" : $('#registration input[name=lastname]').val(),
      "address" : $('#registration input[name=address]').val(),
      "username" : $('#registration input[name=username]').val(),
      "password" : $('#registration input[name=password]').val(),
    },
    "cartItems" : cartItems,
    "total" : parseInt(total)
  };
  console.log(dataObj)
   dataObj = $(this).serialize() + "&" + $.param(dataObj);
   $.ajax({
        type: "POST",
        dataType: "json",
        url: '../modules/actions.php',
        data: dataObj,
        beforeSend: function() {
          btnSubmit.addClass('disabled').html('<span class="fa fa-spin fa-spinner"></span> Processing');
        },
        success: function(data) {
          btnSubmit.removeClass('disabled').html('Register and Order');
          console.log('fini',data)
          $('.actions').hide();
          cartItems = [];
          $('#cart-container').html('Your Order has been sent');
          $('#myModal').modal('hide');
        },
        error: function(xhr, status, error) {
        }
    });

});