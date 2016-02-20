var cart;
var grand_total;
var cart_container = $('#cart_container table > tbody ');
if(cart_items[0].product_id == '' && cart_items[0].product_name == '') {
	cart = [];
 $('#cart_container thead').hide();
 $('#cart_container table').css('text-align','center').html('NO PRODUCTS IN THE SHOPPING CART');
} else {
	cart = cart_items.map(function(item) { return item;});
}

function renderItems(array) {
	cart_container.html('');
	array.map(function(product, index){
		var item = '<tr class="cart-item space"> \
								<td width="20%"><img src="images/'+product.product_image+'" class="cart-product-image"></td> \
								<td width="20%"><h4>'+product.product_name+'</h4> </td> \
								<td width="20%"><input type="number" class="cart-product-qty" value="'+product.quantity_ordered+'" min="1" max="'+product.quantity+'" \
								onkeypress="return isNumberKey(event)" onkeydown="return onKeyDown(event)" data-prod_id='+product.product_id+'> </td> \
								<td width="20%"><h4>'+product.price+'</h4> </td> \
								<td width="20%"><h4>'+product.subtotal+'</h4> </td> \
								<td width="20%"><span class="remove-item" data-product_id='+product.product_id+'>x</span> </td> \
								</tr>';
		cart_container.append(item);
	});
	var getSubtotalsArray = array.map(function(product,index) { return parseInt(product.subtotal) });
  grand_total = getSubtotalsArray.reduce(function(a,b) { return a + b });
  $('#shopping-cart-details').html('');
  var template = '<div class="total text-right">TOTAL:    '+grand_total+'</div>\
  								<div class="payment-btn"> \
  										<a href="#paypalPayment" id="paypal_payment_modal" class="paypal"> </a> \
  										<a class="cod" id="cod_payment" href="#codPayment">Cash On Delivery </a> \
  								</div>';
  $('#shopping-cart-details').append(template);
}

function isNumberKey(evt)   {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57))
         return false;

      return true;
   }

function onKeyDown(event) {   
  event.preventDefault();
}

renderItems(cart);

// ==============================
$('body').on('click','.remove-item', function() {
	var product_id = $(this).data('product_id');
	var itemSearched = cart_items.filter(function(product,index) {  return product_id == product.product_id; });
	var subtotal = itemSearched[0].subtotal;
	grand_total = grand_total - subtotal;
	var filterCart = cart_items.filter(function(item) { return item.product_id != product_id; });
	cart_items = filterCart;
	var cart_items_id = cart_items.map(function(item){ return parseInt(item.product_id); });
	var json_cart = JSON.stringify(cart_items_id);
	if(cart_items_id.length) {
 		document.cookie="cart="+json_cart;
	} else {
		document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	renderItems(cart_items);
});

$('.cart-product-qty').keyup(function() {
	// to avoid input greater than product quantity
	var val = parseInt($(this).val());
	var max = parseInt($(this).attr('max'));
	if(val > max) {
		$(this).val(max);
	}
});


$('body').on('change','.cart-product-qty', function() {
	var product_id = $(this).data('prod_id');
	var itemSearched = cart_items.filter(function(product,index) {  return product_id == product.product_id; });
	var price = parseInt(itemSearched[0].price);
	var quantity = parseInt($(this).val());
	var subtotal = quantity * price;
	var updatecart_items =  cart_items.filter(function(product,index) { 
			if(product.product_id == product_id) {
				product.subtotal = subtotal;
				product.quantity_ordered = quantity;
			} 
			return product; 
		});
	cart_items = updatecart_items;
	renderItems(cart_items);
});


$('body').on('click','#cod_payment', function() {
	$('#cod_total').val(grand_total);
});

$('body').on('click','#paypal_payment_modal', function() {
	$('#paypal_total').val(grand_total);
});

$('body').on('click','#cod_pay', function() {
			var products = cart_items.map(function(cart) {return cart.product_id;});
			var dataObj = {
				"user_id" : user_id,
				"payment_method" : 'cod',
				"transaction_id" : $('#transaction_id').val(),
				"shipping_address" : $('#shipping_address').val(),
				"shipping_contact_number" : $('#shipping_contact_number').val(),
				"total_amount" : $('#cod_total').val(),
				"products" : JSON.stringify(cart_items)
			};
			console.log(dataObj);
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 $.ajax({
		      type: "POST",
		      dataType: "json",
		      url: 'modules/codPay.php',
		      data: dataObj,
		      beforeSend: function(xhr, opts) {
		      	$('#cod_pay').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
		      },
		      success: function(data) {
		      	document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		      	window.location.href = "cod_success_transaction.php";
		      },
		      error: function(xhr, status, error) {
		      }
		  });
});


$('body').on('click','#paypal_payment', function() {
	 		var products = cart_items.map(function(cart) {return cart.product_id;});
			var dataObj = {
				"cart" : JSON.stringify(cart_items),
				"grand_total" : grand_total,
				"shipping_address" : $('#shipping_address_paypal').val(),
				"shipping_contact_number" : $('#shipping_contact_number_paypal').val(),
				"user_id" : user_id
			};
			console.log(dataObj);
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 $.ajax({
		      type: "POST",
		      dataType: "json",
		      url: 'modules/createCartSession.php',
		      data: dataObj,
		      beforeSend: function(xhr, opts) {
		      },
		      success: function(data) {
		      	// document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		      	window.location.href = "modules/paypalPay.php";
		      },
		      error: function(xhr, status, error) {
		      }
		  });
});