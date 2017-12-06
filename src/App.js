import React, {Component} from 'react';
import './App.css';
import Tester from './components/Tester'
import History from './components/History'
import speedTest from './speedTest'
import Rank from './components/RankBG/RankList/Rank/Rank'
import RankList from './components/RankBG/RankList/RankList'
import RankBG from './components/RankBG/RankBG'

// http://ip-api.com/json/

const api = '';

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
  //   const response = await fetch(api)
  //   const json = await response.json()
  //   this.setState({data: json["_embedded"].tests})
  // }
  //
  async addItem(data) {
    // let testData = {
    //   ip: '128.177.113.102',
    //   dl_speed: 20.56,
    //   name: "Zayo Bandwidth",
    //   lat: "39.7525",
    //   long: "-104.9995"
    // }
    const response = await fetch("https://infinite-beach-55234.herokuapp.com/tests/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/x-www-form-urlencoded'
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
          this.setState({
            allSpeeds: newSpeeds,
            currentSpeed: speed,
            packetIndex: this.state.packetIndex++
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
      <header>Sleuth</header>
      <div className="top-main">
        <Tester testSpeed={this.state.testResults.speed} currentSpeed={this.state.currentSpeed} runTest={this.runTest.bind(this)} calculate={this.calculate} calculating={this.state.calculating} connection={this.state.connection}/>
        <History/>
      </div>
      <RankBG/>
    </div>);
  }

}

export default App;
