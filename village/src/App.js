import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

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
        <Link to="/add-smurf">Add Smurf</Link>
        <Route path="/add-smurf" render={props => (<SmurfForm {...props} updateParent={this.updateParent} />)} />
        <Route path="/" render={props => (<Smurfs {...props} smurfs={this.state.smurfs} />)} />
        <Route path="/smurf/:id" render={props => (<Smurf {...props} smurfs={this.state.smurfs} />)} />
      </div>
    );
  }
}

export default App;
