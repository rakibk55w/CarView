import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { dangerButtonStyle } from "../../utils/buttonStyles";
import {
  headerButtonStyle,
  navLinkStyle,
  profileDropdownItemStyle,
  profileDropdownStyle,
} from "../../utils/headerStyles";
import useAuth from "../../hooks/useAuth";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import AuctionSearch from "../auction/AuctionSearch";

export default function Header({ loggedIn, darkMode, toggleTheme }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await axiosAuthInstance.post("/auth/logout");

			showSuccessToast(
				response.data.message 
				|| "Logout successful"
			);

			navigate("/logout", {
				replace: true,
			});

		} catch (error) {
			showErrorToast(
				error.response?.data?.message ||
				"Logout failed. Please try again."
			);
		}
	};

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
					
					<AuctionSearch />
				</div>

				<nav className="
					ml-auto 
					hidden 
					items-center 
					gap-5 
					md:flex">
					<NavLink to="/" className={navLinkStyle}>
						Home
					</NavLink>

					<NavLink to="/about-us" className={navLinkStyle}>
						About Us
					</NavLink>

					<NavLink to="/contact-us" className={navLinkStyle}>
						Contact Us
					</NavLink>

					<div className="
						flex 
						items-center 
						gap-3">
						{loggedIn ? (
							<>
								<div className="relative"
									onMouseLeave={() => setProfileOpen(false)}>
									<button className={headerButtonStyle}
										onClick={() => setProfileOpen((open) => !open)}>

										Profile
									</button>

									{profileOpen && (
										<div className={profileDropdownStyle}>
											<NavLink
												to={`/profile/${user.id}`}
												className={profileDropdownItemStyle}
												onClick={() => setProfileOpen(false)}>

												My Profile
											</NavLink>

											<NavLink
												to="/my-cars"
												className={profileDropdownItemStyle}
												onClick={() => setProfileOpen(false)}>

												My Cars
											</NavLink>

											<NavLink
												to="/my-auctions"
												className={profileDropdownItemStyle}
												onClick={() => setProfileOpen(false)}>

												My Auctions
											</NavLink>

											<NavLink
												to="/my-bids"
												className={profileDropdownItemStyle}
												onClick={() => setProfileOpen(false)}>

												My Bids
											</NavLink>
										</div>
									)}
								</div>

								<button className={`
									rounded-lg 
									px-4 
									py-2 
									shadow-sm 
									transition-all 
									duration-200 
									active:scale-95 
									cursor-pointer
									${dangerButtonStyle}`}
									type="button"
									onClick={handleLogout}>

									Logout
								</button>
							</>
						) : (
							<>
								<Link to="/login" className={headerButtonStyle}>
									Login
								</Link>

								<Link to="/register" className={headerButtonStyle}>
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
							cursor-pointer
							rounded-full 
							bg-primary-700 
							transition"
							onClick={toggleTheme}>
							<FiSun className={`
								absolute 
								left-1.5
								z-10 
								transition
								${!darkMode ? "text-black" : "text-white"}`}
								size={13}
							/>

							<FiMoon className={`
								absolute 
								right-1.5 
								z-10 
								transition
								${darkMode ? "text-black" : "text-white"}`}
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

				<button className="md:hidden" 
					onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
				</button>
			</div>

			{menuOpen && (
				<div className="
					space-y-3 
					bg-primary-600 
					px-6 
					py-4 
					md:hidden">
					<Link className="block" to="/">
						Home
					</Link>

					<Link className="block" to="/about-us">
						About Us
					</Link>

					<Link className="block" to="/contact-us">
						Contact Us
					</Link>

					{loggedIn ? (
					<>
						<Link className="block" to={`/profile/${user.id}`}>
							Profile
						</Link>

						<button className="block" 
							type="button"
							cursor-pointer
							onClick={handleLogout}>
							Logout
						</button>
					</>
					) : (
					<>
						<Link className="block" to="/login">
							Login
						</Link>

						<Link className="block" to="/register">
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
