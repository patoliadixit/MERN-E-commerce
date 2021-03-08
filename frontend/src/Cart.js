import React from 'react'
import { useCartContext } from './context'
function Cart() {
  const [state, dispatch] = useCartContext()
  let items = state.items
  return (
    <div>
      {items.length ? "Cart " : "Cart is Empty"}
      {items.map((item) => <div key={item.id}>{item.title}":::::"{item.in_cart}</div>)}
    </div>
  )
}

export default Cart
