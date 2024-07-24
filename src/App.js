import React, { Component } from "react";
import Question from "./components/question";
import {QUESTIONS} from "./questions";

class App extends Component {
  state = {
    
  };


  render() {
    return (
      <div className="main__wrap">
        <main>
          <div className="container">
            <h1>
              Welcome to the assessment
            </h1>
            <h3>Please answer the questions based on your skills in Yes or No.</h3>
            <Question/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
