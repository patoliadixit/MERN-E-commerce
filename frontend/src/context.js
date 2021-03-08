import React, { createContext, useState, useReducer } from 'react'

const CartContext = createContext()
const initialState = { totalItems: 0, totalPrice: 0, items: [] }
const addToCart = "addToCart"

const addItemToCart = (items, item) => {
  let _items = [...items];
  let _item;
  let item_in_cart = false
  
  if (items.length == 0) {
    _item = { ...item, in_cart: 1 }
    _items = items.concat(_item)
  }

  if (items.length != 0) {
    for (let i of items) {
      if (i.id == item.id) {
        _item = { ...i, in_cart: (i.in_cart + 1) }
        _items = items.filter((j) => {
          return j != i
        })
        _items = _items.concat(_item)
        item_in_cart = !item_in_cart
        break
      }
    }
  }

  if (!item_in_cart) {
    _item = { ...item, in_cart: 1 }
    _items = items.concat(_item)
    console.log("success")
  }
  return _items
}
const reducer = (state, action) => {
  switch (action.type) {
    case addToCart:
      return {
        totalItems: state.totalItems + 1,
        totalPrice: (state.totalPrice + action.payload.product.price),
        items: addItemToCart(state.items, action.payload.product)
      }
    default:
      throw new Error
  }
}
const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => { return React.useContext(CartContext) }
export { CartContext, CartProvider }