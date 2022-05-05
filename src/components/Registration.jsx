import styles from '../styles/Registration.module.scss';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';




function Registration() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')
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
                        <span className={styles.details}>Nazwisko</span>
                        <input type="text" placeholder="Enter your user name" required onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Email</span>
                        <input type="email" placeholder="Enter your email" required onChange={event => setEmail(event.target.value)}/>
                    </div>    
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Password</span>
                        <input type="password" placeholder="Enter your password" required onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Confirm Password</span>
                        <input type="password" placeholder="Confirm your password" required onChange={event => setPassword2(event.target.value)} />
                    </div>
                </div>

                

                <div className={styles.btn}>
                    <button onClick={ () =>
                        {if(password===password2){
                     fetch('https://pr-2022-api.herokuapp.com/api/v1/user/registration', {
                        method: 'POST',
                        headers: new Headers({'Content-Type': 'application/json'}),
                        body: JSON.stringify({
                        surname: name,
                        email: email,
                        password: password,
                        appUserRole: "USER",
                  
                          
                        }),

                    } )  } 
                
                }
                     }>
                        <span>Register</span>
                    </button>
                </div>
            </form>

        </div>
      </div>
  )
}

export default Registration