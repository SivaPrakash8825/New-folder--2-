import { LinkButton } from "@/components/button/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useToggle from "@/hooks/useToggle";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Profile from "./Profile";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/store/useUser";
import { shallow } from "zustand/shallow";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { setUser, user } = useUser((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["users", user],
    queryFn: async () => {
      console.log("/me in");

      return axios.get<{ userdata: UserProps }>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/me`,
        {
          withCredentials: true,
        }
      );
    },
  });

  useEffect(() => {
    if (data) {
      if (typeof data.data == "string") {
        setUser(null);
        return router.replace("/signin");
      }
      console.log("onSuccess", data.data);
      // console.log("UserData : ", res.data.userdata);
      setUser(data.data.userdata);
    } else {
      console.log(data);
    }
  }, [data]);

  // console.log("data : ", data);

  const fetchData = async () => {
    try {
      const { data } = await axios.get<{ userdata: UserProps }>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/me`,
        {
          withCredentials: true,
        }
      );

      console.log("UserData : ", data.userdata);
      setUser(data.userdata);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);
  // const isSuccess = false

  const { isOn: isDark, toggleOn: toggleDark } = useToggle();
  const { isOn: isNav, toggleOn: toggleNav } = useToggle();

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);
  // return "";
  return (
    <header className="top-0 left-0  z-50 flex items-center justify-between w-full px-3 py-2 bg-light shadow-md md:px-8 lg:px-16 dark:bg-dark md:py-4 shadow-black/30 ">
      <div>
        {/*   Logo   */}
        <Link href={"/"}>
          <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold text-gray-700 dark:text-white dark:text-shadow-sm ">
            Servicify
          </h1>
        </Link>
      </div>
      {/*    Sign In And Sign Up - Lap  */}
      <div
        className={`${
          isNav ? "left-0" : "left-full"
        } flex flex-col lg:flex-row gap-y-4 items-start z-50 lg:items-center lg:justify-center text-xl font-semibold text-pri gap-x-10 fixed lg:static dark:bg-dark bg-gray-100 lg:bg-transparent  w-full lg:w-auto h-screen lg:h-auto top-0 left-0 p-16 lg:p-0 transition-all `}
      >
        {/* Close Btn  - Mobile */}
        <button
          onClick={toggleNav}
          className="text-pri font-semibold text-2xl absolute top-5 right-5 lg:hidden"
        >
          <AiOutlineClose />
        </button>
        {!user ? (
          <>
            <LinkButton link={"signup"} size={"small"} variant={"primary"}>
              {<h1>Sign Up</h1>}
            </LinkButton>
            <LinkButton link={"signin"} size={"small"} variant={"secondary"}>
              {<h1>Sign In</h1>}
            </LinkButton>
          </>
        ) : (
          <>
            {user?.role !== "user" ? (
              <Link href={"/requests"}>
                <h1
                  className={`relative before:absolute before:contents-[''] ${
                    pathname == "/requests" ? "before:w-full" : "before:w-0"
                  }  before:transition-all origin-center before:h-1 before:bg-pri before:top-full before:left-0  rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 p-2`}
                >
                  Requests
                </h1>
              </Link>
            ) : (
              <Link href={"/booked"}>
                <h1
                  className={`relative before:absolute before:contents-[''] ${
                    pathname == "/booked" ? "before:w-full" : "before:w-0"
                  }  before:transition-all origin-center before:h-1 before:bg-pri before:top-full before:left-0  rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 p-2`}
                >
                  Booked
                </h1>
              </Link>
            )}

            {/* Profile */}
            <Profile user={user} setUser={setUser} />
          </>
        )}
        {/*    Light/Dark      */}
        <button
          onClick={toggleDark}
          className=" text-pri hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg "
        >
          {isDark ? <MdOutlineDarkMode className="" /> : <MdOutlineLightMode />}
        </button>
      </div>
      {/*     End - Nav - LAb     */}

      {/*     Mobile Nav   */}
      <div className="flex gap-x-4 lg:hidden text-2xl text-pri">
        {user && (
          <>
            {" "}
            <Profile user={user} setUser={setUser} />{" "}
          </>
        )}
        <button onClick={toggleNav} className=" ">
          <BiMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
