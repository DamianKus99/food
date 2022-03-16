import classes from '../../../styles/Order.module/UI.module/Card.module.scss';

const Card = props => {
  return <div className={classes.card}>{props.children}</div>
};

export default Card;