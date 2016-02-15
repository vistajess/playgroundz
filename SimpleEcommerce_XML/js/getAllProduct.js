$(document).ready(function() {

	function findCartItems() {
		if (document.cookie.indexOf("cart=") === -1) {
		 var cart_array = [] ;
		} else {
			var cookie = getCookie('cart');
			var cart_array = JSON.parse(cookie);
		}
		$('.view-product').each(function(index){
			var product_id = $(this).data('product_id');
			if(cart_array.indexOf(product_id) !==  -1) {
			  // $(this).html('Item has been added');
    	// 	$(this).addClass('disabled');
    		$(this).parent().next().children().show();
			}
		});
	}

	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}
	// CHECK IF CART COOKIE IS EXISTING
	if (document.cookie.indexOf("cart=") === -1){
	 var cart = [] ;
	} else {
		var cookie = getCookie('cart');
		var cart = JSON.parse(cookie);
	}
    var dataTable = $('#products').DataTable({
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"modules/getAllProducts.php", // json datasource
						type: "post",  // method  , by default get,
						data : function(data) {
							console.log('123');
							// $('.product_id').parent().parent().attr('id','17');

						},
        		error: function(){  // error handling
							$(".products-error").html("");
							$("#products").append('<tbody class="products-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#products_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]],
        // "bFilter" : false, 
        // "bSort": false,         
        "bLengthChange": false
    });

    dataTable.on('draw',function() {
			$('#products tr').each(function(index){
					// console.log('run');
				var prod_id = $(this).find('.product_id').data('product_id');
				$(this).attr('id',prod_id);
			});
			$('#products_processing').hide();
			findCartItems();
    });

    $('body').on('click', '.add-cart', function () {
    	var id = $(this).data('product_id');
    	cart.push(id);
    	$(this).html('Item has been added')
    	$(this).addClass('disabled');
    	var json_cart = JSON.stringify(cart);
    	document.cookie="cart="+json_cart;
		});

});