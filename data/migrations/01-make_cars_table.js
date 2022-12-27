exports.up = function (knex) {
  return knex.schema.createTable("cars", function(table) {
    table.increments();
    table.string("vin").unique().notNullable();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.integer("mileage").notNullable();
    table.string("title");
    table.string("transmission");
  })
  // DO YOUR MAGIC
};

exports.down = function (knex) {
  return knex.schema.dropTable("cars");
  // DO YOUR MAGIC
};
