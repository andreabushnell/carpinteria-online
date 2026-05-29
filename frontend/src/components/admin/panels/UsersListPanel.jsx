import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../api/endpoints/users";
import DataTable from "../tables/DataTable";

export default function UsersListPanel() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.results || []);
        });
    }, []);

    const columns = [
        { key: "id", label: "ID" },
        { key: "last_login", label: "Última sesión" },
        { key: "username", label: "Usuario" },
        { key: "first_name", label: "Nombre" },
        { key: "last_name", label: "Apellido" },
        { key: "email", label: "Email" },
        { key: "role", label: "Rol" },
    ];

        const handleView = useCallback((id) => {
            navigate(`/admin/users/detail?id=${id}`);
        }, [navigate]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                <button
                    onClick={() => navigate("/admin/users/detail")}
                    className="bg-white text-secondary px-4 py-2 rounded-md font-semibold text-sm hover:bg-secondary/90 hover:text-white"
                >
                    + Nuevo Usuario
                </button>
            </div>

            <DataTable
                columns={columns}
                data={users}
                onView={handleView}
            />
        </div>
    );
}
