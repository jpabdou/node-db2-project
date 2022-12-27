const { validate } = require("vin-validator");
const db = require("../../data/db-config")
const Cars = require("./cars-model")

const checkCarId = async (req, res, next) => {
  const {id} = req.params
  const car = await Cars.getById(id);
  if (car) {
    req.car = car
    next()
  } else {
    next({status: 404, message: `car with id ${id} is not found`})
  }
  // DO YOUR MAGIC
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  const error = {status: 400, message: ""}
  if (vin === undefined) {
    error.message = "vin is missing"
  } else if (make === undefined) {
    error.message = "make is missing"

  } else if (model === undefined ) {
    error.message = "model is missing"

  } else if (mileage === undefined) {
    error.message = "mileage is missing"

  }
  if (error.message) {
    next(error)
  } else {
    next()
  }

  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body
  if(validate(vin)) {
    next()
  } else {
    next({status: 400, message: `vin ${vin} is invalid`})
  }
  // DO YOUR MAGIC
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} = req.body
  const car = await db("cars").where("vin",vin).first()
  if (car) {
    next({status: 400, message: `vin ${vin} already exists`})
  } else {
    next()
  }

  // DO YOUR MAGIC
}

module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}
