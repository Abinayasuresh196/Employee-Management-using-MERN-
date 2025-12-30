import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/employees", label: "Employees" },
    { path: "/add", label: "Add Employee" },
  ];

  return (
    <aside className="fixed w-64 h-screen bg-indigo-600 text-white p-6 flex flex-col space-y-4">
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            location.pathname === link.path ? "bg-indigo-800" : "hover:bg-indigo-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
