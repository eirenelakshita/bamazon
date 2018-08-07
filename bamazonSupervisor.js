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
            name: "actionSupervisor",
            message: "What would you like to do?",
            type: "list",
            choices: [`View Product Sales by Department`,
            `Create New Department`]}
        // },
        // {
        //     name: "itemQuantity",
        //     message: "How many unit would you like to purchase?",
        //     type: "input"
        // }
    ]).then(function(answer) {
        console.log(answer);
        switch (answer.actionSupervisor) {
            case `View Product Sales by Department`:
            viewDept();
            break;
    
            case `Create New Department`:
            createDept();
            break;
            }
    })
};

function viewDept() {
//     connection.query("DROP VIEW IF EXISTS deptView", function(err, data) {
//         if (err) throw err;
//         console.log("Dropped deptView");
//         connection.query("CREATE VIEW deptView AS SELECT department_id, department_name, over_head_costs FROM departments", function(err, data) {
//             if (err) throw err;
//             console.log("Successfully created deptView");
//             connection.query("SELECT * FROM deptView", function(err, data) {
//                 console.log(data);
//         })
//     });
// });

connection.query("SELECT products.product_sales,SUM(products.product_sales) AS product_sales FROM Orders LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID GROUP BY ShipperName;");
}
