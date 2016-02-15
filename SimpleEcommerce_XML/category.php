<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');


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

$sql = "SELECT category_id,category_name FROM tblcategory";
$result = $conn->query($sql);
$json_rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $category_json = json_encode($json_rows);
}

$sql = "SELECT * FROM tblproduct";
$result = $conn->query($sql);
$json_rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $product_json = json_encode($json_rows);
} else {
   echo "0 results";
}
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
<?php include('header_links.php'); ?>
</head>
<body>
<div class="content-wrapper">
	<div class="header">
	<?php include('header.php'); ?>
	</div>

	<div class="content">
		<div class="container">
				<div class="wrapper">
					<div id="tabs">
					  <ul>
					    <li><a href="#tabs-1">List of Products</a></li>
					  </ul>
					  <div id="tabs-1">
			    		<div>
			    			<label class="">Category</label>
			    			<select id="category_option" name="category_id">
			    				<option value="All Categories">All Categories</option>
			    			</select>
			    			<input type="text" name="tag" class="typeahead" id="tag_text" placeholder="Search by tags...">
			    			<button id="search-btn" class="search-btn">Search Items</button>
			    			<button id="reset-btn" class="search-btn">Reset</button>
			    		</div>
							<table id="bycategory-products"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
								<thead>
									<tr>
										<th>Product&nbsp;ID</th>
										<th>Product&nbsp;Image</th>
										<th>Product&nbsp;Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Actions</th>
										<th>Actions</th>
									</tr>
									</thead>
								</table>
					  </div>
					</div>

			</div>
		</div>
	</div>	

	<div class="footer">
		<div class="container">
			FOOTER
		</div>
	</div>
</div>
<?php include('footer.php'); ?>
</body>
<script type="text/javascript">
	var categories = JSON.parse('<?php echo $category_json; ?>');
	var products = JSON.parse('<?php echo $category_json; ?>');
	var tags = JSON.parse('<?php echo $tags_json; ?>');
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jqueryui.js"></script>
<script type="text/javascript" src="js/typeahead.js"></script>
<script type="text/javascript" src="js/datatables_latest.js"></script>
<script type="text/javascript" src="js/user_products.js"></script>
  <script>
  $(function() {
    $( "#tabs" ).tabs();
  });
  </script>
</html>
