const usersModel = require("../models/users.m");

class UsersController {
  async register(data) {
    const { name, username, password } = data;
    if (!name || !username || !password) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const userByUsername = await usersModel.showByUsername(username);
      if (userByUsername) {
        return { error: "El nombre de usuario ya está en uso." };
      }

      const newUser = { name, username, password };
      await usersModel.register(newUser);

      return { success: true };
    } catch (error) {
      return { error: `Error al registrar usuario: ${error.message}` };
    }
  }

  async show() {
    try {
      const users = await usersModel.show();
      return users;
    } catch (err) {
      throw new Error(`Error al listar usuarios: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const user = await usersModel.showByID(id);
      if (!user) {
        return false;
      }
      return user;
    } catch (err) {
      throw new Error(`Error al buscar usuario: ${err}`);
    }
  }

  async showByUsername(username) {
    try {
      const user = await usersModel.showByUsername(username);
      return user;
    } catch (err) {
      throw new Error(`Error al buscar usuario: ${err}`);
    }
  }

  async update(id, data) {
    const { name, username, password, email } = data;

    try {
      const user = await usersModel.showByID(id);
      if (!user) {
        return { error: `No se encontró el usuario con id: ${id}` };
      }

      if (username) {
        const existingUser = await usersModel.showByUsernameExcludingID(username, id);
        if (existingUser) {
          return { error: "El nombre de usuario ya está en uso por otro usuario." };
        }
      }

      const updatedUser = {
        name: name || user.name,
        username: username || user.username,
        password: password || user.password
      };

      await usersModel.edit(updatedUser, id);

      return { success: true };
    } catch (err) {
      throw new Error(`Error al editar el usuario: ${err}`);
    }
  }

  async delete(id) {
    try {
      const user = await usersModel.showByID(id);
      if (!user) {
        return { error: `No se encontró el usuario con id: ${id}` };
      }

      await usersModel.delete(id);
      return { success: true };
    } catch (err) {
      throw new Error(`Error al eliminar usuario: ${err}`);
    }
  }
}

module.exports = new UsersController();