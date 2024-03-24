import "./WalletBalance.css";

type Props = {
  walletBalance: number;
};
const WalletBalance = ({ walletBalance }: Props) => {
  return (
    <div className="wallet-balance">
      <h3>
        Wallet Balance : <span>{walletBalance}</span>
      </h3>
      <button>+ Add Balance</button>
    </div>
  );
};

export default WalletBalance;
