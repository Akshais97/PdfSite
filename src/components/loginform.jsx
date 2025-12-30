import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginform.css';

export default function LoginForm({ onLoginSuccess, onSignUpClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Store token if provided
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            // Clear form
            setEmail('');
            setPassword('');

            // Call the success callback and navigate to utility page
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            // Navigate to utility page
            navigate('/utility');
        } catch (err) {
            if (err instanceof TypeError && err.message === 'Failed to fetch') {
                setError('Cannot connect to server. Make sure the backend is running on http://localhost:8090');
            } else {
                setError(err.message || 'An error occurred during login');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        if (onSignUpClick) {
            onSignUpClick();
        }
        navigate('/signup');
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Logging In...' : 'Log In'}
                </button>

                <p className="signup-link">
                    Don't have an account? <button type="button" className="signup-btn" onClick={handleSignUpClick}>Sign up</button>
                </p>
            </form>
        </div>
    );
}
