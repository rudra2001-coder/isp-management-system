import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../utils/api";
import Link from "next/link";

export default function Home() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await deleteClient(id);
            fetchClients();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">ISP Clients</h1>
            <Link href="/add-client" className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Client</Link>
            <table className="mt-4 w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td className="p-2">{client.name}</td>
                            <td className="p-2">{client.email}</td>
                            <td className="p-2">
                                <Link href={`/edit-client?id=${client.id}`} className="text-blue-500">Edit</Link>
                                <button onClick={() => handleDelete(client.id)} className="text-red-500 ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
