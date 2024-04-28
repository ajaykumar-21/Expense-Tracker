import React, { useState } from "react";
import "./Dashboard.css";
import WalletExpenses from "../WalletExpenses/WalletExpenses";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import LineBarChart from "../LineBarChart/LineBarChart";

const categories = [
  "Food",
  "Entertainment",
  "Travel",
  "Shopping",
  "Grocery",
  "Others",
];

function Dashboard() {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses").length > 0
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );

  const totalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseInt(expense.price, 10),
      0
    );
  };

  const handleExpensesUpdatedList = (expenses) => {
    setExpenses(expenses);
    const totalBalance = localStorage.getItem("totalBalance") - totalExpenses();
    setWalletBalance(totalBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };
  return (
    <div className="dashboard-container">
      <h1 className="main-heading">Expenses Tracker</h1>
        <WalletExpenses
          categories={categories}
          expenses={expenses}
          setExpenses={setExpenses}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          totalExpenses={totalExpenses}
          handleExpensesUpdatedList={handleExpensesUpdatedList}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          categories={categories}
          handleExpensesUpdatedList={handleExpensesUpdatedList}
        />
    </div>
  );
}

export default Dashboard;
