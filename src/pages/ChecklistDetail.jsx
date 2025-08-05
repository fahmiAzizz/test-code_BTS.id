import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    getItems,
    createItem,
    updateItemStatus,
    deleteItem,
    renameItem,
} from "../api/api";

export default function ChecklistDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [loading, setLoading] = useState(false);

    const loadItems = async () => {
        setLoading(true);
        try {
            const res = await getItems(id);
            setItems(res.data.data);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Gagal memuat data!", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, [id]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItem.trim()) {
            Swal.fire("Oops!", "Nama item tidak boleh kosong!", "warning");
            return;
        }
        try {
            await createItem(id, { itemName: newItem });
            setNewItem("");
            await loadItems();
            Swal.fire("Berhasil!", "Item berhasil ditambahkan", "success");
        } catch (error) {
            Swal.fire("Error", "Gagal menambah item!", "error");
        }
    };

    const toggleStatus = async (itemId) => {
        try {
            await updateItemStatus(id, itemId);
            await loadItems();
        } catch (error) {
            Swal.fire("Error", "Gagal memperbarui status!", "error");
        }
    };

    const handleDelete = async (itemId) => {
        const confirmResult = await Swal.fire({
            title: "Yakin hapus item ini?",
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
                await deleteItem(id, itemId);
                await loadItems();
                Swal.fire("Terhapus!", "Item berhasil dihapus", "success");
            } catch (error) {
                Swal.fire("Error", "Gagal menghapus item!", "error");
            }
        }
    };

    const handleRename = async (itemId, oldName) => {
        const { value: newName } = await Swal.fire({
            title: "Rename Item",
            input: "text",
            inputLabel: "Nama baru",
            inputValue: oldName,
            showCancelButton: true,
            confirmButtonText: "Rename",
            cancelButtonText: "Batal",
            inputValidator: (value) => {
                if (!value.trim()) {
                    return "Nama tidak boleh kosong!";
                }
            },
        });

        if (newName) {
            try {
                await renameItem(id, itemId, { itemName: newName });
                await loadItems();
                Swal.fire("Berhasil!", "Item berhasil diubah", "success");
            } catch (error) {
                Swal.fire("Error", "Gagal merename item!", "error");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                Detail Checklist
            </h2>

            <form
                onSubmit={handleAddItem}
                className="flex mb-6 shadow-sm border rounded-lg overflow-hidden"
            >
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Tambah item..."
                    className="border-none p-3 flex-1 focus:outline-none"
                />
                <button
                    className="bg-green-600 text-white px-6 hover:bg-green-700 transition"
                >
                    Tambah
                </button>
            </form>

            {loading ? (
                <p className="text-center text-gray-500">Memuat data...</p>
            ) : (
                <ul className="space-y-3">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <li
                                key={item.id}
                                className="p-4 bg-gray-100 rounded shadow flex justify-between items-center hover:bg-gray-200 transition"
                            >
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={item.itemCompletionStatus}
                                        onChange={() => toggleStatus(item.id)}
                                        className="form-checkbox h-5 w-5 text-green-600"
                                    />
                                    <span
                                        className={`font-medium ${item.itemCompletionStatus
                                            ? "line-through text-gray-500"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </label>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleRename(item.id, item.name)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                    >
                                        Rename
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Belum ada item</p>
                    )}
                </ul>
            )}

            <button
                onClick={() => navigate("/checklists")}
                className="bg-blue-600 my-5 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Kembali ke Daftar Checklist
            </button>
        </div>
    );
}
