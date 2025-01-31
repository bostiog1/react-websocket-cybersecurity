import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Shield, AlertTriangle, Activity } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";

const SecurityDashboard = () => {
  const [securityEvents, setSecurityEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulating WebSocket connection
    const connectWebSocket = () => {
      const mockData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        attacks: Math.floor(Math.random() * 100),
        threats: Math.floor(Math.random() * 50),
      }));
      setSecurityEvents(mockData);

      // Simulate incoming alerts
      setAlerts([
        {
          id: 1,
          severity: "high",
          message: "Potential SQL injection detected",
        },
        {
          id: 2,
          severity: "medium",
          message: "Unusual network traffic pattern",
        },
      ]);
    };

    connectWebSocket();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="card">
          <div className="card-header">
            <Shield className="card-icon" />
            <div className="card-title">Total Events</div>
          </div>
          <div className="card-content">1,234</div>
        </div>

        <div className="card">
          <div className="card-header">
            <AlertTriangle className="card-icon" />
            <div className="card-title">Active Threats</div>
          </div>
          <div className="card-content">23</div>
        </div>

        <div className="card">
          <div className="card-header">
            <Activity className="card-icon" />
            <div className="card-title">System Status</div>
          </div>
          <div className="card-content">Healthy</div>
        </div>
      </div>

      {/* Security Events Chart */}
      <div className="chart-container">
        <div className="chart-title">Security Events Timeline</div>
        <LineChart width={800} height={300} data={securityEvents}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="attacks" stroke="#ff0000" />
          <Line type="monotone" dataKey="threats" stroke="#0000ff" />
        </LineChart>
      </div>

      {/* Active Alerts */}
      <div>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert ${
              alert.severity === "high" ? "alert-high" : "alert-medium"
            }`}
          >
            <AlertDescription className="alert-description">
              {alert.message}
            </AlertDescription>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityDashboard;
