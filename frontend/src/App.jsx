import { Routes, Route } from "react-router-dom";

import Layout from "./components/common/Layout";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyCars from "./pages/MyCars";
import MyAuctions from "./pages/MyAuctions";
import MyBids from "./pages/MyBids";
import CarDetails from "./pages/CarDetails";
import AuctionDetails from "./pages/AuctionDetails";
import NotFound from "./components/error/NotFound";

function App() {
    const loggedIn = true;

    return (
        <Layout loggedIn={loggedIn}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-cars" element={<MyCars />} />
                <Route path="/my-auctions" element={<MyAuctions />} />
                <Route path="/my-bids" element={<MyBids />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/auctions/:auctionId" element={<AuctionDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;