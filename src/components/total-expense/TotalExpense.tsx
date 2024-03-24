import { FaRupeeSign } from "react-icons/fa";
import { TypeExpense } from "../../pages/HomePage";
import "./TotalExpense.css";
import AddExpenseModal from "../add-expense-modal/AddExpenseModal";

type Props = {
  expenses: TypeExpense[];
  updateExpense: (expense: TypeExpense) => void;
};
const TotalExpense = ({ expenses, updateExpense }: Props) => {
  const getTotalExpense = (): number => {
    const totalExpenseAmount = expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
    return totalExpenseAmount;
  };
  return (
    <div className="total-expense">
      <h3>
        Total Expenses :{" "}
        <span>
          <FaRupeeSign size={15} />
          {getTotalExpense()}
        </span>
      </h3>
      <AddExpenseModal updateExpense={updateExpense} />
    </div>
  );
};

export default TotalExpense;
