import React from "react";
import sortingOptions from "../../data/sortingOptions";
import transactionTypes from "../../data/transactionTypes";
import { AccountDto, PageResponseTransactionDto } from "../../api";
import formatDate from "../../utils/formatDate";
import { User } from "oidc-client-ts";
import TableControls from "./TableControls";
import TableHeader from "./TableHeader";
import TransactionList from "./TransactionList";

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
      <TableControls
        accounts={accounts}
        sortingOptions={sortingOptions}
        transactionTypes={transactionTypes}
        sort={sort}
        transactionType={transactionType}
        handleAccountChange={handleAccountChange}
        setSort={setSort}
        setTransactionType={setTransactionType}
        exportToExcel={exportToExcel}
      />
      <ul className="my-6">
        <TableHeader />
        {transactions && transactions.data ? (
          <TransactionList transactions={transactions.data} />
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </>
  );
};
export default Table;
