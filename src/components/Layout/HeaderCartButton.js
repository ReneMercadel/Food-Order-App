import React, { useState, useContext, useEffect } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const [buttonBump, setButtonBump] = useState(false);

  console.log('cartContext', cartContext);

  const numberOfCartItems = cartContext.items.reduce((totalItems, item) => {
    return totalItems + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setButtonBump(true);

    const timer = setTimeout(
      () => {
        setButtonBump(false);
      },
      300,
      'minus'
    );
    console.log(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
