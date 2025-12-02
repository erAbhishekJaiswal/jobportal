import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  BarChart, Bar, CartesianGrid, ResponsiveContainer
} from "recharts";
import * as XLSX from "xlsx";
import "./VisitorList.css";
import { getToken } from "../../../utils/localstorage";

const BasseUrl = import.meta.env.VITE_BASE_URL;

const VisitorList = () => {
  const token = getToken();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get(`${BasseUrl}/visitors/report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    
    setData(res.data);
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(wb, "visitor_report.xlsx");
  };

  return (
    <div className="admin-analytics-wrapper">
      
      {/* Header */}
      <div className="admin-analytics-header">
        <h2 className="admin-analytics-title">📊 Visitor Analytics Dashboard</h2>
        {/* <button className="admin-analytics-export-btn" onClick={exportExcel}>
          Export to Excel
        </button> */}
      </div>

      {/* Cards */}
      <div className="admin-analytics-cards">
        <div className="admin-analytics-card">
          <h4>Total Days</h4>
          <p>{data.length}</p>
        </div>
        <div className="admin-analytics-card">
          <h4>Total IP Visitors</h4>
          <p>{data.reduce((a, b) => a + b.visitors, 0)}</p>
        </div>
        <div className="admin-analytics-card">
          <h4>Total Without IP Visitors</h4>
          <p>{data.reduce((a, b) => a + b.withoutIP, 0)}</p>
        </div>
        <div className="admin-analytics-card">
          <h4>Best Day</h4>
          <p>
            {data.length > 0
              ? [...data].sort((a, b) => b.visitors - a.visitors)[0].date
              : "—"}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="admin-analytics-charts">
        
        {/* Line Chart */}
        <div className="admin-analytics-chart-box">
          <h3 className="admin-analytics-chart-title">Visitors Trend (Line Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="visitors" stroke="#156ae8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="admin-analytics-chart-box">
          <h3 className="admin-analytics-chart-title">Visitors Comparison (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#0f9d58" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Table */}
      <div className="admin-analytics-table-section">
        <h3 className="admin-analytics-table-title">Daily Visitor Report</h3>
        <table className="admin-analytics-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total IP</th>
              <th>Total Without IP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.visitors}</td>
                <td>{row.withoutIP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default VisitorList;
