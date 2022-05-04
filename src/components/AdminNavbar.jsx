import React from 'react';
import styles from "../styles/AdminNavbar.module.scss";
import Navbar from "./Navbar";
import Popup from './Popup';
import { useEffect, useState } from 'react';

export const AdminNavbar = () => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [available, setAvailable] = useState(null)

  const [name2, setName2] = useState('')
  const [type2, setType2] = useState('')
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
        'http://localhost:8080/api/food/?name-asc=true'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedOrders = [];

      //console.log(responseData);

      for (const key in responseData) {
        loadedOrders.push({
          id: responseData[key].foodItemId,
          name: responseData[key].name,
          type: responseData[key].type,
          price: responseData[key].price,
          avaiable: responseData[key].avaiable,
        });
      }
      //console.log(loadedOrders);
      setOrders(loadedOrders);
      //setMeals(loadedMeals);
      //console.log(loadedOrders.avaible);
    };
    fetchOrders().catch((error) => { });
  }, [orders]);



    const maping2 = async () => {
      const response = await fetch(
        'http://localhost:8080/api/food/?name-asc=true'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedOrders = [];

      //console.log(responseData);

      for (const key in responseData) {
        loadedOrders.push({
          id: responseData[key].foodItemId,
          name: responseData[key].name,
          type: responseData[key].type,
          price: responseData[key].price,
          avaiable: responseData[key].avaiable,
        });
      }
      //console.log(loadedOrders);
      setOrders(loadedOrders);
      //setMeals(loadedMeals);
      //console.log(loadedOrders.avaible);
      maping();
    }

  

  const maping = () => {

    return orders.map((item, index) =>
      <div className={styles.meal} key={index}>
        <p>{item.id}</p>
        <p>{item.name}</p>
        <p>{item.type}</p>
        <p>{item.price}</p>
        <p>{item.avaiable===true? "Available":"Not Available"}</p>
        <button className={styles.deleteBtn} onClick={() => {
          fetch('http://localhost:8080/api/food/' + item.id, { method: 'DELETE' })
        }}>
          <span className={styles.adminSpan}>Delete</span>
        </button>
        {isOpen && <Popup
          content={<>
            <div className={styles.addEditInput}>

              <input className={styles.adminInput}  placeholder="Rename dish" onChange={event => {setName(event.target.value)}}></input>
              <input className={styles.adminInput} type="number" step="0.01" placeholder="Set new price" onChange={event => setPrice(event.target.value)}></input>
              <p></p>
              <select onChange= {event => setType(event.target.value) } defaultValue={'default'}> 
              <option value="default" disabled>Wybierz typ...</option>
              <option value="dania-glowne">Dania glowne</option>
              <option value="sniadania">Oferta śniadaniowa</option>
              <option value="zupy">Zupy</option>
              <option value="napoje">Napoje</option>
              <option value="desery">Desery</option>
              <option value="salatki">Sałatki</option>
              </select>

              

  
              <button className={styles.addEditBtn} onClick={() => {
                fetch('http://localhost:8080/api/food/' + item.id + '?name=' + name + '&price=' + price + '&type=' + type , { method: 'PUT' });
                
              }}>
                <span className={styles.adminSpan}>Change</span>
              </button>
              <button className={styles.addEditBtn} onClick={() => {
                fetch('http://localhost:8080/api/food/' + item.id + '?yes=ojtaktak' , { method: 'PUT' });
                
              }}>
                <span className={styles.adminSpan}>Change availability</span>
              </button>

             
            </div>
          </>}
          handleClose={togglePopup}
        />}
      </div>, this);
  };


  return (
    <div className={styles.admin}>
      <div className={styles.nav}>
        <Navbar />
      </div>
      <div className={styles.adminNav}>
        <button className={styles.btn} onClick={togglePopup}>
          <span className={styles.adminSpan}>Edit</span>
        </button>
        <button className={styles.btn} onClick={togglePopup2}>
          <span className={styles.adminSpan}>+</span>
        </button>
      </div>
      <div className={styles.menu}>
        <div className={styles.title}>Menu</div>
        {isOpen2 && <Popup
          content={<>
            <div className={styles.addEditInput}>
              <input className={styles.adminInput} placeholder="New dish" onChange={event => setName2(event.target.value)}></input>
              <input className={styles.adminInput} type="number" step="0.01" placeholder="Price" onChange={event => setPrice2(event.target.value)}></input>
              <select onChange= {event => setType2(event.target.value)}>
              <option value="dania-glowne">Dania glowne</option>
              <option value="sniadania">Oferta śniadaniowa</option>
              <option value="zupy">Zupy</option>
              <option value="napoje">Napoje</option>
              <option value="desery">Desery</option>
              <option value="salatki">Sałatki</option>

              </select>
              <button className={styles.addEditBtn} onClick={() => {
                fetch('http://localhost:8080/api/food/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },

                  body: JSON.stringify({
                    name: name2,
                    price: price2,
                    type: type2,
                    avaiable: true,
                  }),
                })
                //maping();
                console.log(JSON.stringify({
                  name: name2,
                  price: price2,
                  type: type2,
                }))
              }}>
                <span className={styles.adminSpan}>Add</span>
              </button>
            </div>
          </>}
          handleClose={togglePopup2}
        />}
        {maping()}
      </div>
    </div>
  )
}

export default AdminNavbar;

