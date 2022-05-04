import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from '../../../../styles/Order.module/Meals.module/MealItem.module/MealItem.module.scss';
import CartContext from '../../../../store/CartContext';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      type: props.type,
    });
  };

  return (
    <li className={classes.meal}>
      <div className={classes.item}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div className={classes.description}>{props.type}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
