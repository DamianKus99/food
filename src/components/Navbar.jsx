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
              <span className={styles.logo}>KelnerJo</span>
          </div>
          {/* Hamburger menu for mobile state*/}
          <div className={styles.mobileBars} onClick={ () => setNavOpen(true)}>
            <FaBars />
          </div>
          <ul className={`${navOpen ? styles.menuMobileActive : undefined} ${styles.menu}`}>
            <li className={styles.mobileFaTimes} onClick={ () => setNavOpen(false)}>
                <FaTimes />
            </li>
            <li><Link to="/" className={styles.link}>{(ReactSession.get("rola")==="COOK")? null : <p className={styles.link}>Strona główna</p>}</Link></li>
            <li><Link to="/menu" className={styles.link}>{(ReactSession.get("rola")==="COOK")? null : <p className={styles.link}>Menu</p>}</Link></li> 
            <li><Link to="/reservation" className={styles.link}>{(ReactSession.get("rola")==="COOK")? null : <p className={styles.link}>Rezerwacje</p>}</Link></li>
            <li><Link to="/login" className={styles.link}>{(ReactSession.get("rola")==="COOK" || ReactSession.get("rola")==="ADMIN" || ReactSession.get("rola")==="USER" ) ?  null: <p className={styles.link}>Logowanie</p>}</Link></li>   
            <li><Link to="#" className={styles.link}>{ReactSession.get("rola")==="COOK"?  null :  <HeaderCartButton onClick={props.onShowCart}/> }</Link></li>
            <li><Link to="/admin" className={styles.link}>{ReactSession.get("rola")==="ADMIN"? <p className={styles.link}>Admin</p>: null}</Link></li>
            <li><Link to="/kitchen" className={styles.link}>{ReactSession.get("rola")==="COOK"? <p className={styles.link}>Kucharz</p>: null}</Link></li>
            
            <li><p className={styles.link2}>{username}</p></li>
            <li className={styles.link} onClick={ ()=> {ReactSession.set("username","");ReactSession.set("rola",""); window.location.reload();} }><Link to="/login"> {ReactSession.get("username")? <p className={styles.link}>Wyloguj</p>: <p></p> }</Link></li>
          </ul>
      </nav>
  )
}

export default Navbar;