import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../api/api";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "", email: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Register berhasil, silakan login.",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/login");
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Register gagal. Coba lagi.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>

            <input
                className="border p-2 w-full mb-4"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
            />
            <input
                className="border p-2 w-full mb-4"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <input
                className="border p-2 w-full mb-4"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />

            <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">
                Register
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <span
                    className="text-green-700 cursor-pointer hover:underline"
                    onClick={() => navigate("/login")}
                >
                    Login di sini
                </span>
            </p>
        </form>
    );
}
