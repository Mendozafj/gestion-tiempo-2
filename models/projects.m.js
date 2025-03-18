const pool = require('../config/db');

class ProjectsModel {
  // Método para registrar un nuevo proyecto
  async register(project) {
    const query = 'INSERT INTO projects (name, description) VALUES (?, ?)';
    const values = [project.name, project.description];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todos los proyectos
  async show() {
    const query = 'SELECT * FROM projects';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar un proyecto por su ID
  async showByID(id) {
    const query = 'SELECT * FROM projects WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para editar un proyecto por su ID
  async edit(updatedProject, id) {
    const query = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
    const values = [updatedProject.name, updatedProject.description, id];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un proyecto por su ID
  async delete(id) {
    const query = 'DELETE FROM projects WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProjectsModel();