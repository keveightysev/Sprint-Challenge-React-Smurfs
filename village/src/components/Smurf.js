import React from 'react';

class Smurf extends React.Component {

  render() {
    const smurf = this.props.smurfs.find(smurf => `${smurf.id}` === this.props.match.params.id);
    return (
      <div className="Smurf">
        <h3>{smurf.name}</h3>
        <strong>{smurf.height} tall</strong>
        <p>{smurf.age} smurf years old</p>
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

