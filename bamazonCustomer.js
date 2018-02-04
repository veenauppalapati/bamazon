var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon_db'
});

connection.connect(function (error) {
  if (error) throw error;
  // console.log(results);
  displayProducts();
  
});

var result;
function displayProducts (){
  connection.query("SELECT * FROM products", function(err, items){
        if(err) throw err;
        result = items;
  var columns = ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'];
  items.forEach(element => {
    // console.log(element)
    var str = "";
    columns.forEach(elementTwo =>{
      // console.log(elementTwo);
      str += " | " + element[elementTwo];
      
    })
    console.log(str);
  });
  propmptQuestions();
});
}
// var userQuantity;
function propmptQuestions (){ 
  inquirer.prompt([
        {
        name: "Id",
        type: "input",
        message: "Key in the ID of the product You would like to buy",       
        },
        {
        name: "Quantity",
        type: "input",
        message: "how many units of the product You would like to buy",       
        }
      ])
      .then(function(answer) {
        console.log(answer);
        var userChoice = answer.Id
        var userQuantity = answer.Quantity
        // console.log(userChoice);
       result.forEach(element => {
         if(userChoice == element.item_id){
          console.log(element.product_name);
          // console.log(element.stock_quantity);
           if(userQuantity > element.stock_quantity){
             console.log("Out of Stock");
           } else {
             console.log("In Stock");
           }
         }
       });  
      });     
}

 