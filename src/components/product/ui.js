import React, { useState } from "react";
import { cartItems } from "../../data/cartItems";
console.log(cartItems)

export function Product({ name, image }) {
    console.log(name)
    console.log(image)

    return (
        <div className="product">
            <h3>{name}</h3>
            <img src={image} alt={name} style={{ width: "100px" }} />
        </div>
    )
}

// export function Image({image}) {
//     console.log(image)
//     return(
//         <div className="image">
//             <img src={image} alt={Product.name} />
//         </div>
//     )
// }

export function Money({ amount, currency }) {
    console.log(amount, currency)
    return (
        <div className="money">
            <p> {amount} {currency}</p>
        </div>
    )
}


export function Quantity({quantity}){
    // console.log(quantity)

    const [changeQty, setChangeQty] = useState(quantity)
    // console.log(...cartItems)

    function handleClickQty(e) {
        console.log(e.target)
        let inner_text = e.target.innerText

        setChangeQty( (prevQty)=>{
            // console.log(prevQty)
            if(inner_text = "+"){
                const filtered = cartItems.map((item) => {
                   
                    item.quantity += prevQty
                   
                  
                        
                        
                    // return item
                })
                console.log(filtered)
            }
        } )
        
    }


    return (
        <div className="quantity">
            <button onClick={handleClickQty}>+</button>
            <p>{changeQty}</p>
            <button onClick={handleClickQty}>-</button>
        </div>
        
            )
}

// export function Quantity({ quantity }) {
//     console.log(quantity)

//     function handleClickQty(e) {
//         // console.log("button clicked")
//         // console.log(e.target)
//         if (e.target.innerText === "+") {
//             quantity++
//             cartItems.map(item => item.quantity++)

//             console.log(quantity, cartItems)
//         }
//         if (e.target.innerText === "-") {
//             quantity--
//             if (quantity < 1) {
//                 quantity = 1;
//             }
//             console.log(quantity)
//         }
//     }

//     return (
//         <div className="quantity">
//             <button onClick={handleClickQty}>+</button>
//             <p>{quantity}</p>
//             <button onClick={handleClickQty}>-</button>
//         </div>

//     )
// }


export function CartItem({ children }) {

    return (
        <div className="cart-item">
            {children}
        </div>
    )
}