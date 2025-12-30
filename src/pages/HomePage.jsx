import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginform';
import '../styles/homepage.css';

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleBeginNow = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="homepage">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <h1></h1>
          <p>Your ultimate productivity and utility solution</p>
          <button className="begin-btn" onClick={handleBeginNow}>
            Begin Now
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLoginModal}>
              ×
            </button>
            <LoginForm 
              onLoginSuccess={() => navigate('/utility')} 
              onSignUpClick={closeLoginModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
