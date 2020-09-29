import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ServiceDetails from "./components/ServiceDetails";
import ListOfServiceCentres from "./components/ListOfServiceCentres";
import BookService from "./components/BookService";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/service-details" component={ServiceDetails} exact />
          <Route path="/list-of-service-centres" component={ListOfServiceCentres} exact />
          <Route path="/book-service/:id" component={BookService} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
