<?php
include('config.php');
$sql = "SELECT * FROM product_tbl";
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

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
<div class="container">
	<div class="row">
		<div class="col-md-6">
			<h3>PRODUCT LIST</h3>
			<div class="form-group">
				<label>Search Item</label>
				<input type="text" id="search_item">
				<button id="search_btn" class="btn btn-info">Search</button>
				<button id="show_all" class="btn btn-warning">Reset Search</button>
			</div>
			<div class="form-group">
				<label>Sort Items By</label>
					<select id="sort_items">
						<option value="id">ID</option>
						<option value="name">Name</option>
						<option value="price">Price</option>
					</select>
			</div>
			<div id="product-container">
			</div>
		</div>
		<div class="col-md-6">	
		<h3>SHOPPING CART</h3>
			<div id="cart-container">
				<ul id="cart-list">
					
				</ul>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	var products = JSON.parse('<?php echo $product_json; ?>');
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>