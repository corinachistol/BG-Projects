// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: false },
//     { id: 3, description: "Charger", quantity: 12, packed: true },
//   ];

import { useState } from "react"
import  Item  from "./Item";

export default function PackingList({items,onDeleteItems, onToggleItem, onClearList}) {

    const [sortby,setSortby] = useState('input')

    let sortedItems;
    if(sortby==='input') sortedItems = items;

    if(sortby==='description') sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description));

    if(sortby === 'packed') sortedItems = items.slice().sort((a,b)=>Number(a.packed) - Number(b.packed));

    return(
        <div className="list">
            <ul >
                {sortedItems.map( item=> {
                    return <Item item={item} 
                                key={item.id} 
                                onDeleteItems={onDeleteItems} 
                                onToggleItem={onToggleItem}/>
                } )}
            </ul>

            <div className="actions">
                <select value={sortby} onChange={e=>setSortby(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear the list</button>
            </div>

        </div>

    )
}

