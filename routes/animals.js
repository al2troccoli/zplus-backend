const express = require('express');
const animalController =  require('../controllers/animals')

const router = express.Router();

// GET => /animals/all-animals
router.get('/:id', animalController.getAnimalById);

// GET => /animals/all-animals
router.get('/', animalController.getAnimals);

// POST => /animals/new-animal
router.post('/new-animal', animalController.createAnimal);

// DELETE => /animals/:id
router.delete('/:id', animalController.deleteAnimal);

// PUT => /animals/update-animal
router.put('/update-animal', animalController.updateAnimal);

// PATCH => /animals/visited
router.patch('/visited/:id', animalController.visitAnimal);

module.exports = router;
