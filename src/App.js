import "./App.css";

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
      </div>
    </div>
  );
}

export default App;
