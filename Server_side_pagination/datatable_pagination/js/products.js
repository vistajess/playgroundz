
  var Products = function() {

  var renderRefreshButton = function() {
    if( $('#refresh_table_btn').size() ) {
      return null;
    } else {
    var refresh_button = '<button type="button" \
                          class="btn btn-success pull-right" \
                          id="refresh_table_btn"> \
                          <i class="fa fa-refresh"></i>\
                          Refresh Table \
                          </button>';
    $('#dataTableProducts_filter').append(refresh_button);
    };
  }

  var renderSearch = function() {
    if( $('#search_datatable').size() ) {
      return null;
    } else {
    var search = '<div id="search_datatable" class="dataTables_filter"> \
                    <label>Search:<input id="input_search" type="search" class="" placeholder="" value="" aria-controls="dataTableProducts"></label> \
                    <button id="search_btn" class="btn btn-default" >Search by Name</button> \
                  </div>';
    $('#dataTableProducts_wrapper:first-child').prepend(search);
    }
  }

  var handleProducts = function(api,userid,access_token,pageNum,searchString,limitNumber,sort_string,status_string) {
    console.log('handleProducts',limitNumber)
    var table = $('#dataTableProducts').DataTable({
      /*
        FOR REFACTORING 
      */
      "ajax": function (data, callback, settings) {
        // $.get(api + "/me/products?access_token=" + access_token + "&page=" + pageNum)
        $.get(api + "/me/products?access_token=" + access_token + "&page=" + pageNum + "&filters={\"name\": \"" + searchString  + "\" "+status_string+"}&limit="+limitNumber+sort_string)
          .success(function(res) {
            callback({
              data: res.data.filter(function(data) { return data })
            });
          });
      },
      "columns": [
          { "data": "id" },
          { "data": "name" }, 
          { "data": 
            function(data) {
              return '<img style="max-width:150px; height:150px;" src='+data.primary_image+'>'; 
            } 
          }, 
          { "data": "selling_price" },
          { "data" : "quantity" },
          { "data" : 
            function(data) {
              return data.is_active 
                      ? '<span class="label label-sm label-success">Active</span>' 
                      : '<span class="label label-sm label-info">Not Active</span>'
            }
          },
          { "data" : 
            function(data) {
              var data_category_id;
              var data_parent_id
              if(data.category == null) {
                data_category_id = 0;
                data_parent_id = 0;
              } else {
                data_category_id = data.category.id;
                data_parent_id = data.category.parent_id;
              }
              return '<div class="margin-bottom-5"> \
                        <button data-id='+data.id+' \
                        data-is-active=' + data.is_active + ' data-category_id='+data_category_id+' data-parent_id='+data_parent_id+'  \
                        class="btn btn-xs default btn-editable width-btn"> \
                        <i class="fa fa-pencil"></i> \
                        <span class="hidden-xs">Edit</span></button> \
                      </div> \
                      <div class="margin-bottom-5"> \
                        <a href="#" class="btn btn-xs blue width-btn" \
                          onclick="embedProduct('+ data.id +','+ userid +')" \
                          data-target="#embedProduct" data-toggle="modal"> \
                        <i class="fa fa-chain"></i> \
                        <span class="hidden-xs">Embed</span> \
                        </a> \
                      </div> \
                      <a href="#" class="deleteProductDialog btn btn-xs red width-btn" \
                        data-name='+ encodeURIComponent(data.name) +' data-id='+ data.id +' data-new-id='+ data.id +'  \
                        data-target="#deleteProduct"> \
                        <i class="fa fa-times"></i> \
                        <span class="hidden-xs">Delete</span>\
                      </a>';
            }
          }
        ],
        // "lengthMenu": [
        //   [15, 20, 50, 100, 150],
        //   [15, 20, 50, 100, 150]
        // ],
        "bPaginate": false,
        "bFilter" : false,       
        "bSort" : false,        
        "order": [[0, 'desc']]
      });

  table.on('draw', function() {
    // renderRefreshButton();
    // renderSearch();
    $('#th_id').addClass('sorting');
    $('#th_name').addClass('sorting');
    $('#th_price').addClass('sorting');
    $('#refresh_table_btn').click(function(){
      $this = $(this);
      $this.addClass('disabled').html('<span class="fa fa-spin fa-spinner"></span> Loading');
      table.ajax.reload(function(){
        $('#refresh_table_btn').removeClass('disabled').html('<i class="fa fa-refresh"></i> Refresh Table');
      });
    });

    $('.deleteProductDialog').click(function(){
      $this = $(this);
      $('#p_id').html($this.data('id'));
      $('#p_name').html(decodeURIComponent($this.data('name')));
    });

    $('.btn-editable').click(function(){
      var p_cat_id = $(this).data('id');
      var category_id = $(this).data('category_id');
      var parent_id = $(this).data('parent_id');
      var p_product_is_active = $(this).data('is-active');
      document.cookie="p_cat_id="+p_cat_id;
      document.cookie="category_id="+category_id;
      document.cookie="parent_id="+parent_id;
      document.cookie="p_product_is_active="+p_product_is_active;
      window.location = "ecommerce_products_edit.php";
    });



  });
  }
  return {
    init: function(api, userid, access_token, pageNum, searchString, limitNumber, sort_string, status_string) {
      console.log('init',limitNumber)
      handleProducts(api, userid, access_token, pageNum, searchString, limitNumber,sort_string,status_string);
    }
  }

}();