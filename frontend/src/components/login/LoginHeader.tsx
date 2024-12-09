interface LoginHeaderProps {
  onClick: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ onClick }) => (
  <section className="text-center w-4/5 lg:w-1/2">
    <h1 className="text-4xl font-bold mb-5">Personal Finance App</h1>
    <p className="text-xl mb-5">
      Track your finances effortlessly with our app. Manage your expenses, set
      budgets, and achieve your financial goals.
    </p>
    <button
      onClick={onClick}
      className="bg-dark-slate-blue text-white rounded-lg px-8 py-3"
    >
      Login
    </button>
  </section>
);

export default LoginHeader;
