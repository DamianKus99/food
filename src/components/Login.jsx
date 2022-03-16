import styles from '../styles/Login.module.scss';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Brands from './Brands';

export const Login = () => {
  return (
      <div className={styles.login}>
        <div className={styles.nav}>
            <Navbar />
        </div> 
        <div className={styles.container}>
            <div className={styles.title}>Login</div>
            <form action="#">
                <div className={styles.userDetails}>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Email</span>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Password</span>
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                </div>

                <div className={styles.btn}>
                    <button>
                        <span>Login</span>
                    </button>
                </div>
                <p>Not a member? <Link to="/registration" className={styles.signup}>Signup</Link></p>
            </form>
        </div>
      </div>
  )
}

export default Login;