import TableHeaderItem from "../common/TableHeaderItem";

const TableHeader: React.FC = () => {
  return (
    <>
      <li className="p-2 flex justify-between items-center">
        <TableHeaderItem text="Account name" />
        <TableHeaderItem text="Name" />
        <TableHeaderItem text="Frequency" />
        <TableHeaderItem text="Start Date" />
        <TableHeaderItem text="End Date" />
        <TableHeaderItem text="Amount" />
        <TableHeaderItem text="" />
      </li>
      <hr />
    </>
  );
};

export default TableHeader;
