import { useEffect, useState } from "react";
import ExpenseList from "../components/expense-list/ExpenseList";
import ExpenseSummary from "../components/expense-summary/ExpenseSummary";
import ExpenseTrends from "../components/expense-trends/ExpenseTrends";
import TotalExpense from "../components/total-expense/TotalExpense";
import WalletBalance from "../components/wallet-balance/WalletBalance";
import "./HomePage.css";

export type TypeExpense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

const HomePage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(5000);
  const [expenses, setExpenses] = useState<TypeExpense[]>([
    { title: "", amount: 0, date: "", category: "" },
  ]);

  // getting data from localStorage or else updaing localStorage on pageLoad for firt time
  useEffect(() => {
    // walletBalance
    const walletBalanceLS = Number(localStorage.getItem("walletBalance"));
    if (walletBalanceLS) {
      setWalletBalance(walletBalanceLS);
    } else {
      localStorage.setItem("walletBalance", String(walletBalance));
    }

    //   expenses
    const dataLS = localStorage.getItem("expenses");
    if (dataLS) {
      const expenses = JSON.parse(dataLS);
      setExpenses(expenses);
    } else {
      console.log(JSON.stringify(expenses));
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
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

  /**
   *
   * @param expense
   */
  const addExpense = (expense: TypeExpense) => {
    console.log(expense);
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
          <TotalExpense expenses={expenses} updateExpense={addExpense} />
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
