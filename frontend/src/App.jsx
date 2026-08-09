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
import ProtectedRoute from "./components/common/ProtectedRoute";
import Unauthorized from "./components/error/Unauthorized";
import Logout from "./pages/Logout";
function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/auctions/:auctionId" element={<AuctionDetails />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route element={ <ProtectedRoute /> }>
                    <Route path="/profile/:userId" element={ <Profile /> } />
                    <Route path="/my-cars" element={ <MyCars /> } />
                    <Route path="/my-auctions" element={ <MyAuctions /> } />
                    <Route path="/my-bids" element={ <MyBids /> } />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;