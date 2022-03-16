import styles from "../styles/Navbar.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCartButton from "./Order/Layout/HeaderCartButton";

export const Navbar = (props) => {
    const [navOpen, setNavOpen] = useState(false);

  return (
      <nav className={styles.nav}>
          <div className={styles.logoContainer}>
              <span className={styles.logo}>Restaurant</span>
          </div>
          {/* Hamburger menu for mobile state*/}
          <div className={styles.mobileBars} onClick={ () => setNavOpen(true)}>
            <FaBars />
          </div>
          <ul className={`${navOpen ? styles.menuMobileActive : undefined} ${styles.menu}`}>
            <li className={styles.mobileFaTimes} onClick={ () => setNavOpen(false)}>
                <FaTimes />
            </li>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/menu" className={styles.link}>Menu</Link></li>
            <li><Link to="/reservation" className={styles.link}>Reservation</Link></li>
            <li><Link to="/more" className={styles.link}>More</Link></li>
            <li><Link to="/login" className={styles.link}>Login</Link></li>
            <li><Link to="/kitchen" className={styles.link}>Kitchen</Link></li>
            <li><Link to="#" className={styles.link}><HeaderCartButton onClick={props.onShowCart} /></Link></li>
          </ul>
      </nav>
  )
}

export default Navbar;