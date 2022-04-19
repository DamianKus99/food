import styles from "../styles/Navbar.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";


export const AdminNavbar = (props) => {
    const [navOpen, setNavOpen] = useState(false);

  return (
      <nav className={styles.nav}>
          {/* Hamburger menu for mobile state*/}
          <div className={styles.mobileBars} onClick={ () => setNavOpen(true)}>
            <FaBars />
          </div>
          <ul className={`${navOpen ? styles.menuMobileActive : undefined} ${styles.menu}`}>
            <li className={styles.mobileFaTimes} onClick={ () => setNavOpen(false)}>
                <FaTimes />
            </li>
            <li><Link to="#" className={styles.link}>EDITaa</Link></li>
            <li><Link to="#" className={styles.link}>EDITbb</Link></li>
            <li><Link to="#" className={styles.link}>ADDcc</Link></li>
            <li><Link to="#" className={styles.link}>DELETEdd</Link></li>
          </ul>
      </nav>
  )
}

export default AdminNavbar;