const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  logging: false
});

const Products = require("./Products")(sequelize);

module.exports = {
  sequelize: sequelize,
  products: Products
}