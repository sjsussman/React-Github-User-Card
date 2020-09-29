import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    followers: [],
    url: "",
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchFollowers();
  }

  fetchUser = () => {
    fetch("https://api.github.com/users/sjsussman")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          users: res,
        });
      });
  };

  fetchFollowers = () => {
    fetch("https://api.github.com/users/sjsussman/followers")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          followers: res,
        });
        console.log(res);
      });
  };

  fetchFollowerUrl = (followers) => {
    fetch(`https://api.github.com/users/${followers}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          url: res.url,
        });
        console.log(res);
      });
  };

  handleUrl = () => {
    this.fetchFollowerUrl(this.state.url);
  };

  // handleUrl = (e) => {
  //   this.setState({
  //     followers: e.target.value
  //   });
  // };

  render() {
    return (
      <div>
        <div className="userContainer">
          <img src={this.state.users.avatar_url} width="200px" alt="user img" />
          <div>{this.state.users.name}</div>
          <div>{this.state.users.location}</div>
          <div>{this.state.users.bio}</div>
        </div>
        <div className="followerContainer">
          {this.state.followers.map((follower) => (
            <div key={follower.id}>
              <img
                src={follower.avatar_url}
                width="200px"
                onClick={this.handleUrl}
              />{" "}
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
