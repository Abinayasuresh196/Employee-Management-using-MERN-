const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// ORDER IS VERY IMPORTANT
router.get("/", getEmployees);
router.post("/", addEmployee);

router.get("/:id", getEmployeeById);   // ✅ THIS LINE
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
