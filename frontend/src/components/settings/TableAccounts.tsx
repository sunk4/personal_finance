import { AccountDto } from "../../api";

type TableAccountsProps = {
  accounts: AccountDto[];
};

const TableAccounts: React.FC<TableAccountsProps> = ({ accounts }) => {
  return (
    <ul className="my-6">
      <li className="p-2 flex justify-between items-center">
        <p className="text-gray-400 text-xs w-1/6 text-center">Account Name</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Account Type</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Status</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Balance</p>
      </li>
      <hr />
      {accounts && accounts.length > 0 ? (
        accounts.map((account) => (
          <div key={account.id}>
            <li className="p-2 flex justify-between items-center">
              <p className="text-center text-xs font-bold w-1/6">
                {account.name}
              </p>
              <p className="text-gray-400 text-xs text-center w-1/6">
                {account.accountType.substring(0, 1) +
                  account.accountType.substring(1).toLowerCase()}
              </p>

              <p className="text-gray-400 text-xs text-center w-1/6">
                {account.status.substring(0, 1) +
                  account.status.substring(1).toLowerCase()}
              </p>
              <p className="text-xs text-center w-1/6 font-bold">
                €{account.balance}
              </p>
            </li>
            <hr />
          </div>
        ))
      ) : (
        <li className="p-2 text-center text-gray-400 text-xs">
          No accounts found
        </li>
      )}
    </ul>
  );
};

export default TableAccounts;
