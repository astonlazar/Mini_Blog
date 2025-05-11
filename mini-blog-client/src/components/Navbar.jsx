import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Mini Blog</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Posts</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
          </>
        ) : (<>
          <button onClick={(e) => navigate('/dashboard')} className="text-gray-700 hover:text-red-500">Dashboard</button>
          <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">Logout</button>
        </>
        )}
      </div>
    </nav>
  );
}
