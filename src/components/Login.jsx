import styles from '../styles/Login.module.scss';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Brands from './Brands';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ReactSession }  from 'react-client-session';




export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

          
  return (
      <div className={styles.login}>
        <div className={styles.nav}>
            <Navbar />
        </div> 
        <div className={styles.container}>
            <div className={styles.title}>Login</div>
            
                <div className={styles.userDetails}>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Email</span>
                        <input type="email" placeholder="Enter your email" required onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.details}>Password</span>
                        <input type="password" placeholder="Enter your password" required onChange={event => setPassword(event.target.value)}/>
                    </div>
                </div>

                <div className={styles.btn}>
                    <button onClick={ async () => { const response = await fetch('https://pr-2022-api.herokuapp.com/api/v1/user/log-in/?email=' + email + '&password=' + password ,)
                    const responseData = await response.json();

                    console.log(responseData)
                    //console.log('https://pr-2022-api.herokuapp.com/api/v1/user/log-in/?email=' + email + '&password=' + password )
      
                    ReactSession.set("username", responseData.email);
                    console.log(responseData.appUserRole)
                    
                    {routeChange(responseData.appUserRole)}
                    
                
                }                   
                    } 
                    >
                        <span>Login</span>
                    </button>
                </div>
                <p>Not a member? <Link to="/registration" className={styles.signup}>Signup</Link></p>
            
        </div>
      </div>
  )
}

export default Login;