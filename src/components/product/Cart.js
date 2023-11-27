import React from "react";
import { getCartItems } from "./api.js";
import { Product, Money, Quantity,CartItem } from "./ui.js";

export function Cart() {
  const cartItems = getCartItems()
  console.log(cartItems)

  return(
    <div className="cart">
       {/* <h2>My Shopping Cart</h2> */}
          {cartItems.map(product => {
          console.log(product)
            return <CartItem key={product.item.id} item={product.item}  >
                    <Product key={product.item.id} name={product.item.name} image={product.item.image}/>
                    <Quantity quantity={product.quantity}/>
                    <Money amount={product.cost.amount} currency={product.cost.currency}/>
            </CartItem> 
 })}     
    </div>
  )


}