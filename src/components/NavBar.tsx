import logo from "../assets/logo.svg";
import { RiMessage3Fill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import DropdownProfile from "./DropdownProfile";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarMobile from "./NavbarMobile";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

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
    <div className="overflow-x-hidden">
      {screenSize >= 1000 ? (
        <header className="h-20 border-b-2">
          <nav className="mx-12 flex justify-between items-center h-full">
            <section className="flex items-center">
              <img src={logo} alt="" />
              <Link to="/">
                <span className="cursor-pointer hover:underline decoration-2">
                  Find Jobs
                </span>
              </Link>
            </section>
            <section className="flex text-2xl w-40 justify-between items-center">
              <RiMessage3Fill className="cursor-pointer" />
              <MdNotificationsActive className="cursor-pointer" />
              <GoPerson
                className="cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
            </section>
          </nav>
          {showMenu && <DropdownProfile />}
        </header>
      ) : (
        <NavbarMobile />
      )}
    </div>
  );
};

export default NavBar;
