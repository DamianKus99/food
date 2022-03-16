import styles from '../styles/Registration.module.scss';
import Navbar from './Navbar';

function Registration() {
  return (
    <div className={styles.login}>
        <div className={styles.nav}>
            <Navbar />
        </div>  
        <div className={styles.container}>
            <div className={styles.title}>Registration</div>
            <form action="#">
                <div className={styles.userDetails}>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Full Name</span>
                        <input type="text" placeholder="Enter your name" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>User Name</span>
                        <input type="text" placeholder="Enter your user name" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Email</span>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Phone Number</span>
                        <input type="tel" placeholder="Enter your number" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Password</span>
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Confirm Password</span>
                        <input type="password" placeholder="Confirm your password" required />
                    </div>
                </div>

                <div className={styles.genderDetails}>
                    <input type="radio" name="gender" id={styles.dot1} />
                    <input type="radio" name="gender" id={styles.dot2} />
                    <input type="radio" name="gender" id={styles.dot3} />
                    <span className={styles.genderTitle}>Gender</span>
                    <div className={styles.category}>
                        <label htmlFor={styles.dot1}>
                            <span className={`${styles.dot} ${styles.one}`}></span>
                            <span className={styles.gender}>Male</span>
                        </label>
                        <label htmlFor={styles.dot2}>
                            <span className={`${styles.dot} ${styles.two}`}></span>
                            <span className={styles.gender}>Female</span>
                        </label>
                        <label htmlFor={styles.dot3}>
                            <span className={`${styles.dot} ${styles.three}`}></span>
                            <span className={styles.gender}>Prefer not to say</span>
                        </label>
                    </div>
                </div>

                <div className={styles.btn}>
                    <button>
                        <span>Register</span>
                    </button>
                </div>
            </form>

        </div>
      </div>
  )
}

export default Registration