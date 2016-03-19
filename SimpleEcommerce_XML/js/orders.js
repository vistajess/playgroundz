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


 $(document.body).on('click','.apply-btn', function() {

  var option_status = $(this).prev().val();
  var id = $(this).data('order_id');
  console.log(option_status);

  var dataObj = {
      "order_id" : id,
      "status" : option_status,
  };
  console.log(dataObj);
  // return;
  $.ajax({
      type: "POST",
      dataType: "json",
      url: '../admin/modules/updateOrderAndTransactionStatus.php',
      data: dataObj,
      beforeSend: function(xhr) {
        if(option_status === 'pending') {
          xhr.abort();
          console.log('abrt');
        }
      },
      success: function(data) {
        // console.log(data);
        window.location.href = "../admin/orders.php";
      },
      error: function(xhr, status, error) {
      }
  });

 });


});