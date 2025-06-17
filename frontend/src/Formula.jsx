import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

import TextLoop from './TextLoop';
import './Formula.css'

export default function Formula() {
  return (
    <div className="formula" id="form" >
                <div className="main-heading">
            <p>Formula</p>
          </div>
          <br />
          <div className="paragraph">
            <p>
              The BSM model culminates in a partial differential equation (PDE) that describes how the price of an option changes over time. 
              The solution to this PDE, under specific boundary conditions, yields the formulas for pricing European call and put options.
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
    </div>
  );
}