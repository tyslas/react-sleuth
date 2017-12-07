import React, {Component} from 'react';
import History from './History/History'

class HistoryList extends Component {
  constructor(props){
    super(props)
    this.state = {
      ipAddress: '',
      ipHistory: [],
      timeStampFormatted: []
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
    this.getIpHistory()
  }

  async getIpHistory(){
    const response = await  fetch("https://galvanize-cors-proxy.herokuapp.com/https://infinite-beach-55234.herokuapp.com/tests/"+this.state.ipAddress)
    const json = await response.json()
    this.setState({ipHistory: json})
    this.timeStampFormat()
  }

  timeStampFormat(){
    var dateArr = []
    var formatDateArr = []
    for(var i=0;i<this.state.ipHistory.length;i++){
      var jsonDate = this.state.ipHistory[i].timestamp
      var date = new Date(jsonDate);
      var dateYear = date.getFullYear()
      var dateMonth = date.getMonth() + 1
      var dateDay = date.getDate()
      var timeHours = (date.getUTCHours()<10?'0':'') + date.getUTCHours()
      var timeMinutes = (date.getUTCMinutes()<10?'0':'') + date.getUTCMinutes()
      var formatedDate = dateMonth + "/" + dateDay + "/" +dateYear + " " + timeHours + ":" + timeMinutes
      dateArr.push(formatedDate)
    }

    for(var i = dateArr.length; i--;){
      formatDateArr.push(dateArr[i])
    }
    
    this.setState({timeStampFormatted: formatDateArr})
  }

  render() {
    const historyList = this.state.ipHistory
    return historyList.map((ip,index)=>{
      return (
        <History
          dl_speed={ip.dl_speed}
          // time_stamp={ip.timestamp}
          time_stamp={this.state.timeStampFormatted[index]}
        />
      );
    })
  }
}

export default HistoryList;
