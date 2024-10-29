import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // Fetch users from server
  const getUsers = () => {
    axios.get('http://localhost:4000/users')
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  };

  // Handle login form submission
  const submitForm = (login) => {
    const currentUser = user.find(userObj => login.emailAddress === userObj.emailAddress && userObj.password === login.password);
    if (currentUser) {
      props.setCurrentUser(currentUser);
      navigate('/products');
    } else {
      alert('Invalid Username or Password.. Please Try Again');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Login Illustration" />
        </div>
        <div className="login-form">
          <h2 className="text-primary text-center">Welcome Back!</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                {...register('emailAddress', { required: true })}
              />
              {errors.emailAddress && <p className='text-danger'>*Required</p>}
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password', { required: true })}
              />
              {errors.password && <p className='text-danger'>*Required</p>}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link to="#" className="text-body">Forgot password?</Link>
            </div>
            <Button className="btn btn-primary w-100" type='submit'>Login</Button>
            <p className="small fw-bold text-center mt-3 mb-0">
              Don't have an account? <Link to='/register' className="link-danger">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
