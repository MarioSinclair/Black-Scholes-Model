import React, { useState, useEffect } from 'react';
import './TextLoop.css';
import {AnimatePresence, motion } from "framer-motion";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const textMessages = [
    "Current Price ",
    "Strike Price ",
    "Time to Expiration ",
    "Interest Rate ",
    "Volatility "
];

const symbol = {
    0 : <MathJaxContext><MathJax inline>{"\\( S_0 \\)"}</MathJax></MathJaxContext>,
    1 : <MathJaxContext><MathJax inline>{"\\( K \\)"}</MathJax></MathJaxContext>,
    2 : <MathJaxContext><MathJax inline>{"\\(T \\)"}</MathJax></MathJaxContext>,
    3 : <MathJaxContext><MathJax inline>{"\\(r \\)"}</MathJax></MathJaxContext>,
    4 : <MathJaxContext><MathJax inline>{"\\( \\sigma \\)"}</MathJax></MathJaxContext>,
}

export default function TextLoop() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 2500; 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % textMessages.length);   
        }, intervalTime); 

    return () => clearInterval(interval);

    }, []);

  return (
    <div className="text-loop">
        <div className="text">
            <p>Formula Components:</p>
        </div>
        <AnimatePresence mode="wait">
            <motion.div
                key={textMessages[currentIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="highlight-text"
            >
            {textMessages[currentIndex]}
            ({symbol[currentIndex]})
            </motion.div>
        </AnimatePresence>
    </div>
    
  );
};
