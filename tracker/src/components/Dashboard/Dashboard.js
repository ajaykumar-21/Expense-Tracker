import React from "react";
import "./Dashboard.css";
import WalletExpenses from "../WalletExpenses/WalletExpenses";
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="main-heading">Expenses Tracker</h1>
      <WalletExpenses />
    </div>
  );
}

export default Dashboard;
