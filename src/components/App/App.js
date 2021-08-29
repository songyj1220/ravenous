import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import Yelp from "../../util/Yelp.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [] };
    this.searchYelp = this.searchYelp.bind(this);
    this.corsAccess = this.corsAccess.bind(this);
  }
  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }

  corsAccess() {
    window.open("https://cors-anywhere.herokuapp.com/corsdemo");
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <div className="demoAccess">
          <button onClick={this.corsAccess}>Click here to request an access for Demo</button>
        </div>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
