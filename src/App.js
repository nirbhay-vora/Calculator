import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPRERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

const reducer = (state, { type, payload }) => {

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.override) {
        return {
          ...state,
          currentOperand: payload.digit,
          override: false
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes('.')) {
        return state
      }


      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPRERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,

        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null

      }

    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }

      return {
        ...state,
        override: true,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),

      }

    case ACTIONS.DELETE_DIGIT:
      if (state.override) {
        return {
          ...state,
          override: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      default:
        return {...state}
  }
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})
function formatter(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
const evaluate = ({ currentOperand, previousOperand, operation }) => {
  let curr = parseFloat(currentOperand)
  let prev = parseFloat(previousOperand)
  if (isNaN(currentOperand) || isNaN(previousOperand)) {
    return ""
  }

  let computation = ""
  switch (operation) {
    case '+':
      computation = prev + curr
      break
    case '-':
      computation = prev - curr
      break
    case '*':
      computation = prev * curr
      break
    case '÷':
      computation = prev / curr
      break
    default:
      computation = 0
  }
  return computation.toString()
}



function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="body-div">

      <Container className="bg-dark text-white border calc">
        <Row className="output">
          <Col className="previous-operand">{formatter(previousOperand)} {operation}</Col>
          <Col className="current-operand">{formatter(currentOperand)}</Col>
        </Row>
        <Row>
          <Col className="calc-item" sm={6} onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</Col>
          <Col className="calc-item" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</Col>
          <OperationButton operation="÷" dispatch={dispatch} />
        </Row>

        <Row>
          <DigitButton digit='1' dispatch={dispatch} />
          <DigitButton digit='2' dispatch={dispatch} />
          <DigitButton digit='3' dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
        </Row>

        <Row>
          <DigitButton digit='4' dispatch={dispatch} />
          <DigitButton digit='5' dispatch={dispatch} />
          <DigitButton digit='6' dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
        </Row>

        <Row>
          <DigitButton digit='7' dispatch={dispatch} />
          <DigitButton digit='8' dispatch={dispatch} />
          <DigitButton digit='9' dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
        </Row>

        <Row>
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <Col className='equalTwo' sm={6} onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</Col>

        </Row>
      </Container>
    </div>
  );
}

export default App;
