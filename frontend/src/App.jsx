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
import NotFound
 from "./components/error/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Unauthorized from "./components/error/Unauthorized";
function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-cars" 
                    element={
                        <ProtectedRoute>
                            <MyCars />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-auctions" 
                    element={
                        <ProtectedRoute>
                            <MyAuctions />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-bids" 
                    element={
                        <ProtectedRoute>
                            <MyBids />
                        </ProtectedRoute>
                    } 
                />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/auctions/:auctionId" element={<AuctionDetails />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;