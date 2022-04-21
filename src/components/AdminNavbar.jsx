 import { useEffect, useState } from 'react';
 //import styles from "../styles/Navbar.module.scss";
 import { FaBars, FaTimes } from "react-icons/fa";
 import { Link } from "react-router-dom";
 import Navbar from "./Navbar";
 import React from 'react';
 import Popup from './Popup';
 import styles from "../styles/Popupstyle.scss"


export const AdminNavbar = () => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const [name2, setName2] = useState('')
  const [price2, setPrice2] = useState('')
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  }

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
        
           

        }>delete</button><a>  </a>
        {isOpen && <Popup
      content={<>
        <input onChange={event => setName(event.target.value)}></input>
        <a>    </a>
        <input type="number" step="0.01" onChange={event => setPrice(event.target.value)}></input>
        <button onClick={() => {
           fetch('https://pr-2022-api.herokuapp.com/api/food/'+item.id+'?name='+name+'&price='+price, { method: 'PUT' })
           maping();
        }}>Change</button>
      </>}
      handleClose={togglePopup}
    />}
    </p>
    </div>);
  };


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <button onClick={togglePopup}>edit</button>
      <a>      </a>
      <button onClick={togglePopup2}>add</button>
      <div>
      {isOpen2 && <Popup
      content={<>
        <input onChange={event => setName2(event.target.value)}></input>
        <a>    </a>
        <input type="number" step="0.01" onChange={event => setPrice2(event.target.value)}></input>
        <button onClick={() => {
           fetch('https://pr-2022-api.herokuapp.com/api/food/', { method: 'POST', 
           headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
          
           body: JSON.stringify({
            name: name2,
            price: price2,
            }),
          })
           maping();
           console.log(JSON.stringify({
            name: name2,
            price: price2,
            }))
        }}>Add</button>
      </>}
      handleClose={togglePopup2}
    />}
    </div>
      {maping()}
    </div>
  )
}

export default AdminNavbar;

