import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem";
import CommitList from "./CommitList";

const List = ({ org }) => {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [commitsURL, setCommitsURL] = useState("");
  useEffect(() => fetchRepos(setRepos, org), [fetchRepos, org]);
  useEffect(
    () => fetchCommits(setCommits, setCommitsURL, commitsURL),
    [fetchCommits, commitsURL]
  );
  if (!repos || repos.length < 1)
    return <div className="error-message">Error: Not Found</div>;
  return (
    <div className="list">
      {repos
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            a.created_at - b.created_at
        )
        .map((repo) => (
          <div key={repo.id}>
            <div
              onClick={() =>
                setCommitsURL(commitsURL == "" ? repo.commits_url : "")
              }
            >
              <ListItem repo={repo} />
            </div>
            <div>
              {commitsURL.length > 0 && repo.commits_url == commitsURL ? (
                <CommitList commits={commits} />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
};

const fetchCommits = (setCommits, setCommitsURL, commitsURL) => {
  commitsURL = commitsURL.slice(0, -6);
  fetch(commitsURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.message == "Not Found") {
        setCommits([]);
      } else {
        setCommits(responseJSON);
      }
    })
    .catch((err) => {
      setCommitsURL("");
      setCommits([]);
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
