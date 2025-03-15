import { useEffect, useState } from "react";
import axios from "axios";

export default function RouterStatus() {
    const [status, setStatus] = useState({ cpu: [], ram: [] });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/mikrotik/status");
                setStatus(response.data.result);
            } catch (error) {
                setMessage("Error: Unable to fetch router status");
            }
        };
        fetchStatus();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Router Status (CPU, RAM)</h1>
            {message && <p>{message}</p>}
            <div className="mt-4">
                <h2 className="text-xl">CPU Load</h2>
                <pre>{JSON.stringify(status.cpu, null, 2)}</pre>
                <h2 className="text-xl mt-4">RAM Usage</h2>
                <pre>{JSON.stringify(status.ram, null, 2)}</pre>
            </div>
        </div>
    );
}
