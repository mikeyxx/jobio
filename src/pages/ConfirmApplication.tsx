import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const ConfirmApplication = () => {
  return (
    <main>
      <header>
        <NavBar />
      </header>
      <section className=" mt-4 flex item-center justify-center ">
        <div className="max-w-[50%] rounded-lg w-full text-center">
          <p className="text-green-500 font-semibold text-2xl">
            Your application has been successfully submitted!
          </p>
          <div className="mt-4">
            <Link to="/" className="text-blue-400 underline text-lg">
              Search for more jobs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmApplication;
