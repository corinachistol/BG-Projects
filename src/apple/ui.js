import { Component, withCoordinate } from "../game/common";
import './style.scss'

export const Apple = withCoordinate(Component)


const randInt = (min=0, max=1) => {
    return Math.floor( Math.random() * (max-min) + min )
}

const randomNumber = Math.floor(Math.random()*10 ) +1
const components = Array.from({length: randomNumber}, (_,index)=>{
    <Apple key={index} top={randInt(0,300)} left={randInt(0,300)} />
})
console.log(components)



// const randomNumber = Math.floor(Math.random()*10 ) +1
// let randomApples = new Array(randomNumber).fill().map(()=>{
//     <Apple key={1} top={randInt(0,300)} left={randInt(0,300)} />
// })
// console.log(randomApples)