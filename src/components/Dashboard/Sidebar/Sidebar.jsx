import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsClockHistory, BsGraphUp } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import MenuItem from "./Menu/MenuItem";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();
  console.log(role, isLoading);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              {" "}
              <div className="flex items-baseline gap-2">
                <img src={logo} alt="logo" width="25" height="50" />
                <h1 className="text-2xl font-semibold">MedCampConnect</h1>
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                {" "}
                <div className="flex items-baseline gap-2">
                  <img src={logo} alt="logo" width="25" height="50" />
                  <h1 className="text-xl font-semibold">MedCampConnect</h1>
                </div>
                <hr className="mt-4" />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Profile Menu */}
              <MenuItem label="Profile" address="/dashboard" icon={FaUser} />

              {/* based on role */}
              {role === "organizer" && (
                <>
                  {/* add camp */}
                  <MenuItem
                    label="Add Camp"
                    address="/dashboard/add-camp"
                    icon={IoAdd}
                  />

                  <MenuItem
                    label="Manage Camps"
                    address="/dashboard/manage-camps"
                    icon={FcSettings}
                  />
                  <MenuItem
                    label="Manage Registered Camps"
                    address="/dashboard/manage-registered-camps"
                    icon={FcSettings}
                  />
                </>
              )}
              {role === "participant" && (
                <>
                  {/* Analytics */}
                  <MenuItem
                    label="Analytics"
                    address="/dashboard/analytics"
                    icon={BsGraphUp}
                  />
                  <MenuItem
                    label="Registered Camps"
                    address="/dashboard/registered-camps"
                    icon={FcSettings}
                  />
                  <MenuItem
                    label="Payment History"
                    address="/dashboard/payment-history"
                    icon={BsClockHistory}
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-red-300 rounded-lg   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
