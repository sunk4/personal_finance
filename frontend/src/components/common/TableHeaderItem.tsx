interface TableHeaderItemProps {
  text: string;
}

const TableHeaderItem: React.FC<TableHeaderItemProps> = ({ text }) => {
  return <p className="text-gray-400 text-xs w-1/6 text-center">{text}</p>;
};

export default TableHeaderItem;
