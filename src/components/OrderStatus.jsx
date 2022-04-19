import { useEffect, useState } from 'react';
import { React } from 'react';
import styles from "../styles/OrderStatus.module.scss";
import Navbar from "./Navbar";
import axios from 'axios';


export const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedAns, setSelectedAns] = useState("4px 3px 8px 0px rgba(111, 34, 50, 1)");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        'https://pr-2022-api.herokuapp.com/api/order/ordered'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedOrders = [];

      console.log(responseData);

      for (const key in responseData) {
        loadedOrders.push({
          id: responseData[key].orderMasterId,
          id2: responseData[key].orderNumber,
          description: responseData[key].orderDetails,
        });
      }
      //console.log(loadedOrders);
      setOrders(loadedOrders);
      //setMeals(loadedMeals);
    };
    fetchOrders().catch((error) => { });
  }, [orders]);

  const maping = () => {
    return orders.map((item, index) => 
    <div className={styles.orders} key={index} onClick={() => {setSelectedAns("4px 3px 8px 0px rgba(1, 156, 48 , 0.3)")}} style={{boxShadow: selectedAns}}>
      <div className={styles.orderIDContainer}>
        <p className={styles.orderID}>{item.id}</p>
      </div>
      <div className={styles.description}>
        {item.description.map((food, index2) => { return (<p key={index2}> <font>{food.quantity}x</font> {food.foodItem.name} </p>) })}
      </div>
    </div>);
  };


  return (
    <div className={styles.kitchen}>
      <div className={styles.nav}>
        <Navbar />
      </div>
      {maping()}
    </div>
  )
}

export default OrderStatus;
