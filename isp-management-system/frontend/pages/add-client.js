import { useState } from "react";
import { useRouter } from "next/router";
import { addClient } from "../utils/api";

export default function AddClient() {
    const [client, setClient] = useState({ name: "", email: "", phone: "", address: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addClient(client);
        router.push("/");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Client</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
                <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
                <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
                <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}
