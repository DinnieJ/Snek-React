import React from 'react';
import { useSelector } from 'react-redux';
import { PIXEL_SIZE } from '../constants/app.constant';


const SnekPoint = ({ pos }) => {

  const isGameOver = useSelector(state => state.isGameOver)
  const turbo = useSelector(state => state.turbo)
  let pointLocation = () => ({
    left: pos.x * PIXEL_SIZE,
    top: pos.y * PIXEL_SIZE
  })
  return ( <div className={ `point ${isGameOver ? 'game-over' : 'snek-point'} ${ turbo ? 'snek-point--turbo' : '' }` } style={pointLocation()}></div> );
}
 
export default SnekPoint;