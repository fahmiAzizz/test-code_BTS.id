import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-400 text-white p-4 flex justify-between items-center shadow">
            <Link to="/checklists" className="text-lg font-bold">
                Checklist App
            </Link>
            <div className="flex gap-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
