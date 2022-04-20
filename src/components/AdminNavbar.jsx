 import { useEffect, useState } from 'react';
 //import styles from "../styles/Navbar.module.scss";
 import { FaBars, FaTimes } from "react-icons/fa";
 import { Link } from "react-router-dom";
 import Navbar from "./Navbar";
 import React from 'react';


export const AdminNavbar = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        'https://pr-2022-api.herokuapp.com/api/food'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedOrders = [];

      console.log(responseData);

      for (const key in responseData) {
        loadedOrders.push({
          id: responseData[key].foodItemId,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
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
    <div key={index}> 
        <p>{item.id}</p>
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>{item.price}<button onClick={() => {
           fetch('https://pr-2022-api.herokuapp.com/api/food/'+item.id, { method: 'DELETE' })
}
           

        }>delete</button></p>
    </div>);
  };


  return (
    <div>
      <div>
        <Navbar />
      </div>
      {maping()}
    </div>
  )
}

export default AdminNavbar;

