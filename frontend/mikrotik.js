import { useState } from "react";
import axios from "axios";

export default function MikroTik() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleAddUser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/mikrotik/add-user", {
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error: Unable to add user");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">MikroTik User Management</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add User
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
