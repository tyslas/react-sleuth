import React, {Component} from 'react'
import classes from './RankList.css'
import Rank from './Rank/Rank'

const obj1 = {
  name: "XFINITY",
  dl_avg: 65
}
const obj2 = {
  name: "Century Link",
  dl_avg: 30
}
const obj3 = {
  name: "zayo",
  dl_avg: 95
}
const obj4 = {
  name: "verizon",
  dl_avg: 100
}
const obj5 = {
  name: "time warner",
  dl_avg: 12
}


class RankList extends Component {

  order = () => {
    let arr = []
    let xf = obj1;
    let cl = obj2;
    let z = obj3;
    let v = obj4;
    let tw = obj5;
    arr.push(xf, cl, z, v, tw)
    let ordered = arr.sort(function(a, b) {
      return b.dl_avg - a.dl_avg
    })
    return ordered
  }

  render() {
    const order = this.order();

    return order.map((rank, index) => {
      return (
        <div>
          <Rank
            name={rank.name}
            dl_avg={rank.dl_avg}
            key={index}
            position={index+1} />
        </div>
      )
    })
  }
}

export default RankList;
