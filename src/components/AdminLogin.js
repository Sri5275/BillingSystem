import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function AdminLogin(props) {
    let navigate=useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm();
    function submitForm(admin){
        
        (admin.emailAddress=='admin@gmail.com' && admin.password=='admin')
        ?
        props.setAdmin(true)
        :
        alert('Invalid Admin Email or Password')

        props.admin==true && navigate('/products')
    }
    useEffect(()=>props.setAdmin(false),[])
  return (
    <div className='container vh-100 d-flex flex-column justify-content-center'>
        <div className='mb-4'>
        <h1 className='text-center display-5 text-primary'>Admin Login</h1>
        </div>
        <div>
        <Form onSubmit={handleSubmit(submitForm)} className='w-25 mx-auto'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('emailAddress',{required:true})} />
                {errors.emailAddress?.type=='required' && <p className='text-danger'>*This field is required</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password',{required:true})}/>
                {errors.password?.type=='required' && <p className='text-danger'>*This field is required</p>}
            </Form.Group>
            <Button variant="success" type="submit">
                Login
            </Button>
        </Form>
        </div>

    </div>
  )
}

export default AdminLogin