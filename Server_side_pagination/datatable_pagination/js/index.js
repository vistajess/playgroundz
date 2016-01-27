  $(function() {

  var api_v2 = "http://10.10.2.23:5000";
  var api_v2 = "http://v2.api.onesupershop.com";
  var access_token = "gxsMsGoE4M3ruvdfa5MnjYhiuckyqEXQIBlwqGzJ";
  var total = 0;
  var per_page = 0;
  var userid = 12815;

  var sort_string = '';
  var txt = $('#input_search').val();
  var sort = $('#select_sortby').val();
  var order = $('#select_orderby').val();
  var status = $('#select_status').val();
  var status_selected =$('#select_status option:selected').text();
  var limitNumber = parseInt($('#select_limit').val());
  // var sort_string = "&sort="+order+sort;
  var status_string = status_selected === "All Products" ? "" : ",\"is_active\":"+status;
  var mytable = $("#dataTableProducts");

function ProductDataTable(searchString,limitNumber,sort_string,status_string) {
    searchString != null ? searchString = searchString : searchString = '';
    parseInt(limitNumber) != null ? limitNumber = parseInt(limitNumber) : limitNumber = 15;
    $.get(api_v2 + "/me/products?access_token=" + access_token + "&filters={\"name\": \"" + searchString  + "\""+status_string+"}&limit="+limitNumber+sort_string)
  // $.get("http://v2.api.onesupershop.com/stores/latestgadget/products")
    .success(function(res) {
      total = res.total;
      per_page = res.per_page;
      Products.init(api_v2,userid,access_token,1,searchString,limitNumber,sort_string,status_string);
      $('.pagination').pagination({
          items: res.total,
          itemsOnPage: res.per_page,
          cssStyle: 'light-theme',
          onPageClick: function(pageNumber) {
           mytable.dataTable().fnDestroy();
            Products.init(api_v2,userid,access_token,pageNumber,searchString,limitNumber,sort_string,status_string);
          }
      });
    }); 

}

$('#filter_btn').click(function() {
  var sort_string = '';
  var txt = $('#input_search').val();
  var sort = $('#select_sortby').val();
  var order = $('#select_orderby').val();
  var status = $('#select_status').val();
  var status_selected =$('#select_status option:selected').text();
  var limitNumber = parseInt($('#select_limit').val());
  // var sort_string = "&sort="+order+sort;
  var status_string = status_selected === "All Products" ? "" : ",\"is_active\":"+status;
  var mytable = $("#dataTableProducts");
  mytable.dataTable().fnDestroy();
  ProductDataTable(txt,limitNumber,sort_string,status_string);
});

  $('.sort').click(function() {
    var sort_string = '';
    var txt = $('#input_search').val();
    var sort = $('#select_sortby').val();
    var order = $('#select_orderby').val();
    var status = $('#select_status').val();
    var status_selected =$('#select_status option:selected').text();
    var limitNumber = parseInt($('#select_limit').val());
    // var sort_string = "&sort="+order+sort;
    var status_string = status_selected === "All Products" ? "" : ",\"is_active\":"+status;
    var mytable = $("#dataTableProducts");
    $_this = $(this);
    var data_sort = $_this.data('sort');
    console.log($_this.data('sort'))
    if($_this.hasClass('sorting_asc')) {
      sort_string = "&sort=-"+data_sort;
      $('.sort').removeClass('sorting_asc');
      $('.sort').removeClass('sorting_desc');
      $_this.removeClass('sorting_asc');
      $_this.addClass('sorting_desc');
    } else if ($_this.hasClass('sorting_desc')) {
      sort_string = "&sort="+data_sort;
      $('.sort').removeClass('sorting_asc');
      $('.sort').removeClass('sorting_desc');
      $_this.removeClass('sorting_desc');
      $_this.addClass('sorting_asc'); 
    } else if ($_this.not('.sorting_desc') && $_this.not('.sorting_asc')) {
      sort_string = "&sort=-"+data_sort;
      $('.sort').removeClass('sorting_asc');
      $('.sort').removeClass('sorting_desc');
      $_this.addClass('sorting_desc');
    }
    mytable.dataTable().fnDestroy();
    console.log('text',txt);
    console.log('limitNumber',limitNumber);
    console.log('sort_string',sort_string);
    console.log('status_string',status_string);
    ProductDataTable(txt,limitNumber,sort_string,status_string);
  })

  ProductDataTable('',15,'','');//initial

});