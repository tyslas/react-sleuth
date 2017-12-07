import React, {Component} from 'react';
import History from './History/History'

class HistoryList extends Component {
  
  mapHistory() {
    const historyList = this.props.ipHistory
    const reversedHistList = []
    for (var i = historyList.length; i--;) {
      reversedHistList.push(historyList[i])
    }

    return reversedHistList.map((ip, index) => {
      return <History dl_speed={ip.dl_speed} time_stamp={this.props.timeStampFormatted[index]}/>
    })
  }

  render() {
    return (<div className="historyBG-container">
      <h1>Returning data for IP: {this.props.ipAddress}</h1>
      <h1>Your ISP is: {this.props.ispProvider}</h1>
      <div className="history_container">
        {this.mapHistory()}
      </div>
    </div>);
  }
}

export default HistoryList;
