import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';  // Custom styling for the admin login page

function AdminLogin(props) {
  let navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  function submitForm(admin) {
    // Check if the email and password are correct
    if (admin.emailAddress === 'admin@gmail.com' && admin.password === 'admin') {
      props.setAdmin(true);  // Set admin to true
    } else {
      alert('Invalid Admin Email or Password');
    }

    // Navigate to /products if admin is true
    if (props.admin === true) {
      navigate('/products');
    }
  }

  // Reset admin status when the component mounts
  useEffect(() => {
    props.setAdmin(false);
  }, []);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image">
          <img 
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
            alt="Admin Login Illustration" 
          />
        </div>
        <div className="login-form">
          <h2 className="text-primary text-center">Admin Login</h2>
          <Form onSubmit={handleSubmit(submitForm)}>
            <div className="form-group mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                {...register('emailAddress', { required: true })} 
              />
              {errors.emailAddress?.type === 'required' && 
                <p className='text-danger'>*This field is required</p>
              }
            </div>

            <div className="form-group mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                {...register('password', { required: true })} 
              />
              {errors.password?.type === 'required' && 
                <p className='text-danger'>*This field is required</p>
              }
            </div>

            <Button className="btn btn-success w-100" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
