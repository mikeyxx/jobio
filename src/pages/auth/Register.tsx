import { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { onRegistration } from "../../api/auth";
import RegisterMobile from "./RegisterMobile";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(userData);
      setSuccessMsg(data.msg);
      setUserData({ name: "", email: "", password: "" });
    } catch (error: any) {
      setErrorMsg(error.response.data.errors[0].msg);
    }

    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 3000);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  return (
    <div
      className={`max-w-[1100px] w-full m-auto p-4 ${
        screenSize >= 1000
          ? "overflow-hidden  h-screen"
          : "overflow-auto min-h-screen"
      } `}
    >
      <nav>
        <img src={logo} alt="" />
      </nav>
      {screenSize >= 1000 ? (
        <div className="flex h-full items-center justify-center gap-28 max-[1127px]:gap-12">
          <section className="w-1/2 max-[1127px]:w-full max-[1127px]:text-center">
            <h1 className="font-title1 font-0 text-5xl mb-10">
              Job Tracking App
            </h1>
            <p>
              Jobio is a job tracking application designed to help recruiters
              advertise open roles within their network. It allows users to log
              job applications, track the status of each application.
            </p>
          </section>
          <section className="bg-white max-w-[35rem] w-full p-4 h-[32rem] shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-20">Register</h2>
            <p
              className={
                errorMsg !== ""
                  ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center absolute max-w-[35rem] top-16 widthStyle`
                  : ""
              }
            >
              {errorMsg}
            </p>
            <p
              className={
                successMsg !== ""
                  ? `bg-green-300 font-semibold rounded h-10 p-2 flex items-center absolute max-w-[35rem] top-16 widthStyle`
                  : ""
              }
            >
              {successMsg}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 justify-center mt-8"
            >
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className="bg-blue-500 p-2 rounded-lg text-lg text-white cursor-pointer">
                  Register
                </button>
              </div>
              <p className="text-center">
                Already a user?{" "}
                <Link to="/login" className="text-blue-400 cursor-pointer">
                  Login
                </Link>
              </p>
            </form>
          </section>
        </div>
      ) : (
        <RegisterMobile />
      )}
    </div>
  );
};

export default Register;
