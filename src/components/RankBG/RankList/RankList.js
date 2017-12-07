import React, {Component} from 'react'
import './RankList.css'
import Rank from './Rank/Rank'

class RankList extends Component {

  mapRanks() {
    const order = this.props.ranks;
    return (order.map((rank, index) => {
      return (<div>
        <Rank name={rank.name} dl_avg={rank.dl_avg} key={index} position={index + 1}/>
      </div>)
    }))
  }

  render() {
    return (<div className="rank-container">
      <div>
        <h1>ISP Rankings</h1>
      </div>
      {this.mapRanks()}
    </div>)
  }
}

export default RankList;
