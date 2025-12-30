import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName"); // 👈 frontend only

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 md:px-8 py-4 flex justify-between items-center">
      <Link
        to="/dashboard"
        className="font-bold text-indigo-600 text-lg md:text-xl"
      >
        Employee Management
      </Link>

      <div className="flex items-center space-x-4">
        {adminName && (
          <span className="hidden sm:block text-gray-700 font-medium">
            Hi, {adminName}
          </span>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
