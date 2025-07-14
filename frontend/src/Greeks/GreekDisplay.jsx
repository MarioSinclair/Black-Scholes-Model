import React from "react"
import './GreekDisplay.css'
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function GreekDisplay(props) {

    const data = {
        "delta": "Delta measures the rate of change of an option's price with respect to a $1 change in the price of the underlying asset.",
        "gamma": "Gamma measures the rate of change of an option's Delta with respect to a $1 change in the price of the underlying asset.",
        "vega": "Vega measures the rate of change of an option's price with respect to a 1% change in the implied volatility of the underlying asset. **and yes Vega is not actually a Greek letter**",
        "theta": "Theta measures the rate of change of an option's price with respect to the passage of time. It is the decrease in value per day as the option approaches its expiration.",
        "rho": "Rho measures the rate of change of an option's price with respec to a 1% (100 basis point) change in the risk-free interest rate.",
    }

    return (
        <div className="greek-value-container">
            <div className="css-tooltip">
                <div className="greek-name">
                    {props.name}
                    <span className="info-icon" data={data[props.name.toLowerCase()]}><AiOutlineInfoCircle /></span>
                </div>
            </div>
            <div className={(props.value < 0) ? 'negative-greek' : 'positive-greek'}>{props.value}</div>
        </div>
    )
}