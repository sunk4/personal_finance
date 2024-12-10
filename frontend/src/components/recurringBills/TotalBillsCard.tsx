import { FaWallet } from "react-icons/fa";

interface TotalBillsCardProps {
  sum: number | undefined;
}

const TotalBillsCard: React.FC<TotalBillsCardProps> = ({ sum }) => {
  return (
    <div className="col-span-1 bg-dark-slate-blue rounded-lg p-4 flex flex-col gap-3 h-48">
      <FaWallet className="text-white" />
      <p className="text-white text-sm">Total bills</p>
      <h2 className="text-white font-bold text-xl">€{sum}</h2>
    </div>
  );
};

export default TotalBillsCard;
