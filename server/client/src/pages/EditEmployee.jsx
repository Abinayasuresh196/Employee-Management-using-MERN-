import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ FETCH EMPLOYEE
  useEffect(() => {
    if (!id) return;

    API.get(`/employees/${id}`)
      .then(res => {
        reset(res.data); // 🔥 IMPORTANT FIX
        setFetching(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch employee");
        setFetching(false);
      });
  }, [id, reset]);

  // ✅ UPDATE EMPLOYEE
  const submit = async (data) => {
    setLoading(true);
    try {
      await API.put(`/employees/${id}`, data);
      toast.success("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-indigo-600 font-bold text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar />

        <motion.div
          className="p-8 card max-w-xl mx-auto mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
            Edit Employee
          </h2>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">

            <input
              className="input"
              placeholder="Employee ID"
              {...register("empId", { required: true })}
            />

            <input
              className="input"
              placeholder="Name"
              {...register("name", { required: true })}
            />

            <input
              className="input"
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />

            <input
              className="input"
              placeholder="Department"
              {...register("department", { required: true })}
            />

            <input
              className="input"
              placeholder="Role"
              {...register("role")}
            />

            <input
              className="input"
              type="number"
              placeholder="Salary"
              {...register("salary", { required: true })}
            />

            <button
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Updating..." : "Update Employee"}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
