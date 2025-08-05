import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChecklistList from "./pages/ChecklistList";
import ChecklistDetail from "./pages/ChecklistDetail";
import ItemDetail from "./pages/ItemDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/checklists"
                    element={
                        <ProtectedRoute>
                            <ChecklistList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checklists/:id"
                    element={
                        <ProtectedRoute>
                            <ChecklistDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checklists/:checklistId/items/:itemId"
                    element={
                        <ProtectedRoute>
                            <ItemDetail />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
