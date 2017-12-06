import React, {
  Component
} from 'react';
import './App.css';
import Tester from './components/Tester'
import History from './components/History'
import Rank from './components/RankBG/RankList/Rank/Rank'
import RankList from './components/RankBG/RankList/RankList'
import RankBG from './components/RankBG/RankBG'

const data = {
  car: {
    make: 'BMW',
    model: 'Civic',
    color: 'red'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: data
    }
  }

  fun = (e) => {
    e.preventDefault();
    console.log(e.target.owner.value);
    var newData = data;
    newData.car.owner = e.target.owner.value
    newData.car.make = 'Honda';
    this.setState({
      data: newData
    })
  }

  render() {
    return ( <div>
      <Tester data={this.state.data} fun={this.fun}/>
      <History />
      <RankBG />
      </div>
    );
  }
}

export default App;
