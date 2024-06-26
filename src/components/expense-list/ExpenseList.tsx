import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TypeExpense } from "../../pages/HomePage";
import "./ExpenseList.css";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import EditExpenseModal from "../edit-expense-modal/EditExpenseModal";

type Props = {
  expenses: TypeExpense[];
  handleDelete: (index: number, currentPage: number, PageSize: number) => void;
  handleEdit: (
    index: number,
    currentPage: number,
    PageSize: number,
    editedExpense: TypeExpense
  ) => void;
};

const PageSize = 3;

const ExpenseList = ({ expenses, handleDelete, handleEdit }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // initial total pages calculation for pagination
  useEffect(() => {
    setTotalPages(Math.ceil(expenses.length / PageSize));
  }, [expenses]);

  /**
   * to handle page change from pagination
   * @param page current page number
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * to handle edit changes in expense
   * @param index index of current edited expense
   * @param editedExpense new updated data of expense
   */
  const editExpense = (index: number, editedExpense: TypeExpense) => {
    handleEdit(index, currentPage, PageSize, editedExpense);
  };

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
                      <EditExpenseModal
                        currentExpense={
                          expenses[index + (currentPage - 1) * PageSize]
                        }
                        index={index}
                        updateExpense={editExpense}
                      />
                    </td>
                    <td>
                      <button
                        id="delete-btn"
                        onClick={() =>
                          handleDelete(index, currentPage, PageSize)
                        }
                      >
                        <MdDelete size={15} fill="red" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${currentPage === 1 && "disable-btn"}`}
          >
            <FaChevronLeft />
          </button>
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                disabled={currentPage === index + 1}
                className={`${
                  index + 1 === currentPage && "active-btn disable-btn"
                }`}
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${currentPage === totalPages && "disable-btn"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  }
};

export default ExpenseList;
