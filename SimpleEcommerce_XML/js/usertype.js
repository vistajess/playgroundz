$(document).ready(function() {
    $('#dataTableUserType').DataTable({
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"../admin/modules/getUserType.php", // json datasource
						type: "post",  // method  , by default get,
						// success: function(data) {
						// 	console.log(data);
						// },
        		error: function(){  // error handling
							$(".dataTableUserType-error").html("");
							$("#dataTableUserType").append('<tbody class="dataTableUserType-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#dataTableUserType_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });

    $('body').on('click', '#edit_usertype_modal', function () {
    	var id = $(this).data('user_type_id');
    	var name = $(this).data('type_name');
    	$('#edit_usertype_id').val(id);
    	$('#edit_usertype_name').val(name);
    	// $('#edit_catdetails').val(details);
		});

		$('#update_usertype').click(function() {
			var dataObj = {
				"user_type_id" : $('#edit_usertype_id').val(),
				"type_name" : $('#edit_usertype_name').val()
			};
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 $.ajax({
		      type: "POST",
		      dataType: "json",
		      url: '../admin/modules/updateUserType.php',
		      data: dataObj,
		      beforeSend: function() {
		      },
		      success: function(data) {
		      	console.log(data);
		      	window.location.href = "../admin/usertype_list.php";``
		      },
		      error: function(xhr, status, error) {
		      }
		  });
		});
});