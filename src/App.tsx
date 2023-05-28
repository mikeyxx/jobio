import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import { useAppSelector } from "./app/store";
import ApplicantView from "./pages/ApplicantView";
import ConfirmApplication from "./pages/ConfirmApplication";

const PrivateRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/create" />}</>;
};

function App() {
  return (
    <>
      <SkeletonTheme baseColor="#c2c0c0" highlightColor="#e4e0e0">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply/:id" element={<ApplicantView />} />
            <Route path="/submitted" element={<ConfirmApplication />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/create" element={<CreateJob />} />
              <Route path="/edit/:id" element={<EditJob />} />
            </Route>

            <Route element={<RestrictedRoutes />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
