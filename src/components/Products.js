import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from './Navigationbar';
import { Button, Col, Form, Modal, Row, Card, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Products.css';

function Products(props) {
  const [product, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [addToCart, setAddToCart] = useState({});
  const [maxi, setMaxi] = useState(0);
  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();

  // Fetch products from API
  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Error fetching products: ", err);
        alert("Unable to fetch products at the moment");
      });
  },[]);

  // Modal show and hide functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to add product to the cart
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

  // Final Add to Cart logic
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

      <Container className="mt-4">
        {/* Admin Add Product Button */}
        {props.admin &&
          <div className='d-flex justify-content-end'>
            <Link className='btn btn-success mb-3' to='/addproducts'>
              + Add New Product
            </Link>
          </div>
        }

        {/* Product Grid */}
        <Row className='g-4'>
          {product.map((prodObj) => prodObj.quantity > 0 &&
            <Col key={prodObj.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary text-center">
                    {prodObj.product}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    <strong>Quantity Available:</strong> {prodObj.quantity} kg or ltr<br />
                    <strong>Price per kg:</strong> Rs.{prodObj.price}<br />
                    <strong>Expiry Date:</strong> {prodObj.expiryDate}
                  </Card.Text>
                  <Button 
                    variant="success" 
                    className="mt-auto w-100"
                    onClick={() => Add(prodObj)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* Modal for Adding Product to Cart */}
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Product to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(finalAdd)}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control type="number" disabled {...register("id")} />
                </Form.Group>
                <Form.Group as={Col} md="8">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" disabled {...register("product")} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control type="number" disabled {...register("quantity")} />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Price per kg</Form.Label>
                  <Form.Control type="number" disabled {...register("price")} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="date" disabled {...register("expiryDate")} />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Required Quantity</Form.Label>
                  <Form.Control 
                    type="number" 
                    {...register("requiredQuantity", { required: true, max: { value: maxi } })}
                  />
                  {errors.requiredQuantity?.type === 'required' && <p className='text-danger'>*Required field</p>}
                  {errors.requiredQuantity?.type === 'max' && <p className='text-danger'>*Quantity Limit Exceeded</p>}
                </Form.Group>
              </Row>
              <Button type="submit" variant="primary" className="w-100">
                Add to Cart
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Products;
