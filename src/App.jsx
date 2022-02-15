import React, { useState } from "react";
import "./App.css";
import List from "./List";

import { SiFacebook, SiNetflix, SiYoutube, SiInstagram } from "react-icons/si";

const App = () => {
  const [org, setOrg] = useState("Netflix");
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="container">
      <div className="title">Home Repo</div>
      <div className="org-main">
        <label>Enter Organization: </label>
        <input
          className="org-input"
          onChange={(ev) =>
            setInputVal(
              ev.target.value.charAt(0).toUpperCase() + ev.target.value.slice(1)
            )
          }
        />
        <button className="org-submit" onClick={() => setOrg(inputVal)}>
          Submit
        </button>
      </div>
      <div className="org-title">{org + " Repos"}</div>
      <List org={org} />
    </div>
  );
};

export default App;
