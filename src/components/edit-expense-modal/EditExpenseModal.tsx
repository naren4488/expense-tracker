import "./EditExpenseModal.css";
import { FormEvent, useState } from "react";
import { TypeExpense } from "../../pages/HomePage";
import Modal from "react-modal";
import { enqueueSnackbar } from "notistack";
import { FaEdit } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

type Props = {
  updateExpense: (index: number, expense: TypeExpense) => void;
  currentExpense: TypeExpense;
  index: number;
};

Modal.setAppElement("#root");

const EditExpenseModal = ({ index, updateExpense, currentExpense }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState<TypeExpense>(currentExpense);

  function openModal() {
    setExpense(currentExpense);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /**
   * to handle input changes in form input boxes
   * @param e event object for input elements
   */
  const handleInputChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    setExpense((prevExpense) => {
      return { ...prevExpense, [e.target.name]: e.target.value };
    });
  };

  /**
   * to handle form submit
   * @param e event object for the form
   */
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expense.amount <= 0) {
      enqueueSnackbar("Please enter positive value to add an expense", {
        variant: "error",
      });
    } else {
      updateExpense(index, expense);
      closeModal();
    }
  };
  return (
    <>
      <button id="edit-btn" onClick={openModal}>
        <FaEdit size={15} fill="white" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Expense Modal"
      >
        <div className="expense-modal">
          <h2>Edit Expense</h2>
          <div className="expense-form-section">
            <form className="expense-form" onSubmit={(e) => handleUpdate(e)}>
              <div className="form-input-wrap">
                <input
                  placeholder="Enter title"
                  value={expense.title}
                  type="text"
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                <input
                  placeholder="Enter amount"
                  value={expense.amount || ""}
                  name="amount"
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrap">
                <input
                  placeholder="Enter category"
                  value={expense.category}
                  type="text"
                  name="category"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                <input
                  id="dateInput"
                  value={expense.date}
                  type="date"
                  name="date"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <button className="edit-expense-btn" type="submit">
                Edit Expense
              </button>
            </form>
            <button
              className="edit-expense-btn expense-cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditExpenseModal;
