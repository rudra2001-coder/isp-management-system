import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <aside className="w-64 bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">ISP Management</h2>
          <nav>
            <ul>
              <li><Link to="/" className="block p-2 hover:bg-gray-200">Dashboard</Link></li>
              <li><Link to="/clients" className="block p-2 hover:bg-gray-200">Clients</Link></li>
              <li><Link to="/billing" className="block p-2 hover:bg-gray-200">Billing</Link></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
