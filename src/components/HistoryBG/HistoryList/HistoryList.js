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
      <h2 className="titles">Returning data for IP: {this.props.ipAddress}</h2>
      <h2 className="titles">Your ISP is: {this.props.ispProvider}</h2>
      <div className="history_container">
        {this.mapHistory()}
      </div>
    </div>);
  }
}

export default HistoryList;
