const habitsModel = require("../models/habits.m");

class HabitsController {
  async register(data) {
    const { name, description } = data;
    if (!name || !description) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const newHabit = { name, description };
      await habitsModel.register(newHabit);

      return { success: true };
    } catch (error) {
      return { error: `Error al registrar hábito: ${error.message}` };
    }
  }

  async show() {
    try {
      const habits = await habitsModel.show();
      return habits;
    } catch (err) {
      throw new Error(`Error al listar hábitos: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const habit = await habitsModel.showByID(id);
      if (!habit) {
        return false;
      }
      return habit;
    } catch (err) {
      throw new Error(`Error al buscar hábito: ${err}`);
    }
  }

  async update(id, data) {
    const { name, description } = data;

    try {
      const habit = await habitsModel.showByID(id);
      if (!habit) {
        return { error: `No se encontró el hábito con id: ${id}` };
      }

      const updatedHabit = {
        name: name || habit.name,
        description: description || habit.description
      };

      await habitsModel.edit(updatedHabit, id);

      return { success: true };
    } catch (err) {
      throw new Error(`Error al editar el hábito: ${err}`);
    }
  }

  async delete(id) {
    try {
      const habit = await habitsModel.showByID(id);
      if (!habit) {
        return { error: `No se encontró el hábito con id: ${id}` };
      }

      await habitsModel.delete(id);
      return { success: true };
    } catch (err) {
      throw new Error(`Error al eliminar hábito: ${err}`);
    }
  }
}

module.exports = new HabitsController();