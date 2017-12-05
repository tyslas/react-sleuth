import React, {Component} from 'react'
import RankList from './RankList/RankList'

class RankBG extends Component {
  render() {
    return (
      <div className="rank-container">
        <h1>ISP Rankings</h1>
        <RankList />
      </div>
    )
  }

}

export default RankBG
