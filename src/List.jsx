import React from "react";
import ReactDOM from "react-dom";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
  }

  render() {
    return this.state.repos.map((repo) => repo.language);
  }

  // getRepos() {
  //   let repos = [];
  //   async function getRepos() {
  //     return await fetch("https://api.github.com/orgs/Netflix/repos")
  //       .then((response) => response.json())
  //       .then((responseJSON) => {
  //         console.log(responseJSON);
  //         // this.setState({ repos: responseJSON });
  //       });
  //   }
  // }

  componentDidMount() {
    // this.getRepos();
    fetch("https://api.github.com/orgs/Netflix/repos")
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({ repos: responseJSON });
      });
  }
}

export default List;
