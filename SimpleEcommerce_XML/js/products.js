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
});