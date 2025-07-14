import React, { PureComponent } from 'react';
import {
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class Example extends PureComponent {

  render() {
    const {data, greekName } = this.props;
    const colorMap = {
      delta: '#8884d8',
      gamma: '#10b981',
      vega: '#f59e0b',
      theta: '#ef4444',
      rho: '#8b5cf6',
    }

    const strokeColor = colorMap[greekName] || '#8884d8';
    const gradientId = `gradient-${greekName}`
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}>
             <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeWidth={1} />
            <XAxis dataKey="param" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={greekName} stroke={colorMap[greekName]} fill={`url(#${gradientId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
