import { useEffect, useState } from "react";
import ExpenseList from "../components/expense-list/ExpenseList";
import ExpenseSummary from "../components/expense-summary/ExpenseSummary";
import ExpenseTrends from "../components/expense-trends/ExpenseTrends";
import TotalExpense from "../components/total-expense/TotalExpense";
import WalletBalance from "../components/wallet-balance/WalletBalance";
import "./HomePage.css";

const HomePage = () => {
  const [walletBalance, setWalletBalance] = useState(0);

  // checking for walletBalance from localStorage, if not found then assign 5000 for first time
  useEffect(() => {
    const walletBalance = Number(localStorage.getItem("walletBalance"));
    console.log(walletBalance);
    walletBalance ? setWalletBalance(walletBalance) : setWalletBalance(5000);
  }, []);

  return (
    <div className="home-page">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className="balance">
          <WalletBalance walletBalance={walletBalance} />
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
