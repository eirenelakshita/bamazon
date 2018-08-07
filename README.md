# bamazon

The Bamazon app enables users to purchase everyday products.

# bamazonCustomer
To view products available on sale, run 'node bamazonCustomer.js'. This will display the products on your console, as shown in customer1.png.
Customers may proceed with transaction by inputting the item id (as referenced by the list displayed above) and the quantity they'd like to purchase, as shown in customer2.png.
If Bamazon is able to fulfill the transaction, the app will display the customer's total purchase in the console (customer4.png). Otherwise, Bamazon will notify the customer that the transaction could not be completed (customer4.png). Then, it will exit out of the transaction.
If the transaction was successful, Bamazon app updates it's back end inventory stock_quantity database and records the sale of product, as seen from beginning (startingPoint.png) to after purchase (afterTransaction.png).

# bamazonManager
Through this app, a Bamazon manager will be able to:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

To start this app, input 'node bamazonManager.js' on your console. This will take the manager to a list of actions.
Once the manager chooses:

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities (reference: manager1.png).

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five (reference: manager2.png).

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store (reference: manager3.png).

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store (reference: manager4.png).

  # bamazonSupervisor

  This is an upcoming Bamazon app curated for Bamazon supervisor due for release by October 2018.
  This app will be able to display:
* department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)