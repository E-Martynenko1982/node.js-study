const Sequelize = require("sequelize");
const db = require("./db");
const Products = db.products;

async function getDb() {
  const result = await Products.findAll();
  result.forEach(product => {
    console.log(product.dataValues.product_name);
  })
}

getDb();