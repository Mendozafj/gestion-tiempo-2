const pool = require('../config/db');

class UsersModel {
  // Método para registrar un nuevo usuario
  async register(user) {
    const query = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';
    const values = [user.username, user.name, user.password];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todos los usuarios
  async show() {
    const query = 'SELECT * FROM users';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un usuario por su ID
  async showByID(id) {
    const query = 'SELECT * FROM users WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un usuario por su nombre de usuario
  async showByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';

    try {
      const [rows] = await pool.query(query, [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un usuario por su nombre de usuario, excluyendo un ID específico
  async showByUsernameExcludingID(username, id) {
    const query = 'SELECT * FROM users WHERE username = ? AND id != ?';

    try {
      const [rows] = await pool.query(query, [username, id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para editar un usuario por su ID
  async edit(updatedUser, id) {
    const query = 'UPDATE users SET username = ?, name = ?, password = ? WHERE id = ?';
    const values = [updatedUser.username, updatedUser.name, updatedUser.password, id];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un usuario por su ID
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersModel();