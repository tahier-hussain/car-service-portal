import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import Header from "./Header";

class BookService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      centreDetails: {},
      servicesProvided: [],
      data: []
    };
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service-centres/get-one",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          centreDetails: res.data
        });
        console.log(res.data);
      }
    });

    requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service-provided/get-one",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          servicesProvided: res.data
        });
        console.log(res.data);
      }
    });
  };

  includeService = service => {
    this.setState({
      toggle_service: !this.state.toggle_service,
      toggle_service_id: service._id
    });
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/requested-service/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        service_name: service.service_name,
        service_id: service._id,
        user_id: this.state.userDetails.id,
        centre_id: this.state.centreDetails._id,
        cost: service.cost
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        console.log("service included successfully");
      } else {
        console.log("Something went wrong");
      }
    });
  };

  generateQuotation = async () => {
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/requested-service/get-one",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        centre_id: this.state.centreDetails._id,
        user_id: this.state.userDetails.id
      }
    };
    await axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data
        });
      }
    });
    console.log(this.state.data);
    var doc = new jsPDF("p", "mm", "a4");

    var lMargin = 20;
    var rMargin = 10;
    var pdfInMM = 210;
    var paragraph;
    var lines;

    paragraph = "QUOTATION CREATION";
    lines = doc.splitTextToSize(paragraph, pdfInMM - 30 - 30);
    doc.setFontSize(30);
    doc.setTextColor(0, 10, 44);
    doc.setFontType("bold");
    doc.text(50, 20, lines);

    doc.line(10, 25, 200, 25);

    paragraph = "SERVICE";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(25, 45, lines);

    paragraph = "COST";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(70, 45, lines);

    let data = this.state.data;
    let totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      totalAmount += parseInt(data[i].cost);
      paragraph = data[i].service_name;
      lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
      doc.setFontSize(12);
      doc.setFontType("normal");
      doc.text(25, 55 + i * 10, lines);

      paragraph = data[i].cost;
      lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
      doc.setFontSize(12);
      doc.setFontType("normal");
      doc.text(120, 55 + i * 10, lines);
    }

    paragraph = "GST";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(25, 60 + data.length * 10, lines);

    paragraph = ((totalAmount * 5) / 100).toString();
    totalAmount += (totalAmount * 5) / 100;
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(85, 60 + data.length * 10, lines);

    paragraph = "TOTAL AMOUNT";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(25, 75 + data.length * 10, lines);

    paragraph = totalAmount.toString();
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(85, 75 + data.length * 10, lines);

    paragraph = "NOTE: We request you to kindly drop your vehicle in our service centre. The payment can be made after the service is completed.";
    lines = doc.splitTextToSize(paragraph, 210 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("normal");
    doc.text(25, 95 + data.length * 10, lines);

    doc.save("quotation.pdf");
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="p-5 mt-5" style={{ backgroundColor: "black" }}>
          <h1>
            <strong>{this.state.centreDetails.name}</strong>
          </h1>
          <h3>
            <strong>{this.state.centreDetails.description}</strong>
          </h3>
          <p>
            <strong>Address: {this.state.centreDetails.address}</strong>
          </p>
          <h2>
            <strong>Services Provided</strong>
          </h2>
          {this.state.servicesProvided.length > 0 ? (
            <div>
              {this.state.servicesProvided.map(service => (
                <Container className="p-3 mt-2" style={{ backgroundColor: "#131313" }}>
                  <p>
                    <strong>{service.service_name}</strong>
                  </p>
                  <p>
                    <strong>Cost: {service.cost}</strong>
                  </p>
                  {this.state.toggle_service === true && this.state.toggle_service_id === service._id ? (
                    <Button color="dark">Included</Button>
                  ) : (
                    <Button onClick={() => this.includeService(service)} color="dark">
                      Include Service
                    </Button>
                  )}
                </Container>
              ))}
              <Button onClick={this.generateQuotation} className="mt-3" color="dark">
                Generate Quotation
              </Button>
            </div>
          ) : (
            <p>No Services Provided</p>
          )}
        </Container>
      </div>
    );
  }
}

export default BookService;
