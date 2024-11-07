// Login.js
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/login'; // Adjust path as per your project structure
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser, // Your login API function
    onSuccess: (data) => {

      const token = data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Call the login function from the AuthContext (if you need to update the context state)
      login(token);
      navigate('/'); // Redirect to dashboard after successful login
    },
    onError: (error) => {
      console.error('Login failed', error);
      // Handle error, e.g., show error message
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </button>
        {mutation.isError && <p>Login failed</p>}
      </form>
    </div>
  );
};

export default Login;
