import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Container from "../Container";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, { duration: 1, x: -100, autoAlpha: 0 });
  }, []);

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container refetch>
          <div className="flex flex-row md:max-w-[98rem] mx-auto  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}

            <Link to="/">
              {" "}
              <div className="flex items-baseline gap-2">
                <img src={logo} alt="logo" width="25" height="50" />
                <h1 ref={titleRef} className="text-2xl font-semibold">
                  MedCampConnect
                </h1>
              </div>
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block">
                  <>
                    <Link
                      to={"/"}
                      className="cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                    >
                      Home
                    </Link>
                    <Link
                      to={"/available-camps"}
                      className="cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                    >
                      Available Camps
                    </Link>
                    {!user && (
                      <Link
                        to={"/login"}
                        className="cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                      >
                        Join Us
                      </Link>
                    )}
                  </>
                </div>
                {/* Dropdown btn */}
                {user && (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    // make the style different in look
                    className="p-4 md:py-1 md:px-2  flex flex-row items-center gap-3  cursor-pointer  transition"
                  >
                    <AiOutlineMenu className="md:hidden" />
                    <div className="hidden md:block ">
                      {/* Avatar */}
                      <img
                        className="h-10 w-10 object-cover rounded-full"
                        referrerPolicy="no-referrer"
                        src={
                          user && userData.photo ? userData.photo : avatarImg
                        }
                        alt="profile"
                      />
                    </div>
                  </div>
                )}
              </div>
              {isOpen && user && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <div className="disabled flex items-baseline gap-1  px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                          <FaUser />
                          {userData?.name}
                        </div>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 flex items-center gap-1 hover:bg-neutral-100 transition font-semibold"
                        >
                          <BiSolidDashboard />
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 flex items-center gap-1 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          <IoLogOut />
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
