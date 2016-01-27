$(document).ready(function() {
	renderItems();


	$('body').on('click', '.add-cart', function () {
			var index = $(this).data('index');
			console.log(index);
			addToCart(index);
			renderItems();
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
            "price": 1200,
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
            "price": 4500,
            "quantity": 20,
            "image_path":"images/prod4.jpg"
        },
        {
            "id": 5,
            "name": "Razer Mechanical Keyboard",
            "description": "",
            "price": 4500,
            "quantity": 85,
            "image_path":"images/prod5.jpg"
        },
        ];

  var cartItems = [];
  var cartTotal = 0;

// ========================== FUNCTIONS 
function addToCart(idx) {
	var filterProductList =  products.filter(function(product, index) {
		console.log(index != idx)
		return idx != index;
	});
	products = filterProductList;
	console.log(products);
}


function renderItems() {
	  $('#product-container').html('');
	  products.map(function(product, index) {
  	var item = '<div class="product-item text-center"> \
  							<img class="img-responsive center-block product-image" src='+product.image_path+' > \
			  				<h3>'+ product.name+'</h3> \
			  				<h5>P '+ product.price+'.00</h5> \
			  				<h6>Qty: '+ product.quantity+'</h6> \
			  				<button class="btn btn-success add-cart" data-index='+index+' data-id='+product.id+'>Add to Cart </button> \
			  				</div>';
  	$('#product-container').append(item);

  });
};
