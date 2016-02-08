$(document).ready(function() {
    $('#dataTableTag').DataTable({
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"../admin/modules/getTags.php", // json datasource
						type: "post",  // method  , by default get,
						// success: function(data) {
						// 	console.log(data);
						// },
        		error: function(){  // error handling
							$(".dataTableTag-error").html("");
							$("#dataTableTag").append('<tbody class="dataTableTag-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#dataTableTag_processing").css("display","none");			
						},
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });

    $('body').on('click', '#edit_tag_modal', function () {
    	var id = $(this).data('tag_id');
    	var name = $(this).data('tag_name');
    	$('#edit_tag_id').val(id);
    	$('#edit_tag_name').val(name);
    	// $('#edit_catdetails').val(details);
		});

		$('#update_tag').click(function() {
			var dataObj = {
				"tag_id" : $('#edit_tag_id').val(),
				"tag_name" : $('#edit_tag_name').val()
			};
		 	dataObj = $(this).serialize() + "&" + $.param(dataObj);
			 $.ajax({
		      type: "POST",
		      dataType: "json",
		      url: '../admin/modules/updateTag.php',
		      data: dataObj,
		      beforeSend: function() {
		      },
		      success: function(data) {
		      	console.log(data);
		      	window.location.href = "../admin/tag_list.php";
		      },
		      error: function(xhr, status, error) {
		      }
		  });
		});
});