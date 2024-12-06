import React from "react";
import sortingOptions from "../../data/sortingOptions";
import transactionTypes from "../../data/transactionTypes";
import {
  AccountDto,
  PageResponseTransactionDto,
  TransactionDto,
} from "../../api";
import formatDate from "../../utils/formatDate";
import { User } from "oidc-client-ts";

type TableProps = {
  sort: string;
  setSort: (sort: string) => void;
  transactionType: string | undefined;
  setTransactionType: (transactionType: string) => void;
  transactions: PageResponseTransactionDto;
  accounts: AccountDto[] | undefined;
  setAccountId: (accountId: string) => void;
  user: User | undefined | null;
};

const Table: React.FC<TableProps> = ({
  sort,
  setSort,
  transactionType,
  setTransactionType,
  transactions,
  accounts,
  setAccountId,
  user,
}) => {
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountId(e.target.value);
  };

  const exportToExcel = async () => {
    const apiUrl =
      import.meta.env.VITE_API_BASE_URL + "/transaction/export-excel";
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      const outputFilename = `${formatDate(new Date())}_transactions.xlsx`;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFilename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 justify-between">
        <div className="flex gap-2 items-center">
          <label className="text-gray-400 text-xs">Account</label>
          <select
            className="bg-white rounded-lg border-2 border-gray-400 p-1 text-xs"
            onChange={handleAccountChange}
          >
            <option className="text-sm" value="">
              All
            </option>
            {accounts &&
              accounts.map((option) => (
                <option key={option.id} value={option.id} className="text-sm">
                  {option.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-gray-400 text-xs">Sort by</label>
          <select
            className="bg-white rounded-lg border-2 border-gray-400 p-1  text-xs"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortingOptions.map((option) => (
              <option className="text-sm" key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
          <label className="text-gray-400 text-xs">Transaction type</label>
          <select
            className="bg-white rounded-lg border-2 border-gray-400 p-1  text-xs"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option className="text-sm" value="">
              All
            </option>
            {transactionTypes.map((type) => (
              <option className="text-sm" key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}
          </select>
          <button
            onClick={exportToExcel}
            className="bg-black text-white rounded-lg px-4 py-2 text-xs font-bold"
          >
            Export to Excel
          </button>
        </div>
      </div>
      <ul className="my-6">
        <li className="p-2 flex justify-between items-center">
          <p className="text-gray-400 text-xs w-1/6 text-center">Account</p>
          <p className="text-gray-400 text-xs w-1/6 text-center">Reference</p>
          <p className="text-gray-400 text-xs  w-1/6 text-center">
            Transaction type
          </p>
          <p className="text-gray-400 text-xs  w-1/6 text-center">
            Transaction date
          </p>
          <p className="text-gray-400 text-xs  w-1/6 text-center">Amount</p>
          <p className="text-gray-400 text-xs  w-1/6 text-center">Balance</p>
        </li>
        <hr />
        {transactions && transactions.data
          ? transactions.data.map((transaction: TransactionDto) => (
              <div key={transaction.id}>
                <li
                  className="p-2 flex justify-between items-center"
                  key={transaction.id}
                >
                  <p className="text-center text-xs font-bold w-1/6">
                    {transaction.account?.name}
                  </p>
                  <p className="text-center text-xs font-bold w-1/6 text-gray-400">
                    {transaction.reference}
                  </p>
                  <p className="text-gray-400 text-xs text-center w-1/6">
                    {transaction.transactionType
                      ? transaction.transactionType?.substring(0, 1) +
                        transaction.transactionType?.substring(1).toLowerCase()
                      : ""}
                  </p>
                  <p className="text-gray-400 text-xs text-center w-1/6">
                    {formatDate(transaction.transactionDate)}
                  </p>
                  <p
                    className={`${transaction.transactionType === "DEPOSIT" ? "text-green-500 text-center w-1/6 text-xs" : "text-center w-1/6 text-xs"}`}
                  >
                    {`${transaction.transactionType === "DEPOSIT" ? "+" : "-"}${transaction.amount}€`}
                  </p>
                  <p className="text-center w-1/6 text-xs">
                    {transaction.newBalance}
                  </p>
                </li>
                <hr />
              </div>
            ))
          : null}
      </ul>
    </>
  );
};
export default Table;
