import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navigationbar from './Navigationbar';
import { Form, Button } from 'react-bootstrap';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import axios from 'axios';

function AddProducts(props) {
    const [products, setProducts] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const newProduct = (prod) => {
        prod.quantity = +prod.quantity;
        prod.price = +prod.price;

        let existing = products.find(obj => prod.product === obj.product);

        if (existing) {
            existing.quantity += prod.quantity;
            axios.put(`http://localhost:4000/products/${existing.id}`, existing)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:4000/products', prod)
                .then(res => {
                    console.log(res.data);
                    alert('Product Added Successfully!!');
                })
                .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        axios.get('http://localhost:4000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Navigationbar setCurrentUser={props.setCurrentUser} />
            <div className="container d-flex align-items-center">
                <h1 className='text-center text-success'>
                    Add a Product <MdOutlineProductionQuantityLimits />
                </h1>
                <div className="container d-flex justify-content-center vh-100 align-items-center">
                    <Form onSubmit={handleSubmit(newProduct)} className='w-50'>
                        <Form.Group className="mb-3" controlId="formProduct">
                            <Form.Label>Product</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Name"
                                {...register("product", { required: true })}
                            />
                            {errors.product?.type === 'required' && <p className='text-danger'>*This field is required</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity (in kgs)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Quantity to be added"
                                {...register("quantity", { required: true })}
                            />
                            {errors.quantity?.type === 'required' && <p className='text-danger'>*This field is required</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price per kg</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price/kg"
                                {...register("price", { required: true })}
                            />
                            {errors.price?.type === 'required' && <p className='text-danger'>*This field is required</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formExpiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("expiryDate")}
                            />
                        </Form.Group>

                        <Button variant="primary" type='submit'>
                            Add
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
