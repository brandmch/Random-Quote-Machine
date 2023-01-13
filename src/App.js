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

const getTweetStr = (state) => {
  return `"${state.quote.text}" -${state.quote.author}`;
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
          <p className="quote" id="text">
            "{state.quote.text}"
          </p>
          <p className="author" id="author">
            -{state.quote.author}
          </p>
          <div className="button-container">
            <button
              className="button"
              id="new-quote"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              New Quote
            </button>
            <i
              class="fa fa-twitter"
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
