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
    promptForAction();
});

function promptForAction() {
    inquirer.prompt([
        {
            name: "actionInput",
            message: "Please input your item ID.",
            type: "list",
            choices: [`View Products for Sale`,
            `View Low Inventory`,
            `Add to Inventory`,
            `Add New Product`]}
        // },
        // {
        //     name: "itemQuantity",
        //     message: "How many unit would you like to purchase?",
        //     type: "input"
        // }
    ]).then(function(answer) {
        console.log(answer);
        switch (answer.actionInput) {
            case `View Products for Sale`:
            viewSale();
            break;
    
            case `View Low Inventory`:
            viewLow();
            break;
    
            case `Add to Inventory`:
            addInventory();
            break;
    
            case `Add New Product`:
            addProduct();
            break;
        }
    })
};

function viewSale() {
    // connection.query("DROP VIEW IF EXISTS saleView", function(err, data) {
    //     if (err) throw err;
    //     console.log("Dropped saleView");
    //     connection.query("CREATE VIEW saleView AS SELECT item_id, product_name, price, stock_quantity FROM products", function(err, data) {
    //         if (err) throw err;
    //         console.log("Successfully created saleView");
    //         connection.query("SELECT * FROM saleView", function(err, data) {
    //             console.log(data);
    //     })
    // })
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, data) {
        products = data;
        var productnames = products.map(function(product, index) {
            var productListing = product.product_name + " " + product.price + " " + product.stock_quantity;
            return productListing;
        });
        console.log(productnames);
    // });
})
    connection.end();
};

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 100", function(err,data) {
        products = data;
        var productnames = products.map(function(product, index) {
            var productListing = product.item_id + " " + product.product_name + " " + product.price + " " + product.stock_quantity;
            return productListing;
        });
    console.log(productnames);
    })
    connection.end();
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, data) {
        products = data;
        var productnames = products.map(function(product, index) {
            var productListing = product.item_id + " " + product.product_name + " " + product.price;
            return productListing;
        });
        console.log(productnames);
        promptForInventory();
    });
    // connection.end();
}

function promptForInventory() {
    
    inquirer.prompt([
        {
            name: "productInput",
            message: "Please input item ID of existing list.",
            type: "input"
        },
        {
            name: "addInput",
            message: "How many unit would you like to add?",
            type: "input"
        }
    ]).then(function(answer) {
        console.log(answer);
        connection.query("SELECT stock_quantity FROM products WHERE item_id =" + answer.productInput , function(err,data) {
            if (err) throw err;
            console.log(data);
    
            updatedInventory = parseInt(data[0].stock_quantity) + parseInt(answer.addInput);
            console.log(updatedInventory);
            
           var ttt =  connection.query("UPDATE products SET ? WHERE ? ", [
                {stock_quantity: updatedInventory},
                {item_id: answer.productInput}], function(err, data) {
                // console.log(data.affectedRows + " record(s) updated ");
                if (err) throw err;
                // console.log(data);
                connection.end();
        })

        console.log(ttt.sql);
    })
    
})
}

function addProduct() {
    inquirer.prompt([
        {
            name: "nameInput",
            message: "Please input name of product to add.",
            type: "input"
        },
        {
            name: "departmentInput",
            message: "Please input the department name.",
            type: "input"
        },
        {
            name: "priceInput",
            message: "Please input the price.",
            type: "input"
        },
        {
            name: "quantityInput",
            message: "How many unit would you like to add?",
            type: "input"
        }
    ]).then(function(answer) {
        var values = [[answer.nameInput,
            answer.departmentInput,
            parseInt(answer.priceInput),    
            parseInt(answer.quantityInput)]];
        console.log(answer);
           var mmm =  connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?", [values], function(err, data) {
                console.log(data.affectedRows + " record(s) updated ");
                if (err) throw err;
                // console.log(data);
        })

        console.log(mmm.sql);
        connection.end();
    })
    
}