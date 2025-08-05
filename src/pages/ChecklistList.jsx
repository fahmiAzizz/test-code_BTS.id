import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getChecklists, createChecklist, deleteChecklist } from "../api/api";

const pastelColors = [
    "bg-pink-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-indigo-100",
    "bg-rose-100",
    "bg-orange-100",
];

export default function ChecklistList() {
    const [checklists, setChecklists] = useState([]);
    const [newChecklist, setNewChecklist] = useState("");
    const [loading, setLoading] = useState(false);

    const loadChecklists = async () => {
        setLoading(true);
        try {
            const res = await getChecklists();
            setChecklists(res.data.data);
        } catch (err) {
            Swal.fire("Error", "Gagal memuat checklist", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChecklists();
    }, []);

    const handleAddChecklist = async (e) => {
        e.preventDefault();
        if (!newChecklist.trim()) {
            Swal.fire("Oops!", "Nama checklist tidak boleh kosong", "warning");
            return;
        }

        try {
            await createChecklist({ name: newChecklist });
            setNewChecklist("");
            await loadChecklists();
            Swal.fire("Berhasil!", "Checklist berhasil ditambahkan", "success");
        } catch (err) {
            Swal.fire("Error", "Gagal menambahkan checklist", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: "Yakin hapus checklist ini?",
            text: "Tindakan ini tidak bisa dibatalkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        });

        if (confirmResult.isConfirmed) {
            try {
                await deleteChecklist(id);
                await loadChecklists();
                Swal.fire("Terhapus!", "Checklist berhasil dihapus", "success");
            } catch (err) {
                Swal.fire("Error", "Gagal menghapus checklist", "error");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Daftar Checklist</h1>

            <form
                onSubmit={handleAddChecklist}
                className="flex mb-8 shadow-sm border rounded-lg overflow-hidden"
            >
                <input
                    type="text"
                    value={newChecklist}
                    onChange={(e) => setNewChecklist(e.target.value)}
                    placeholder="Nama checklist..."
                    className="border-none p-3 flex-1 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 hover:bg-green-700 transition"
                >
                    Tambah
                </button>
            </form>

            {loading ? (
                <p className="text-center text-gray-500">Memuat data...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {checklists.length > 0 ? (
                        checklists.map((c, index) => (
                            <div
                                key={c.id}
                                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between ${pastelColors[index % pastelColors.length]}`}
                            >
                                <Link
                                    to={`/checklists/${c.id}`}
                                    className="text-lg font-semibold text-gray-800 hover:underline flex-1"
                                >
                                    {c.name}
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(c.id);
                                    }}
                                    className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition self-end"
                                >
                                    Hapus
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">Belum ada checklist</p>
                    )}
                </div>
            )}
        </div>
    );
}
