$(document).ready(function() {
	renderItems();

	$('body').on('click', '.add-cart', function () {
		var product_id = $(this).data('id');
		addToCart(product_id);
	});

  $('body').on('click', '.remove-cart', function () {
    var product_id = $(this).data('id');
    var qty = $(this).data('qty');
    removeItem(product_id,parseInt(qty));
  });

});

//=============================== VARIABLES IN GLOBAL SCOPE 

	// These are sample products and in your case may came from database or fetch through API
var products = [
				{
            "id": 1,
            "name": "Iphone 6",
            "description": "Sample Description",
            "price": 4000,
            "quantity": 120,
            "image_path":"images/prod1.jpg"
        },
        {
            "id": 2,
            "name": "Power Bank",
            "description": "power bank of the whole world",
            "price": 250,
            "quantity": 230,
            "image_path":"images/prod2.jpg"
        },
        {
            "id": 3,
            "name": "Bea Anne Cruz",
            "description": "Confident.overload()",
            "price": 4500,
            "quantity": 15,
            "image_path":"images/prod3.jpg"
        },
        {
            "id": 4,
            "name": "Laptop",
            "description": "Matibay na laptop, kahit basain mababasa pa rin",
            "price": 25000,
            "quantity": 20,
            "image_path":"images/prod4.jpg"
        },
        {
            "id": 5,
            "name": "Razer Mechanical Keyboard",
            "description": "",
            "price": 7500,
            "quantity": 85,
            "image_path":"images/prod5.jpg"
        },
        {
            "id": 6,
            "name": "Hokage Lvl 999",
            "description": "",
            "price": 1430,
            "quantity": 40,
            "image_path":"images/prod6.jpg"
        }
        ];

  var cartItems = [];
  var cartTotal = 0;

// ========================== FUNCTIONS 
function addToCart(product_id) {
  var item_qty = 1;
  var item = products.filter(function(product,index) { return product_id == product.id; });
  var searchItemsInCart = cartItems.filter(function(product,index) {  return product_id == product.id; });

  if( !searchItemsInCart.length ) {
    // create a copy of your product item so that we cannot overwrite the quantity value
    var copy_item = Object.assign({}, item[0]);
    copy_item.quantity = 1;
    copy_item.subtotal = item[0].price;
    cartItems.push(copy_item);
  } else {
    searchItemsInCart[0].quantity = searchItemsInCart[0].quantity + 1;
    searchItemsInCart[0].subtotal = parseInt(searchItemsInCart[0].price) * parseInt(searchItemsInCart[0].quantity);
  }
  //IF PRODUCT LIST item is less than or equal to ZERO , then remove the item from product list
  if( item[0].quantity == 1) {
    var filterProductList =  products.filter(function(product, index) {
      return product_id != product.id;
    });
   products = filterProductList;
  } else {
    item[0].quantity = item[0].quantity - 1;
  }
  //update the cart
  renderCartItems(item_qty);
  //update the product list
  renderItems();
}


function removeItem(product_id,qty) {
  var item = products.filter(function(product,index) { return product_id == product.id; });
  var removeItemInCart = cartItems.filter(function(cartItem,index) {  return product_id != cartItem.id; });
  var findItemInCart = cartItems.filter(function(cartItem,index) {  return product_id == cartItem.id; });

  !item.length ? products.push(findItemInCart[0]) : item[0].quantity = item[0].quantity + qty;

  cartItems = removeItemInCart;
  renderItems();
  renderCartItems();
}

function renderItems() {
	  $('#product-container').html('');
	  products.map(function(product, index) {
    var item = '<div class="item-container col-md-6"> \
                  <div class="product-item col-md-12 text-center"> \
    							<img class="img-responsive center-block product-image" src='+product.image_path+' > \
  			  				<h3>'+ product.name+'</h3> \
  			  				<h5>P '+ product.price+'.00</h5> \
  			  				<h6>Qty: ' + product.quantity + '</h6> \
  			  				<button class="btn btn-success add-cart" data-index='+index+' data-id='+product.id+'>Add to Cart </button> \
                  </div> \
			  				</div>';
  	$('#product-container').append(item);
  });
};


function renderCartItems() {
    $('#cart-container').html('');
    cartItems.map(function(item, index) {
    var item = '<div class="cart-item col-md-12"> \
                  <div class="col-md-3"> \
                    <h6>'+ item.name+'</h6> \
                  </div> \
                  <div class="col-md-3"> \
                    <h5>P '+ item.price+'.00</h5> \
                  </div> \
                  <div class="col-md-2"> \
                    <input type="text" class="qty" value='+ item.quantity +'> \
                  </div> \
                  <div class="col-md-2"> \
                    <button class="btn btn-warning remove-cart" data-qty='+item.quantity+' data-id='+item.id+'>X</button> \
                  </div> \
                  <div class="col-md-2"> \
                    <span>P '+ item.subtotal +'.00</span> \
                  </div> \
                </div>';
    $('#cart-container').append(item);
  });

  var getSubtotalsArray = cartItems.map(function(product,index) { return product.subtotal });
  var total = getSubtotalsArray.reduce(function(a,b) { return a + b });
  var template = '<div class="total text-right col-md-12">TOTAL:P'+total+'.00</div>';
  $('#cart-container').append(template);
};
