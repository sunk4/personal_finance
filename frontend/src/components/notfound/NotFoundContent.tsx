import { Link } from "react-router-dom";
import notfoundImage from "../../assets/images/404-not-found.webp";

const NotFoundContent: React.FC = () => (
  <main className="h-screen bg-ivory-sand flex items-center justify-center">
    <section className="w-4/5 mx-auto text-center">
      <img
        src={notfoundImage}
        alt="not found"
        className="md:w-3/5 mx-auto sm:w-4/5"
      />
      <p className="text-xl mb-5">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        className="bg-dark-slate-blue text-white rounded-lg px-5 py-3"
        to="/transactions"
      >
        Back to home?
      </Link>
    </section>
  </main>
);

export default NotFoundContent;
