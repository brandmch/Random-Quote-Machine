import React from "react";
import "./App.css";

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {},
    };
  }
  render() {
    return <h1>Swag</h1>;
  }
}

function App() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

  return (
    <div className="App">
      <div className="header">
        <h1>Random Quote Generator</h1>
        <Quote />
      </div>
    </div>
  );
}

export default App;
