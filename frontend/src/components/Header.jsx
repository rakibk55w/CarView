import { Link, NavLink } from "react-router-dom";
import {
    FiSun,
    FiMoon,
    FiMenu,
    FiX,
    FiSearch
} from "react-icons/fi";
import { useState } from "react";
import { dangerButtonStyle } from "../utils/buttonStyles";

export default function Header({
    loggedIn,
    darkMode,
    toggleTheme,
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinkStyle = ({ isActive }) =>
        `border-b-2 
        pb-1 
        transition-colors 
        duration-200
        ${
            isActive
                ? "border-black text-white"
                : "border-transparent text-white hover:border-white hover:text-black"
        }`;

    const buttonStyle = `rounded-lg 
        bg-white 
        px-4 
        py-2 
        text-primary-700 
        shadow-sm 
        transition-colors 
        duration-200 
        hover:bg-primary-100 
        hover:text-primary-800 
        active:bg-primary-200 
        active:scale-95`;

    return (
        <header className="
            bg-primary-600 
            text-white 
            shadow-md">
            <div className="
                mx-auto 
                flex 
                max-w-7xl 
                items-center 
                gap-8 
                px-6 
                py-4">

                <Link className="
                    text-2xl 
                    font-bold 
                    tracking-wide 
                    whitespace-nowrap"
                    to="/">
                    CarView
                </Link>

                <div className="
                    hidden 
                    flex-1 
                    md:flex 
                    justify-center">
                    <div className="
                        relative 
                        w-full 
                        max-w-lg">
                        <FiSearch className="
                            absolute 
                            left-4 
                            top-1/2 
                            -translate-y-1/2 
                            text-gray-500"
                            size={18}
                        />

                        <input className="
                            w-full 
                            rounded-full 
                            border 
                            border-gray-300 
                            bg-white 
                            py-2 
                            pl-11 
                            pr-4 
                            text-gray-800 
                            outline-none 
                            transition 
                            focus:border-primary-500 
                            focus:ring-2 
                            focus:ring-primary-300"
                            type="text"
                            placeholder="Search cars..."
                        />
                    </div>
                </div>

                <nav className="
                    ml-auto 
                    hidden 
                    items-center 
                    gap-5 
                    md:flex">

                    <NavLink to="/" 
                        className={navLinkStyle}>
                        Home
                    </NavLink>

                    <NavLink to="/about-us" 
                        className={navLinkStyle}>
                        About Us
                    </NavLink>

                    <NavLink to="/contact-us" 
                        className={navLinkStyle}>
                        Contact Us
                    </NavLink>

                    <div className="
                        flex 
                        items-center 
                        gap-3">
                        {loggedIn ? (
                            <>
                                <Link to="/profile"
                                    className={buttonStyle}>
                                    Profile
                                </Link>

                                <Link className={`
                                    rounded-lg 
                                    px-4 
                                    py-2 
                                    shadow-sm 
                                    transition-all 
                                    duration-200 
                                    active:scale-95 
                                    ${dangerButtonStyle}`}
                                    
                                    to="/logout">
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login"
                                    className={buttonStyle}>
                                    Login
                                </Link>

                                <Link to="/register"
                                    className={buttonStyle}>
                                    Register
                                </Link>
                            </>
                        )}
                    
                        <button className="
                            relative 
                            flex 
                            h-7 
                            w-16 
                            items-center 
                            rounded-full 
                            bg-primary-700 
                            transition"
                            onClick={toggleTheme}>
                            <FiSun className={`
                                absolute 
                                left-1.5
                                z-10 
                                transition
                                ${
                                    !darkMode
                                    ? "text-black"
                                    : "text-white"
                                }`}
                                size={13}
                            />

                            <FiMoon className={`
                                absolute 
                                right-1.5 
                                z-10 
                                transition
                                ${
                                    darkMode
                                    ? "text-black"
                                    : "text-white"
                                }`}
                                size={13}
                            />
                            <div className={`
                                absolute 
                                z-0 
                                h-5 
                                w-5 
                                rounded-full 
                                bg-white 
                                shadow 
                                transition-transform 
                                duration-300 
                                ${
                                    darkMode
                                    ? "translate-x-10"
                                    : "translate-x-0.5"
                                }`}
                            />
                        </button>
                    </div>
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <FiX size={28} />
                    ) : (
                        <FiMenu size={28} />
                    )}
                </button>
            </div>

            {menuOpen && (
                <div className="
                    space-y-3 
                    bg-primary-600 
                    px-6 
                    py-4 
                    md:hidden">

                    <Link className="block"
                        to="/">
                        Home
                    </Link>

                    <Link className="block"
                        to="/about-us">
                        About Us
                    </Link>

                    <Link className="block"
                        to="/contact-us">
                        Contact Us
                    </Link>

                    {loggedIn ? (
                        <>
                            <Link className="block"
                                to="/profile">
                                Profile
                            </Link>

                            <Link className="block"
                                to="/logout">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="block"
                                to="/login">
                                Login
                            </Link>

                            <Link className="block"
                                to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    <button className="
                        flex 
                        items-center 
                        gap-2"
                        onClick={toggleTheme}>
                        {darkMode ? (
                            <>
                                <FiSun />
                                Light Mode
                            </>
                        ) : (
                            <>
                                <FiMoon />
                                Dark Mode
                            </>
                        )}
                    </button>
                </div>
            )}
        </header>
    );
}