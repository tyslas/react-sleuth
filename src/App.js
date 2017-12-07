import React, {Component} from 'react';
import './App.css';
import Tester from './components/Tester'
import speedTest from './speedTest'
import RankBG from './components/RankBG/RankBG'
import HistoryGB from './components/HistoryBG/HistoryBG'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      testResults: {
        IP: '',
        isp: '',
        speed: 0,
        lat: 0,
        lon: 0
      },
      calculating: false,
      allSpeeds: [],
      currentSpeed: 0,
      connection: true,
      packetIndex: 0
    }
  }

  // async componentDidMount() {
  //   const response = await fetch("https://galvanize-cors-proxy.herokuapp.com/https://infinite-beach-55234.herokuapp.com/tests/isp/Zayo%20Bandwidth")
  //   const json = await response.json()
  //   console.log(json);
  //   // this.setState({data: json["_embedded"].tests})
  // }
  //
  async addItem(data) {
    const response = await fetch("https://galvanize-cors-proxy.herokuapp.com/https://infinite-beach-55234.herokuapp.com/tests/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // this.componentDidMount();
  }

  async getISP() {
    const response = await fetch('http://ip-api.com/json/')
    const json = await response.json()
    console.log(json);
    this.setState({
      testResults: {
        IP: json.query,
        isp: json.isp,
        lat: json.lat,
        lon: json.lon
      }
    })
  }

  calculate = (e) => {
    e.preventDefault();
    this.setState({calculating: true});
    this.getISP();
  }

  runTest() {
    if (this.state.allSpeeds.length < 10) {
      speedTest(this.state.packetIndex).then(speed => {
        if (speed === 0) {
          console.log('no internet');
          this.setState({connection: false, calculating: false})
        } else {
          this.setState({connection: true})
          let newSpeeds = [...this.state.allSpeeds];
          newSpeeds.push(Number(speed))
          let newIndex = this.state.packetIndex;
          newIndex++
          this.setState({
            allSpeeds: newSpeeds,
            currentSpeed: speed,
            packetIndex: newIndex
          })
        }
      })
    } else if (this.state.allSpeeds.length >= 10) {
      let newTest = this.state.testResults;
      let data = [...this.state.allSpeeds];

      data.sort((a, b) => a - b);
      let lowMiddle = Math.floor((data.length - 1) / 2);
      let highMiddle = Math.ceil((data.length - 1) / 2);
      let median = (data[lowMiddle] + data[highMiddle]) / 2;

      newTest.speed = median.toFixed(2)
      let newArr = [];
      let postData = {
        ip: newTest.IP,
        dl_speed: newTest.speed,
        name: newTest.isp,
        lat: newTest.lat,
        long: newTest.lon
      }
      this.addItem(postData);
      this.setState({testResults: newTest, calculating: false, allSpeeds: newArr, packetIndex: 0})
      console.log(newTest);
    }
  }

  render() {
    return (<div>
      <div className="top-main">
        <div>
          <Tester testSpeed={this.state.testResults.speed} currentSpeed={this.state.currentSpeed} runTest={this.runTest.bind(this)} calculate={this.calculate} calculating={this.state.calculating} connection={this.state.connection}/>
        </div>
        <div>
          <HistoryGB/>
        </div>
      </div>
      <RankBG/>
    </div>);
  }

}

export default App;
