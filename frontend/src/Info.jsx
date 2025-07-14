import './Info.css';

export default function Info() {
    return (
        <div className='info-section' id='info'>
            <div className="paragraph">
                <div className="main-heading">
                    <p>Key Assumptions</p>
                </div>  
                <p>
                    The elegance and closed-form solution of the BSM model are achieved through a set of simplifying
                    assumptions about asset price behavior and market characteristics. 
                </p>
                <br />
                <p>Asset Price Behavior:</p>
                <ul>
                    <li>The asset price changes are random and continuous (no jumps).</li>
                    <li>The asset returns are assumed to be normally distributed when continuously compounded.</li>
                    <li>The volatility of the asset is known and remains constant throughout the life of the option.</li>
                </ul>
                <p>Market Characteristics:</p>
                <ul>
                    <li>The risk-free interest rate (r) is known and constant over the option's life.</li>
                    <li>No transaction costs or taxes.</li>
                    <li>Perfect liquidity and continuous trading.</li>
                    <li>No risk-free arbitrage opportunities exist.</li>
                </ul>
                <p>Option Characteristics:</p>
                <ul>
                    <li>The option can only be exercised at its expiration date (European Options).</li>
                    <li>The underlying asset pays no dividends during the life of the option.</li>
                </ul>
            </div>

        </div>
    )
}