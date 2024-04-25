import React, { useState } from "react";
import "./WalletExpenses.css";
import RoundChart from "../RoundChart/RoundChart";
import Modal from "react-modal";
function WalletExpenses() {
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    date: "",
  })
  const [isIncomeModalOpen, setIncomeModalopen] = useState(false);
  const [isExpensesModalOpen, setExpensesModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewIncome(e.target.value);
  };

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
    //   backdropFilter: "blur(10px)",
    },
  };

  return (
    <div className="wallet-container">
      <div className="wallet">
        <div>
          <h2>
            Wallet Balance: <span className="income-amount">₹5000</span>
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
            Expenses: <span className="expenses-amount">₹5000</span>
          </h2>
        </div>
        <div>
          <button 
          className="expenses-btn"
          onClick={() => setExpensesModalOpen(true)}
          >+ Add Expense</button>
        </div>
      </div>
      <div className="chart-wallet">
        <RoundChart />
      </div>
      {/*Modal Add Income*/}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIncomeModalopen(false)}
        style={modalStyle}
        contentLabel="Add New Income"
      >
        {/* <div> */}
        <h2 className="modal-income-heading">Add Balance</h2>
        <form>
          <div className="income-form">
            <input
              className="income-input"
              type="number"
              name="income"
              placeholder="Income Amount"
              value={newIncome}
              onChange={(e) => handleInputChange(e)}
            />
            <div>
              <button className="addIcome-btn">Add Income</button>
              <button className="cancelIcome-btn">Cancel</button>
            </div>
          </div>
        </form>
        {/* </div> */}
      </Modal>

      {/*  Modal for adding expenses */}
      <Modal
      isOpen={isExpensesModalOpen}
      onRequestClose={() => setExpensesModalOpen(false)}
      style={modalStyle}
      contentLabel="Add New Expense"
      >
        <h2>Add Expenses</h2>
        <form action="">
            <input 
            type="text" 
            name="title"
            placeholder="Title"
            value={newExpense.title}
            onChange={handleInputChange}
            required
            />
            <input 
            type="number" 
            name="price"
            placeholder="Price"
            value={newExpense.price}
            onChange={handleInputChange}
            required
            />
            <select name="" id="">
                <option value="">Select Category</option>
            </select>
        </form>

      </Modal>
    </div>
  );
}

export default WalletExpenses;
