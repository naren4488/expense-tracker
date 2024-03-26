import { FormEvent, useState } from "react";
import { TypeExpense } from "../../pages/HomePage";
import Modal from "react-modal";
import { enqueueSnackbar } from "notistack";
import "./AddExpenseModal.css";

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
  updateExpense: (expense: TypeExpense) => void;
};

Modal.setAppElement("#root");

const AddExpenseModal = ({ updateExpense }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState<TypeExpense>({
    title: "",
    amount: 0,
    date: "",
    category: "",
  });

  function openModal() {
    setExpense({ title: "", amount: 0, date: "", category: "" });
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
      updateExpense(expense);
      closeModal();
    }
  };
  return (
    <>
      <button className="add-expense-btn" onClick={openModal}>
        + Add Expense
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Expense Modal"
      >
        <div className="expense-modal">
          <h2>Add Expense</h2>
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
              <button className="add-expense-btn" type="submit">
                Add Expense
              </button>
            </form>
            <button
              className="add-expense-btn expense-cancel-btn"
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

export default AddExpenseModal;
