import { ReactTyped } from 'react-typed';
import { Fade } from "react-awesome-reveal";
import TextLoop from './TextLoop';
import Formula from './Formula.jsx'
import './App.css';


function App() {

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
      <Fade cascade damping={0.01} direction='None' triggerOnce>
      <div className="main-paragraph">
          <p>The Black-Scholes-Merton (BSM) model stands as a landmark achievement in financial economics.
          It provided the first widely accepted theoretical framework for valuing European options.
          The collaborative work of Fischer Black, Myron Scholes, and Robert Merton revolutionized the way
           options were understood, traded and managed.
        </p>
      </div>
      <TextLoop />
      <Formula />
      </Fade>
    </div>
  );
}

export default App;
