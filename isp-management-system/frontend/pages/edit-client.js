import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getClientById, updateClient } from "../utils/api";

export default function EditClient() {
    const [client, setClient] = useState({ name: "", email: "", phone: "", address: "" });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchClient(id);
        }
    }, [id]);

    const fetchClient = async (id) => {
        const data = await getClientById(id);
        setClient(data);
    };

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateClient(id, client);
        router.push("/");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Client</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={client.name} onChange={handleChange} className="border p-2 w-full" />
                <input name="email" value={client.email} onChange={handleChange} className="border p-2 w-full" />
                <input name="phone" value={client.phone} onChange={handleChange} className="border p-2 w-full" />
                <input name="address" value={client.address} onChange={handleChange} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </form>
        </div>
    );
}
