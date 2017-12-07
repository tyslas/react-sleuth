import React from 'react';

const History = (props) => {
    return (
      <ul className="list-group">
        <h3 className="list-group-item"><span className="label label-default">{props.dl_speed} Mbps</span> {props.time_stamp}</h3>
      </ul>
    );

}

export default History;
