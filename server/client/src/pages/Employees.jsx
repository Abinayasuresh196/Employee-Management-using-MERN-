import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 3; // 🔹 ONLY 3 employees

  useEffect(() => {
    API.get("/employees")
      .then(res => setEmployees(res.data))
      .catch(() => toast.error("Failed to fetch employees"))
      .finally(() => setLoading(false));
  }, []);

  const deleteEmp = async (id) => {
    if (window.confirm("Delete employee?")) {
      try {
        await API.delete(`/employees/${id}`);
        setEmployees(employees.filter(e => e._id !== id));
        toast.success("Employee deleted");
      } catch {
        toast.error("Failed to delete employee");
      }
    }
  };

  // 🔍 SEARCH FILTER
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-indigo-600 font-bold text-xl">
          Loading employees...
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar />
        <div className="p-8">

          {/* 🔍 SEARCH */}
          <input
            className="input mb-4"
            placeholder="Search employees..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1); // 🔹 reset page on search
            }}
          />

          {paginated.length === 0 && (
            <p className="text-gray-500 mt-4 text-center">
              No employees found.
            </p>
          )}

          {/* 👨‍💼 EMPLOYEE CARDS */}
          {paginated.map(e => (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card mb-3 flex justify-between items-center hover:shadow-lg"
            >
              <div>
                <p className="font-bold text-lg">{e.name}</p>
                <p className="text-gray-600">{e.department}</p>
              </div>

              <div className="space-x-2">
                <Link
                  to={`/edit/${e._id}`}
                  className="btn-primary px-4 py-1"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteEmp(e._id)}
                  className="btn-danger px-4 py-1"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}

          {/* ⏮️ ⏭️ PREVIOUS / NEXT */}
          {filtered.length > perPage && (
            <div className="flex justify-center items-center gap-4 mt-10">
  <button
    onClick={() => setPage(p => p - 1)}
    disabled={page === 1}
    className={`px-4 py-2 rounded font-semibold transition
      ${page === 1
        ? "bg-indigo-300 text-white cursor-not-allowed"
        : "bg-indigo-600 text-white hover:bg-indigo-700"}
    `}
  >
    Previous
  </button>

  <span className="font-semibold text-indigo-600">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() => setPage(p => p + 1)}
    disabled={page === totalPages}
    className={`px-4 py-2 rounded font-semibold transition
      ${page === totalPages
        ? "bg-indigo-300 text-white cursor-not-allowed"
        : "bg-indigo-600 text-white hover:bg-indigo-700"}
    `}
  >
    Next
  </button>
</div>

         
          )}

        </div>
      </div>
    </div>
  );
}
