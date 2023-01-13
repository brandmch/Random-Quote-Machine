import React, { useEffect, useState } from "react";
import "./App.css";

// Grabs array of quotes from API. Returns 1 random quote from the array.
const randomQuote = async () => {
  return await fetch("https://type.fit/api/quotes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data[Math.floor(Math.random() * data.length)];
    });
};

// Returns a random color in rgba()
// Used for state.backgroundColor
const randomColor = () => {
  function randomValue() {
    return Math.floor(Math.random() * 256);
  }
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
};

// Turns the current quote in state into a string for Twitter http
const getTweetStr = (state) => {
  return `"${state.quote.text}" -${state.quote.author}`;
};

// Main App
const App = () => {
  const [state, setState] = useState({ backgroundColor: "", quote: {} });
  const [refresh, setRefresh] = useState(false);

  // On load, and on refresh, generate random quote and random color
  useEffect(() => {
    randomQuote().then((res) => {
      const quote = { ...res };
      if (quote.author === null) {
        quote.author = "Anonymous";
      }
      setState({ quote: quote, backgroundColor: randomColor() });
    });
  }, [refresh]);

  if (state.backgroundColor !== "" && Object.keys(state.quote).length > 0) {
    return (
      <div
        className="App"
        id="quote-box"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${state.backgroundColor}, rgb(255, 255, 255))`,
        }}
      >
        <div className="header">
          <p className="quote" id="text">
            "{state.quote.text}"
          </p>
          <p className="author" id="author">
            -{state.quote.author}
          </p>
          <div className="button-container">
            <div className="blank-button-start"></div>
            <button
              className="new-quote-button"
              id="new-quote"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              New Quote
            </button>
            <div className="blank-button-end"></div>
            <i
              className="fa fa-twitter"
              style={{ color: state.backgroundColor }}
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${getTweetStr(state)}`,
                  "_blank"
                );
              }}
            ></i>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default App;
