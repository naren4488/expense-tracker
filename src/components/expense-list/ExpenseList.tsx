import { TypeExpense } from "../../pages/HomePage";
import "./ExpenseList.css";

type Props = {
  expenses: TypeExpense[];
};

const ExpenseList = ({ expenses }: Props) => {
  if (!expenses.length) {
    return <span>No expenses to show</span>;
  } else {
    return <div className="">ExpenseList</div>;
  }
};

export default ExpenseList;
