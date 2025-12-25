import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../Components/Navbar";

export default function DonationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("admin");

    const [donation, setDonation] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
    api
        .get(`/donation/${id}`)
        .then((res) => {
            setDonation(res.data.data);
            document.title = `Donation Detail - ${res.data.data.name}`;
        })
        .catch(() => {
            setError("Donation not found");
            document.title = "Donation Not Found";
        });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Yakin ingin menghapus donasi ini?")) return;

        try {
        await api.delete(`/donation/${id}`);
        navigate("/");
        } catch {
        alert("Gagal menghapus donasi");
        }
    };

    if (error) {
        return (
        <>
            <Navbar />
            <main className="container py-4">
            <p className="text-danger">{error}</p>
            <Link to="/" className="btn btn-secondary">
                &larr; Kembali
            </Link>
            </main>
        </>
        );
    }

    if (!donation) {
        return (
        <>
            <Navbar />
            <main className="container py-4">
            <p>Loading...</p>
            </main>
        </>
        );
    }

    return (
        <>
        <Navbar />

        <main className="container py-4">
            <Link to="/" className="btn btn-secondary mb-3">
            &larr; Kembali
            </Link>

            <section className="donation-detail">
            <h2 className="donor-name">{donation.name}</h2>

            <p>
                <strong>Email:</strong> {donation.email}
            </p>

            <p>
                <strong>Amount:</strong> Rp {donation.amount.toLocaleString()}
            </p>

            <p className="meta">
                <small>Dibuat: {donation.created_at}</small>
            </p>

            {isAdmin && (
                <button
                onClick={handleDelete}
                className="btn btn-danger mt-3"
                >
                Hapus Donasi
                </button>
            )}
            </section>
        </main>
        </>
    );
    }
