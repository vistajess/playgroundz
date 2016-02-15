function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function findCartItems() {
	if (document.cookie.indexOf("cart=") === -1) {
	 var cart_array = [] ;

	} else {
		var cookie = getCookie('cart');
		var cart_array = JSON.parse(cookie);
	}
	cart_array.map(function(item , index) {	
		if(item == product_id) {
			$('#add-cart').addClass('disabled').html('Item has been Added');
		}
	});
}

// ===============================================================
	// CHECK IF CART COOKIE EXISTS
	if (document.cookie.indexOf("cart=") === -1){
	 var cart = [] ;
	} else {
		var cookie = getCookie('cart');
		var cart = JSON.parse(cookie);
	}

$('#add-cart').click(function() {
 	var id = $(this).data('product_id');
 	cart.push(id);
 	$(this).html('Item has been added');
 	$(this).addClass('disabled');
 	var json_cart = JSON.stringify(cart);
 	document.cookie="cart="+json_cart;
});
findCartItems();