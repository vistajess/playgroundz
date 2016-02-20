<!DOCTYPE html>
<html>
<?php
session_start();
if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
    header('Location: login.php');
}
include('header.php');
include('../config/config.php');
$sql = "SELECT category_id,category_name FROM tblcategory";
$result = $conn->query($sql);
$json_rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $category_json = json_encode($json_rows);
}

$sql = "SELECT distinct(tag_name),tag_id FROM `tbltag` group by tag_name";
$result = $conn->query($sql);
$json_rows = array();
$dummy_arr = array(
        array('tag_id' => '', 'tag_name' => '')
        );
$tags_json = json_encode($dummy_arr);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $tags_json = json_encode($json_rows);
}
?>
<body class="admin-bg">
<?php include('sidebar.php');?>
<div class="container">
    <div class="admin-content">
	<h2>Product List <a class="custom-btn" href="#addProduct">Add Product</a></h2>
	
    	<table id="dataTableProducts"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
    		<thead>
    			<tr>
    				<th>ID</th>
    				<th>Product&nbsp;Name</th>
    				<th>Product&nbsp;Image</th>
                    <th>Description</th>
    				<th>Price</th>
    				<th>Quantity</th>
    				<th>Actions</th>
    			</tr>
    		</thead>
    		</table>
    </div>


<!--  ADD MODAL -->
<div id="addProduct" class="modalDialog">
    <div>	<a href="#close" title="Close" class="close">X</a>
    	<h2>Add Product</h2>
    	<form method="post" action="modules/addProduct.php" enctype="multipart/form-data">
    		<div>
    			<label class="-display">Category</label>
    			<select id="category_option" name="category_id"></select>
    		</div>
    		<div>
    			<label class="-display">Product Name</label>
    			<input required type="text" name="product_name" id="product_name">
    		</div>
    		<div>
    			<label class="-display">Product Image</label>
    			<input required type="file" name="product_image" id="product_image" size="25" />
    		</div>
    		 <div>
    		 	<label class="-display">Description</label>
    			<input type="text" name="description" id="description">
    		</div>
    		<div>
    			<label class="-display">Price</label>
    			<input required type="number" name="price" id="price">
    		</div>
    		<div>
    			<label class="-display">Quantity</label>
    			<input required type="number" name="quantity" id="quantity">
    		</div>
            <div>
                <label class="-display">Tags</label>
                <div class="tag-container">
                  <h6>Note: Press Tab to pick tag</h6>
                  <input type="hidden" name="tags_array[]" id="tags_array"><br>
                  <input type="text" class="typeahead" placeholder="Tags here.." id="tag_input"><br>
                  <span class="tags"></span>             
                </div>
            </div>
    		<div>
          <br>
    			<button type="submit" name="add_product" id="add_product">Add Product</button>
    		</div>
    	</form>
    </div>
</div>

</body>
<script type="text/javascript">
var categories = JSON.parse('<?php echo $category_json; ?>');
var tags = JSON.parse('<?php echo $tags_json; ?>');
</script>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/typeahead.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/products.js"></script>
<script type="text/javascript" src="../js/tags_typeahead.js"></script>

</html>