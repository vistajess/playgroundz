$(document).ready(function() {
    $('#dataTableCategory').DataTable({
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"../admin/modules/getCategory.php", // json datasource
						type: "post",  // method  , by default get,
						// success: function(data) {
						// 	console.log(data);
						// },
        		error: function(){  // error handling
							$(".dataTableCategory-error").html("");
							$("#dataTableCategory").append('<tbody class="dataTableCategory-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#dataTableCategory_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });
});