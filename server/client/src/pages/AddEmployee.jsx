import { useForm } from "react-hook-form";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddEmployee() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await API.post("/employees", data);
      toast.success("Employee added successfully!");
      reset();
      navigate("/employees");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add employee");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar />
        <motion.div
          className="p-8 card max-w-xl mx-auto mt-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">Add New Employee</h2>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <input
              className="input"
              placeholder="Emp ID"
              {...register("empId", { required: "Employee ID is required" })}
            />
            {errors.empId && <p className="text-red-500 text-sm">{errors.empId.message}</p>}

            <input
              className="input"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input
              className="input"
              placeholder="Email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input
              className="input"
              placeholder="Department"
              {...register("department", { required: "Department is required" })}
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}

            <input
              className="input"
              placeholder="Role"
              {...register("role")}
            />

            <input
              className="input"
              placeholder="Salary"
              type="number"
              {...register("salary", { required: "Salary is required" })}
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}

            <button
              className="btn-primary w-full"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Employee"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
