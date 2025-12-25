import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../Components/Navbar";

export default function DonationAll() {
    const [donations, setDonations] = useState([]);
    const isAdmin = localStorage.getItem("admin");

    useEffect(() => {
        document.title = "Daftar Donasi";

        api
        .get("/donation")
        .then((res) => {
            setDonations(res.data.data);
        })
        .catch(() => {
            alert("Gagal mengambil data donasi");
        });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus donasi ini?")) return;

        try {
        await api.delete(`/donation/${id}`);
        setDonations(donations.filter((d) => d.id !== id));
        } catch {
        alert("Gagal menghapus donasi");
        }
    };

    return (
        <>
        <Navbar />

        <main className="container py-4">
            <h1>Daftar Donasi</h1>

            <div className="donation-list">
            {donations.map((d) => (
                <div className="donation-card" key={d.id}>
                <h5 className="donor-name">{d.name}</h5>

                <p className="donor-amount">
                    Rp {d.amount.toLocaleString()}
                </p>

                <Link
                    to={`/donation/${d.id}`}
                    className="btn btn-primary btn-sm me-2"
                >
                    Detail
                </Link>

                {isAdmin && (
                    <button
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-danger btn-sm"
                    >
                    Hapus Donasi
                    </button>
                )}
                </div>
            ))}
            </div>
        </main>
        </>
    );
}
