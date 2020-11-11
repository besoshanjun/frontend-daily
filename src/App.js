import React from "react";
import "./App.css";
import Overlay from "./overlay";
import Shuffle from "./shuffle";
import Refs from './forward_refs';
import ClassComponent from './class'

function ExampleModal() {
  console.log("render ExampleModal: ");
  return (
    <div className="App-link" target="_blank" rel="noopener noreferrer">
      <Overlay.Closer>X</Overlay.Closer>
      content
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="placeholder"></div>
      <Overlay
        renderBody={() => {
          return <ExampleModal />;
        }}
      >
        <div className="opener">toggle</div>
      </Overlay>
      <Shuffle />

      <Refs></Refs>
      <ClassComponent app="APp" />
    </div>
  );
}

export default App;
