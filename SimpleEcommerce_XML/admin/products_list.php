<!DOCTYPE html>
<html>
<?php
include('header.php');
?>
<body>
<div class="wrapper">
	<h2>Product List</h2>
	<a href="#addProduct">Add Product</a>
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
    			<label class="-display">Product Name</label>
    			<input type="text" name="product_name">
    		</div>
    		<div>
    			<label class="-display">Product Image</label>
    			<input type="file" name="photo" size="25" />
    		</div>
    		 <div>
    		 	<label class="-display">Description</label>
    			<textarea type="text" name="description">
    			</textarea>
    		</div>
    		<div>
    			<label class="-display">Price</label>
    			<input type="text" name="price">
    		</div>
    		<div>
    			<label class="-display">Quantity</label>
    			<input type="text" name="quantity">
    		</div>
    		<div>
    			<button type="submit" name="add_product">Add Product</button>
    		</div>
    	</form>
    </div>
</div>
</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/products.js"></script>

</html>