const db = require("../../data/db-config")

const getAll = () => {
  return  db("cars")
  // DO YOUR MAGIC
}

const getById = (id) => {
  return db("cars").where("id", id).first()
  // DO YOUR MAGIC
}

const create = async (entry) => {
  const id = await db("cars").insert(entry)
  const car = await db("cars").where("id", id).first()
  return car
  // DO YOUR MAGIC
}

const modify = async(id, entry) =>{
  await db("cars").where("id", id).update(entry)
  const car = await db("cars").where("id", id).first()
  return car

}

const remove = async (id) => {
  const deleteId = await db("accounts").where("id", id).del()
  return deleteId
}

module.exports = {getAll, getById, create, modify, remove}
