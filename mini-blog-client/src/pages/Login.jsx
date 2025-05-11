import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const {login} = useAuth();

  const validate = (field, value) => {
    const newErrors = {...errors}

    if(field === 'email') {
      if (!value) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Invalid email format';
      else delete newErrors.email;
    }

    if (field === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!/[A-Z]/.test(value)) {
        newErrors.password = 'Must include at least one uppercase letter';
      } else if (!/[0-9]/.test(value)) {
        newErrors.password = 'Must include at least one number';
      } else {
        delete newErrors.password;
      }
    }


    setErrors(newErrors)
  }

  const handleChange = e => {
    const {name, value} = e.target
    setForm(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  } 

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const token = res.headers['authorization']; // "Bearer <token>"
      login(token?.split(' ')[1]);
      navigate('/dashboard');
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Login failed')
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={
            !form.email || !form.password || Object.keys(errors).length > 0
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}
