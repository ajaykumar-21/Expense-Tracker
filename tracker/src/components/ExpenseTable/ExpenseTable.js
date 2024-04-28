import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  FaUtensils,
  FaFilm,
  FaPlane,
  FaShoppingCart,
  FaShoppingBasket,
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import "./ExpenseTable.css";
import LineBarChart from "../LineBarChart/LineBarChart";

Modal.setAppElement("#root");

const icons = {
  Food: <FaUtensils />,
  Entertainment: <FaFilm />,
  Travel: <FaPlane />,
  Shopping: <FaShoppingCart />,
  Grocery: <FaShoppingBasket />,
  Others: <FaEllipsisH />,
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
    // backdropFilter: "blur(10px)",
  },
};

function ExpenseTable({
  expenses,
  setExpenses,
  categories,
  handleExpensesUpdatedList,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currExpense, setCurrExpense] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let totalPage = Math.ceil(expenses.length / 5);
    console.log(totalPage);
    setTotalPages(totalPage);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const openModal = (item) => {
    setIsModalOpen(true);
    setCurrExpense(item);
  };
  const handleDelete = (index) => {
    const expensesList = [...expenses];
    expensesList.splice(index, 1);
    setExpenses(expensesList);
    localStorage.setItem("expenses", JSON.stringify(expensesList));
  };

  const editExpense = (e) => {
    e.preventDefault();

    const updateItemIndex = expenses.findIndex(
      (item) => item.id === currExpense.id
    );

    const updatedExpenses = [...expenses];

    if (updateItemIndex !== -1) {
      updatedExpenses[updateItemIndex] = {
        ...updatedExpenses[updateItemIndex],
        ...currExpense,
      };

      handleExpensesUpdatedList(updatedExpenses);
      setIsModalOpen(false);
    }
  };

  const getCategoryIcon = (category) => {
    return icons[category] || <FaEllipsisH />;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, expenses.length);
  const currentPageData = expenses.slice(startIndex, endIndex);

  return (
    <div className="transactions-main-conatiner">
      <div className="table-container">
        {/* <div > */}
        <h2 className="Transactions-heading">Recent Transactions</h2>
        <div className="Transactions-section">
          {currentPageData.map((expense, index) => (
            <div key={index} index={index} className="list-container">
              <div className="left-transactions-side">
                <div className="category-icons">
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <div className="category-heading">{expense.category}</div>
                  <div className="date-heading">{expense.date}</div>
                </div>
              </div>
              <div className="right-transactions-side">
                <div className="expense-price">₹{expense.price}</div>
                <button
                  className="expense-delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </button>
                <button
                  className="expense-edit-btn"
                  onClick={() => openModal(expense)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
          <div className="pagination-container">
            <button
              className="pagination-prev-btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            <div className="current-page">{currentPage}</div>
            <button
              className="pagination-next-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={modalStyle}
          contentLabel="Edit Expense"
        >
          <h2 className="modal-heading">Edit Expense</h2>
          <form className="modal-form-expenses" onSubmit={editExpense}>
            <div>
              <input
                className="income-input"
                name="title"
                placeholder="Title"
                value={currExpense.title}
                onChange={handleInputChange}
                required
              />

              <input
                className="income-input"
                name="price"
                placeholder="Price"
                type="number"
                value={currExpense.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <select
                className="income-input"
                name="category"
                value={currExpense.category}
                onChange={handleInputChange}
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
                name="date"
                placeholder="Date"
                type="date"
                value={currExpense.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button className="addIcome-btn" type="submit">
                Save
              </button>
              <button
                className="cancelIcome-btn"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        {/* </div> */}
      </div>
      <div className="linechart-section">
        <LineBarChart expenses={expenses} categories={categories} />
      </div>
    </div>
  );
}
export default ExpenseTable;
