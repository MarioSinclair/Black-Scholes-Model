import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Custom_Button from './CustomButton.jsx'
import Tilt from 'react-parallax-tilt'
import { motion } from "motion/react";
import './Calculator.css';

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
      <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{once: true, amount: 0.3}}
        >
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
      </motion.div>  
    )
}