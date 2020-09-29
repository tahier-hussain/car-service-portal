import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
// import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

var address;
var latitude;
var longitude;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      latitude: "",
      longitude: "",
      user: true,
      error_message: "",
      password_message: "Enter atleast 8 characters",
      password_alert: "primary"
    };
  }

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    var latlng;
    searchControl.on("results", function (data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
        latlng = data.results[i];
      }
      address = latlng.properties.LongLabel;
      latitude = latlng.latlng.lat;
      longitude = latlng.latlng.lng;
    });
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (this.state.password.length >= 8) {
      this.setState({
        password_message: "Strength: Strong",
        password_alert: "success"
      });
    } else if (this.state.password.length < 5) {
      this.setState({
        password_message: "Strength: Weak",
        password_alert: "danger"
      });
    } else {
      this.setState({
        password_message: "Strength: Medium",
        password_alert: "warning"
      });
    }
  };

  changeHandlerForFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.password,
      address: address,
      latitude: latitude,
      longitude: longitude
    };
    console.log(this.state.user);
    let url;
    if (this.state.user === true) {
      url = "http://localhost:5000/api/register";
    } else {
      url = "http://localhost:5000/api/service-centre-register";
    }
    const requestOptions = {
      method: "POST",
      url,
      header: {
        "Content-Type": "application/json"
      },
      data: body
    };

    axios(requestOptions).then(res => {
      if (res.data.status == 200) {
        alert("Your profile has been created successfully");
        this.props.history.push("/");
      } else if (res.data.status == 400) {
        console.log("HELLO");
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      user: !this.state.user
    });
    window.scrollTo(0, 0);
  };

  render() {
    const center = [37.7833, -122.4167];
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black" }} className="p-3 mt-5">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>{this.state.user === true ? <h2>Car Owner SignUp</h2> : <h2>Service Centre SignUp</h2>}</Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" id="name" placeholder="name" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="********" onChange={this.changeHandler} />
                <Alert className="mt-2" color={this.state.password_alert}>
                  {this.state.password_message}
                </Alert>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirm_password" id="confirm_password" placeholder="********" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <Label>Address</Label>
              <Map
                className="map-font-color"
                style={{ height: "50vh" }}
                center={center}
                zoom="10"
                ref={m => {
                  this.leafletMap = m;
                }}
              >
                <TileLayer attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors" url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <div className="pointer" />
              </Map>
            </Col>
            <Col>
              <Button className="mt-3" type="submit">
                Register
              </Button>
            </Col>
            {this.state.user === true ? (
              <Col>
                Not a car owner?
                <Button onClick={this.toggle} color="link">
                  Register as service centre
                </Button>
              </Col>
            ) : (
              <Col>
                Not a service centre?
                <Button onClick={this.toggle} color="link">
                  Register as car owner
                </Button>
              </Col>
            )}
            <Col>
              Already have an account?
              <Button color="link">
                <Link to="/">Login</Link>
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
