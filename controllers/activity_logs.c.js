const activityLogsModel = require("../models/activity_logs.m");

class ActivityLogsController {
  async register(data) {
    const { activity_id, user_id, start_time, end_time } = data;
    if (!activity_id || !user_id || !start_time || !end_time) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const existingActivityLogs = await activityLogsModel.showByActivity(activity_id);
      if (existingActivityLogs.length > 0) {
        return { error: "Ya existe un registro para esta actividad." };
      }

      const newActivityLog = { activity_id, user_id, start_time, end_time };
      await activityLogsModel.register(newActivityLog);

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  async show() {
    try {
      const activityLogs = await activityLogsModel.show();
      return activityLogs;
    } catch (err) {
      throw new Error(`Error al listar registros de actividad: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const activityLog = await activityLogsModel.showByID(id);
      if (!activityLog) {
        return false;
      }
      return activityLog;
    } catch (err) {
      throw new Error(`Error al buscar registro de actividad: ${err}`);
    }
  }

  async showByUser(user_id) {
    try {
      const activityLogs = await activityLogsModel.showByUser(user_id);
      return activityLogs;
    } catch (err) {
      throw new Error(`Error al buscar registros de actividad por usuario: ${err}`);
    }
  }

  async showByActivity(activity_id) {
    try {
      const activityLogs = await activityLogsModel.showByActivity(activity_id);
      return activityLogs;
    } catch (err) {
      throw new Error(`Error al buscar registros de actividad por actividad: ${err}`);
    }
  }

  async update(id, data) {
    const { start_time, end_time } = data;

    try {
      const activityLog = await activityLogsModel.showByID(id);
      if (!activityLog) {
        return { error: `No se encontró el registro de actividad con id: ${id}` };
      }

      const updatedActivityLog = {
        start_time: start_time || activityLog.start_time,
        end_time: end_time || activityLog.end_time
      };

      await activityLogsModel.edit(updatedActivityLog, id);

      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  }

  async delete(id) {
    try {
      const activityLog = await activityLogsModel.showByID(id);
      if (!activityLog) {
        return { error: `No se encontró el registro de actividad con id: ${id}` };
      }

      await activityLogsModel.delete(id);
      return { success: true };
    } catch (err) {
      throw new Error(`Error al eliminar registro de actividad: ${err}`);
    }
  }
}

module.exports = new ActivityLogsController();