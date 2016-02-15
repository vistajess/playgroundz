var cart;
var cart_container = $('#cart_container');
if(cart_items[0].product_id == '' && cart_items[0].product_name == '') {
	cart = [];
} else {
	cart = cart_items.map(function(item) { return item;});
	console.log(cart);
}

function renderItems(array) {
	console.log('render');
	console.log(cart);
	array.map(function(product, index){
		var item = '<tr class="cart-item space"> \
								<td width="20%"><img src="images/'+product.product_image+'" class="cart-product-image"></td> \
								<td width="20%"><h6>'+product.product_name+'</h6> </td> \
								<td width="20%"><input type="text" class="cart-product-qty" value="1"> </td> \
								<td width="20%"><h6>'+product.price+'</h6> </td> \
								</tr>';
		cart_container.append(item);
	});
}

renderItems(cart);