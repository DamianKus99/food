import "./styles/App.scss";
import { Home } from "./components/Home";
import { Brands } from "./components/Brands";
import { OrderStatus } from "./components/OrderStatus";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Header from "./components/Order/Layout/Header";
import Meals from "./components/Order/Meals/Meals";
import Cart from "./components/Order/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Navbar from "./components/Navbar";
import styles from './styles/Order.module/Layout.module/Header.module.scss';
import axios from "axios";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  
  return (
    <Router>
		<div className="App">
			<Switch>
				<Route exact path="/"> 
					<Home /> 
              		<Brands />
				</Route>
				<Route exact path="/menu">
					<CartProvider>
						{cartIsShown && <Cart onClose={hideCartHandler} />}
						<div className={styles.menu}>
      						<div className={styles.nav}>
								<Navbar onShowCart={showCartHandler} />
							</div>
						</div>
						<Meals />
					</CartProvider>
					<Brands />
				</Route>
				<Route path="/login">
					<Login />
					<Brands />
				</Route>
				<Route path="/registration"> 
					<Registration />
					<Brands />
				</Route>
				<Route path="/kitchen"> 
					<OrderStatus />
					<Brands></Brands>
				</Route>
			</Switch>
		</div>
	</Router>
  );
}

export default App;
