// DO YOUR MAGIC
const express = require("express")
const router = express.Router()
const Cars = require("./cars-model")
const md = require("./cars-middleware")

router.get("/", async (req, res, next)=>{
    const cars = await Cars.getAll()
    try {
        res.status(200).json(cars)

    }
    catch(error) {
        next(error)
    }
})

router.get("/:id", md.checkCarId, async (req, res, next)=>{
    if (req.car) {
        res.status(200).json(req.car)
    } else {
        const error = {status: 500}
        next(error)
    }
})

router.post("/", md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique, async (req, res, next)=>{
    const car = await Cars.create(req.body)
    try {
        res.status(200).json(car)
    }
    catch(error) {
        next(error)
    }
})

router.put("/:id", md.checkCarId,md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique, async (req, res, next)=>{
    const {id} = req.params
    const car = await Cars.modify(id, req.body)
    try {
        res.status(200).json(car)
    }
    catch(error) {
        next(error)
    }
})

router.delete("/:id", md.checkCarId, async (req, res, next)=>{
    const {id} = req.params
    const car = await Cars.remove(id)
    try {
        res.status(200).json(car)
    }
    catch(error) {
        next(error)
    }
})

router.use((error, req, res, next)=>{
    res.status(error.status || 500).json({message: error.message || "error with this request"})
})

module.exports = router
