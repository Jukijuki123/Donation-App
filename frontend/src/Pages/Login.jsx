import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Admin Login - Donation App";

        // jika sudah login, tidak boleh ke halaman login
        if (localStorage.getItem("admin")) {
        navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        await api.get("/auth/login", {
            params: {
            email: form.email,
            password: form.password,
            },
        });

        // login sukses
        localStorage.setItem("admin", "true");
        navigate("/");
        } catch (err) {
        setError("Email atau password salah");
        }
    };

    return (
        <main className="container py-5">
        <h1>Admin Login</h1>

        {error && (
            <div className="alert alert-danger mt-3">{error}</div>
        )}

        <form className="form-template mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Email</label>
            <input
                type="text"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Password</label>
            <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
            />
            </div>

            <button className="btn btn-primary" type="submit">
            Login
            </button>
        </form>
        </main>
    );
}
