import React from 'react';
import axios from 'axios';

class Smurf extends React.Component {

  removeSmurf = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:3333/smurfs/${id}`);
    this.props.updateParent(res.data);
    this.props.history.push('/');
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

