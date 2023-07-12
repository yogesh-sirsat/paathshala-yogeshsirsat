import React from "react"
import { Amplify } from "aws-amplify";

import awsmobile from "./aws-exports";
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import CreatePerson from './components/CreatePerson';
import Container from "react-bootstrap/Container";

Amplify.configure(awsmobile);

function App() {
  
  return (
    <Container className="App mt-4">
      <CreatePerson />
    </Container>
  );
}

export default App;
