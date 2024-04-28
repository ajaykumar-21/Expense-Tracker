import React, { useEffect, useState } from "react";
import "./WalletExpenses.css";
import RoundChart from "../RoundChart/RoundChart";
import Modal from "react-modal";
Modal.setAppElement("#root");

function WalletExpenses({
  categories,
  expenses,
  setExpenses,
  walletBalance,
  setWalletBalance,
  totalExpenses,
  handleExpensesUpdatedList,
}) {
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [isIncomeModalOpen, setIncomeModalopen] = useState(false);
  const [isExpensesModalOpen, setExpensesModalOpen] = useState(false);

  const handleIncomeInputChange = (e) => {
    setNewIncome(e.target.value);
  };

  const handleExpenseInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpenses) => ({
      ...prevExpenses,
      [name]: value,
    }));
  };

  const addIncome = (e) => {
    e.preventDefault();
    if (newIncome !== "") {
      setWalletBalance((prevBalance) => prevBalance + parseInt(newIncome));
      localStorage.setItem("totalBalance", JSON.stringify(parseInt(newIncome)));
      setIncomeModalopen(false);
      setNewIncome("");
    }
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (walletBalance < newExpense.price) {
      return alert("insufficient wallet balance.");
    }

    const updateDBalance = walletBalance - newExpense.price;
    setWalletBalance(updateDBalance);
    localStorage.setItem("walletBalance", JSON.stringify(updateDBalance));
    localStorage.setItem("expenses", JSON.stringify([...expenses, newExpense]));
    setExpenses((prevExpense) => [...prevExpense, newExpense]);

    setExpensesModalOpen(false);
    setNewExpense({
      id: null,
      title: "",
      price: "",
      category: "",
      date: "",
    });
  };

  useEffect(() => {
    handleExpensesUpdatedList(expenses);
  }, [expenses]);

  useEffect(() => {
    if (!localStorage.getItem("totalBalance")) {
      localStorage.setItem("totalBalance", JSON.stringify(5000));
    }
  }, []);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "500px",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: "10px",
      border: "border: 1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div className="wallet-container">
      <div className="wallet">
        <div>
          <h2>
            Wallet Balance:{" "}
            <span className="income-amount">₹{walletBalance}</span>
          </h2>
        </div>
        <div>
          <button
            className="income-btn"
            onClick={() => setIncomeModalopen(true)}
          >
            + Add Income
          </button>
        </div>
      </div>
      <div className="wallet">
        <div>
          <h2>
            Expenses:{" "}
            <span className="expenses-amount">₹{totalExpenses()}</span>
          </h2>
        </div>
        <div>
          <button
            className="expenses-btn"
            onClick={() => setExpensesModalOpen(true)}
          >
            + Add Expense
          </button>
        </div>
      </div>
      <div className="chart-wallet">
        <RoundChart expenses={expenses} />
      </div>

      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIncomeModalopen(false)}
        style={modalStyle}
        contentLabel="Add New Income"
      >
        <h2 className="modal-heading">Add Balance</h2>
        <form onSubmit={addIncome}>
          <div className="income-form">
            <input
              className="income-input"
              type="number"
              name="income"
              placeholder="Income Amount"
              value={newIncome}
              onChange={handleIncomeInputChange}
            />
            <div>
              <button className="addIcome-btn" type="submit">
                Add Income
              </button>
              <button
                className="cancelIcome-btn"
                type="button"
                onClick={() => setIncomeModalopen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isExpensesModalOpen}
        onRequestClose={() => setExpensesModalOpen(false)}
        style={modalStyle}
        contentLabel="Add New Expense"
      >
        <h2 className="modal-heading">Add Expenses</h2>
        <form className="modal-form-expenses" onSubmit={addExpense}>
          <div className="gap">
            <input
              className="income-input"
              type="text"
              name="title"
              placeholder="Title"
              value={newExpense.title}
              onChange={handleExpenseInputChange}
              required
            />
            <input
              className="income-input"
              type="number"
              name="price"
              placeholder="Price"
              value={newExpense.price}
              onChange={handleExpenseInputChange}
              required
            />
          </div>
          <div className="gap">
            <select
              name="category"
              value={newExpense.category}
              onChange={handleExpenseInputChange}
              className="income-input"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              className="income-input"
              type="date"
              placeholder="date"
              name="date"
              value={newExpense.date}
              onChange={handleExpenseInputChange}
              required
            />
          </div>
          <div>
            <button className="addIcome-btn" type="submit">
              Add Expense
            </button>
            <button
              className="cancelIcome-btn"
              type="button"
              onClick={() => setExpensesModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default WalletExpenses;
