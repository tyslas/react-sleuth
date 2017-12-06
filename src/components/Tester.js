import React, {Component} from 'react';
import './Tester.css';

class Tester extends Component {
  selectGif() {
    let gifs = [
      // "http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-4.gif",
      // "https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif",
      "http://i.giftrunk.com/44frgm.gif",
      // "https://www.demilked.com/magazine/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-14.gif"
    ]
    let num = Math.floor(Math.random() * gifs.length);
    return gifs[num];
  }

  // getSpeedClass() {
  //   if(this.props.calculating)
  // }

  isCalculating() {
    if (this.props.calculating) {
      this.props.runTest();
      return (<div className="aligner">
        <img className="card-img-top test-running" src={this.selectGif()}/>
        <p className="while-running">{this.props.currentSpeed} Mbps</p>
      </div>)
    } else {
      if(this.props.connection === false){
        return (<div className="aligner">
          <img className="card-img-top test-running" src='https://c402277.ssl.cf1.rackcdn.com/photos/6526/images/hero_small/sloth_%28c%29_Jorge_Salas_International_Expeditions.JPG?1394634201'/>
          <p>Check your Interent Connection</p>
        </div>)
      }
      return (<div className="aligner">
        <img className="card-img-top test-running" src="https://media.mnn.com/assets/images/2017/01/Sloth-Hanging-Tree-Branch.jpg.638x0_q80_crop-smart.jpg" />
        <p className="done-running">{this.props.testSpeed} Mbps</p>
      </div>)
    }
  }

  render() {
    return (<div className="card border-tester">
      {this.isCalculating()}
      <div className="card-body aligner">
        {/* <h4 className="card-title">Run Sleuth</h4> */}
      <form onSubmit={this.props.calculate}>
        <button className="btn btn-primary">Run Sleuth</button>
      </form>
        {/* {this.isCalculating()} */}
    </div>
    </div>);
  }
}

export default Tester;
