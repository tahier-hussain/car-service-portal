import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class ListOfServiceCentres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      centres: []
    };
  }

  componentDidMount = () => {
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service-centres/get-nearby-centres",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        latitude: this.state.userDetails.latitude,
        longitude: this.state.userDetails.longitude
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          centres: res.data
        });
        console.log(res.data);
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="p-5 mt-5" style={{ backgroundColor: "black" }}>
          {this.state.centres.length > 0 ? (
            <div>
              {this.state.centres.map(centre => (
                <Container className="p-5 mt-3" style={{ backgroundColor: "#131313" }}>
                  <h3 className="mb-3">
                    <strong>{centre.name}</strong>
                  </h3>
                  <h4 className="mb-3">
                    <strong>{centre.description}</strong>
                  </h4>
                  <p>
                    <strong>Address: {centre.address}</strong>
                  </p>
                  <Link to={`/book-service/${centre._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                    <Button color="dark">Book</Button>
                  </Link>
                </Container>
              ))}
            </div>
          ) : (
            <p>No Centres near you</p>
          )}
        </Container>
      </div>
    );
  }
}

export default ListOfServiceCentres;
