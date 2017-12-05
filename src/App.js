import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Tester from './components/Tester'
import History from './components/History'
import Rank from './components/Rank'
import speedTest from './speedTest'

// http://ip-api.com/json/

const api = '';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      testResults: {
        ISP: '',
        speed: 0
      },
      calculating: false
    }
  }

  // async componentDidMount() {
  //   const response = await fetch(api)
  //   const json = await response.json()
  //   this.setState({data: json["_embedded"].tests})
  // }
  //
  // async addItem(data){
  //   const response = await fetch(api, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   this.componentDidMount();
  // }

  // fun = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.owner.value);
  //   var newData = data;
  //   newData.car.owner = e.target.owner.value
  //   newData.car.make = 'Honda';
  //   this.setState({data: newData})
  // }

  runTest = (e) => {
    this.setState({calculating: true});
    e.preventDefault();
    let newTest = this.state.testResults;
    let allSpeeds = []
    speedTest().then(speed => {
      allSpeeds.push(speed)
      speedTest().then(speed => {
        allSpeeds.push(speed)
        speedTest().then(speed => {
          allSpeeds.push(speed)
          speedTest().then(speed => {
            allSpeeds.push(speed)
            speedTest().then(speed => {
              allSpeeds.push(speed)
              speedTest().then(speed => {
                allSpeeds.push(speed)
                speedTest().then(speed => {
                  allSpeeds.push(speed)
                  speedTest().then(speed => {
                    allSpeeds.push(speed)
                    speedTest().then(speed => {
                      allSpeeds.push(speed)
                      speedTest().then(speed => {
                        allSpeeds.push(speed)
                        let data = [];
                        allSpeeds.forEach(function(i){
                          data.push(Number(i))
                        })
                           data.sort((a, b) => a - b);
                           console.log(data);
                           let lowMiddle = Math.floor((data.length - 1) / 2);
                           let highMiddle = Math.ceil((data.length - 1) / 2);
                           let median = (data[lowMiddle] + data[highMiddle]) / 2;

                           newTest.speed = median
                           this.setState({testResults: newTest,
                           calculating: false})
                          console.log(median);
                        })})})})})})})})})})}



    render() {
      return (<div>
        <header>Sleuth</header>
        <Tester testSpeed={this.state.testResults.speed} runTest={this.runTest} calculating={this.state.calculating}/>
        <History/>
        <Rank/>
      </div>);
    }
  }

  export default App;
