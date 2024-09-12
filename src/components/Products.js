import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from './Navigationbar';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Products(props) {
  const [product, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [addToCart, setAddToCart] = useState({});
  const [maxi, setMaxi] = useState(0);
  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Add = (prodToAdd) => {
    handleShow();
    setAddToCart(prodToAdd);
    setMaxi(+prodToAdd.quantity);
    setValue("id", prodToAdd.id);
    setValue("product", prodToAdd.product);
    setValue("quantity", prodToAdd.quantity);
    setValue("price", prodToAdd.price);
    setValue("expiryDate", prodToAdd.expiryDate);
  };

  const finalAdd = () => {
    handleClose();
    let produ = getValues();
    produ.requiredQuantity = (+produ.requiredQuantity);
    produ.id = addToCart.id;
    props.setCartProducts([...props.cartProducts, produ]);
  };

  return (
    <div>
      <Navigationbar setCurrentUser={props.setCurrentUser} />
      {props.admin && 
        <div className='container mt-2 d-flex justify-content-end'>
          <Link className='btn btn-success ms-auto' to='/addproduct'>Add product to Store</Link>
        </div>
      }
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3'>
        {product.map((prodObj) => prodObj.quantity > 0 &&
          <div className="col mb-3 mx-auto d-flex align-items-stretch" key={prodObj.id}>
            <div className="card text-center">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className='mt-2'>Product: {prodObj.product}</h5>
                <h5 className='mt-2'>Quantity Available: {prodObj.quantity} kg or ltr</h5>
                <h5 className='mt-2'>Price per kg: Rs.{prodObj.price}</h5>
                <h5 className='mt-2'>Expiry Date: {prodObj.expiryDate}</h5>
              </div>
              <div>
                <Button type='submit' className="btn btn-success m-2" onClick={() => Add(prodObj)}>Add to Cart</Button>
              </div>
            </div>
          </div>
        )}
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(finalAdd)}>
              <Row className="mb-3">
                <Form.Group as={Col} md="3">
                  <Form.Label>Id</Form.Label>
                  <Form.Control type="number" disabled {...register("id")} />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Product</Form.Label>
                  <Form.Control type="text" placeholder="Enter Product" disabled {...register("product")} />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" disabled {...register("quantity")} />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Label>Price per kg</Form.Label>
                  <Form.Control type="number" disabled {...register("price")} />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="date" disabled {...register("expiryDate")} />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>Required Quantity</Form.Label>
                  <Form.Control type="number" {...register("requiredQuantity", { required: true, max: { value: maxi } })} />
                  {errors.requiredQuantity?.type === 'required' && <p className='text-danger'>*This field is required</p>}
                  {errors.requiredQuantity?.type === 'max' && <p className='text-danger'>*Quantity Limit Exceeded</p>}
                </Form.Group>
              </Row>
              <Button type='submit' variant="primary" className='d-flex float-end'>
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Products;
