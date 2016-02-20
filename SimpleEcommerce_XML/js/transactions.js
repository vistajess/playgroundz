$(document).ready(function() {
    $('#dataTableTransaction').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax":{
            url :"../admin/modules/getTransactions.php", // json datasource
            type: "post",  // method  , by default get,
            // success: function(data) {
            //  console.log(data);
            // },
            error: function(){  // error handling
              $(".dataTableTransaction-error").html("");
              $("#dataTableTransaction").append('<tbody class="dataTableTransaction-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
              $("#dataTableTransaction_processing").css("display","none");      
            },
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });


});