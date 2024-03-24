import { useEffect, useState } from "react";
import ExpenseList from "../components/expense-list/ExpenseList";
import ExpenseSummary from "../components/expense-summary/ExpenseSummary";
import ExpenseTrends from "../components/expense-trends/ExpenseTrends";
import TotalExpense from "../components/total-expense/TotalExpense";
import WalletBalance from "../components/wallet-balance/WalletBalance";
import "./HomePage.css";

const HomePage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // checking for walletBalance from localStorage, if not found then assign 5000 for first time
  useEffect(() => {
    const walletBalanceLS = Number(localStorage.getItem("walletBalance"));
    walletBalanceLS
      ? setWalletBalance(walletBalanceLS)
      : setWalletBalance(5000);
    console.log("home page useEffect", walletBalanceLS);
  }, []);

  /**
   * update wallet balance along with local strorage
   * @param {number} amount value of amount to be added in wallet
   */
  const addBalance = (amount: number) => {
    setWalletBalance((prevBalance) => {
      localStorage.setItem("walletBalance", String(prevBalance + amount));
      return prevBalance + amount;
    });
  };

  return (
    <div className="home-page">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className="balance">
          <WalletBalance
            walletBalance={walletBalance}
            updateBalance={addBalance}
          />
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
