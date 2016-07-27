import React, { Component } from 'react';
import './layout.css';
import TunesDemo from "./TunesDemo";
import DialogDemo from "./DialogDemo";

class App extends Component {
  render() {
      //              <TunesDemo/>
      return <div className="vbox fill">
          <h1>demos for you to watchs</h1>
          <div className="hbox"><button>Tunes</button></div>
          <div className="grow" id="demo-pane">
              <DialogDemo/>
          </div>
      </div>
  }
}

export default App;
