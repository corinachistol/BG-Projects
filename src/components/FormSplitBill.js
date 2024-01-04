import { useState } from "react"
import { Button } from "./Button"
export function FormSplitBill({selectedFriend, onSplitBill}) {

    const [bill,setBill] = useState("")
    const [paidByUser,setPaidByUSer] = useState("")
    const paidByFriend = bill ? bill - paidByUser : ""
    const [whoIsPaying,setWhoIsPaying] = useState('user')

    function handleSubmit(e) {
        e.preventDefault()

        if(!bill || !paidByUser) return
        onSplitBill(whoIsPaying === "user" ?  paidByFriend : -paidByUser)
    }
    
    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>
            <label>💰Bill Value</label>
            <input 
                type="text" 
                onChange={e=>setBill(Number(e.target.value))}
                value={bill}  />

            <label>Your expenses</label>
            <input 
                type="text" 
                onChange={e=>setPaidByUSer(
                    Number(e.target.value) > bill ? paidByUser :
                    Number(e.target.value))}
                value={paidByUser} />

            <label>👩🏼‍🤝‍🧑🏼{selectedFriend.name} expenses</label>
            <input 
                type="text"
                disabled value={paidByFriend} />


            <label>Who is paying the bill?</label>
            <select 
                onChange={e=>setWhoIsPaying(e.target.value)}
                value={whoIsPaying}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>
            
            <Button>Split bill</Button>

        </form>
    )
}