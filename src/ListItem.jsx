import React from "react";
import ReactDOM from "react-dom";
import { GoStar } from "react-icons/go";
import { GoRepoForked } from "react-icons/go";
import {
  DiJavascript1,
  DiJava,
  DiPython,
  DiHtml5,
  DiScala,
  DiGroovy,
  DiTerminal,
  DiPhp,
  DiSwift,
} from "react-icons/di";
import {
  SiTypescript,
  SiCplusplus,
  SiKotlin,
  SiHaskell,
  SiC,
  SiRuby,
  SiMomenteo,
  SiGo,
} from "react-icons/si";

const languageLogos = {
  Java: <DiJava title={"Java"} />,
  JavaScript: <DiJavascript1 title={"JavaScript"} />,
  Python: <DiPython title={"Python"} />,
  HTML: <DiHtml5 />,
  Scala: <DiScala />,
  Groovy: <DiGroovy />,
  Shell: <DiTerminal />,
  TypeScript: <SiTypescript />,
  "C++": <SiCplusplus />,
  Kotlin: <SiKotlin />,
  Haskell: <SiHaskell />,
  C: <SiC />,
  Ruby: <SiRuby />,
  Go: <SiGo />,
  PHP: <DiPhp />,
  Swift: <DiSwift />,
};

const ListItem = ({ repo }) => {
  return (
    <div className="list-item">
      <div className="repo-name">{repo.name}</div>
      <div className="description">{repo.description}</div>
      <div>
        <div className="star-count">
          <GoStar />
          <label>{repo.stargazers_count}</label>
        </div>
        <div className="fork-count">
          <GoRepoForked />
          <label>{repo.forks_count}</label>
        </div>
      </div>
      <div className="language">
        <div className="icon">{languageLogos[repo.language]}</div>
        <div className="text">{repo.language}</div>
      </div>
      <div className="date">
        {new Date(repo.created_at).toLocaleString("en", {
          dateStyle: "short",
        })}
      </div>
    </div>
  );
};

export default ListItem;
