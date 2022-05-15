import styles from '../styles/Login.module.scss';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Brands from './Brands';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ReactSession }  from 'react-client-session';




export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [badLogin, setBadLogin] = useState(false)
    const history = useHistory(); 
        var path;
        const routeChange = (arg) =>{ 
          if(arg==="USER"){
              path = "/menu"; 
          }
          else if(arg==="COOK"){
              path = "/kitchen"
          }
          else if(arg==="ADMIN"){
              path = "/admin"
          }
          history.push(path);
        }
        const togglePopup = () => {
            setBadLogin(false);
          }
          const togglePopup2 = () => {
            setBadLogin(true);
          }
          
  return (
      <div className={styles.login}>
        <div className={styles.nav}>
            <Navbar />
        </div> 
        <div className={styles.container}>
            <div className={styles.title}>Logowanie</div>
            {badLogin && <p className={styles.loginError}>Zły login i hasło</p>}
                <div className={styles.userDetails}>
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
                </div>

                <div className={styles.btn}>
                    <button onClick={ async () => { const response = await fetch('https://pr-2022-api.herokuapp.com/api/v1/user/log-in/?email=' + email + '&password=' + password ,)
                    const responseData = await response.json();
                   
                    
                    console.log(responseData)
                    //console.log('https://pr-2022-api.herokuapp.com/api/v1/user/log-in/?email=' + email + '&password=' + password )
                    if(!response.ok)
                    {

                        setEmail(()=>'')
                        setPassword(()=>'')
                        ReactSession.set("username", "");
                        ReactSession.set("rola", ""); 
                       
                        console.log("NIE OK")
                        
                       togglePopup2()                        
                        
                    }                  
                    else {
                        ReactSession.set("username", responseData.email);
                        ReactSession.set("rola", responseData.appUserRole);
                        togglePopup();

                        console.log("OK")
                        
                    }
                    console.log(responseData.appUserRole)
                    
                    {routeChange(responseData.appUserRole)}
                    
                
                }                  
                    } 
                    >
                        <span>Zaloguj się</span>
                    </button>
                </div>
                <p>Nie jesteś członkiem? <Link to="/registration" className={styles.signup}>Zarejestruj się</Link></p>
            
        </div>
      </div>
  )
}

export default Login;