const projectsModel = require("../models/projects.m");

class ProjectsController {
  async register(data) {
    const { name, description } = data;
    if (!name || !description) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const newProject = { name, description };
      await projectsModel.register(newProject);

      return { success: true };
    } catch (error) {
      return { error: `Error al registrar proyecto: ${error.message}` };
    }
  }

  async show() {
    try {
      const projects = await projectsModel.show();
      return projects;
    } catch (err) {
      throw new Error(`Error al listar proyectos: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const project = await projectsModel.showByID(id);
      if (!project) {
        return false;
      }
      return project;
    } catch (err) {
      throw new Error(`Error al buscar proyecto: ${err}`);
    }
  }

  async update(id, data) {
    const { name, description } = data;

    try {
      const project = await projectsModel.showByID(id);
      if (!project) {
        return { error: `No se encontró el proyecto con id: ${id}` };
      }

      const updatedProject = {
        name: name || project.name,
        description: description || project.description
      };

      await projectsModel.edit(updatedProject, id);

      return { success: true };
    } catch (err) {
      throw new Error(`Error al editar el proyecto: ${err}`);
    }
  }

  async delete(id) {
    try {
      const project = await projectsModel.showByID(id);
      if (!project) {
        return { error: `No se encontró el proyecto con id: ${id}` };
      }

      await projectsModel.delete(id);
      return { success: true };
    } catch (err) {
      throw new Error(`Error al eliminar proyecto: ${err}`);
    }
  }
}

module.exports = new ProjectsController();