const Department = require("../model/dept.model");

const notFoundError = () => {
  const error = new Error("Department not found");
  error.statusCode = 404;
  return error;
};

const validateDepartmentId = (departmentId) => {
  if (!Number.isInteger(Number(departmentId)) || Number(departmentId) < 1) {
    const error = new Error("Department ID must be a positive integer");
    error.statusCode = 400;
    throw error;
  }
};

async function getDepartmentById(departmentId) {
  validateDepartmentId(departmentId);
  const department = await Department.findByPk(departmentId);
  if (!department) {
    throw notFoundError();
  }
  return department;
}

async function getAllDepartments() {
  return Department.findAll();
}

async function createDepartment(departmentData) {
  const { name, description } = departmentData ?? {};
  if (typeof name !== "string" || !name.trim() ||
      typeof description !== "string" || !description.trim()) {
    const error = new Error("Department name and description are required");
    error.statusCode = 400;
    throw error;
  }

  return Department.create({
    name: name.trim(),
    description: description.trim(),
  });
}

async function updateDepartment(departmentId, departmentData) {
  const department = await getDepartmentById(departmentId);
  const { name, description } = departmentData ?? {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      const error = new Error("Department name must be a non-empty string");
      error.statusCode = 400;
      throw error;
    }
    department.name = name.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || !description.trim()) {
      const error = new Error("Department description must be a non-empty string");
      error.statusCode = 400;
      throw error;
    }
    department.description = description.trim();
  }

  await department.save();
  return department;
}

async function deleteDepartment(departmentId) {
  const department = await getDepartmentById(departmentId);
  await department.destroy();
}

module.exports = {
  getDepartmentById,
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
