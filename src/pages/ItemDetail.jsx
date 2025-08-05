import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, renameItem } from "../api/api";

export default function ItemDetail() {
    const { checklistId, itemId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [newName, setNewName] = useState("");

    const loadItem = async () => {
        try {
            const res = await getItem(checklistId, itemId);
            setItem(res.data.data);
            setNewName(res.data.data.name);
        } catch (err) {
            alert("Gagal memuat item");
        }
    };

    useEffect(() => {
        loadItem();
    }, []);

    const handleRename = async (e) => {
        e.preventDefault();
        try {
            await renameItem(checklistId, itemId, { itemName: newName });
            alert("Nama item berhasil diubah");
            navigate(`/checklists/${checklistId}`);
        } catch (err) {
            alert("Gagal mengubah nama item");
        }
    };

    if (!item) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Detail Item</h2>
            <p className="mb-4">
                <strong>Status:</strong>{" "}
                {item.itemCompletionStatus ? "Selesai" : "Belum selesai"}
            </p>
            <form onSubmit={handleRename}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                    Ubah Nama
                </button>
            </form>
        </div>
    );
}
