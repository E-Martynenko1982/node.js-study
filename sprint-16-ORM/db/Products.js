const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("Products", {
    product_id: {
      type: Sequelize.SMALLINT,
      primaryKey: true
    },
    product_name: {
      type: Sequelize.STRING(64),
    }
  }, {
    timestamps: false,
    tableName: "products"
  })
}