import React from 'react'
import Col from 'react-bootstrap/Col';
import { ACTIONS } from './App';

const DigitButton = ({digit,dispatch}) => {
  return (
    <Col className="calc-item" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</Col>
  )
}

export default DigitButton