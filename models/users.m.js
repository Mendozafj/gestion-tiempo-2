const pool = require('../config/db');
// const { v4: uuidv4 } = require('uuid');

class UsersModel {
  // Método para registrar un nuevo usuario
  async register(user) {
    return new Promise((resolve, reject) => {
      // user.id = uuidv4(); // Genera un UUID para el nuevo usuario
      const query = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';
      const values = [user.username, user.name, user.password];

      pool.query(query, values)
        .then(([result]) => resolve(result.insertId))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar todos los usuarios
  async show() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';

      pool.query(query)
        .then(([rows]) => resolve(rows))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar un usuario por su ID
  async showByID(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';

      pool.query(query, [id])
        .then(([rows]) => resolve(rows[0]))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar un usuario por su nombre de usuario
  async showByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ?';

      pool.query(query, [username])
        .then(([rows]) => resolve(rows[0]))
        .catch(error => reject(error));
    });
  }

  // Método para mostrar un usuario por su nombre de usuario, excluyendo un ID específico
  async showByUsernameExcludingID(username, id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ? AND id != ?';

      pool.query(query, [username, id])
        .then(([rows]) => resolve(rows[0]))
        .catch(error => reject(error));
    });
  }

  // Método para editar un usuario por su ID
  async edit(updatedUser, id) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET username = ?, name = ?, password = ? WHERE id = ?';
      const values = [updatedUser.username, updatedUser.name, updatedUser.password, id];

      pool.query(query, values)
        .then(([result]) => resolve(result.affectedRows))
        .catch(error => reject(error));
    });
  }

  // Método para eliminar un usuario por su ID
  async delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';

      pool.query(query, [id])
        .then(([result]) => resolve(result.affectedRows))
        .catch(error => reject(error));
    });
  }
}

module.exports = new UsersModel();