import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    let { register, handleSubmit, formState: { errors }, watch } = useForm();
    let [user, setUser] = useState([]);
    let navigate = useNavigate();
    const password = watch("password");

    function submitForm(newForm) {
        const userExists = user.find(userObj => userObj.emailAddress === newForm.emailAddress);
        if (userExists) {
            alert("Email address already exists!");
        } else {
            axios.post('http://localhost:4000/users', newForm)
                 .then(() => {
                    navigate('/');
                 })
                 .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        axios.get('http://localhost:4000/users')
             .then(res => setUser(res.data))
             .catch(err => console.log(err));
    }, []);

    return (
        <Container className="register-container d-flex align-items-center justify-content-center">
            <Row className="register-row">
                <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Registration Illustration" className="register-illustration" />
                </Col>
                <Col md={6} sm={12}>
                    <h2 className="text-center mb-4">Register or Create Account</h2>
                    <Form onSubmit={handleSubmit(submitForm)} className='register-form'>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register('emailAddress', { required: true })}
                            />
                            {errors.emailAddress && <p className='error-text'>*This field is required</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {errors.password && <p className='error-text'>*Password must be at least 6 characters</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword.message}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className='register-btn'>
                            Register
                        </Button>
                        <div className="text-center mt-3">
                           <p className="small fw-bold text-center mt-3 mb-0">Already have an account? <Link to='/' className="link-danger">Login</Link> </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
