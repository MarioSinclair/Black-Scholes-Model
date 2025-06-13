import React, { useEffect, useState, useRef } from "react";
import './CustomButton.css'

function Button({ min = 0, max = Infinity, step = 1, value, onChange, name}) {

    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        setInputValue(value);
    }, [value])
    
    const round2 = (num) => Number(Number(num).toFixed(2));
    const originalValueRef = useRef(value);

    const handleDecrement = () => {
        let newValue = Math.max(min, (parseFloat(inputValue) || 0) - step);
        newValue = round2(newValue)
        setInputValue(newValue);
        onChange(name, newValue);
    }

    const handleIncrement = () => {
        let newValue = Math.max(min, (parseFloat(inputValue) || 0) + step);
        newValue = round2(newValue)
        setInputValue(newValue);
        onChange(name, newValue);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            let val = parseFloat(inputValue);
            if (isNaN(val) || inputValue === "") val = originalValueRef.current;
            if (val < min) val = value;
            if (val > max) val = max;
            val = round2(val)
            setInputValue(val);
            onChange(name, val);
        }
    }

    return(
            <div className="input-container">  
                <input
                    type="number"
                    name={name}
                    value={inputValue}
                    min={min}
                    max={max}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    >
                </input>
                
                <div className="button-container">
                    <button type="button" className="inc-button" onClick={handleDecrement}>-</button>
                    <button type="button" className="dec-button" onClick={handleIncrement}>+</button>
                </div>
        </div>
    );
}

export default Button;