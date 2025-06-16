import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import './Formula.css'

export default function Formula() {
  return (
    <div className="formula">
        <MathJaxContext version={3} >
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