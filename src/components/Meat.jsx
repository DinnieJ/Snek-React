import React, { useState } from 'react';
import { PIXEL_SIZE } from '../constants/app.constant';


const Meat = ({ pos }) => {
  let pointLocation = () => ({
    left: pos.x * PIXEL_SIZE,
    top: pos.y * PIXEL_SIZE
  })
  return (<div className="point meat" style={pointLocation()}></div>);
}
 
export default Meat;