const departmentService = require("../service/dept.service");

async function getDepartmentById(req, res) {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    return res.status(200).json(department);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await departmentService.getAllDepartments();
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json({ message: "Unable to retrieve departments" });
  }
}

async function createDepartment(req, res) {
  try {
    const department = await departmentService.createDepartment(req.body);
    return res.status(201).json(department);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function updateDepartment(req, res) {
  try {
    const department = await departmentService.updateDepartment(req.params.id, req.body);
    return res.status(200).json(department);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function deleteDepartment(req, res) {
  try {
    await departmentService.deleteDepartment(req.params.id);
    return res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        message: "Cannot delete a department while users are assigned to it",
      });
    }
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  getDepartmentById,
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
