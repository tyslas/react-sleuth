import React, {Component} from 'react'
import './RankList.css'
import Rank from './Rank/Rank'

class RankList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      siteList: ["XFINITY","Century Link","Zayo Bandwidth"]
    }
  }
  async componentDidMount(){
    this.getRanking()
  }

  async getRanking(){
    let tempData = []
    for(var i=0;i<this.state.siteList.length;i++){
      const response = await fetch("https://galvanize-cors-proxy.herokuapp.com/https://infinite-beach-55234.herokuapp.com/tests/isp/" + this.state.siteList[i])
      const json = await response.json()
      tempData.push(json)
    }
    let ordered = tempData.sort(function(a, b) {
      return b.dl_avg - a.dl_avg
    })
    this.setState({data: ordered})
  }

  render() {
    const order = this.state.data;
    return order.map((rank, index) => {
      return (
        <div>
          <Rank
            name={rank.name}
            dl_avg={rank.dl_avg}
            key={index}
            position={index+1}
          />
        </div>
      )
    })
  }
}

export default RankList;
