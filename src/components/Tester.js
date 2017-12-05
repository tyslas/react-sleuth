import React, {Component} from 'react';

var mama = false;

class Tester extends Component {

  dude(){
    if(mama){
        return <p>hjiccioandcnovqovno</p>
    }
  }

  render() {
    return ( <div>
      <form onSubmit={this.props.fun}>
        <input type="text" name="owner"></input>
        <button>Run Test</button>
        <p>{this.props.data.car.make}</p>
        <p>{this.props.data.car.owner}</p>
      </form>
      </div>
    );
  }
}

export default Tester;
