$(document).ready(function() {

	function findCartItems() {
		if (document.cookie.indexOf("cart=") === -1) {
		 var cart_array = [] ;
		} else {
			console.log('cookie');
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


	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;

	    // an array that will be populated with substring matches
	    matches = [];

	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');

	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });

	    cb(matches);
	  };
	};

	var tag_name_array = tags.map(function(tag) { return tag.tag_name;});

	$('.typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1,
	},
	{
	  name: 'tag_name',
	  source: substringMatcher(tag_name_array)
	});




    var dataTable = $('#bycategory-products').DataTable({
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
							$(".bycategory-products-error").html("");
							$("#bycategory-products").append('<tbody class="bycategory-products-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#bycategory-products_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]],
        // "bFilter" : false, 
        // "bSort": false,         
        "bLengthChange": false
    });

    dataTable.on('draw',function() {
			$('#bycategory-products tr').each(function(index){
				var prod_id = $(this).find('.product_id').data('product_id');
				$(this).attr('id',prod_id);
			});
			$('#bycategory-products_processing').hide();
			findCartItems();
    });

    categories.map(function(category, idx){
         var selected = '';
         $('#category_option').append('<option class="category-options" value="'+ category.category_id +'" '+selected+' data-cat-id=' + category.category_id + '>'+ category.category_name +'</option>');
    });

    $('body').on('click', '.add-cart', function () {
    	var id = $(this).data('product_id');
    	cart.push(id);
    	$(this).html('Item has been added')
    	$(this).addClass('disabled');
    	var json_cart = JSON.stringify(cart);
    	document.cookie="cart="+json_cart;
		});
    //===================== RESET SEARCH
    $('#reset-btn').click(function() {
    		$("#bycategory-products").DataTable().destroy();
    	    var dataTable = $('#bycategory-products').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url :"modules/getProducts.php", // json datasource
							type: "post",  // method  , by default get,
							data : function(data) {
								console.log('123');
								// $('.product_id').parent().parent().attr('id','17');
							},
	        		error: function(){  // error handling
								$(".bycategory-products-error").html("");
								$("#bycategory-products").append('<tbody class="bycategory-products-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
								$("#bycategory-products_processing").css("display","none");			
							},
	        },
	        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]],
	        // "bFilter" : false, 
	        // "bSort": false,         
	        "bLengthChange": false
	    });
    });


    // =============== SEARCH BUTTOn
    $('#search-btn').click(function() {
    		var category_id = $('#category_option option:selected').val();
    		var tag_name = $('#tag_text').val();
    		$("#bycategory-products").DataTable().destroy();
    	    var dataTable = $('#bycategory-products').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url :"modules/searchByCatTag.php?category_id="+category_id+"&tag_name="+ tag_name, // json datasource
							type: "post",  // method  , by default get,
							data : function(data) {
								$('.dataTables_empty').html('No items found. Please Search again..');
							},
	        		error: function(){  // error handling
								$(".bycategory-products-error").html("");
								$("#bycategory-products").append('<tbody class="bycategory-products-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
								$("#bycategory-products_processing").css("display","none");			
							},
	        },
	        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]],
	        // "bFilter" : false, 
	        // "bSort": false,         
	        "bLengthChange": false
	    });
    });

});