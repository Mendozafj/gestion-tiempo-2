const pool = require('../config/db');

class ActivityLogsModel {
  // Método para verificar si una actividad existe por su ID
  async activityExists(activity_id) {
    const query = 'SELECT id FROM activities WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [activity_id]);
      return rows.length > 0; // Devuelve true si existe, false si no
    } catch (error) {
      throw error;
    }
  }

  // Método para verificar si un usuario existe por su ID
  async userExists(user_id) {
    const query = 'SELECT id FROM users WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [user_id]);
      return rows.length > 0; // Devuelve true si existe, false si no
    } catch (error) {
      throw error;
    }
  }

  // Método para registrar un nuevo registro de actividad
  async register(activityLog) {
    const query = `
      INSERT INTO activity_logs (activity_id, user_id, start_time, end_time)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      activityLog.activity_id,
      activityLog.user_id,
      activityLog.start_time,
      activityLog.end_time
    ];

    try {
      // Verificar si la actividad existe
      const activityExists = await this.activityExists(activityLog.activity_id);
      if (!activityExists) {
        throw new Error("La actividad no existe.");
      }

      // Verificar si el usuario existe
      const userExists = await this.userExists(activityLog.user_id);
      if (!userExists) {
        throw new Error("El usuario no existe.");
      }

      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todos los registros de actividad
  async show() {
    const query = 'SELECT * FROM activity_logs';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un registro de actividad por su ID
  async showByID(id) {
    const query = 'SELECT * FROM activity_logs WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar registros de actividad por usuario
  async showByUser(user_id) {
    const query = 'SELECT * FROM activity_logs WHERE user_id = ?';

    try {
      const [rows] = await pool.query(query, [user_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar registros de actividad por actividad
  async showByActivity(activity_id) {
    const query = 'SELECT * FROM activity_logs WHERE activity_id = ?';

    try {
      const [rows] = await pool.query(query, [activity_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para editar un registro de actividad por su ID
  async edit(updatedActivityLog, id) {
    const query = `
      UPDATE activity_logs
      SET start_time = ?, end_time = ?
      WHERE id = ?
    `;
    const values = [
      updatedActivityLog.start_time,
      updatedActivityLog.end_time,
      id
    ];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un registro de actividad por su ID
  async delete(id) {
    const query = 'DELETE FROM activity_logs WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ActivityLogsModel();