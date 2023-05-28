import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { onLogin } from "../../api/auth";
import { useAppDispatch } from "../../app/store";
import { authenticateUser } from "../../features/auth/AuthSlice";

const LoginMobile = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

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
      const { data } = await onLogin(userData);
      dispatch(authenticateUser(data.user));
      localStorage.setItem("isAuth", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.user.id, name: data.user.name })
      );
    } catch (error: any) {
      console.error(error.response.data.errors[0].msg);
      setErrorMsg(error.response.data.errors[0].msg);
    }

    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-12 max-w-[1100px] w-full m-auto mt-12">
      <section className="max-w-[700px] w-full flex flex-col items-center justify-center m-auto">
        <h1 className="font-title1 font-0 text-3xl mb-10">Job Tracking App</h1>
        <p className="max-w-[400px] text-center">
          Jobio is a job tracking application designed to help recruiters
          advertise open roles within their network. It allows users to log job
          applications, track the status of each application.
        </p>
      </section>
      <section className="bg-white max-w-[35rem] w-full p-4 h-[32rem] shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-20">Login</h2>
        <p
          className={
            errorMsg !== ""
              ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center absolute max-w-[35rem] top-16 widthStyle`
              : ""
          }
        >
          {errorMsg}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center mt-8"
        >
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
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 cursor-pointer">
              Register
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default LoginMobile;
