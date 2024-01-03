import './style.scss';


const Flake = ({ 
        size = 0,
        speed = 0,
        color = 0,
        top = 0,
        left = 0,
       
    }) => {
    
    const style = {
        '--size': `${size}px`,
        '--color': color,
        '--top': `${top}%`,
        '--left': `${left}%`,
       
    }    
    
    return (
        <div 
            style={style}
            className="flake"
        >

        </div>
    )
}

export default Flake