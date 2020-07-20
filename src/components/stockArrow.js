import React, {useState, useEffect} from 'react'

const StockArrow = (props) => {
    const [ colorChange, setColorChange] = useState('green')
    const [ positive, setPositive] = useState('+')
    const [ directionUp, setDirectionUp] = useState(true);

    useEffect(() => {
        console.log("this is dollarChange", props.dollarChange)
        if(props.dollarChange > 0) {
            setColorChange('green');
            setPositive('+');
            setDirectionUp(true)
        } else {
            setColorChange('red');
            setPositive('');
            setDirectionUp(false)
        }
    }, [])
    
    return (
        <div style={{color: colorChange, textAlign: "center"}}>
            <span>
                {positive + props.dollarChange.toFixed(2)}
            <br></br>
                {'(' + props.percentageChange.toFixed(2) + '%' + ') '} 
                {directionUp ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
            </span>
        </div>
    )
}

export default StockArrow;