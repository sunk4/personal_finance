interface HeaderProps {
  onClickOpenModal: () => void;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ onClickOpenModal, text }) => {
  return (
    <div className="mb-4 flex justify-between">
      <h1 className="text-lg font-bold">{text}s</h1>
      <button
        onClick={onClickOpenModal}
        className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
      >
        Add {text}
      </button>
    </div>
  );
};

export default Header;
