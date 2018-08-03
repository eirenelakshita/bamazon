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
    console.log("connected as id " + connection.threadId);
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
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [inputName], function(err, data) {
        updatedQuantity = data[0].stock_quantity - inputQuantity;
        console.log(updatedQuantity);    
        connection.query("UPDATE products SET ? WHERE ?", [
            {stock_quantity: updatedQuantity},
            {item_id: inputName}], function(err, data) {
            console.log(data.affectedRows + " record(s) updated ");
            connection.query("SELECT * FROM products", function(err, data) {
                console.log(data);
        });
    });

    });
}


var products = [];
var updatedQuantity;


