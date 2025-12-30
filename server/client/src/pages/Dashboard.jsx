import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Bar, Pie } from "react-chartjs-2";
import API from "../services/api";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Failed to fetch employees", err));
  }, []);

  // Department-wise count
  const deptData = {};
  // Salary per employee
  const salaryData = { labels: [], data: [] };

  employees.forEach(emp => {
    deptData[emp.department] = (deptData[emp.department] || 0) + 1;
    salaryData.labels.push(emp.name);
    salaryData.data.push(emp.salary);
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar />
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Employees per Department</h2>
            <Pie
              data={{
                labels: Object.keys(deptData),
                datasets: [{
                  label: "Employees",
                  data: Object.values(deptData),
                  backgroundColor: ["#6366F1", "#EF4444", "#FACC15", "#10B981", "#8B5CF6", "#F472B6"]
                }]
              }}
              options={{
                plugins: { legend: { position: "bottom" } },
                responsive: true
              }}
            />
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Employee Salaries</h2>
            <Bar
              data={{
                labels: salaryData.labels,
                datasets: [{
                  label: "Salary (₹)",
                  data: salaryData.data,
                  backgroundColor: "#6366F1"
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { callbacks: { label: (ctx) => `₹ ${ctx.raw}` } }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
