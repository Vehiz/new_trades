import { useState, useEffect, Suspense } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { menus } from "../data.jsx";
import { FaTimes } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import BreadCrumbs from "./BreadCrumbs.jsx";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config.js";
import SignOut from "../pages/SignOut.jsx";
import PreLoader from "./PreLoader.jsx";

const Account = () => {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setOpen(!open);
    }
  };
  
  return (
    <Suspense fallback={<PreLoader/>}>
    <section className="flex">
      <div
        className={`bg-[#030a2c] fixed h-full ${
          open ? "w-64 lg:w-80" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="flex justify-between text-white my-6 items-center relative">
          <div className={`${open ? "visible" : "invisible"}`}>
            <a className="text-2xl font-bold" href="/">
            <span className='text-5xl italic'>B</span>lock<span className="italic text-gray-400">Mine</span>
            </a>
            <p className="ml-[15px] mt-[15px]">Welcome,</p>
            <p className="mt-2 text-sm lg:text-base">
              {user.firstName} {user.lastName}
            </p>
          </div>

          {open ? (
            <FaTimes
              size={28}
              className="cursor-pointer mb-6"
              onClick={() => setOpen(!open)}
              // onClick={toggleSidebar}
            />
          ) : (
            <HiMenuAlt3
              size={28}
              className="cursor-pointer absolute"
              // onClick={() => setOpen(!open)}
              onClick={toggleSidebar}

            />
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          {menus.map((menu, index) => (
            <NavLink
              to={menu.link}
              key={index}
              className={({ isActive }) =>
                classNames(
                  "group flex items-center text-sm lg:text-base gap-4 py-4 px-2 hover:bg-[#3454f5] hover:text-white rounded-md",
                  {
                    "bg-[#3454f5]": isActive,
                  }
                )
              }
            >
              <div className="text-sm lg:text-base">{menu.icon}</div>
              <h2
                style={{ transitionDelay: `${index + 3}00ms` }}
                className={`whitespace-pre duration-500 text-sm lg:text-base ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white text-black whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </NavLink>
          ))}
        </div>
          <SignOut/>
      </div>

      <div
        className={`w-full duration-500 ${open ? "ml-64 lg:ml-80" : "ml-16"}`}
      >
        <BreadCrumbs />
        <Outlet />
      </div>
    </section>
    </Suspense>
  );
};

export default Account;
