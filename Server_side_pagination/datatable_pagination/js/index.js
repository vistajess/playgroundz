  $(function() {

  var api_v2 = "http://10.10.2.23:5000";
  var api_v2 = "http://v2.api.onesupershop.com";
  var access_token = "uUC3qe3hjHXgcr6A22awv8IODvU2Tu6rmPMJtagM";
  var total = 0;
  var per_page = 0;
  var userid = 12815;
function ProductDataTable(searchString) {
    searchString != null ? searchString = searchString : searchString = '';
    $.get(api_v2 + "/me/products?access_token=" + access_token + "&filters={\"name\": \"" + searchString  + "\" }")
  // $.get("http://v2.api.onesupershop.com/stores/latestgadget/products")
    .success(function(res) {
      total = res.total;
      per_page = res.per_page;
      Products.init(api_v2,userid,access_token,1,searchString);
      $('.pagination').pagination({
          items: res.total,
          itemsOnPage: res.per_page,
          cssStyle: 'light-theme',
          onPageClick: function(pageNumber) {
            $("#dataTableProducts").dataTable().fnDestroy();
            Products.init(api_v2,userid,access_token,pageNumber,searchString);
          }
      });
    }); 

}
ProductDataTable('');



$('body').on('click', '#search_btn', function () {
    var txt = $('#input_search').val();
    console.log(txt);
    $("#dataTableProducts").dataTable().fnDestroy();
    ProductDataTable(txt)
     // console.log("yeahhhh!!! but this doesn't work for me :(");
});

});