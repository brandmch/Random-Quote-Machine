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
  return `linear-gradient(to bottom right, rgb(${randomValue()}, ${randomValue()}, ${randomValue()}), rgb(255, 255, 255))`;
};

const App = () => {
  const [state, setState] = useState({ backgroundColor: "", quote: {} });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    randomQuote().then((res) => {
      console.log(res.author);
      const quote = { ...res };
      if (quote.author === null) {
        quote.author = "Anonymous";
      }
      setState({ quote: quote, backgroundColor: randomColor() });
    });
  }, [refresh]);

  if (state.backgroundColor !== "") {
    return (
      <div
        className="App"
        id="quote-box"
        style={{ backgroundImage: state.backgroundColor }}
      >
        <div className="header">
          <h1 className="head">Random Quote Generator</h1>
          <p className="quote" id="text">
            "{state.quote.text}"
          </p>
          <p className="author" id="author">
            -{state.quote.author}
          </p>
          <button
            className="button"
            id="new-quote"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default App;
