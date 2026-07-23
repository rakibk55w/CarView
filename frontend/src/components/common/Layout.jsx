import Header from "./Header";
import Footer from "./Footer";
import useTheme from "../../hooks/useTheme";
import { ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function Layout({ children }) {
  const { darkMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="
            flex 
            min-h-screen 
            flex-col 
            bg-white 
            text-black 
            transition-colors 
            duration-300 
            dark:bg-gray-950 
            dark:text-white"
    >
      <Header
        loggedIn={isAuthenticated}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main
        className="
                mx-auto 
                w-full 
                max-w-7xl 
                flex-1 
                p-6"
      >
        {children}
      </main>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        draggable
        toastClassName={darkMode ? "" : "!bg-gray-300"}
      />
    </div>
  );
}
