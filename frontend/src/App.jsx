import { ReactTyped } from 'react-typed';
import { Fade } from "react-awesome-reveal";
import './App.css';


function App() {

  return (
    <div className="main-container" id="home">
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
          <p>
            The Black-Scholes-Merton (BSM) model provided the first widely accepted theoretical framework for valuing European options.
            The collaborative work of Fischer Black, Myron Scholes, and Robert Merton revolutionized the way
            options were understood, traded and managed.
          </p>
          <br />
          <p>
            This tool allows you to input the key variables that influence an option's price and instantly see the calculated value,
            along with visual aids to help you understand the option's current state.
          </p>
      </div>
      </Fade>
    </div>
  );
}

export default App;
