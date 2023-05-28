import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { onLogout } from "../api/auth";
import { unAuthenticateUser } from "../features/auth/AuthSlice";
const DropdownProfile = () => {
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
    <div className="flex flex-col dropdownProfile z-10">
      <ul className="flex flex-col gap-4">
        <li className="font-semibold">Hello {name ? name : "user"}</li>
        <li
          className="cursor-pointer text-blue-500 hover:underline decoration-2"
          onClick={() => (isAuth ? navigate("/create") : navigate("/login"))}
        >
          Add a new job
        </li>
        <li
          onClick={logout}
          className="cursor-pointer bg-blue-500 text-white rounded-lg px-1"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default DropdownProfile;
