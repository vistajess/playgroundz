$(document).ready(function() {
    $('#dataTableProducts').DataTable({
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"../admin/modules/getProducts.php", // json datasource
						type: "post",  // method  , by default get,
						// success: function(data) {
						// 	console.log(data);
						// },
        		error: function(){  // error handling
							$(".dataTableProducts-error").html("");
							$("#dataTableProducts").append('<tbody class="dataTableProducts-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#dataTableProducts_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });

    categories.map(function(category, idx){
         var selected = '';
         $('#category_option').append('<option class="category-options" value="'+ category.category_id +'" '+selected+' data-cat-id=' + category.category_id + '>'+ category.category_name +'</option>');
    });

    $('#add_product').click(function() {
    	var file = $('#product_image')[0].files[0];
    	var photo_name = '';
			if(file){
				photo_name = file.name;
			}
    	var dataObj = {
				"product_name" : $('#addProduct #product_name').val(),
				"category" : $('#category_option option:selected').val(),
				"description" : $('#addProduct #description').val(),
				"quantity" : parseInt($('#addProduct #quantity').val()),
				"price" : parseInt($('#addProduct #price').val()),
				"product_image" : photo_name
			};
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 // $.ajax({
		  //     type: "POST",
		  //     dataType: "json",
		  //     url: '../admin/modules/addProduct.php',
		  //     data: dataObj,
		  //     // contentType: false,
				// 	cache: false,
				// 	processData: false,
		  //     beforeSend: function() {
		  //     },
		  //     success: function(data) {
		  //     	console.log(data);
		  //     	// window.location.href = "../admin/product_list.php";
		  //     },
		  //     error: function(xhr, status, error) {
		  //     }
		  // });
    });
});