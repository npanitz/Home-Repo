import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem";

const List = ({ org, setListSwitch }) => {
  const [repos, setRepos] = useState([]);
  const [repoClicked, setRepoClicked] = useState(false);
  useEffect(() => fetchRepos(setRepos, org), [fetchRepos, org]);
  if (!repos || repos.length < 1)
    return <div className="error-message">Error: Not Found</div>;
  return (
    <div className="list">
      {repos
        .sort((a, b) => (a.stargazers_count < b.stargazers_count ? 1 : -1))
        .map((repo) => (
          <ListItem key={repo.id} repo={repo} />
        ))}
    </div>
  );
};

const fetchCommits = (setCommits, commitsURL) => {
  console.log("ok");
  fetch(commitsURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });
};

const fetchRepos = (setRepos, org) => {
  fetch(`https://api.github.com/orgs/${org}/repos`)
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.message == "Not Found") {
        setRepos([]);
      } else {
        setRepos(responseJSON);
      }
    })
    .catch((err) => setRepos([]));
};
export default List;
