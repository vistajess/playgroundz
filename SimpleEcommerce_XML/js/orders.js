$(document).ready(function() {
    $('#dataTableOrders').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax":{
            url :"../admin/modules/getOrders.php", // json datasource
            type: "post",  // method  , by default get,
            // success: function(data) {
            //  console.log(data);
            // },
            error: function(){  // error handling
              $(".dataTableOrders-error").html("");
              $("#dataTableOrders").append('<tbody class="dataTableOrders-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
              $("#dataTableOrders_processing").css("display","none");      
            },
        },
        "aLengthMenu": [[6, 15, 25, 200, -1], [6, 15, 25, 200, "All"]]
    });


});