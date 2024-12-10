import { User } from "oidc-client-ts";

interface WelcomeMessageProps {
  user: User | undefined | null;
  onClickOpenModal: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  user,
  onClickOpenModal,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome! {user && user.profile.name}
      </h2>
      <p className="text-lg mb-6">Please create your account to get started.</p>
      <button
        onClick={onClickOpenModal}
        className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
      >
        Add Account
      </button>
    </div>
  );
};

export default WelcomeMessage;
