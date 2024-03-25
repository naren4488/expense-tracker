import { TypeExpense } from "../../pages/HomePage";
import "./ExpenseList.css";

type Props = {
  expenses: TypeExpense[];
};

const ExpenseList = ({ expenses }: Props) => {
  console.log(expenses);
  if (!expenses.length) {
    return <span>No expense Trends to show</span>;
  } else {
    return <div>ExpenseList</div>;
  }
};

export default ExpenseList;
