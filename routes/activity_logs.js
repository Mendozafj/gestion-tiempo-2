var express = require('express');
var router = express.Router();
var activityLogsController = require("../controllers/activity_logs.c");

/* POST registrar un registro de actividad */
router.post('/', async (req, res) => {
  try {
    const result = await activityLogsController.register(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Registro de actividad creado");
  } catch (error) {
    res.status(500).send("Error al registrar el registro de actividad");
  }
});

/* GET mostrar todos los registros de actividad */
router.get('/', async (req, res) => {
  try {
    const activityLogs = await activityLogsController.show();
    res.status(200).send(activityLogs);
  } catch (err) {
    res.status(500).send(`Error al listar registros de actividad: ${err}`);
  }
});

/* GET mostrar un registro de actividad por su ID */
router.get('/:id', async (req, res) => {
  try {
    const activityLog = await activityLogsController.showByID(req.params.id);
    if (!activityLog) {
      return res.status(404).send(`No se encontró el registro de actividad con id: ${req.params.id}`);
    }
    res.status(200).send(activityLog);
  } catch (err) {
    res.status(500).send(`Error al buscar registro de actividad: ${err}`);
  }
});

/* GET mostrar registros de actividad por usuario */
router.get('/user/:user_id', async (req, res) => {
  try {
    const activityLogs = await activityLogsController.showByUser(req.params.user_id);
    res.status(200).send(activityLogs);
  } catch (err) {
    res.status(500).send(`Error al buscar registros de actividad por usuario: ${err}`);
  }
});

/* GET mostrar registros de actividad por actividad */
router.get('/activity/:activity_id', async (req, res) => {
  try {
    const activityLogs = await activityLogsController.showByActivity(req.params.activity_id);
    res.status(200).send(activityLogs);
  } catch (err) {
    res.status(500).send(`Error al buscar registros de actividad por actividad: ${err}`);
  }
});

/* PUT editar un registro de actividad */
router.put('/:id', async (req, res) => {
  try {
    const result = await activityLogsController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Registro de actividad editado");
  } catch (err) {
    res.status(500).send(`Error al editar el registro de actividad: ${err}`);
  }
});

/* DELETE eliminar un registro de actividad */
router.delete('/:id', async (req, res) => {
  try {
    const result = await activityLogsController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Registro de actividad eliminado")
  } catch (err) {
    res.status(500).send(`Error al eliminar registro de actividad: ${err}`);
  }
});

module.exports = router;