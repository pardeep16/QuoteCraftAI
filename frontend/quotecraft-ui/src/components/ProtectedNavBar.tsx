import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoDark from '../assets/logo-dark.svg';
import LogoLight from '../assets/logo-light.svg';
import { CrownIcon, LogOutIcon, MenuIcon, SettingsIcon, UserIcon, XIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useThemeContext } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../lib/auth";
const baseLinks = [
  { label: 'Generate', to: '/app/generate' },
  { label: 'Image Quote', to: '/app/image-generate' },
  { label: 'My Quotes', to: '/app/my-quotes' },
  { label: 'Favorites', to: '/app/favorites' }
];
export const ProtectedNavBar = () => {

  const { theme } = useThemeContext();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated()){
        navigate('/login');
    }
  }, [])


  return (
    <>
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-12 lg:px-20 xl:px-28 backdrop-blur-sm">
        <Link to="/" className="shrink-0">
          <img
            className="h-9 w-auto"
            src={theme === 'dark' ? LogoDark : LogoLight}
            alt="QuoteCraft AI"
            width={140}
            height={40}
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
            {baseLinks.map((link) => (
                <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition ${isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
            ))
            }
        </div>
        <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/app/upgrade" className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:from-amber-500 hover:to-orange-600 transition">
            <CrownIcon size={16} /> Upgrade
            </Link>
            <div className="hidden md:inline-flex">
                <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex size-10 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
            >
              <UserIcon size={20} className="text-slate-700 dark:text-slate-300" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 z-50 overflow-hidden py-1">
                  <NavLink to="/app/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/50 transition" onClick={() => setProfileOpen(false)}>
                    <SettingsIcon size={16} /> Profile & Settings
                  </NavLink>
                  <button onClick={() => { setProfileOpen(false); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition text-left font-medium">
                    <LogOutIcon size={16} /> Log Out
                  </button>
                </div>
              </>
            )}
            </div>
            <button
            type="button"
            className="md:hidden"
            onClick={() => setOpenMobileMenu((value) => !value)}
            aria-label="Open menu"
          >
            <MenuIcon size={26} className="text-slate-700 transition active:scale-90 dark:text-slate-200" />
          </button>
        </div>
        <div className={`fixed inset-0 z-50 flex flex-col items-center
         justify-center gap-6 bg-white/80 text-lg font-medium backdrop-blur-md
          transition duration-300 dark:bg-black/50 md:hidden ${
          openMobileMenu ? 'translate-x-0 mt-50' : '-translate-x-full'
        }`}>
           {baseLinks.map((link) => (
         <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition ${isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
        ))}

        <button
          type="button"
          className="flex size-10 items-center justify-center
           rounded-md bg-purple-600 text-white"
          onClick={() => setOpenMobileMenu(false)}
          aria-label="Close menu"
        >
          <XIcon size={20} />
        </button>
        </div>
    </nav>
    </>
  );

}
    