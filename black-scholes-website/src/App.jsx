import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [params, setParams] = useState({
    S: 100,
    K: 100,
    T: 1,
    V: 0.2,
    R: 0.05
  });
  
  const paramLabels = {
    S: "Current Stock Price ($)", // Added units/symbols for clarity
    K: "Strike Price ($)",
    T: "Time to Expiration (Years)",
    R: "Risk-Free Rate (%)",
    V: "Volatility (%)"
  };  

  const [optionsPrice, setOptionsPrice] = useState(null);

  const fetchPrices = async () => {
    try {
      const res = await axios.post("http://localhost:8000/price", params);
      setOptionsPrice(res.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [params]);

  const handleParamChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  return (
    <div className="main-container">
      
      <div className="main-header">
        <h1>Black Scholes Options Pricer</h1>
      </div>
      <div className="main-display">
        <div className="input-container">
          {Object.keys(params).map((key) => (
            <div className="input-inner-container" key={key}>
              <div className="label">
                <p>
                  {paramLabels[key] || key} :
                </p>
              </div>
              <div className="input">
                <input
                  id={key} 
                  className='input-but'
                  type="number"
                  name={key}
                  value={params[key]}
                  onChange={handleParamChange}
                />
              </div>
            </div>
          ))}
        </div>
        {optionsPrice && (
          <div className="prices">
            <div className="call-price">
              <p>Call Price: ${optionsPrice.call_price}</p>
            </div>
            <div className="put-price">
              <p>Put Price: ${optionsPrice.put_price}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
