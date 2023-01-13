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

const Quote = (props) => {
  return (
    <div>
      <h2>"{props.quote.text}"</h2>
      <h3>-{props.quote.author}</h3>
    </div>
  );
};

const App = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    randomQuote().then((res) => setQuote(res));
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Random Quote Generator</h1>
        <Quote quote={quote} />
        <button
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
