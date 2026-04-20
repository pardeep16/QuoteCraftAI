import { Link } from "react-router-dom";
import LogoDark from '../assets/logo-dark.svg';
import LogoLight from '../assets/logo-light.svg';
import { MenuIcon, XIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useThemeContext } from "../context/ThemeContext";
import { useState } from "react";
const baseLinks = [
  { label: 'Generate', href: '/#generate' },
  { label: 'Community', href: '/#community' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' }
];
export const NavBar = () => {

  const { theme } = useThemeContext();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);


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
                <a key={link.label} href={link.href} className="text-lg text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                    {link.label}
                </a>
            ))
            }
        </div>
        <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:inline-flex">
              <Link to="/login" className="button primary hidden md:inline-flex">
                Get Started
            </Link>
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
          <a key={link.label} href={link.href} className="text-slate-700 dark:text-slate-200" onClick={() => setOpenMobileMenu(false)}>
            {link.label}
          </a>
        ))}

        <Link to={"/login"} className="button primary" onClick={() => setOpenMobileMenu(false)}>
          Get Started
        </Link>

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
    