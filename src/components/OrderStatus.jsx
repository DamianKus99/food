import { useEffect, useState } from 'react';
import { React} from 'react';
import styles from "../styles/OrderStatus.module.scss";
import Navbar from "./Navbar";
import axios from 'axios';


export const OrderStatus = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        'http://localhost:8080/api/order/ordered'
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
    fetchOrders().catch((error) => {});
  }, [orders]); 

  const maping = () => {
    return orders.map((item, index) => <div className={styles.orders} key={index}>
      <div className={styles.orderIDContainer}>
          <p className={styles.orderID}>{item.id}</p>
          <p className={styles.orderNumber}>{item.id2}</p>
        </div>  
        <div className={styles.description}>
          {item.description.map((food,index2) => {return (<p key={index2}> {food.quantity}x {food.foodItem.name} </p> )} ) }
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
