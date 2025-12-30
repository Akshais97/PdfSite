import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './loginform';
import reactLogo from '../assets/react.svg';
import '../styles/navbar.css';

export default function Navbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <img src={reactLogo} alt="Logo" />
                        <span>MyApp</span>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="nav-links">
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/pricing">Pricing</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <button className="login-btn" onClick={openLoginModal}>
                                Log In
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={closeLoginModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeLoginModal}>
                            ×
                        </button>
                        <LoginForm onLoginSuccess={() => {
                            closeLoginModal();
                            navigate('/utility');
                        }} onSignUpClick={closeLoginModal} />
                    </div>
                </div>
            )}
        </>
    );
}
