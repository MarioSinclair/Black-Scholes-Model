import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactTyped } from 'react-typed';
import { Fade } from "react-awesome-reveal";
import './App.css';
import Custom_Button from './CustomButton.jsx'
import Tilt from 'react-parallax-tilt'

function App() {

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
    R: 0.01,
    V: 0.01
  };

  const paramMins = {
    S: 0,
    K: 0,
    T: 0,
    R: 0,
    V: 0
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
    <div className="main-container">
      <div className="main-header">
        <ReactTyped
          strings={[
            "Black-Scholes Model"
          ]}
          typeSpeed={70}
          backSpeed={100}
        />
      </div>
      <div className="main-paragraph">
        <Fade cascade damping={0.01} direction='right' triggerOnce>
          <p>The Black-Scholes-Merton (BSM) model stands as a landmark achievement in financial economics.
          It provided the first widely accepted theoretical framework for valuing European options.
          The collaborative work of Fischer Black, Myron Scholes, and Robert Merton revolutionized the way
           options were understood, traded and managed.
        </p>
        </Fade>
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
                <Custom_Button
                  name={key}
                  value={params[key]}
                  onChange={handleParamChange}
                  step={paramSteps[key]}
                  min={paramMins[key]}
                />
            </div>
          ))}
        </div>
        {optionsPrice && (
          <div className="prices">
            <Tilt
              style={{
                width: "100%",
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
      <div className='extra'>.</div>
      
    </div>
  );
}

export default App;
