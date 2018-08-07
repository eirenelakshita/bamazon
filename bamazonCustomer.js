var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    listALLProducts();
});

function listALLProducts() {
    connection.query("SELECT * FROM products", function(err, data) {
        products = data;
        var productnames = products.map(function(product, index) {
            var productListing = product.item_id + " " + product.product_name + " " + product.price;
            return productListing;
        });
        console.log(productnames);
        promptForProduct();
    });
};



function promptForProduct() {
    inquirer.prompt([
        {
            name: "itemName",
            message: "Please input your item ID.",
            type: "input"
        },
        {
            name: "itemQuantity",
            message: "How many unit would you like to purchase?",
            type: "input"
        }
    ]).then(function(answer) {
        // if (err) throw err;
        var inputName = answer.itemName;
        var inputQuantity = answer.itemQuantity;
        // console.log(inputName, inputQuantity);
        lookupQuantity(inputName, inputQuantity);
    })
}

function lookupQuantity(inputName, inputQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [inputName], function(err, data) {
        updatedQuantity = data[0].stock_quantity - inputQuantity;
        productPrice = data[0].price;
        // console.log(updatedQuantity + ", " + productPrice);
        if (updatedQuantity > 0) {    
        connection.query("UPDATE products SET ? WHERE ?", [
            {stock_quantity: updatedQuantity},
            {item_id: inputName}], function(err, data) {
            console.log(data.affectedRows + " record(s) updated quantity up to date");
        //     connection.query("SELECT * FROM products", function(err, data) {
        //         console.log(data);
        // });
    });
        totalPrice = inputQuantity * productPrice; 
        console.log("Your Total: $" + totalPrice);
        updateProductSales(totalPrice, inputName);
        } else {
            console.log("We're sorry. There's not enough product in stock.")
            connection.end();
        }
    });
}

function updateProductSales(totalPrice, inputName) {
    connection.query("UPDATE products SET ? WHERE ?", [
        {product_sales: totalPrice},
        {item_id: inputName}], function(err, data) {
        console.log(data.affectedRows + " record(s) updated sales up to date");
        viewEverything();
});
}

function viewEverything() {
    // connection.query("SELECT * FROM products", function(err,data) {
    // console.log(data);
    // })
    connection.end();
};

var products = [];
var updatedQuantity;
var productPrice;
var totalPrice;

