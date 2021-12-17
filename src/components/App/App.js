import React from "react";
import {Modal, Button} from 'react-bootstrap';
import logo from "../../logo.svg";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import Yelp from "../../util/Yelp.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import instruction from '../images/instruction.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [], showModal: true };
    this.searchYelp = this.searchYelp.bind(this);
    this.corsAccess = this.corsAccess.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }

  handleShow = () => {
    this.setState({showModal: true});
  }

  handleClose = () => {
    this.setState({showModal: false});
  }


  corsAccess() {
    window.open("https://cors-anywhere.herokuapp.com/corsdemo");
    this.handleClose();
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />

        <Modal className="insturctionModal" size="lg" backdrop={'static'} show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>To use this website...</Modal.Title>
          </Modal.Header>
          <Modal.Body><a className="requestLink" onClick={this.corsAccess}>Please click here and request an access for Demo as shown below.</a>
          <img src={instruction} alt="Instruction" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
