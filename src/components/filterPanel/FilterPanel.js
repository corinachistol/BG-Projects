import { labelList } from "../../data/labelsList";
import { getFilters } from "./api";
import { Filter } from "./ui";

export function FilterPanel() {
    const filterList = getFilters()
    console.log(filterList)

    // return (
    //     <ul>
    //         { filterList.map( item => {
    //             return <li key={item.id} >
    //                 <Filter  label={item.label} value={item.value} />
    //             </li>
    //         } ) }
    //     </ul>
        
    // )

    // return (
    //     <ul>
    //         { filterList.map( item => {
    //             return <li key={item.id} className="list">
    //               <input type="checkbox" /> <Filter  children={item} />
    //             </li>
    //         } ) }
    //     </ul>
        
    // )
    
    return (
        <div className="container-filter">    
            { filterList.map( item => {
                return <label className="label">
                    <input type="checkbox" className="input"/><Filter  children={item} />
                </label> 
            
            } ) }
        </div> 
    )
}