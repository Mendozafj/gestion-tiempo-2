const pool = require('../config/db');

class CategoriesModel {
  // Método para registrar una nueva categoría
  async register(category) {
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    const values = [category.name, category.description];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar todas las categorías
  async show() {
    const query = 'SELECT * FROM categories';

    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar una categoría por su ID
  async showByID(id) {
    const query = 'SELECT * FROM categories WHERE id = ?';

    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para verificar si una categoría ya existe por su nombre
  async showByName(name) {
    const query = 'SELECT * FROM categories WHERE name = ?';

    try {
      const [rows] = await pool.query(query, [name]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para verificar si una categoría ya existe por su nombre, excluyendo un ID específico
  async showByNameExcludingID(name, id) {
    const query = 'SELECT * FROM categories WHERE name = ? AND id != ?';

    try {
      const [rows] = await pool.query(query, [name, id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método para editar una categoría por su ID
  async edit(updatedCategory, id) {
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    const values = [updatedCategory.name, updatedCategory.description, id];

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar una categoría por su ID
  async delete(id) {
    const query = 'DELETE FROM categories WHERE id = ?';

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoriesModel();