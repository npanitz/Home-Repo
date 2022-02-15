import React, { useState } from "react";
import Commit from "./Commit";

const CommitList = (commits) => {
  if (commits.commits.length > 0) {
    return (
      <div>
        <div className="commit-title">Commits</div>
        <div className="commit-list">
          {commits.commits
            .sort((a, b) => a.commit.date - b.commit.date)
            .map((commit) => (
              <Commit key={commit.node_id} commit={commit} />
            ))}
        </div>
      </div>
    );
  } else {
    return "";
  }
};
export default CommitList;
