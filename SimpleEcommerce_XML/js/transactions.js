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
        "aLengthMenu": [[6, 15, 25, 200, -1], [6, 15, 25, 200, "All"]]
    });




        // =============== Filter
    $('#transaction_status').change(function() {
        var status = $('#transaction_status option:selected').val();
        console.log(status)

        $("#dataTableTransaction").DataTable().destroy();
          var dataTable = $('#dataTableTransaction').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax":{
              url :"../admin/modules/filterTransactionByStatus.php?status="+status, // json datasource
              type: "post",  // method  , by default get,
              data : function(data) {
                $('.dataTables_empty').html('No items found. Please Search again..');
              },
              error: function(){  // error handling
                $(".dataTableTransaction-error").html("");
                $("#dataTableTransaction").append('<tbody class="dataTableTransaction-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#dataTableTransaction_processing").css("display","none");     
              },
          },
          "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]],
          // "bFilter" : false, 
          // "bSort": false,         
          "bLengthChange": false
      });
    });



});