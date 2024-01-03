//contains helper functions

const randInt = (min=0, max=1) => {
    return Math.floor( Math.random() * (max-min) + min )
}

const randColor = ({
        redish = 1,
        greenish = 1,
        blueish = 1
    }={}) => {

    let red = randInt(0,255 * redish)
    let green = randInt(0,255 * greenish)
    let blue = randInt(0,255 * blueish)

    return `rgb(${red}, ${green}, ${blue})`
}

const randFloat = (value) =>{
    return value * Math.random()
}





export {randInt,randColor,randFloat}
