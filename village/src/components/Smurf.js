import React from 'react';
import axios from 'axios';

class Smurf extends React.Component {

  state = {
    name: '',
    age: '',
    height: '',
    updateClicked: false,
  }

  removeSmurf = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:3333/smurfs/${id}`);
    this.props.updateParent(res.data);
    this.props.history.push('/');
  }

  updateSmurf = async (e, id) => {
    e.preventDefault();
    const smurfInfo = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
    }
    const res = await axios.put(`http://localhost:3333/smurfs/${id}`, smurfInfo)
    this.props.updateParent(res.data);
  }

  handleUpdateBtn = e => {
    e.preventDefault();
    this.setState({ updateClicked: !this.state.updateClicked })
  }

  handleChange = e => {
    const value = e.target.name === "age" ? Number(e.target.value) : e.target.value;
    this.setState({ [e.target.name]: value })
  }

  render() {
    const smurf = this.props.smurfs.find(smurf => `${smurf.id}` === this.props.match.params.id);
    if (!smurf) {
      return <h3>Loading Smurf Info...</h3>;
    }

    return (
      <div className="Smurf">
        <h3>{smurf.name}</h3>
        <strong>{smurf.height} tall</strong>
        <p>{smurf.age} smurf years old</p>
        <button onClick={e => this.removeSmurf(e, smurf.id)}>Remove Smurf</button>
        <button onClick={this.handleUpdateBtn}>Update Smurf</button>
        {this.state.updateClicked ? <form onSubmit={e => this.updateSmurf(e, smurf.id)}>
          <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          <input type="number" value={this.state.age} name="age" onChange={this.handleChange}/>
          <input type="text" value={this.state.height} name="height" onChange={this.handleChange}/>
          <button>Send Changes</button>
        </form> : null}
      </div>
    );
  }
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

