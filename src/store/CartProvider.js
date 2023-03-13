import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // check if item type (sushi vs schitzel vs barbeque bowl etc...) is already in the state.items list
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItems = [...state.items];

    if (!(existingItemIndex + 1 === 0)) {
      updatedItems[existingItemIndex].amount =
        updatedItems[existingItemIndex].amount + action.item.amount;
    } else {
      updatedItems = updatedItems.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE_ITEM') {
    //
    let updatedItems = [...state.items];
    let updatedItem = updatedItems.find((item) => item.id === action.id);
    updatedItem.amount = updatedItem.amount - 1;

    const updatedTotalAmount = state.totalAmount - updatedItem.price;

    updatedItems = updatedItems.filter((item) => item.amount > 0);

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
