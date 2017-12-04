import React, { Component } from 'react';


class Child extends Component {

  change(){
    if (this.props.poop.make === 'Honda') {
      return (
        <p>It's a Honda Yo!</p>
      )
    }
    else{
      return <p>It's not a Honda :(</p>
    }
  }

  render() {
    return (
      <div>
        <p>{this.change()}</p>
      </div>
    );
  }
}

export default Child;
