import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3333/smurfs');
      this.setState({ smurfs: res.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  updateParent = res => {
    this.setState({ smurfs: res });
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <SmurfForm updateParent={this.updateParent} />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
