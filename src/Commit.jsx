import React from "react";

const Commit = ({ commit }) => {
  return (
    <div className="commit-item">
      <div title={commit.commit.message.split("\n")[0]} className="commit-name">
        {commit.commit.message.split("\n")[0]}
      </div>
      <div className="commit-author">
        Author/Committer: {commit.commit.committer.name}
      </div>
      <div className="commit-hash">Commit hash: {commit.sha}</div>
      <div className="commit-date">
        {new Date(commit.commit.author.date).toLocaleString("en", {
          dateStyle: "short",
        })}
      </div>
    </div>
  );
};

export default Commit;
