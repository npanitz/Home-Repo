import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem";
import CommitList from "./CommitList";

const List = ({ org }) => {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [commitsURL, setCommitsURL] = useState("");
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  useEffect(() => {
    setIsFetchingRepos(true);
    fetchRepos(setRepos, org, () => setIsFetchingRepos(false));
  }, [org]);

  useEffect(() => fetchCommits(setCommits, commitsURL), [commitsURL]);
  if (isFetchingRepos) {
    return <div className="error-message">Loading...</div>;
  }
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
                setCommitsURL(
                  commitsURL == repo.commits_url ? "" : repo.commits_url
                )
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

const fetchCommits = (setCommits, commitsURL) => {
  if (!commitsURL) {
    return;
  }
  commitsURL = commitsURL.replace("{/sha}", "");
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
      setCommits([]);
    });
};

const fetchRepos = (setRepos, org, callback) => {
  fetch(`https://api.github.com/orgs/${org}/repos`)
    .then((response) => response.json())
    .then((responseJSON) => {
      if (!Array.isArray(responseJSON)) {
        setRepos([]);
      } else {
        setRepos(responseJSON);
      }
      if (callback) {
        callback();
      }
    })
    .catch((err) => setRepos([]));
};
export default List;
