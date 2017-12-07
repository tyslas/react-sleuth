import React from 'react';


const HistoryList = (props) => {
    return (
      <ul className="list-group">
        <h3 className="list-group-item titles"><span className="label label-default label-color">{props.dl_speed} Mbps</span> {props.time_stamp}</h3>
      </ul>
    );

}

export default HistoryList;
