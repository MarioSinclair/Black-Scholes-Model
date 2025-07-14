import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GreeksRechart from './GreeksChart';

export default function GreeksVisualizer() {
  const [greek, setGreek] = useState("delta");
  const [param, setParam] = useState("S");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://black-scholes-model-uhsp.onrender.com/api/greeks-plot?param=${param}`)
      .then((res) => {
        const xValues = res.data.x;
        const yValues = res.data.greeks[greek];

        const formattedData = xValues.map((val, index) => ({
          param: val,
          [greek]: yValues[index]
        }));

        setChartData(formattedData);
      })
      .catch((err) => console.error(err));
  }, [greek, param]);

  return (
    <div>
      <h2>Greek Sensitivity Chart</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Select Greek: </label>
        <select value={greek} onChange={e => setGreek(e.target.value)}>
          <option value="delta">Delta</option>
          <option value="gamma">Gamma</option>
          <option value="vega">Vega</option>
          <option value="theta">Theta</option>
          <option value="rho">Rho</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Select Parameter: </label>
        <select value={param} onChange={e => setParam(e.target.value)}>
          <option value="S">Stock Price (S)</option>
          <option value="K">Strike Price (K)</option>
          <option value="T">Time to Expiration (T)</option>
          <option value="R">Risk-Free Rate (R)</option>
          <option value="V">Volatility (V)</option>
        </select>
      </div>

      <GreeksRechart data={chartData} greekName={greek} />
    </div>
  );
}
