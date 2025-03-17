var express = require('express');
var router = express.Router();
var activitiesController = require("../controllers/activities.c");

/* POST registrar actividades */
router.post('/', async (req, res) => {
  try {
    const result = await activitiesController.register(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Actividad creada");
  } catch (error) {
    res.status(500).send("Error al registrar la actividad");
  }
});

/* GET mostrar actividades. */
router.get('/', async (req, res) => {
  try {
    const activities = await activitiesController.show();
    res.status(200).render('activities', { activities });  // Renderiza la vista 'activities.ejs'
  } catch (err) {
    res.status(500).send(`Error al listar actividades: ${err}`);
  }
});

/* GET mostrar actividad por id */
router.get('/:id', async (req, res) => {
  try {
    const activity = await activitiesController.showByID(req.params.id);
    if (!activity) {
      return res.status(404).send(`No se encontró la actividad con id: ${req.params.id}`);
    }
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send(`Error al buscar actividad: ${err}`);
  }
});

/* PUT editar actividad */
router.put('/:id', async (req, res) => {
  try {
    const result = await activitiesController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Actividad editada");
  } catch (err) {
    res.status(500).send(`Error al editar la actividad: ${err}`);
  }
});

/* DELETE eliminar actividad */
router.delete('/:id', async (req, res) => {
  try {
    const result = await activitiesController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Actividad eliminada")
  } catch (err) {
    res.status(500).send(`Error al eliminar actividad: ${err}`);
  }
});

module.exports = router;