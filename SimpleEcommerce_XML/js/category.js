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

    $('body').on('click', '#edit_category_modal', function () {
    	var id = $(this).data('category_id');
    	var name = $(this).data('category_name');
    	var details = $(this).data('category_details');
    	$('#edit_catid').val(id);
    	$('#edit_catname').val(name);
    	$('#edit_catdetails').val(details);
		});

		$('#update_category').click(function() {
			var dataObj = {
				"category_id" : $('#edit_catid').val(),
				"category_name" : $('#edit_catname').val(),
				"category_details" : $('#edit_catdetails').val()
			};
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 $.ajax({
		      type: "POST",
		      dataType: "json",
		      url: '../admin/modules/updateCategory.php',
		      data: dataObj,
		      beforeSend: function() {
		      },
		      success: function(data) {
		      	console.log(data);
		      	window.location.href = "../admin/category_list.php";
		      },
		      error: function(xhr, status, error) {
		      }
		  });
		});
});