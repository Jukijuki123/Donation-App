import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../Components/Navbar";

export default function DonationForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        amount: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        document.title = "Post Donation - Donation App";
    }, []);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        try {
        await api.post("/donation", form);

        setSuccess("Donasi berhasil dikirim");
        setForm({ name: "", email: "", amount: "" });
        } catch (err) {
        if (err.response && err.response.status === 422) {
            setErrors(err.response.data.errors);
        } else {
            alert("Terjadi kesalahan pada server");
        }
        }
    };

    return (
        <>
        <Navbar />

        <main className="container py-4">
            <h1>Submit Donasi</h1>

            {success && (
            <div className="alert alert-success">{success}</div>
            )}

            <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
                />
                {errors.name && (
                <div className="text-danger">{errors.name[0]}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                />
                {errors.email && (
                <div className="text-danger">{errors.email[0]}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Jumlah (Rp)</label>
                <input
                name="amount"
                type="number"
                className="form-control"
                value={form.amount}
                onChange={handleChange}
                required
                />
                {errors.amount && (
                <div className="text-danger">{errors.amount[0]}</div>
                )}
            </div>

            <button className="btn btn-primary" type="submit">
                Kirim Donasi
            </button>
            </form>
        </main>
        </>
    );
}
