import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      services: [],
      description: "",
      service_name: "",
      cost: "",
      toggle_description: false,
      toggle_service: false
    };
  }

  componentDidMount = () => {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/service-provided/get-user-service",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          services: res.data
        });
      }
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggle_description = () => {
    this.setState({
      toggle_description: !this.state.toggle_description
    });
  };

  toggle_service = () => {
    this.setState({
      toggle_service: !this.state.toggle_service
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service-details/add-description",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: this.state.userDetails.id,
        description: this.state.description
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        localStorage.setItem("description", this.state.description);
        location.reload();
      }
    });
  };

  submitHandlerForService = event => {
    event.preventDefault();
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service-provided/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        service_name: this.state.service_name,
        service_centre_id: this.state.userDetails.id,
        cost: this.state.cost
      }
    };
    console.log(requestOptions);
    axios(requestOptions).then(res => {
      console.log("Service added");
      if (res.status === 200) {
        alert("Service has been added successfully");
        location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container className="p-5 mt-5" style={{ backgroundColor: "black" }}>
          <h1>
            <strong>Service Details</strong>
          </h1>
          <Button className="mt-3 mb-3" color="dark">
            Service Requests
          </Button>
          <h3 className="mt-3">
            <strong>Description</strong>
          </h3>
          {localStorage.getItem("description") ? (
            <p>
              <strong>{localStorage.getItem("description")}</strong>
            </p>
          ) : (
            <p>
              <strong>No Description</strong>
            </p>
          )}
          <Button onClick={this.toggle_description} className="mb-3" color="dark">
            Add / Update description
          </Button>
          {this.state.toggle_description === true ? (
            <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
              <Col>
                <FormGroup>
                  <Label>Description</Label>
                  <Input type="textarea" name="description" id="description" placeholder="name" onChange={this.changeHandler} />
                </FormGroup>
              </Col>
              <Col>
                <Button color="dark" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
          ) : (
            ""
          )}
          <h3 className="mt-3">
            <strong>Services</strong>
          </h3>
          {this.state.services.length > 0 ? (
            <div>
              {this.state.services.map(service => (
                <div>
                  <p>
                    <strong>
                      {service.service_name}
                      {" - Rs."}
                      {service.cost}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>
              <strong>No services</strong>
            </p>
          )}
          <Button onClick={this.toggle_service} color="dark" className="mb-3">
            Add
          </Button>
          {this.state.toggle_service === true ? (
            <Form className="mt-4 mb-4" onSubmit={this.submitHandlerForService}>
              <Col>
                <FormGroup>
                  <Label>Service Name</Label>
                  <Input type="text" name="service_name" id="service_name" placeholder="service name" onChange={this.changeHandler} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Cost</Label>
                  <Input type="number" name="cost" id="cost" placeholder="cost" onChange={this.changeHandler} />
                </FormGroup>
              </Col>
              <Col>
                <Button color="dark" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default ServiceDetails;
