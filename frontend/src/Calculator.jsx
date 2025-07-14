import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Custom_Button from './CustomButton.jsx';
import Tilt from 'react-parallax-tilt';
import './Calculator.css';
import Greeks from './Greeks.jsx';

export default function Calculator() {
    
  const [params, setParams] = useState({
    S: 100,
    K: 100,
    T: 1,
    R: 0.05,
    V: 0.2
  });

  const paramSteps = {
    S: 0.01,
    K: 0.01,
    T: 0.01,
    R: 0.001,
    V: 0.01
  };

  const paramMins = {
    S: 0,
    K: 0,
    T: 0,
    R: 0,
    V: 0
  };

  const paramMaxs = {
    R: 0.1,
    V: 1,
  };

  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const paramLabels = {
    S: "Current Stock Price ($)", // Added units/symbols for clarity
    K: "Strike Price ($)",
    T: "Time to Expiration (Years)",
    R: "Risk-Free Rate",
    V: "Volatility "
  };  

  const [optionsPrice, setOptionsPrice] = useState(null);

  const fetchPrices = async () => {
    try {
      const res = await axios.post("/api/price", params);
      setOptionsPrice(res.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    } 
  };

  useEffect(() => {
    fetchPrices();
  }, [params]);

  const handleParamChange = (name, value) => {
    setParams({
      ...params,
      [name]: value
    });
  };

    return (
        <div>
          <div className="calculator-section" id='calc'>
          <div className="main-heading">
              <p>Calculator</p>
          </div>
          <div className="main-display">
              <div className="parameter-container">
                {Object.keys(params).map((key) => (
                  <div className="parameter-inner-container" key={key}>
                  <div className="label">
                      <p>
                      {paramLabels[key] || key} :
                      </p>
                  </div>
                  {['R', 'V'].includes(key) ? (
                    <div>
                      <input
                      className=" slider"
                      type="range"
                      min={paramMins[key]}
                      max={paramMaxs[key]}
                      step={paramSteps[key]}
                      value={params[key]}
                      onChange={(e) =>
                        handleParamChange(key, parseFloat(e.target.value))
                      }
                    />
                    <div className="value-display">
                      {(params[key] * 100).toFixed(1)}%
                    </div>
                    </div>
                  ) : (
                    <Custom_Button
                      name={key}
                      value={params[key]}
                      onChange={handleParamChange}
                      step={paramSteps[key]}
                      min={paramMins[key]}
                    />
                  )}
                  </div>
                ))}
              </div>
              {optionsPrice && (
                <div className="prices">
                  <Tilt
                  style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "12px",
                  }}
                  >
                  <div className="call-price">
                      Call Price: ${optionsPrice.call_price}
                  </div>
                  </Tilt>
                  <Tilt
                  style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "12px",
                  }}
                  >
                  <div className="put-price">
                      Put Price: ${optionsPrice.put_price}
                  </div>
                  </Tilt>
                </div>
              )}
            </div>
          </div>
          <Greeks params={params} />
        </div>
    )
}