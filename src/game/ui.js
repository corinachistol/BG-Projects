import { Snake } from "../snake/ui";
import { Apple,RandomComponentGenerator } from "../apple/ui";

import{useState,useEffect,useReducer} from 'react';

const reduceGameState = (state, action) => {
    // console.log(state) // state pastreaza toata structura de date "game"
    // console.log(action)

    //1.find the snake & snake index
    let snakeIdx = state.children
        .findIndex( item => item.name == 'snake')
    // console.log(snakeIdx)

    //1.b. updte the snake head direction
    if(action.direction) {
        state.children[snakeIdx].children[0].dir = action.direction
    }
    // debugger

    let head = null
    //2. compute the values
    state.children[snakeIdx].children = state.children
        .find( item => {
            // console.log(item)
            return item.name == 'snake'})
        .children
        .reverse()
        .map((item, idx, arr)=>{
            if(item.dir) {
                if (item.name === 'head'){
                
                } else if (item.name === 'body'){
                    item.dir = arr[idx+1].dir
                    // console.log('before', arr[idx+1])
                    // console.log('after', arr[idx-1])

                    // debugger

                    if (arr[idx+1].name == 'head') {
                        //3. make a ref to the head
                        head = arr[idx+1]

                        if (arr[idx+1].dir == 'left' && arr[idx-1].dir == 'up') {
                            item.dir = 'up-left'
                        }
                        if (arr[idx+1].dir == 'right' && arr[idx-1].dir == 'up') {
                            item.dir = 'up-right'
                        }
                        if (arr[idx+1].dir == 'left' && arr[idx-1].dir == 'down') {
                            item.dir = 'down-left'
                        }
                        if (arr[idx+1].dir == 'right' && arr[idx-1].dir == 'down') {
                            item.dir = 'down-right'
                        }

                        if (arr[idx+1].dir == 'down' && arr[idx-1].dir == 'right') {
                            item.dir = 'right-down'
                        }
                        if (arr[idx+1].dir == 'down' && arr[idx-1].dir == 'left') {
                            item.dir = 'left-down'
                        }
                        if (arr[idx+1].dir == 'up' && arr[idx-1].dir == 'right') {
                            item.dir = 'right-up'
                        }
                        if (arr[idx+1].dir == 'up' && arr[idx-1].dir == 'left') {
                            item.dir = 'left-up'
                        }
                       
                    }
                   
                   
                } else if (item.name === 'tail'){  
                    if(arr[idx+1] && arr[idx+1].dir !== undefined){
                       
                        // item.dir = arr[idx+1].dir
                        if(arr[idx+1].dir.includes('-')){
                            item.dir = arr[idx+1].dir
                                .replace(item.dir, '')
                                .replace('-', '')
    
                        }else{
                            item.dir = arr[idx+1].dir
                        }
                    }
                }
            }
            return item
        })
        .map( (item, idx, arr) => {
            // console.log(item)
            // console.log(arr[idx+1])
            if(item.dir) {
                // debugger
                 if (item.name === 'head'){

                    if (item.dir == 'up'){
                        item.coord.top-=20
                    }else if (item.dir == 'down'){
                        item.coord.top+=20
                    }else if (item.dir == 'right'){
                        item.coord.left+=20
                    }else if (item.dir == 'left'){
                        item.coord.left-=20
                    }
                
                } else if (item.name === 'body'){
                    item.coord = {...arr[idx+1].coord}
                } else if (item.name === 'tail' &&  arr[idx+1]){                   
                    item.coord = {...arr[idx+1].coord}
                }
            }
            return item
        }).reverse()

    // 3.b compute collision
    state.children = state.children.filter( item => {
        console.log(item)

        let result = item.name == 'snake' || !(head.coord.top - 5 <= item.coord.top && item.coord.top <= head.coord.top + 5 &&
            head.coord.left - 5 <= item.coord.left && item.coord.left <= head.coord.left +5 )

        if (!result){
            // TODO: add a new body segment

            let head = state.children[snakeIdx].children.slice(0,1)
            // console.log(head)
            let newBody = structuredClone(head)
            newBody[0].name='body'
            // console.log(newBody)

            if(item.name === 'snake'){
               state.children =  item.children.map((item)=>{
                    if(item.name === 'head'){
                        if(item.dir == 'left'){
                            head.coord.left -= 20
                        }
                        if(item.dir == 'right'){
                            head.coord.left += 20
                        }
                
                        if(item.dir == 'up'){
                            head.coord.top -= 20
                        }
                
                        if(item.dir == 'down'){
                            head.coord.top += 20
                        }

                       return head
                        

                    }
                    return item
                })
            }
            state.children[snakeIdx].children.slice(1,2,newBody)

            timerDelay -= 100
        }

        return  result

              
    })
    
    //3. clone the previous gameDAta
    let newState = structuredClone(state)

    //4. set the copy as the new state
    return newState

}

let oldHandleKeyDOwn = null
let oldTimer = null
let selectedDir = null
let timerDelay = 500

//game component
export const Game = ({ data, data: {children} }) => {
    // console.log(children)
   
    // let [apples,setApples] = useState([children[1]])
    // console.log(apples) // obiectul apples cu coord

    let [state,dispatch] = useReducer(reduceGameState, data )

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowRight" : 
                selectedDir = 'right' 
            break
            case "ArrowLeft" : 
                selectedDir =  'left'             
            break
            case "ArrowUp" : 
                selectedDir =  'up'
            break
            case "ArrowDown" : 
                selectedDir =  'down' 
            break
        }
    }

    // const randInt = (min=0, max=1) => {
    //     return Math.floor( Math.random() * (max-min) + min )
    // }

    useEffect(()=>{
        if(oldTimer !== null){
            clearTimeout(oldTimer)
        }
        oldTimer = setTimeout(()=>{
          dispatch({ direction: selectedDir })
          selectedDir = null
        },timerDelay)
        if(oldHandleKeyDOwn !== null ){
            document.body.removeEventListener('keydown', oldHandleKeyDOwn)    
        }
       
        document.body.addEventListener('keydown', handleKeyDown)
        oldHandleKeyDOwn = handleKeyDown

    
    })

    


   
    return (
        <div className="game" >
           {
            state.children.map((childData,idx)=>{
                // console.log(childData.quantity)
                switch(childData.name){
                    case "snake":
                        return <Snake
                                key={`k-${idx}`}
                                data={childData}
                    />     
                    
                    case "apple": 
                        
                        return <Apple
                                key={`k-${idx}`}
                                {...childData}
                    />
                    

                }
                
            })
           }
        </div>
    )
}




//HW2 : random add more apples
//HW3: randomly add more coins,
//HW4: compute the score (improvise), conditions of game over
//HW5: if game over -stop the timer- print a message , add a button to restart the game
//HW6: backend node js
//HW7: when the game starts -> ask for a player name
//HW8: when is game over -> add the name + score in the database
//HW9: using React Router -> make 3 pages:
                            // 1. page with form where you get the name of the player -> db
                            //2. page with the game -> db
                            //3. page with all the  scores (sorted descending)
