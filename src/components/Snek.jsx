import React from 'react';
import SnekPoint from './SnekPoint';

const Snek = ({ snekDot }) => {
  return <div id="snek">
    {snekDot.map((item, i) => {
      return <SnekPoint pos={item} key={i} />
    })}
  </div>
}

export default Snek