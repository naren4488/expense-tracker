import { FormEvent, useState } from "react";
import Modal from "react-modal";
import "./AddBalanceModal.css";
import { enqueueSnackbar } from "notistack";

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

Modal.setAppElement("#root");

type Props = {
  updateBalance: (amount: number) => void;
};

const AddBalanceModal = ({ updateBalance }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");

  function openModal() {
    setAmount("");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Number(amount);
    if (value <= 0) {
      enqueueSnackbar("Please enter positive value to add", {
        variant: "error",
      });
    } else {
      updateBalance(Number(value));
      enqueueSnackbar("Wallet balance updated successfully!", {
        variant: "success",
      });
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal}>+ Add Balance</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="balance-modal">
          <h2>Add Balance</h2>
          <div className="form-section">
            <form onSubmit={(e) => handleUpdate(e)}>
              <input
                placeholder="Enter amount"
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button type="submit">Add</button>
            </form>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddBalanceModal;
