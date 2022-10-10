const Animal = require('../models/animal');

exports.getAnimalById = async (req, res, next) => {
  try {
    const animalId = req.params.id
    console.log(`--> get animal with id ${animalId}`)
    const animal = await Animal.findOne({_id: animalId})
    res.status(200).json(animal)
  } catch (err) {
    console.error(err)
    const error = new Error(err)
    error.statusCode = 404
    error.message = 'Animal not found'
    next(error)
  }
}

exports.getAnimals = async (req, res, next) => {
  try {
    console.log('--> get all animals')
    const count = await Animal.countDocuments()
    const animals = await Animal.find()
    res.status(200).json([...animals])
  } catch (err) {
    console.error(err)
    next(err)
  }
}

exports.createAnimal = async (req, res, next) => {
  try {
    console.log('--> creating a new animal')
    const newAnimal = new Animal({
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        gender: req.body.gender,
        vaccinated: req.body.vaccinated,
        lastVisit: req.body.lastVisit,
        lastUpdate: req.body.lastUpdate
      }
    )
    await newAnimal.save()
    res.status(201).json({
      newAnimal
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

exports.updateAnimal = async (req, res, next) => {
  try {
    const animalId = req.body._id
    console.log(`--> updating animal with id ${animalId}`)
    const existingAnimal = {...req.body}
    existingAnimal.lastUpdate = new Date()
    const animal = await Animal.updateOne({_id: animalId}, existingAnimal)
    const updatedAnimal = await Animal.findOne({_id: animalId})
    console.log(`--> el animal ${updatedAnimal._id}`)
    res.status(200).json(updatedAnimal)
  } catch (err) {
    console.error(err)
    const error = new Error(err)
    error.statusCode = 404
    error.message = 'Animal not found'
    next(error)
  }
}

exports.deleteAnimal = async (req, res, next) => {
  try {
    const animalId = req.params.id
    console.log(`--> deleting animal with id ${animalId}`)
    const animal = await Animal.deleteOne({_id: animalId})
    res.status(204).json()
  } catch (err) {
    console.error(err)
    const error = new Error(err)
    error.statusCode = 404
    error.message = 'Animal not found'
    next(error)
  }
}

exports.visitAnimal = async (req, res, next) => {
  try {
    const animalId = req.params.id
    console.log(`--> visiting animal with id ${animalId}`)
    const animal = await Animal.updateOne({_id: animalId}, {$set: {lastVisit: new Date()}})
    res.status(204).json()
  } catch (err) {
    console.error(err)
    const error = new Error(err)
    error.statusCode = 404
    error.message = 'Animal not found'
    next(error)
  }
}
