const pool = require('../config/db');

class HabitsModel {
  // Método para registrar un nuevo hábito
  async register(habit) {
    const query = 'INSERT INTO habits (name, description) VALUES (?, ?)';
    const values = [habit.name, habit.description];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todos los hábitos
  async show() {
    const query = 'SELECT * FROM habits';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un hábito por su ID
  async showByID(id) {
    const query = 'SELECT * FROM habits WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para editar un hábito por su ID
  async edit(updatedHabit, id) {
    const query = 'UPDATE habits SET name = ?, description = ? WHERE id = ?';
    const values = [updatedHabit.name, updatedHabit.description, id];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un hábito por su ID
  async delete(id) {
    const query = 'DELETE FROM habits WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new HabitsModel();