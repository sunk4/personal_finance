import TableHeaderItem from "../common/TableHeaderItem";

const TableHeader: React.FC = () => {
  return (
    <>
      <li className="p-2 flex justify-between items-center">
        <TableHeaderItem text="Account" />
        <TableHeaderItem text="Reference" />
        <TableHeaderItem text="Transaction type" />
        <TableHeaderItem text="Transaction date" />
        <TableHeaderItem text="Amount" />
        <TableHeaderItem text="Balance" />
      </li>
      <hr />
    </>
  );
};

export default TableHeader;
