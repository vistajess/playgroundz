$(document).ready(function() {
    $('#dataTableUser').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax":{
            url :"../admin/modules/getUsers.php", // json datasource
            type: "post",  // method  , by default get,
            // success: function(data) {
            //  console.log(data);
            // },
            error: function(){  // error handling
              $(".dataTableUser-error").html("");
              $("#dataTableUser").append('<tbody class="dataTableUser-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
              $("#dataTableUser_processing").css("display","none");      
            },
        },
        "aLengthMenu": [[6, 15, 25, -1], [6, 15, 25, "All"]]
    });

    $('body').on('click', '#delete_modal_button', function () {
      var id = $(this).data('id');
      $('#user_id').val(id);
    });

    $('#deleteUser').click(function() {
      var admin_password = $('#admin_password').val();
      var user_id = parseInt($('#user_id').val());
      var dataObj = {
        "id" : user_id
      };

      // dataObj = $(this).serialize() + "&" + $.param(dataObj);
       $.ajax({
          type: "POST",
          dataType: "json",
          url: '../admin/modules/deleteUser.php?id='+user_id,
          data: dataObj,
          beforeSend: function(xhr, opts) {
           if(admin_password != password) {
              $('.message').html('Password is invalid.');
              xhr.abort();
             }
          },
          success: function(data) {
            // console.log(data);
            window.location.href = "../admin/user_list.php";
          },
          error: function(xhr, status, error) {
          }
      });
    });


});