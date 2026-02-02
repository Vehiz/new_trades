import { useEffect, useRef, useState, Suspense } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { menus } from "../data.jsx";
import { FaTimes } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import BreadCrumbs from "./BreadCrumbs.jsx";
import { auth } from "../firebase-config.js";
import { getUserProfile } from "../services/transactions";
import SignOut from "../pages/SignOut.jsx";
import PreLoader from "./PreLoader.jsx";
import { FiBell, FiSettings } from "react-icons/fi";
import { LuMoon, LuSun } from "react-icons/lu";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Logo from "../assets/logoNew.png";

const Account = () => {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser?.email) {
        return;
      }
      const profile = await getUserProfile(authUser.email);
      if (profile) {
        setUser(profile);
      }
    });
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : Boolean(prefersDark);
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setOpen(!open);
    }
  };

  const handleGoToProfile = () => {
    navigate("/account/profile");
  };

  const handleGoToSettings = () => {
    navigate("/account/settings");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      toast.error(`Error signing out: ${error.message}`);
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  
  return (
    <Suspense fallback={<PreLoader/>}>
    <section className={`${isDark ? "dark" : ""} flex min-h-screen bg-[#f7f5ff] dark:bg-slate-950`}>
      <div
        className={`bg-white dark:bg-slate-900 fixed h-full border-r border-gray-200 dark:border-slate-800 shadow-[0_12px_30px_rgba(76,86,109,0.08)] flex flex-col ${
          open ? "w-64 lg:w-72" : "w-16"
        } duration-500 text-gray-700 px-4 overflow-hidden`}
      >
        <div className="flex justify-between my-6 items-center relative">
          <div className={`${open ? "visible" : "invisible"}`}>
            <Link className="flex items-center gap-2" to="/">
              <img src={Logo} alt="logo" className="h-10 w-auto" />
              <div className="leading-none">
                <span className="text-base sm:text-lg italic">B</span>lock
                <span className="italic text-gray-400">Mine</span>
              </div>
            </Link>
            <p className="text-xs text-gray-500">Trading Platform</p>
          </div>

          {open ? (
            <button
              type="button"
              className="cursor-pointer mb-6 text-gray-400 hover:text-gray-600"
              onClick={() => setOpen(!open)}
              aria-label="Collapse sidebar"
            >
              <FaTimes size={28} />
            </button>
          ) : (
            <button
              type="button"
              className="cursor-pointer absolute"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
            >
              <HiMenuAlt3 size={28} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className={classNames(
                "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm hover:bg-white hover:text-gray-700",
                { "justify-start": open }
              )}
            >
              <span className="text-gray-400">‹</span>
              <span className={`${open ? "block" : "hidden"}`}>Collapse</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 relative">
            {menus.map((menu, index) => (
              <NavLink
                to={menu.link}
                key={index}
                className={({ isActive }) =>
                  classNames(
                    "group flex items-center text-sm lg:text-base py-3 rounded-xl transition-all",
                    {
                      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm": isActive,
                      "text-gray-600 hover:bg-gray-50": !isActive,
                      "justify-center px-2": !open,
                      "gap-4 px-3": open,
                    }
                  )
                }
              >
                <div className="flex h-6 w-6 items-center justify-center text-sm lg:text-base">
                  {menu.icon}
                </div>
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
        </div>
        <div className="mt-auto pb-4 -mx-4 border-t border-gray-100 bg-[#f6f7ff] px-4 pt-4">
          <SignOut showLabel={open} />
          <p className={`mt-6 text-center text-xs text-gray-400 ${open ? "block" : "hidden"}`}>
            © {new Date().getFullYear()} Blocktrade
          </p>
        </div>
      </div>

      <div
        className={`w-full duration-500 ${open ? "ml-64 lg:ml-72" : "ml-16"}`}
      >
        <header className="sticky top-0 z-20 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="text-sm font-semibold text-[#3b47ff] dark:text-emerald-300">Blocktrade</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {isDark ? <LuSun size={14} /> : <LuMoon size={14} />}
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-700" aria-label="Notifications">
                <FiBell size={16} />
              </button>
              <button
                type="button"
                onClick={handleGoToSettings}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-700"
                aria-label="Settings"
              >
                <FiSettings size={16} />
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-left"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-semibold text-white">
                    {(user?.firstName?.[0] || user?.email?.[0] || "U").toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-gray-700">
                      {user?.firstName || user?.name || user?.email || "User"}
                    </p>
                    <p className="text-[10px] text-gray-400">{user?.email || ""}</p>
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-semibold text-white">
                        {(user?.firstName?.[0] || user?.email?.[0] || "U").toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.firstName || user?.name || "Trader"}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email || ""}</p>
                      </div>
                    </div>
                    <div className="px-2 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          handleGoToProfile();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="text-gray-500">👤</span>
                        My Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          handleGoToSettings();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="text-gray-500">⚙️</span>
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-gray-100 px-2 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          handleSignOut();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <span className="text-red-500">⎋</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 pb-6">
          <BreadCrumbs />
          <Outlet />
        </div>
      </div>
    </section>
    </Suspense>
  );
};

export default Account;
