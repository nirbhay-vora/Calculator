import React from 'react'
import Col from 'react-bootstrap/Col';
import { ACTIONS } from './App';

const OperationButton = ({operation,dispatch}) => {
  return (
    <Col className="calc-item" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPRERATION,payload:{operation}})}>{operation}</Col>
  )
}

export default OperationButton