import { useState,useEffect } from 'react';
import './style.scss';
import Flake from '../flake/component';
import {randColor, randInt,randFloat} from '../../helpers/generators'

const Snow = ({quantity}) => {
    // let scale = randFloat(0.7)
    // console.log(scale)

    // let color= randColor({redish: 0.1, greenish: 0.1, blueish: 0.6} )
    let color ='rgb(153, 204, 255)'

        
    let [flakes,setFlakes] = useState([
        <Flake key={1} size={10} top={0} color={color}/>,
        <Flake key={2} speed={10} size={10} top={0} left={50} color={color}/>,
    ])

    const TOP_LIMIT = 90
    // const FLAKE_COUNT_LIMIT = 50

    //HW1*:
        //make it more realistic:
        //- speed
        //- delay. top
        // - size
        // - color

    useEffect(()=>{
        setTimeout(() => {
                setFlakes(
                    
                    [
                        ...flakes,
                        ...new Array(quantity - flakes.length)
                            .fill()
                            .map(()=> <Flake 
                                key={1}
                                size={randInt(15,30)}
                                speed={randInt(1,5)}
                                top={randInt(-10, 20)}
                                left={randInt(0,100)}
                                color={color} />
                            )
                    ]
                        .filter(
                            flake => flake.props.top < TOP_LIMIT)
                        .map(
                            flake=> <Flake {...flake.props} 
                                top={flake.props.top + flake.props.speed * 0.1}
                                // speed={scale}
                               />
                        )
                )
        }, 30);
    },[flakes])


    //varianta fara destructurizare
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setFlakes( flakes
    //             .filter( flake=> flake.props.top < TOP_LIMIT )
    //             .map(flake=> 
    //                     <Flake 
    //                         key={flake.props.key} 
    //                         size={flake.props.size} 
    //                         top={flake.props.top + 5} 
    //                         left={flake.props.left} 
    //                         color={flake.props.color}/>
    //             )
    //         )
    //     },500)
    // })

    return(
       flakes
        
    )
}

export default Snow