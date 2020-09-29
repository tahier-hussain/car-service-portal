import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "./Header";
import HomeUser from "./HomeUser";
import HomeServiceCentre from "./HomeServiceCentre";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }
  render() {
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black" }} className="p-3 mt-5">
          {this.state.userDetails.type === "user" ? <HomeUser /> : <HomeServiceCentre />}
        </Container>
      </div>
    );
  }
}

export default Home;
