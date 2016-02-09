<?php
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

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
	$product_id = $_GET['id'];
	$query = "SELECT * FROM tblproduct WHERE product_id='".$product_id."'";
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_assoc($result);
};
?>
<!DOCTYPE html>
<html>
<head>
	<title>Edit Product</title>
</head>
<body>
<a href="product_list.php">Back</a>

<!--  EDIT MODAL -->
<div id="editProduct" class="modalDialog"> 
    <h2>Edit Product</h2>
    <form method="post" action="modules/updateProduct.php" enctype="multipart/form-data">
        <div>
        	<input type="hidden" name="product_id" id="product_name" value="<?php echo  $row['product_id'];?>" >
            <label class="-display">Category</label>
            <select id="category_option" name="category_id">
            	
            </select>
        </div>
        <div>
            <label class="-display">Product Name</label>
            <input required type="text" name="product_name" id="product_name" value="<?php echo  $row['product_name'];?>" >
        </div>
        <div>
            <label class="-display">Product Image</label>
            <input type="image" src="../images/<?php echo $row['product_image']; ?>"/><br/>
            <input type="file" name="product_image" id="product_image" size="25" value="<?php echo  $row['product_image'];?>" />
        </div>
         <div>
            <label class="-display">Description</label>
            <input type="text" name="description" id="description" value="<?php echo  $row['description'];?>">
        </div>
        <div>
            <label class="-display">Price</label>
            <input required type="number" name="price" id="price" value="<?php echo  $row['price'];?>">
        </div>
        <div>
            <label class="-display">Quantity</label>
            <input required type="number" name="quantity" id="quantity" value="<?php echo  $row['quantity'];?>">
        </div>
        <div>
            <button type="submit" name="add_product" id="add_product">Edit Product</button>
        </div>
    </form>
</div>

</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript">
var categories = JSON.parse('<?php echo $category_json; ?>');
var category_id = '<?php echo $row["category_id"]?>';
categories.map(function(category, idx){
     var selected = '';
     category.category_id == category_id ? selected = 'selected' : selected = '';
     $('#category_option').append('<option class="category-options" value="'+ category.category_id +'" '+selected+' data-cat-id=' + category.category_id + '>'+ category.category_name +'</option>');
});
</script>
</html>