import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigationbar from './Navigationbar'
import {MdPayment} from 'react-icons/md'
import axios from 'axios';

const BillingPage = (props) => {
  const [product,setProducts]=useState([])
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [user,setUser]=useState({})

  const handleSubmit = event => {


    event.preventDefault();
    console.log(props.cartProducts);
    user.name={...props.currentUser};
    delete user.name.password;
    user.purchases=[...props.cartProducts];
    user.purchases.map(obj=>delete obj.quantity)
    props.cartProducts.length!==0 &&
    axios.post('http://localhost:4000/userPurchases',user)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    props.cartProducts.map((obj)=>{
      axios.get(`http://localhost:4000/products/${obj.id}`)
      .then(res=>{
        res.data.quantity=res.data.quantity-obj.requiredQuantity;
        axios.put(`http://localhost:4000/products/${obj.id},res.data`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
    })
    
    alert('Transaction Successful!!');
    props.setCartProducts([]);
  };

  useEffect(()=>{
    axios.get('http://localhost:4000/products')
    .then(res=>setProducts(res.data))
    .catch(err=>console.log(err));
},[])


  return (
    <div className="vh-100">
    <Navigationbar setCurrentUser={props.setCurrentUser}/>
    <Container className='mt-5 d-flex align-items-center'>
      <Form onSubmit={handleSubmit} className='mx-auto'>
      <h1 className='text-center mb-3 text-dark text-opacity-50'>Make Payment <MdPayment/></h1>
        <Form.Group as={Row} controlId="formName" className='mb-3'>
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAddress" className='mb-3'>
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCardNumber" className='mb-3'>
          <Form.Label column sm={2}>
        Card Number
        </Form.Label>
        <Col sm={10}>
        <Form.Control
        type="number"
        placeholder="Enter card number"
        value={cardNumber}
        onChange={event => setCardNumber(event.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formExpirationDate" className='mb-3'>
        <Form.Label column sm={2}>
        Expiration Date
        </Form.Label>
        <Col sm={10}>
        <Form.Control
        type="date"
        placeholder="Enter expiration date"
        value={expirationDate}
        onChange={event => setExpirationDate(event.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCvv" className='mb-3'>
        <Form.Label column sm={2}>
        CVV
        </Form.Label>
        <Col sm={10}>
        <Form.Control
        type="number"
        placeholder="Enter CVV"
        value={cvv}
        onChange={event => setCvv(event.target.value)}
        />
        </Col>
        </Form.Group>
        <Button variant="success" type="submit">
        Submit Payment
        </Button>
        </Form>
        </Container>
        </div>
    );
};

export default BillingPage;