import React, {Component} from 'react'
import HistoryList from './HistoryList/HistoryList'

class HistoryBG extends Component {
  constructor(props){
    super(props)
    this.state = {
      ipAddress: ''
    }
  }

  async componentDidMount(){
    this.getIp()
  }

  async getIp() {
    const response = await  fetch("https://galvanize-cors-proxy.herokuapp.com/http://httpbin.org/ip")
    const json = await response.json()
    let newIp = json.origin.split(',')
    let newResults = newIp[0];
    this.setState({ipAddress: newResults})
  }

  render() {
    return (
      <div>
        <h1>Returning data for IP: {this.state.ipAddress}</h1>
        <div className="history_container">
          <HistoryList />
        </div>
      </div>
    )
  }

}

export default HistoryBG
