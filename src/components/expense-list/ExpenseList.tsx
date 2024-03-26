import { FaEdit } from "react-icons/fa";
import { TypeExpense } from "../../pages/HomePage";
import "./ExpenseList.css";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

type Props = {
  expenses: TypeExpense[];
};

const PageSize = 3;

const ExpenseList = ({ expenses }: Props) => {
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  console.log(expenses, totalPages);

  useEffect(() => {
    setTotalPages(Math.ceil(expenses.length / PageSize));
  }, [expenses]);

  if (!expenses.length) {
    return <span>No expenses to show</span>;
  } else {
    return (
      <div className="expense-list">
        <h3>Expense List</h3>
        <div className="expense-table">
          <table>
            <tbody>
              {expenses
                .slice((currentPage - 1) * PageSize, currentPage * PageSize)
                .map((expense, index) => (
                  <tr key={index}>
                    <td>
                      <span className="first-column">
                        <span>{expense.title}</span>
                        <span className="row-date">{expense.date}</span>
                      </span>
                    </td>
                    <td>{expense.amount}</td>
                    <td>
                      <button id="edit-btn">
                        <FaEdit size={15} fill="white" />
                      </button>
                    </td>
                    <td>
                      <button id="delete-btn">
                        <MdDelete size={15} fill="red" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button>Previous</button>
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                className={`${index + 1 === currentPage && "active-btn"}`}
                key={index}
              >
                {index + 1}
              </button>
            ))}
          <button>Next</button>
        </div>
      </div>
    );
  }
};

export default ExpenseList;
