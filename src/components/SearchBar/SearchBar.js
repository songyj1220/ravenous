import React from "react";
import {Alert} from 'react-bootstrap';
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: "", location: "", sortBy: "best_match", showError:false };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
      "Distance (Closest)": "distance",
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) return "active";
    else return "";
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption }, () =>
    {
      if(this.state.location)
      {
        this.props.searchYelp(
          this.state.term,
          this.state.location,
          this.state.sortBy
        );
      }

    });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSearch(event) {
    this.setState({showError:false});
    if(this.state.location)
    {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    }
    else
    {
      console.log("not valid location");
      this.setState({showError:true});
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">

          <input
            onChange={this.handleTermChange}
            placeholder="Search Businesses"
          />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
       
          {/* <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div> */}
       </div>

        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>

         <Alert className="errorMessage" variant='danger'hidden={!this.state.showError}>
         *Please enter zipcode. 
        </Alert>

      </div>
    );
  }
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }
}

export default SearchBar;
