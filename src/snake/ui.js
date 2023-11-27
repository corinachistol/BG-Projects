import './style.scss'

//common components
const Component = ({name, children}) => {

    return (
        <div className={name}>
            {children}
        </div>
    )
}



// decorator 
const withCoordinate = (Component) => {

    return ({coord:{top,left}, ...props}) => {

        return (
        <div style={{top:`${top}px`, left:`${left}px`,position:'absolute'}}>
            <Component {...props} />
        </div>
        )
    }
}

const withDirection = (Component ) => {
    
    return  ({dir, ...props}) => {

        return (
            <div className={`dir-${dir}`}>
                <Component {...props} />
            </div>
        )
    }
}





//SNAKE PARTS

const SnakeHead = withCoordinate(
    withDirection(
        Component
    )
)

const SnakeBody = withCoordinate(
    withDirection(
        Component
    )
)

const SnakeTail = withCoordinate(
    withDirection(
        Component
    )
)


const Snake = ({data: {children}}) => {
    console.log(children)
    return (
        <Component name ="snake">
            {/* <SnakeHead top={100} left={200} name='head' dir="up" />
            <SnakeTail top={150} left={200} name='tail' dir="down"/> */}
            {
                children.map((childData,idx) => {
                    console.log(childData)
                     return (childData.name === "head" && <SnakeHead key={`k-${idx}`} {...childData}/>) ||
                            (childData.name === "body" && <SnakeBody key={`k-${idx}`} {...childData}/>) ||
                            (childData.name === "tail" && <SnakeTail key={`k-${idx}`} {...childData}/>) 
                            
                })
            }

        </Component>
    )
}






export {Snake}


//HW1: make sure you add the BODY Component

