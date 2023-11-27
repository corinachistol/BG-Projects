
// export function Filter( {label,value} ) {
//     console.log(label,value)
    
//     return (
//         <div>
//             <p>{label} ({value})</p>
//         </div>
//     )
// }


export function Filter( {children} ) {
    console.log(children)
    
    return (
            <span className="span">{children.label} ({children.value})</span>
    )
}