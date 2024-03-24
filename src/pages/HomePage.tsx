import ExpenseList from "../components/expense-list/ExpenseList";
import ExpenseSummary from "../components/expense-summary/ExpenseSummary";
import ExpenseTrends from "../components/expense-trends/ExpenseTrends";
import TotalExpense from "../components/total-expense/TotalExpense";
import WalletBalance from "../components/wallet-balance/WalletBalance";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className="balance">
          <WalletBalance />
          <TotalExpense />
          <ExpenseSummary />
        </div>
        <div className="transactions">
          <ExpenseList />
          <ExpenseTrends />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
