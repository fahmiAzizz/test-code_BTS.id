import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            console.log(res.data.token);

            localStorage.setItem("token", res.data.data.token);
            navigate("/checklists");
        } catch (err) {
            alert("Login gagal");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border p-2 w-full mb-4"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-4"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>

            {/* Tombol ke Register */}
            <div className="mt-4 text-center">
                <p className="text-sm">Belum punya akun?</p>
                <Link
                    to="/register"
                    className="text-blue-500 hover:underline font-medium"
                >
                    Daftar sekarang
                </Link>
            </div>
        </div>
    );
}
