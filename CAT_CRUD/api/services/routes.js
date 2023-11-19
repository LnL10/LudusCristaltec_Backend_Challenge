const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');


//Rota para ver tags mais comuns
router.get('/cats/tags',catController.getTags);

// Rota para retornar um gato aleatório
router.get('/cats/random', catController.getRandomCat);

// Rota para pesquisar gatos por nome
router.get('/cats/search', catController.searchCatByName);

// Rota para listar todos os gatos
router.get('/cats', catController.getAllCats);

// Rota para criar um novo gato
router.post('/cats', catController.createCat);

// Rota para obter um gato por ID
router.get('/cats/:id', catController.getCatById);

// Rota para atualizar um gato por ID
router.put('/cats/:id', catController.updateCat);

// Rota para excluir um gato por ID
router.delete('/cats/:id', catController.deleteCat);

// Rota para adiconar rating a um gato
router.post('/cats/:id/addrating', catController.createCatRating);

// Rota para ver ratings de um gato
router.get('/cats/:id/ratings',catController.getRatings);

// Rota para ver a média dos gatos por ordem
router.get('/cats/ratings/average',catController.catAverage);



module.exports = router;
