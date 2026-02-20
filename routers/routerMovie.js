//importiamo express
const express = require ('express')
//importiamo express per gestire le rotte 
const router = express.Router()
//importiamo controller
const controllerMovies = require('../controllers/controllerMovies')

//rotta index
router.get('/', controllerMovies.index);


//rotta index
router.get('/:id', controllerMovies.show);

module.exports = router;