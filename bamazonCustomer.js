var mysql = require ("mysql");
var inquirer = require ("inquirer");
var Table = require ("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password: "password",
    database: "bamazon",
});

connection.connect(function(err){
if (err) throw err;
console.log ("connected as id" + connection.threadId);
availableProducts();
});


var availableProducts = function(){
    var queryStr= "SELECT * FROM products";
    connection.query(queryStr,function(err,res){
        if (err) throw err;
        var productsTable= new Table ({
            head:["Item ID:", "Product Name:", "Category:" , "Price","Quantity:"],
            colWidths:[10,25,25,10,14]
        });
        for (var i=0; i < res.length; i++){
            productsTable.push(
            [res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            res[i].price, 
            res[i].stock_quantity]
            );
        }
        console.log(productsTable.toString());
        buyingPrompt();
    });
}

var buyingPrompt= function(){
    inquirer.prompt([
        {
            name:"productID",
            type:"input",
            message:"Enter ID for item you like to purchase",
          validate: function(value){
              if (isNaN (value) === false){
                  return true;
              }
              return false;
          }
        },
        {
            name: "productUnits",
            type:"input",
            message:"How many item units do you like to purchase?",
            validate: function (value){
                if (isNaN (value) === false){
                return true;
            }
            return false;
            }

    }]).then(function(inputs){
        var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
		connection.query(query, { item_id: inputs.productID}, function(err, res) {
			if (err) throw err;

			var available_stock = res[0].stock_quantity;
			var price_per_unit = res[0].price;
			var productSales = res[0].product_sales;
			var productDepartment = res[0].department_name;
            if (available_stock >= inputs.productUnits) {
            purchase(available_stock,price_per_unit, productSales, productDepartment,
                inputs.productID,inputs.productUnits);
            } else {
                console.log("Items are not available.");
                buyingPrompt();
    }
});
});
};
var purchase= function(availableStock, price, productSales, productDepartment, selectedProductID, selectedProductUnits) {
	
	// Updates stock quantity once purchase complete.
	var updatedStockQuantity = availableStock - selectedProductUnits;

	// Calculates total price for purchase based on unit price, and number of units.
	var totalPrice = price * selectedProductUnits;

	// Updates total product sales.
	var updatedProductSales = parseInt(productSales) + parseInt(totalPrice);
	
	// Updates stock quantity on the database based on user's purchase.
	var query = "UPDATE products SET ? WHERE ?";
	connection.query(query, [{
		stock_quantity: updatedStockQuantity,
		product_sales: updatedProductSales
	}, {
		item_id: selectedProductID
	}], function(err, res) {

		if (err) throw err;
		console.log("Yay, your purchase is complete.");
		console.log("payment has been received in the amount of : " + totalPrice);
availableProducts();
		