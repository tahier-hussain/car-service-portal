import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }
  render() {
    return (
      <div>
        <Container style={{ backgroundColor: "black" }}>
          <h1>
            <strong>Welcome {this.state.userDetails.name}</strong>
          </h1>
          <h3 className="mt-3">
            <strong>This is for the car owners. They can book for a service by entering the car details, to the service centre which is near their location.</strong>
          </h3>
          <h4 className="mt-3">
            <strong>Your centre address</strong>
          </h4>
          <p>{this.state.userDetails.address}</p>
          <Link to="/list-of-service-centres" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button color="dark">Book Service</Button>
          </Link>
          <Button className="m-3" color="dark">
            Change Location
          </Button>
        </Container>
      </div>
    );
  }
}

export default HomeUser;
