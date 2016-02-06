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
});