import { TransactionDto } from "../../api";
import formatDate from "../../utils/formatDate";

interface TransactionListProps {
  transactions: TransactionDto[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction: TransactionDto) => (
          <div key={transaction.id}>
            <li className="p-2 flex justify-between items-center">
              <p className="text-center text-xs font-bold w-1/6">
                {transaction.account?.name}
              </p>
              <p className="text-center text-xs font-bold w-1/6 text-gray-400">
                {transaction.reference}
              </p>
              <p className="text-gray-400 text-xs text-center w-1/6">
                {transaction.transactionType
                  ? transaction.transactionType.substring(0, 1) +
                    transaction.transactionType.substring(1).toLowerCase()
                  : ""}
              </p>
              <p className="text-gray-400 text-xs text-center w-1/6">
                {formatDate(transaction.transactionDate)}
              </p>
              <p
                className={`${
                  transaction.transactionType === "DEPOSIT"
                    ? "text-green-500 text-center w-1/6 text-xs"
                    : "text-center w-1/6 text-xs"
                }`}
              >
                {`${
                  transaction.transactionType === "DEPOSIT" ? "+" : "-"
                }${transaction.amount}€`}
              </p>
              <p className="text-center w-1/6 text-xs">
                {transaction.newBalance}
              </p>
            </li>
            <hr />
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </>
  );
};

export default TransactionList;
