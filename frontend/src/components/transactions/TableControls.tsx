import { AccountDto } from "../../api";

interface TableControlsProps {
  accounts: AccountDto[] | undefined;
  sortingOptions: { key: string; value: string }[];
  transactionTypes: { key: string; value: string }[];
  sort: string;
  transactionType: string | undefined;
  handleAccountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSort: (value: string) => void;
  setTransactionType: (value: string) => void;
  exportToExcel: () => void;
}

const TableControls: React.FC<TableControlsProps> = ({
  accounts,
  sortingOptions,
  transactionTypes,
  sort,
  transactionType,
  handleAccountChange,
  setSort,
  setTransactionType,
  exportToExcel,
}) => {
  return (
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
          className="bg-white rounded-lg border-2 border-gray-400 p-1 text-xs"
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
          className="bg-white rounded-lg border-2 border-gray-400 p-1 text-xs"
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
  );
};

export default TableControls;
