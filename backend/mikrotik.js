const MikroNode = require("mikronode");

const connectToMikrotik = () => {
    return new Promise((resolve, reject) => {
        const connection = MikroNode.getConnection("192.168.88.1", "apiuser", "password");  // Replace with router IP, username, and password
        connection.connect()
            .then(() => {
                console.log("✅ Connected to MikroTik");
                resolve(connection);
            })
            .catch((error) => {
                console.error("❌ Error connecting to MikroTik:", error);
                reject(error);
            });
    });
};

// Function to add a user in MikroTik
const addMikrotikUser = async (username, password) => {
    try {
        const connection = await connectToMikrotik();
        const command = `/user/add`;  // MikroTik API command to add a user
        const result = await connection.write(command, {
            name: username,
            password: password,
            group: "read", // set to 'full' for full admin rights
        });
        connection.close();
        return result;
    } catch (error) {
        console.error("❌ Error adding user:", error);
        throw error;
    }
};

module.exports = { addMikrotikUser };
// Function to get interface statistics (for bandwidth usage)
const getInterfaceStats = async () => {
    try {
        const connection = await connectToMikrotik();
        const command = "/interface/print"; // MikroTik API command to get interface stats
        const result = await connection.write(command);
        connection.close();
        return result;
    } catch (error) {
        console.error("❌ Error fetching interface stats:", error);
        throw error;
    }
};
// Fetch CPU and RAM status
const getRouterStatus = async () => {
    try {
        const connection = await connectToMikrotik();
        
        // Get CPU info
        const cpu = await connection.write("/system/health/print");
        
        // Get RAM info
        const ram = await connection.write("/system/resource/print");
        
        connection.close();
        return { cpu, ram };
    } catch (error) {
        console.error("❌ Error fetching router status:", error);
        throw error;
    }
};


