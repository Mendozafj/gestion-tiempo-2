var express = require('express');
var router = express.Router();
var habitsController = require("../controllers/habits.c");

/* POST registrar hábitos */
router.post('/', async (req, res) => {
  try {
    const result = await habitsController.register(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Hábito creado");
  } catch (error) {
    res.status(500).send("Error al registrar el hábito");
  }
});

/* GET mostrar hábitos. */
router.get('/', async (req, res) => {
  try {
    const habits = await habitsController.show();
    res.status(200).render('habits', { habits });  // Renderiza la vista 'habits.ejs'
  } catch (err) {
    res.status(500).send(`Error al listar hábitos: ${err}`);
  }
});

/* GET mostrar hábito por id */
router.get('/:id', async (req, res) => {
  try {
    const habit = await habitsController.showByID(req.params.id);
    if (!habit) {
      return res.status(404).send(`No se encontró el hábito con id: ${req.params.id}`);
    }
    res.status(200).send(habit);
  } catch (err) {
    res.status(500).send(`Error al buscar hábito: ${err}`);
  }
});

/* PUT editar hábito */
router.put('/:id', async (req, res) => {
  try {
    const result = await habitsController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Hábito editado");
  } catch (err) {
    res.status(500).send(`Error al editar el hábito: ${err}`);
  }
});

/* DELETE eliminar hábito */
router.delete('/:id', async (req, res) => {
  try {
    const result = await habitsController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("Hábito eliminado")
  } catch (err) {
    res.status(500).send(`Error al eliminar hábito: ${err}`);
  }
});

module.exports = router;