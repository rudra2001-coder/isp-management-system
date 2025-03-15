import { useEffect, useState } from "react";
import axios from "axios";

export default function Bandwidth() {
    const [interfaceStats, setInterfaceStats] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBandwidth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/mikrotik/bandwidth");
                setInterfaceStats(response.data.result);
            } catch (error) {
                setMessage("Error: Unable to fetch bandwidth data");
            }
        };
        fetchBandwidth();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bandwidth Usage</h1>
            {message && <p>{message}</p>}
            <table className="mt-4 w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Interface</th>
                        <th className="p-2">Rx (in bytes)</th>
                        <th className="p-2">Tx (in bytes)</th>
                    </tr>
                </thead>
                <tbody>
                    {interfaceStats.map((stat) => (
                        <tr key={stat[".id"]} className="border-b">
                            <td className="p-2">{stat.name}</td>
                            <td className="p-2">{stat["rx-byte"]}</td>
                            <td className="p-2">{stat["tx-byte"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
