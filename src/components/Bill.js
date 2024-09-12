import React, { useState, useEffect } from "react";
import Navigationbar from './Navigationbar';
import { Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function Bill(props) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let total = 0;
    props.cartProducts.forEach((prod) => {
      total += (+prod.requiredQuantity) * (+prod.price);
    });
    setSum(total);
  }, [props.cartProducts]);

  return (
    <div className="text-center vh-100">
      <Navigationbar setCurrentUser={props.setCurrentUser} />
      {orderPlaced ? (
        <div>Order placed successfully!</div>
      ) : (
        <div>
          <div className="mt-3">
            <h1>Billing System of a Departmental Store</h1>
          </div>
          <div className="mt-5">
            <h2>Product List</h2>
          </div>
          <div className="mt-3">
            <Table striped bordered className="text-center mx-auto w-50">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity (kg)</th>
                  <th>Price (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {props.cartProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product}</td>
                    <td>{product.requiredQuantity}</td>
                    <td>{(+product.requiredQuantity) * (+product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5>Total Price: Rs.{sum}</h5>
          </div>
          <div className="">
            <NavLink to='/billpage' className='btn btn-success'>
              Place Order
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
