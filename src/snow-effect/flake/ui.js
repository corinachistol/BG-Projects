import { useEffect, useState } from 'react'
import './flake.css'

const Component = ({name}) => {

    return (
        <div className={name}></div>
    )
}

//decorator
const withCoordinates = (Component) => {
    return ({top,left, speed, ...props}) => {
        return (
            <div style={{top:`${top}px`, left:`${left}px`, speed:`${speed}`, position:'relative'}}>
                <Component {...props} />
            </div>
        )
    }
}
const Flake = withCoordinates(Component)


const Snowfall = () => {

    const [count,setCount] = useState()


    useEffect(()=> {
        const intervalId = setInterval(()=>{
            setCount(count+1)
        },500)
        return () => clearInterval(intervalId)
    },[])

    function randCoord (min,max) {
        return Math.floor(min + (max-min) * Math.random())
    }
    function randFloat (value) {
        return value * Math.random()
    }

    return (
            <Flake top={randCoord(0,window.innerHeight)} 
                    left={randCoord(0,window.innerWidth)} 
                    name="flake"
                    speed={randFloat(10)} />
    )
}

export {Snowfall}

