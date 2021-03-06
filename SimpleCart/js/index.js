
  renderItems(products);
	renderCategories(categories);

	$('body').on('click', '.add-cart', function () {
		var product_id = $(this).data('id');
		addToCart(product_id);
	});

  $('body').on('click', '.remove-cart', function () {
    var product_id = $(this).data('id');
    var qty = $(this).data('qty');
    removeItem(product_id,parseInt(qty));
  });

  $('body').on('click', '.categories', function () {
    var category_id = $(this).data('category_id');
    var filterByCategory = products.filter(function(product, id) {
      return product.category_id == category_id;
    });
    renderItems(filterByCategory);
  });

  $('body').on('click', '.item-detail', function () {
    var obj = JSON.parse(decodeURIComponent($(this).data('product_object')));
    var modal_body = $('#itemDetail .modal-body');
    modal_body.html('');
    var renderDetails = '<div class="text-center"> \
                          <p><img class="img-responsive center-block product-image" src='+obj.image_path+' > </p>\
                          <p>ID: '+obj.id+'</p>\
                          <p>Name: '+obj.name+'</p>\
                          <p>Price: '+obj.price+'</p>\
                          <p>Price: '+obj.quantity+'</p>\
                        </div>';
    modal_body.append(renderDetails);
    console.log(obj);
  });

  $('#search_btn').click(function (){
      var item_name = $('#search_item').val();
      searchItem(item_name);
  });

  $('#show_all').click(function (){
     $('#search_item').val('');
      renderItems(products);
  });

  $('#sort_items').change(function() {
    var sortBy = $('#sort_items option:selected').val();
    var sortedProducts = products.sort(sortItems(sortBy));
    renderItems(sortedProducts);
  });


//=============================== VARIABLES IN GLOBAL SCOPE 

	// These are sample products and in your case may came from database or fetch through API
// var products = [
// 				{
//             "id": 1,
//             "name": "Iphone 6",
//             "description": "Sample Description",
//             "price": 4000,
//             "quantity": 120,
//             "image_path":"images/prod1.jpg"
//         },
//         {
//             "id": 2,
//             "name": "Power Bank",
//             "description": "power bank of the whole world",
//             "price": 250,
//             "quantity": 230,
//             "image_path":"images/prod2.jpg"
//         },
//         {
//             "id": 3,
//             "name": "Bea Anne Cruz",
//             "description": "Confident.overload()",
//             "price": 4500,
//             "quantity": 15,
//             "image_path":"images/prod3.jpg"
//         },
//         {
//             "id": 4,
//             "name": "Laptop",
//             "description": "Matibay na laptop, kahit basain mababasa pa rin",
//             "price": 25000,
//             "quantity": 20,
//             "image_path":"images/prod4.jpg"
//         },
//         {
//             "id": 5,
//             "name": "Razer Mechanical Keyboard",
//             "description": "",
//             "price": 7500,
//             "quantity": 85,
//             "image_path":"images/prod5.jpg"
//         },
//         {
//             "id": 6,
//             "name": "Hokage Lvl 999",
//             "description": "",
//             "price": 1430,
//             "quantity": 40,
//             "image_path":"images/prod6.jpg"
//         }
//         ];

  var cartItems = [];
  var total = 0;




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
  renderItems(products);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  $('.actions').show();
};

function searchItem(string) {
    $('#product-container').html('');
    //searching item from the  product list
    var searchItems = products.filter(function(product,index) { 
      var cleanString = new RegExp(string, 'i');
      var result = product.name.match(cleanString);
      return result;
    });
    if(searchItems.length) {
      // show filtered item by search
      renderItems(searchItems);
    } else {
      $('#product-container').append('No Items Found');
    }
}


function removeItem(product_id,qty) {
  var item = products.filter(function(product,index) { return product_id == product.id; });
  var removeItemInCart = cartItems.filter(function(cartItem,index) {  return product_id != cartItem.id; });
  var findItemInCart = cartItems.filter(function(cartItem,index) {  return product_id == cartItem.id; });

  !item.length ? products.push(findItemInCart[0]) : item[0].quantity = item[0].quantity + qty;

  cartItems = removeItemInCart;
  //update the products
  renderItems(products);
  //update the cart
  renderCartItems();
}

function renderItems(array) {
	  $('#product-container').html('');
	  array.map(function(product, index) {
    var item = '<div class="item-container col-md-3 col-md-15"> \
                  <div class="product-item col-md-12 text-center"> \
                    <div class="overlay"></div> \
    							  <img class="img-responsive center-block product-image" src='+product.image_path+' > \
                    <div class="action-buttons"> \
                      <button type="button" data-product_object='+encodeURIComponent(JSON.stringify(product))+' class="btn btn-info center-block margin-bottom-10 item-detail" data-toggle="modal" data-target="#itemDetail">item Details</button> \
  			  				    <button class="btn btn-success add-cart center-block margin-bottom-10" data-index='+index+' data-id='+product.id+'>Add to Cart </button> \
                    </div> \
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
                    <input type="text" disabled class="qty" value='+ item.quantity +'> \
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

  var getSubtotalsArray = cartItems.map(function(product,index) { return parseInt(product.subtotal) });
  total = getSubtotalsArray.reduce(function(a,b) { return a + b });
  var points = parseInt(total/100);
  var template = '<div class="total text-right col-md-12"> \
                  <p>Points : '+points+' </p>\
                  <p> TOTAL:P'+total+'.00 </p> \
                  </div>';
  $('#cart-container').append(template);
};

function sortItems(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function renderCategories(array) {
    $('#category_list').html('');
    array.map(function(category, index) {
    var category = '<li> \
                    <div data-category_id='+category.category_id+' class="categories">'+category.category_name+'</div>\
                  </li>';
    $('#category_list').append(category);
  });
};