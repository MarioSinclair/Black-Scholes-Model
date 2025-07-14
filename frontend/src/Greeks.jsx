import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GreeksVisualizer from './Charts'
import GreekDisplay from './Greeks/GreekDisplay'
import './Greeks.css'

export default function Greeks({ params }) {

  const [optionType, setOptionType] = useState('call');
  const [greeks, setGreeks] = useState(null);

  useEffect(() => {
    const getGreeks = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/greeks', {
          ...params,
          option_type: optionType,
        });
        setGreeks(res.data.greeks);
      } catch (err) {
        console.error('Error fetching greeks:', err);
      }
    };
    getGreeks();
  }, [params, optionType]);

  return (
    <div className="greeks-container">
      <div className="greeks-inner-container">
        <div className="greeks-heading-container">
          <p className='greeks-heading'>The Greeks</p>
          <p className="greek-text">
          The "Greeks" are a set of risk characteristics that an options position entails. They are derived as the partial derivatives of the option pricing model with respect to each parameter.
          </p>
        </div>
        <div className="greeks-button-container">
          <div className="greeks-button">
            <button className={optionType === 'call' ? 'active-call-btn' : 'inactive-call-btn'} onClick={() => setOptionType('call')}>
              Call
            </button>
              <button className={optionType === 'put' ? 'active-put-btn' : 'inactive-put-btn'} onClick={() => setOptionType('put')}>
              Put
            </button>
          </div>
        </div>

        {greeks && (
          <div className="greeks-list">
            <GreekDisplay name="Delta" value={greeks.delta.toFixed(4)} />
            <GreekDisplay name="Gamma" value={greeks.gamma.toFixed(4)} />
            <GreekDisplay name="Vega" value={greeks.vega.toFixed(4)} />
            <GreekDisplay name="Theta" value={greeks.theta.toFixed(4)} />
            <GreekDisplay name="Rho" value={greeks.rho.toFixed(4)} />
          </div>
        )}
      </div>
      <GreeksVisualizer />
    </div>
    
  );
}


