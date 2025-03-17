const pool = require('../config/db');

class ActivitiesModel {
  // Método para registrar una nueva actividad
  async register(activity) {
    const query = 'INSERT INTO activities (name, description) VALUES (?, ?)';
    const values = [activity.name, activity.description];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todas las actividades
  async show() {
    const query = 'SELECT * FROM activities';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar una actividad por su ID
  async showByID(id) {
    const query = 'SELECT * FROM activities WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para editar una actividad por su ID
  async edit(updatedActivity, id) {
    const query = 'UPDATE activities SET name = ?, description = ? WHERE id = ?';
    const values = [updatedActivity.name, updatedActivity.description, id];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar una actividad por su ID
  async delete(id) {
    const query = 'DELETE FROM activities WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ActivitiesModel();