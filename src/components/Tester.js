import React, {Component} from 'react';
import './Tester.css';

class Tester extends Component {

  isCalculating(){
    if (this.props.calculting) {
      return <p>Calculating</p>
    }
    else{
      return <p>{this.props.testSpeed}</p>
    }
  }

  render() {
    return ( <div>
      <form onSubmit={this.props.runTest}>
        <input type="text" name="test"></input>
        <button>Run Test</button>
      </form>

      {this.isCalculating()}
      </div>
    );
  }
}

export default Tester;
