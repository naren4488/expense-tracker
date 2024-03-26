import { useEffect, useState } from "react";
import ExpenseList from "../components/expense-list/ExpenseList";
import ExpenseSummary from "../components/expense-summary/ExpenseSummary";
import ExpenseTrends from "../components/expense-trends/ExpenseTrends";
import TotalExpense from "../components/total-expense/TotalExpense";
import WalletBalance from "../components/wallet-balance/WalletBalance";
import "./HomePage.css";
import { enqueueSnackbar } from "notistack";

export type TypeExpense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

const HomePage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(5000);
  const [expenses, setExpenses] = useState<TypeExpense[]>([]);

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
      const expenses: TypeExpense[] = JSON.parse(dataLS);
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
   * update total expenses and wallet balance accordingly
   * @param {TypeExpense} expense new added expense
   */
  const addExpense = (expense: TypeExpense) => {
    if (expense.amount > walletBalance) {
      enqueueSnackbar(
        "Expense is greater that your wallet balance, Please add more balance to your wallet",
        { variant: "error" }
      );
    } else {
      const currentExpense = { ...expense, amount: Number(expense.amount) };
      setExpenses((prevExpenses) => {
        localStorage.setItem(
          "expenses",
          JSON.stringify([...prevExpenses, currentExpense])
        );
        return [...prevExpenses, currentExpense];
      });
      enqueueSnackbar("Expense added successfully!", {
        variant: "success",
      });
      addBalance(-expense.amount);
    }
  };

  const handleDelete = (
    index: number,
    currentPage: number,
    PageSize: number
  ) => {
    const actualIndex = index + (currentPage - 1) * PageSize;
    const updatedExpenses = expenses.filter((_, i) => i != actualIndex);
    addBalance(expenses[actualIndex].amount);
    setExpenses(() => {
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
    enqueueSnackbar("Expense deleted!", {
      variant: "success",
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
          <TotalExpense expenses={expenses} updateExpense={addExpense} />
          <ExpenseSummary expenses={expenses} />
        </div>
        <div className="transactions">
          <ExpenseList expenses={expenses} handleDelete={handleDelete} />
          <ExpenseTrends expenses={expenses} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
