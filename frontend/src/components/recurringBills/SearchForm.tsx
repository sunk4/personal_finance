interface SearchFormProps {
  name: string;
  setName: (name: string) => void;
  handleSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  name,
  setName,
  handleSubmitSearch,
}) => {
  return (
    <div className="flex items-center gap-3 justify-end">
      <form onSubmit={handleSubmitSearch} className="w-full flex gap-2">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full text-sm p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
