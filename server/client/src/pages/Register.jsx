import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");   // 👈 frontend only
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // 🔥 ONLY email & password sent to backend
      await API.post("/auth/register", { email, password });

      // 🔥 Name stored only in frontend
      localStorage.setItem("adminName", name);

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={submit}
        className="card w-96 p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Admin Register
        </h2>

        {/* Frontend only name */}
        <input
          className="input"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center">
          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 py-2 px-4 rounded inline-block hover:bg-indigo-50 transition"
          >
            Already have an account? Login
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
