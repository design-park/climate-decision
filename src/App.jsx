import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./App.css";
import PolicyEmissionsChart from "./components/PolicyEmissionsChart";
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Interactive Climate Action Visualization</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <PolicyEmissionsChart />
      </Container>
    </div>
  );
}

export default App;
