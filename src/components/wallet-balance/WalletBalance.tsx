import "./WalletBalance.css";
import AddBalanceModal from "../add-balance-modal/AddBalanceModal";
import { FaRupeeSign } from "react-icons/fa";

type Props = {
  walletBalance: number;
  updateBalance: (amount: number) => void;
};

const WalletBalance = ({ walletBalance, updateBalance }: Props) => {
  return (
    <div className="wallet-balance">
      <h3>
        Wallet Balance :{" "}
        <span>
          <FaRupeeSign size={15} />
          {walletBalance}
        </span>
      </h3>
      <AddBalanceModal updateBalance={updateBalance} />
    </div>
  );
};

export default WalletBalance;
