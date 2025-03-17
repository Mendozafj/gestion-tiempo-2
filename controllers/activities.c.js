const activitiesModel = require("../models/activities.m");

class ActivitiesController {
  async register(data) {
    const { name, description } = data;
    if (!name || !description) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const newActivity = { name, description };
      await activitiesModel.register(newActivity);

      return { success: true };
    } catch (error) {
      return { error: `Error al registrar actividad: ${error.message}` };
    }
  }

  async show() {
    try {
      const activities = await activitiesModel.show();
      return activities;
    } catch (err) {
      throw new Error(`Error al listar actividades: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const activity = await activitiesModel.showByID(id);
      if (!activity) {
        return false;
      }
      return activity;
    } catch (err) {
      throw new Error(`Error al buscar actividad: ${err}`);
    }
  }

  async update(id, data) {
    const { name, description } = data;

    try {
      const activity = await activitiesModel.showByID(id);
      if (!activity) {
        return { error: `No se encontró la actividad con id: ${id}` };
      }

      const updatedActivity = {
        name: name || activity.name,
        description: description || activity.description
      };

      await activitiesModel.edit(updatedActivity, id);

      return { success: true };
    } catch (err) {
      throw new Error(`Error al editar la actividad: ${err}`);
    }
  }

  async delete(id) {
    try {
      const activity = await activitiesModel.showByID(id);
      if (!activity) {
        return { error: `No se encontró la actividad con id: ${id}` };
      }

      await activitiesModel.delete(id);
      return { success: true };
    } catch (err) {
      throw new Error(`Error al eliminar actividad: ${err}`);
    }
  }
}

module.exports = new ActivitiesController();