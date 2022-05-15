import styles from '../styles/Registration.module.scss';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";




function Registration() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')
const history = useHistory();
const [badLogin, setBadLogin] = useState(false)
  return (
    <div className={styles.login}>
        <div className={styles.nav}>
            <Navbar />
        </div>  
        <div className={styles.container}>
            <div className={styles.title}>Rejestracja</div>
            
            <form action="#">
                <div className={styles.userDetails}>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Nazwisko</span>
                        <input type="text" placeholder="Wpisz swoje nazwisko" required value={name} onChange={event => setName(event.target.value)}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Email</span>
                        <input type="email" placeholder="Wpisz swój email" required value={email} onChange={event => setEmail(event.target.value)}
                        />
                    </div>    
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Hasło</span>
                        <input type="password" placeholder="Wpisz swoje hasło" required value={password} onChange={event => setPassword(event.target.value)}
                         />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Potwierdz hasło</span>
                        <input type="password" placeholder="Potwierdz swoje hasło" required value={password2} onChange={event => setPassword2(event.target.value)} 
                        />
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

                    } ) 
                    
                    
                    history.push("/login")
                } 
                else{
                    setEmail("")
                    setPassword("")
                    setPassword2("")
                    setName("")

                }
                        
                
                }

                     }>
                        <span>Zarejestruj się</span>
                    </button>
                </div>
            </form>

        </div>
      </div>
  )
}

export default Registration