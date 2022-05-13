import styles from "../styles/Navbar.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCartButton from "./Order/Layout/HeaderCartButton";
import { Row, Col, Button } from "reactstrap";
import { ReactSession }  from 'react-client-session';

export const Navbar = (props) => {
    const [navOpen, setNavOpen] = useState(false);
    const username = ReactSession.get("username");

  return (
      <nav className={styles.nav}>
          <div className={styles.logoContainer}>
              <span className={styles.logo}>Restauracja</span>
          </div>
          {/* Hamburger menu for mobile state*/}
          <div className={styles.mobileBars} onClick={ () => setNavOpen(true)}>
            <FaBars />
          </div>
          <ul className={`${navOpen ? styles.menuMobileActive : undefined} ${styles.menu}`}>
            <li className={styles.mobileFaTimes} onClick={ () => setNavOpen(false)}>
                <FaTimes />
            </li>
            <li><Link to="/" className={styles.link}>{(ReactSession.get("rola")===""||ReactSession.get("rola")==="USER")? <p className={styles.link}>Rezerwacje</p>: <p></p>}</Link></li>
            <li><Link to="/menu" className={styles.link}>{(ReactSession.get("rola")===""||ReactSession.get("rola")==="USER")? <p className={styles.link}>Menu</p>: <p></p>}</Link></li>
            
            <li><Link to="/reservation" className={styles.link}>{(ReactSession.get("rola")===""||ReactSession.get("rola")==="USER")? <p className={styles.link}>Rezerwacje</p>: <p></p>}</Link></li>
            <li><Link to="/login" className={styles.link}>{ReactSession.get("rola")===""? <p className={styles.link}>Logowanie</p>: <p></p>}</Link></li>   
            <li><Link to="#" className={styles.link}><HeaderCartButton onClick={props.onShowCart} /></Link></li>
            <li><Link to="/admin" className={styles.link}>{ReactSession.get("rola")==="ADMIN"? <p className={styles.link}>Admin</p>: <p></p>}</Link></li>
            <li><Link to="/kitchen" className={styles.link}>{ReactSession.get("rola")==="COOK"? <p className={styles.link}>Kucharz</p>: <p></p>}</Link></li>

            <li className={styles.link}>{username}</li>
            <li className={styles.link} onClick={ ()=> {ReactSession.set("username","");ReactSession.set("rola",""); window.location.reload();} }><Link to="/login"> {ReactSession.get("username")? <p className={styles.link}>Wyloguj</p>: <p></p> }</Link></li>
          </ul>
      </nav>
  )
}

export default Navbar;