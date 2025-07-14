import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import TextLoop from './TextLoop';
import './Formula.css'

export default function Formula() {
  return (
    <div className="formula" id="form" >
          
          <div className="paragraph">
          <div className="main-heading">
            <p1>Formula</p1>
          </div>
            <p>
              The equation works by modeling how the price of the option changes over time, assuming the stock moves randomly but with a known average and risk.
              The formula gives you a fair price for the option so that no one can make a guaranteed profit (no arbitrage).
              <br />
              <br />
              In short:
              It’s a tool to fairly price options by predicting how likely they are to end up in profit.
            </p>
          </div>
          <TextLoop />
        <MathJaxContext>
            <MathJax>
            {"\\[ Call Price = S_0\\,N(d_1) - K\\,e^{-rT}\\,N(d_2) \\]"}
            </MathJax>
            <MathJax>
            {"\\[ Put Price = K\\,e^{-rT}\\,N(-d_2) - S_0\\,N(-d_1) \\]"}
            </MathJax>
            <MathJax>
            {
                "\\[ d_1 = \\frac{\\ln\\left(\\dfrac{S_0}{K}\\right) + \\left(r + \\dfrac{\\sigma^2}{2}\\right)T}{\\sigma\\sqrt{T}}, \\quad d_2 = d_1 - \\sigma\\sqrt{T} \\]"
            }
            </MathJax>
        </MathJaxContext>
        <div className="note">**N(<i>x</i>) refers to the cumulative standard normal distribution function** </div>
    </div>
  );
}