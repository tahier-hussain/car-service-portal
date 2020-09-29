import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class HomeServiceCentre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }
  render() {
    return (
      <div>
        <Container className="p-5" style={{ backgroundColor: "black" }}>
          <h1>
            <strong>{this.state.userDetails.name}</strong>
          </h1>
          <h3 className="mt-3">
            <strong>This is for the service centre. They can create a quotaion with details of service.</strong>
          </h3>
          <h4 className="mt-3">
            <strong>Your centre address</strong>
          </h4>
          <p>{this.state.userDetails.address}</p>
          <Link to="/service-details" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="mt-3" color="dark">
              Service Details
            </Button>
          </Link>
          <Button className="mt-3 ml-3" color="dark">
            Change Location
          </Button>
        </Container>
      </div>
    );
  }
}

export default HomeServiceCentre;
