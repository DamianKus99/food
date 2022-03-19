import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from '../../../styles/Order.module/Cart.module/Cart.module.scss';
import CartContext from '../../../store/CartContext';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const transformArray = arr => (
    arr.map(
      ({name, price, amount,id, ...rest}) => ({
        ...rest,
        foodItemID: id,
        quantity: amount
        
      })
    )
  );

  // const transformArray2 = arr => (
  //   arr.map(
  //     ({name, price, amount,id, ...rest}) => ({
  //       ...rest,
  //       quantity: amount
  //     })
  //   )
  // );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://pr-2022-api.herokuapp.com/api/order', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
      orderNumber: 2,
      customer: {customerId:6},
      orderDetails: transformArray(cartCtx.items),
      pmethod: "karta",

        
      }),
    });
    console.log(JSON.stringify({orderNumber: 2,
      customer: {customerId:6},
      orderDetails: transformArray(cartCtx.items),
      pmethod: "karta",}));
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
    console.log(transformArray(cartCtx.items));
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount:1})}
        />
      ))}
    </ul>
  );
  

  const modalActions = (
    <div className={classes.actions}>
      {hasItems && (
        <button className={classes.button} onClick={submitOrderHandler}>
          Order
        </button>
      )}
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
