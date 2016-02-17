<?php
session_start();
if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
    header('Location: login.php');
}
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
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $tags_json = json_encode($json_rows);
}
    

    $product_id = $_GET['id'];
    $tag_query = "SELECT a.tag_id, b.tag_name FROM tblproduct_tag as a ";
    $tag_query .= "LEFT JOIN tbltag as b on a.tag_id = b.tag_id where a.product_id = ".$product_id." group by b.tag_name";
    $result = $conn->query($tag_query);
    $picked_json_rows = array();
    $dummy_arr = array(
            array('tag_id' => '', 'tag_name' => '')
            );
    $picked_tags = json_encode($dummy_arr);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
           $picked_json_rows[] = $row;
        }
        $picked_tags = json_encode($picked_json_rows);
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
<body class="admin-bg">

<a href="product_list.php">Back</a>

<!--  EDIT MODAL -->
<div id="editProduct"> 
    <h2>Edit Product</h2>
    <form method="post" action="modules/updateProduct.php" enctype="multipart/form-data">
        <div class="product-edit-left">
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
                <input class="product-image" type="image" src="../images/<?php echo $row['product_image']; ?>"/><br/>
                <input type="file" name="product_image" id="product_image" size="25" value="<?php echo  $row['product_image'];?>" />
                <input type="hidden" name="product_image" size="25" value="<?php echo  $row['product_image'];?>" />
            </div>
        </div>
        <div class="product-edit-right">
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
                <label class="-display">Tags</label>
                <div class="tag-container">
                  <h6>Note: Press Tab to pick tag</h6>
                  <input type="hidden" name="tags_array[]" id="tags_array"><br>
                  <input type="text" class="typeahead margin-bottom-20" placeholder="Tags here.." id="tag_input"><br>
                  <span class="tags"></span>             
                </div>
            </div>
            <div>
                <br>
                <button type="submit" name="add_product" id="add_product">Edit Product</button>
            </div>
        </div>
    </form>
</div>



<?php 
include('header.php');
?>
</body>
<script type="text/javascript">
var categories = JSON.parse('<?php echo $category_json; ?>');
var tags = JSON.parse('<?php echo $tags_json; ?>');
var picked_tags = JSON.parse('<?php echo $picked_tags; ?>');
var category_id = '<?php echo $row["category_id"]?>';
</script>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/typeahead.js"></script>
<script type="text/javascript" src="../js/edit_product.js"></script>
</html>