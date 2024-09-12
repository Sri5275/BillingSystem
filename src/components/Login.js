import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Fetch users from server
  const getUsers = () => {
    axios.get('http://localhost:4000/users')
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  };
   console.log(user);
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

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  };

  const formStyle = {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '40px auto'
  };

  const footerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    padding: '0.65rem 0'
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <h1 className='display-4 text-center mb-3'>Departmental Store</h1>
        <div className="row d-flex justify-content-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Login Illustration" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(submitForm)} style={formStyle}>
              <div className="d-flex justify-content-between mb-4">
                <p className="lead fw-normal mb-0 me-3 text-primary">Sign in here</p>
                <Link to='/admin' className='text-danger nav-link'>Login as Admin</Link>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  {...register('emailAddress', { required: true })}
                />
                {errors.emailAddress && <p className='text-danger'>*This field is required</p>}
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  {...register('password', { required: true })}
                />
                {errors.password && <p className='text-danger'>*This field is required</p>}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <Button className="btn btn-primary" type='submit'>Login</Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't Have an account? <Link to='/register' className="link-danger">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer style={footerStyle}>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
