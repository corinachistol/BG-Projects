import { Component,withCoordinate,withDirection } from '../game/common'
import './style.scss'

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


// const snake = {
//     dummy: "something",
//     children: [
//         { name: "head", dir: "up", coord : { top:100, left:200} }
//         { name: "tail", dir: "down", coord : { top:150, left:200} }
//     ]
//   }


 const Snake = ({data: {children}}) => {

    // console.log(children)
    return (
        <Component name ="snake">
            {
                children.map((childData,idx) => {
                    // console.log(childData)
                     return (childData.name === "head" && <SnakeHead key={`k-${idx}`} {...childData}/>) ||
                            (childData.name === "body" && <SnakeBody key={`k-${idx}`} {...childData}/>) ||
                            (childData.name === "tail" && <SnakeTail key={`k-${idx}`} {...childData}/>) 
                            
                })
            }

        </Component>
    )
}



export {Snake}

