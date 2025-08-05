import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <div className="p-4">{children}</div>
        </>
    );
}
