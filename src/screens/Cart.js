

import React from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{ height: "80vh", color: "#fff" }}>
        <div className='text-center'>
          <div className='fs-3 mb-4'>Your Cart is Empty!</div>
          <div className='fs-5'>Explore our menu and add some delicious items.</div>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5">
      <div className='table-responsive'>
        <table className='table table-hover table-dark'>
          <thead className='fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><Delete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end">
        <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
        <button className='btn btn-primary' onClick={handleCheckOut}> Check Out </button>
      </div>
    </div>
  );
}

