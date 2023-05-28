import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { onLogout } from "../api/auth";
import { unAuthenticateUser } from "../features/auth/AuthSlice";

const NavbarMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth, name } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unAuthenticateUser());
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
    } catch (error: any) {
      console.error(error.response);
    }
  };
  return (
    <header className="h-20 border-b-2">
      <nav className="flex justify-between items-center h-full px-2 w-full">
        <img src={logo} alt="" />
        <Link to="/">
          <span className="cursor-pointer hover:underline decoration-2 text-xl font-semibold">
            Find Jobs
          </span>
        </Link>

        <p className="text-3xl" onClick={() => setShowMenu(true)}>
          <IoMdMenu />
        </p>
      </nav>
      <div
        className={`bg-gray-700 h-[350px] w-full absolute z-10 top-0 ${
          showMenu ? "translate-y-[0%] " : "-translate-y-[200%]"
        } transition duration-200 ease-in-out`}
      >
        <span
          className="pl-4 font-bold pt-8 inline-block text-2xl"
          onClick={() => setShowMenu(false)}
        >
          X
        </span>
        <ul className="flex flex-col items-end h-full gap-8 text-2xl px-8">
          <li className="font-semibold text-white">
            Hello, {name ? name : "user"}
          </li>
          <li
            className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-1"
            onClick={() => (isAuth ? navigate("/create") : navigate("/login"))}
          >
            Add a new job
          </li>
          <li
            onClick={logout}
            className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-1"
          >
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavbarMobile;
