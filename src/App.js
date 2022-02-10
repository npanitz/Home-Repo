import React from "react";
import ReactDOM, { render } from "react-dom";
import List from "./List";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <div className="title">Home Repo</div>
        </h1>
        <List />
      </div>
    );
  }
}

export default App;
