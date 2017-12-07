import React, {Component} from 'react';
import './App.css';
import Tester from './components/Tester'
import History from './components/History'
import speedTest from './speedTest'
import RankBG from './components/RankBG/RankBG'

// http://ip-api.com/json/

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

  async componentDidMount() {
    let newResults = this.state.testResults;
    const response = await  fetch("https://galvanize-cors-proxy.herokuapp.com/http://httpbin.org/ip")
    const json = await response.json()
    let newIp = json.origin.split(',')
    newResults.IP = newIp[0];
    this.setState({testResults: newResults})
  }

  async addItem(data) {
    const response = await fetch("https://galvanize-cors-proxy.herokuapp.com/https://infinite-beach-55234.herokuapp.com/tests/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  async getISP() {
    let newResults = this.state.testResults;
    const response = await fetch('https://galvanize-cors-proxy.herokuapp.com/http://ip-api.com/json/' + newResults.IP)
    const json = await response.json()
    console.log(json);
    newResults.isp = json.isp;
    newResults.lat = json.lat;
    newResults.lon = json.lon;
    this.setState({testResults: newResults})
    console.log(newResults);
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
        <Tester testSpeed={this.state.testResults.speed} currentSpeed={this.state.currentSpeed} runTest={this.runTest.bind(this)} calculate={this.calculate} calculating={this.state.calculating} connection={this.state.connection}/>
        <History/>
      </div>
      <RankBG/>
    </div>);
  }

}

export default App;
