import React, { useEffect, useState } from "react";
import "./App.css";

const randomQuote = async () => {
  return await fetch("https://type.fit/api/quotes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data[Math.floor(Math.random() * data.length)];
    });
};

const randomColor = () => {
  function randomValue() {
    return Math.floor(Math.random() * 256);
  }
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
};

const App = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    randomQuote().then((res) => setQuote(res));
  }, []);

  console.log(quote);

  return (
    <div
      className="App"
      id="quote-box"
      style={{ backgroundColor: randomColor() }}
    >
      <div className="header">
        <h1 className="head">Random Quote Generator</h1>
        <p className="quote" id="text">
          "{quote.text}"
        </p>
        <p className="author" id="author">
          -{quote.author}
        </p>
        <button
          className="button"
          id="new-quote"
          onClick={() => {
            randomQuote().then((res) => setQuote(res));
          }}
        >
          NewQ
        </button>
      </div>
    </div>
  );
};

export default App;
