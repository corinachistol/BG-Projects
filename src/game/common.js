
//common component
export const Component = ({name, children}) => {

    return (
        <div className={name}>
            {children}
        </div>
    )
}



// decorator 
export const withCoordinate = (Component) => {

    return ({coord:{top,left}, ...props}) => {

        return (
        <div style={{top:`${top}px`, left:`${left}px`,position:'absolute'}}>
            <Component {...props} />
        </div>
        )
    }
}


export const withDirection = (Component ) => {
    
    return  ({dir, ...props}) => {

        return (
            <div className={`dir-${dir}`}>
                <Component {...props} />
            </div>
        )
    }
}
