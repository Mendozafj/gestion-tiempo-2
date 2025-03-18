var express = require('express');
var router = express.Router();
var projectsController = require("../controllers/projects.c");

/* POST registrar proyectos */
router.post('/', async (req, res) => {
  try {
    const result = await projectsController.register(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Proyecto creado");
  } catch (error) {
    res.status(500).send("Error al registrar el proyecto");
  }
});

/* GET mostrar proyectos. */
router.get('/', async (req, res) => {
  try {
    const projects = await projectsController.show();
    res.status(200).render('projects', { projects });  // Renderiza la vista 'projects.ejs'
  } catch (err) {
    res.status(500).send(`Error al listar proyectos: ${err}`);
  }
});

/* GET mostrar proyecto por id */
router.get('/:id', async (req, res) => {
  try {
    const project = await projectsController.showByID(req.params.id);
    if (!project) {
      return res.status(404).send(`No se encontró el proyecto con id: ${req.params.id}`);
    }
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(`Error al buscar proyecto: ${err}`);
  }
});

/* PUT editar proyecto */
router.put('/:id', async (req, res) => {
  try {
    const result = await projectsController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Proyecto editado");
  } catch (err) {
    res.status(500).send(`Error al editar el proyecto: ${err}`);
  }
});

/* DELETE eliminar proyecto */
router.delete('/:id', async (req, res) => {
  try {
    const result = await projectsController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Proyecto eliminado")
  } catch (err) {
    res.status(500).send(`Error al eliminar proyecto: ${err}`);
  }
});

module.exports = router;