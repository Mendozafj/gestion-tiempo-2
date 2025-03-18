var express = require('express');
var router = express.Router();
var categoriesController = require("../controllers/categories.c");

/* POST registrar categorías */
router.post('/', async (req, res) => {
  try {
    const result = await categoriesController.register(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Categoría creada");
  } catch (error) {
    res.status(500).send("Error al registrar la categoría");
  }
});

/* GET mostrar categorías. */
router.get('/', async (req, res) => {
  try {
    const categories = await categoriesController.show();
    res.status(200).render('categories', { categories });  // Renderiza la vista 'categories.ejs'
  } catch (err) {
    res.status(500).send(`Error al listar categorías: ${err}`);
  }
});

// Mostrar información sobre el tiempo usado en cada categoría
router.get('/time-used', async (req, res) => {
  try {
    const timeUsedByCategory = await categoriesController.getTimeUsedByCategory();
    res.status(200).send(timeUsedByCategory);
  } catch (err) {
    res.status(500).send(`Error al obtener el tiempo usado por categoría: ${err}`);
  }
});

/* GET mostrar categoría por id */
router.get('/:id', async (req, res) => {
  try {
    const category = await categoriesController.showByID(req.params.id);
    if (!category) {
      return res.status(404).send(`No se encontró la categoría con id: ${req.params.id}`);
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(`Error al buscar categoría: ${err}`);
  }
});

/* PUT editar categoría */
router.put('/:id', async (req, res) => {
  try {
    const result = await categoriesController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Categoría editada");
  } catch (err) {
    res.status(500).send(`Error al editar la categoría: ${err}`);
  }
});

/* DELETE eliminar categoría */
router.delete('/:id', async (req, res) => {
  try {
    const result = await categoriesController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Categoría eliminada")
  } catch (err) {
    res.status(500).send(`Error al eliminar categoría: ${err}`);
  }
});

module.exports = router;