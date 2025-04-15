import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ShopPage from './pages/ShopPage';
import BlogPage from './pages/BlogPage';
import LandingPage from './pages/LandingPage';
import ContactUsPage from './pages/ContactUsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute'; 
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute';
import UnauthorisedPage from './pages/UnauthorisedPage';
import SingleProductPage from './pages/SingleProductPage';
import NotFound from './components/NotFound';
import OrderConfirmation from './components/OrderConfirmation';
import OrderFailure from './components/OrderFailure';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/product/:id" element={<SingleProductPage />} />

            {/* Protected routes */}
            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            {/* Admin routes */}
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminPage />
                    </AdminRoute>
                }
            />
            <Route path="/unauthorized" element={<UnauthorisedPage />} />
            <Route path='/orderSuccess' element={<OrderConfirmation/>}/>
            <Route path='/orderFailure' element={<OrderFailure/>}/>
            <Route path='*' element={<NotFound/>}/>

        </Routes>
    );
};

export default App;
