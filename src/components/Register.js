import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function Register() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [user,setUser]=useState()

    let navigate=useNavigate();
    // function getUsers(){
    //     axios.get('http://localhost:4000/users')
    //     .then(res=>setUser(res.data))
    //     .catch(err=>console.log(err))
    // }
    // function postForm(newForm){
    //     axios.post('http://localhost:4000/users',newForm)
    //     .then(()=>{
    //        // getUsers();
    //         navigate('/');
    //     })
    //     .catch(err=>console.log(err))
    // }
    function submitForm(newForm){
        const userExists=user.find(userObj=>userObj.emailAddress==newForm.emailAddress)
        if(userExists){
            alert("Email address already exists!");
        }else{
            axios.post('http://localhost:4000/users',newForm)
                 .then(() => {
                    navigate('/');
                 })
                 .catch(err => console.log(err));
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:4000/users')
        .then(res=>setUser(res.data))
        .catch(err=>console.log(err))
    },[])
    return (
    <div className='container mt-5 vh-100'>
        <h1 className='text-center display-5'>Register Here to SignUp</h1>
        <Form onSubmit={handleSubmit(submitForm)} className='w-25 mx-auto'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('emailAddress',{required:true})} />
                {errors.emailAddress?.type==='required' && <p className='text-danger'>*This field is required</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password',{required:true})}/>
                {errors.password?.type==='required' && <p className='text-danger'>*This field is required</p>}
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>

    </div>
  )
}

export default Register;
