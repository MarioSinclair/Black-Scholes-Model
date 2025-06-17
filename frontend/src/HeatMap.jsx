import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function App() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function simulates the Delta of a Call Option as the underlying price changes.
  // In a real application, you'd calculate Delta using a Black-Scholes model
  // or retrieve it from a financial API, given the underlying price, strike,
  // time to expiration, volatility, and interest rates.
  const simulateDeltaDataFetch = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const strikePrice = 100; // Let's consider an At-The-Money (ATM) option
        const underlyingPrices = Array.from({ length: 100 }, (_, i) => 80 + i * 0.5); // Prices from $80 to $129.5

        const callDeltas = underlyingPrices.map(price => {
          // Simulate S-curve behavior for Call Delta
          // Delta is typically near 0 for far Out-of-the-Money (OTM) calls
          // Near 0.50 for At-The-Money (ATM) calls
          // Near 1 for deep In-the-Money (ITM) calls
          let delta;
          if (price < strikePrice - 10) { // Deep OTM
            delta = Math.random() * 0.05; // Close to 0
          } else if (price < strikePrice) { // OTM
            delta = 0.05 + ((price - (strikePrice - 10)) / 10) * 0.45; // Rises towards 0.5
          } else if (price >= strikePrice && price < strikePrice + 10) { // ATM to ITM
            delta = 0.50 + ((price - strikePrice) / 10) * 0.45; // Rises towards 1
          } else { // Deep ITM
            delta = 0.95 + (Math.random() * 0.05); // Close to 1
          }
          return Math.min(1.0, Math.max(0.0, parseFloat(delta.toFixed(2)))); // Clamp between 0 and 1
        });

        // For Put Deltas, they range from 0 to -1. They behave inversely to calls.
        // Near 0 for far OTM puts, near -0.50 for ATM puts, near -1 for deep ITM puts.
        const putDeltas = underlyingPrices.map(price => {
            let delta;
            if (price > strikePrice + 10) { // Deep OTM
                delta = -(Math.random() * 0.05); // Close to 0
            } else if (price > strikePrice) { // OTM
                delta = -0.05 - (((strikePrice + 10) - price) / 10) * 0.45; // Drops towards -0.5
            } else if (price <= strikePrice && price > strikePrice - 10) { // ATM to ITM
                delta = -0.50 - ((strikePrice - price) / 10) * 0.45; // Drops towards -1
            } else { // Deep ITM
                delta = -0.95 - (Math.random() * 0.05); // Close to -1
            }
            return Math.min(0.0, Math.max(-1.0, parseFloat(delta.toFixed(2)))); // Clamp between 0 and -1
        });


        resolve({
          underlyingPrices: underlyingPrices,
          callDeltas: callDeltas,
          putDeltas: putDeltas,
          strikePrice: strikePrice
        });
      }, 1000); // Simulate network delay
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await simulateDeltaDataFetch();
        setChartData(data);
      } catch (err) {
        setError("Failed to load Delta data. Please check the console for details.");
        console.error("Error fetching Delta data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const plotlyLayout = {
    title: {
      text: `Option Delta vs. Underlying Price (Strike: $${chartData ? chartData.strikePrice : 'N/A'})`,
      font: {
        family: 'Inter, sans-serif',
        size: 24,
        color: '#333'
      }
    },
    autosize: true,
    height: 500,
    margin: { l: 70, r: 20, b: 70, t: 70 },
    hovermode: 'closest',
    xaxis: {
      title: 'Underlying Price ($)',
      autorange: true,
      titlefont: { size: 14, color: '#555' },
      showgrid: true,
      gridcolor: '#e0e0e0',
      linecolor: '#ccc',
    },
    yaxis: {
      title: 'Delta',
      range: [-1.1, 1.1], // Delta ranges from -1 to 1
      dtick: 0.1, // Force ticks every 0.1
      titlefont: { size: 14, color: '#555' },
      showgrid: true,
      gridcolor: '#e0e0e0',
      linecolor: '#ccc',
    },
    showlegend: true,
    legend: {
      x: 0,
      y: 1.1,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      bordercolor: '#ccc',
      borderwidth: 1,
      orientation: 'h'
    },
    shapes: chartData ? [
        { // Vertical line at strike price
            type: 'line',
            x0: chartData.strikePrice,
            y0: -1.0,
            x1: chartData.strikePrice,
            y1: 1.0,
            line: {
                color: 'rgba(0, 0, 0, 0.5)',
                width: 2,
                dash: 'dot'
            },
            name: 'Strike Price'
        }
    ] : []
  };

  const plotlyData = chartData ? [
    {
      x: chartData.underlyingPrices,
      y: chartData.callDeltas,
      type: 'scatter',
      mode: 'lines',
      name: 'Call Delta',
      line: { color: '#28a745', width: 3 }, // Green for Call
      hovertemplate:
        '<b>Underlying Price:</b> $%{x:.2f}<br>' +
        '<b>Call Delta:</b> %{y:.2f}<extra></extra>',
    },
    {
      x: chartData.underlyingPrices,
      y: chartData.putDeltas,
      type: 'scatter',
      mode: 'lines',
      name: 'Put Delta',
      line: { color: '#dc3545', width: 3 }, // Red for Put
      hovertemplate:
        '<b>Underlying Price:</b> $%{x:.2f}<br>' +
        '<b>Put Delta:</b> %{y:.2f}<extra></extra>',
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
      {/* Tailwind CSS CDN for styling */}
      <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
      {/* Google Fonts - Inter for a clean, modern look */}
      <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap)" rel="stylesheet" />

      {/* Basic global styles for the font */}
      <style>{`
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 rounded-md">Option Delta Curve</h1>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">Calculating option Delta...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-600 text-lg py-10 rounded-md bg-red-100 border border-red-300 p-4">
            <p className="font-semibold mb-2">Oops! Something went wrong.</p>
            <p>{error}</p>
            <p className="mt-2 text-sm text-red-500">Please try refreshing the page or contact support if the issue persists.</p>
          </div>
        )}

        {/* Chart Plot (conditionally rendered) */}
        {!loading && !error && chartData && (
          <div className="w-full h-[500px] flex items-center justify-center rounded-md overflow-hidden">
            <Plot
              data={plotlyData}
              layout={plotlyLayout}
              className="w-full h-full" // Make the plot fill its container
              useResizeHandler={true} // Enable responsive resizing of the plot
              config={{
                displayModeBar: true, // Show Plotly's mode bar (zoom, pan, etc.)
                responsive: true,
                displaylogo: false // Hide Plotly logo
              }}
            />
          </div>
        )}

        {/* Information text */}
        <div className="mt-8 text-center text-gray-600 text-sm p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-semibold mb-2">Understanding Option Delta:</p>
          <p>Delta tells you how much an option's price is expected to move for every $1 change in the underlying asset's price.</p>
          <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-md">
            <li>The **green line** shows the **Call Option Delta**. For call options, Delta ranges from 0 to 1.</li>
            <li>The **red line** shows the **Put Option Delta**. For put options, Delta ranges from 0 to -1.</li>
            <li>The **dotted vertical line** indicates the **Strike Price**.</li>
          </ul>
          <p className="mt-2">
            **Key Insights:**
            <ul className="list-disc list-inside ml-4 mt-1 text-left mx-auto max-w-md">
                <li>**At-the-Money (ATM)** options (where underlying price is near the strike price) have a Delta close to 0.50 (for calls) or -0.50 (for puts). This means they are roughly 50% sensitive to the underlying's movements.</li>
                <li>**In-the-Money (ITM)** options (e.g., call price significantly above strike) have Delta closer to 1 (or -1 for puts), behaving more like owning the actual stock.</li>
                <li>**Out-of-the-Money (OTM)** options have Delta closer to 0, meaning they are less sensitive to small movements in the underlying price.</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}
