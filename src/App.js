import React, { useState } from 'react'
import Fade from 'react-reveal/Slide'

const App = () => {

  const [equation, setEquation] = useState('0')
  const [acButton, SetAcButton] = useState('AC')
  const [output, setOutput] = useState('0')
  const [equals, setEquals] = useState('false')

  function createEquation(event) {

    if (equals === 'true') {
      setEquation('0')
      setOutput('0')
      setEquals('false')
      SetAcButton('AC')
    }

    if (equation.length > 0) {
      SetAcButton('C')
    }

    if (equals === 'false') {

      const x = event.target.value

      // RESET TO 0
      if (x === 'c') {
        setEquation('0')
        commafy('0')
        SetAcButton('AC')
      }
      // CHECK IF LAST CHAR IS NOT A NUMBER WHEN EQUALS (CHECK FOR FALSE EQUALS)
      else if (x === 'eq' && equation.slice(-1).match(/^[0-9]+$/) === null) {
        return
      }
      // EQUALS
      else if (x === 'eq') {
        const s = String(eval(equation))
        setEquation(s)
        commafy(s)
        setEquals('true')
      }
      // PERCENTAGE OF DIGITS (/ 100)
      else if (equation.length > 0 && x === 'perc' && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        const s = String(eval(equation / 100))
        setEquation(s)
        commafy(s)
      }
      // POSITIVE NUMBER TO NEGATIVE
      else if (x === 'posneg' && equation.length > 0 && Math.sign(Number(equation) && equation.slice(-1).match(/^[0-9]+$/) !== null) === 1) {
        const n = Number(equation)
        setEquation(String(n - (n * 2)))
        commafy(String(n - (n * 2)))
      }
      // NEGATIVE NUMBER TO POSITIVE
      else if (x === 'posneg' && equation.length > 0 && Math.sign(Number(equation)) === -1 && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        const n = Number(equation)
        setEquation(String(Math.abs(n)))
        commafy(String(Math.abs(n)))
      }
      // ZERO NEGATIVE / POSITIVE
      else if (x === 'posneg' && equation === '0' && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        setEquation('-0')
        commafy('-0')
      }
      else if (x === 'posneg' && equation === '-0' && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        setEquation('0')
        commafy('0')
      }
      // ADDING DECIMAL DOT AND EQUATION IS MORE THAN 0 AND NOT DOT IN EQUATION
      else if (x === '.' && equation.length > 0 && !equation.includes('.') && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        setEquation(equation + x)
        commafy(equation + x)
      }
      // EQUATION IS ZERO AND IS A NUMBER (FOR STARTING DIGITS)
      else if (equation === '0' && x.match(/^[0-9]+$/) !== null) {
        setEquation(x)
        commafy(x)
      }
      // EQUATION IS GREATER THAN 0 IS A NUMBER (FOR CONCURRENT DIGITS)
      else if (equation.length > 0 && x.match(/^[0-9]+$/) !== null) {
        setEquation(equation + x)
        commafy(equation + x)
      }
      // GREATER THAN 0 AND IS NOT A NUMBER AND EQUATION LAST CHAR IS A NUMBER (FOR OPERANDS)
      else if (equation.length > 0 && x.match(/^[0-9]+$/) === null && equation.slice(-1).match(/^[0-9]+$/) !== null) {
        if (x === '+') {
          setEquation(equation + x)
          commafy(equation + x)
        }
        else if (x === '-') {
          setEquation(equation + x)
          commafy(equation + x)
        }
        else if (x === '*') {
          setEquation(equation + x)
          commafy(equation + x)
        }
        else if (x === '/') {
          setEquation(equation + x)
          commafy(equation + x)
        }
      }
      else {
        return
      }

    }

  }

  // GIVE THE OUTPUT EQUATION COMMAS
  function commafy(num) {
    var str = num.toString().split('.')

    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ')
    }

    const x = str.join('.')

    if (x.includes('/')) {
      const c = x.replace('/', '÷')
      setOutput(c)
    }
    else if (x.includes('*')) {
      const c = x.replace('*', '×')
      setOutput(c)
    }
    else {
      setOutput(x)
    }

  }


  return <Fade up>

    <div className="iphone">

      <div className="calculator">

        <div className="upper">
          <p id={equation.length < 5 ? 'output' : 'output-small'} ><span>{output}</span></p>
        </div>

        <div className="lower">

          <button className="c" value="c" onClick={createEquation} >{acButton}</button>
          <button className="posneg" value="posneg" onClick={createEquation}>+/-</button>
          <button className="perc" value="perc" onClick={createEquation}>%</button>
          <button className="div" value="/" onClick={createEquation}>÷</button>
          <button className="sev" value="7" onClick={createEquation} >7</button>
          <button className="eigh" value="8" onClick={createEquation} >8</button>
          <button className="nine" value="9" onClick={createEquation} >9</button>
          <button className="mult" value="*" onClick={createEquation}>×</button>
          <button className="four" value="4" onClick={createEquation}>4</button>
          <button className="five" value="5" onClick={createEquation}>5</button>
          <button className="six" value="6" onClick={createEquation}>6</button>
          <button className="min" value="-" onClick={createEquation}>-</button>
          <button className="one" value="1" onClick={createEquation}>1</button>
          <button className="two" value="2" onClick={createEquation}>2</button>
          <button className="three" value="3" onClick={createEquation}>3</button>
          <button className="plus" value="+" onClick={createEquation}>+</button>
          <button className="zero" style={{ width: '7rem', borderRadius: '80px' }} value="0" onClick={createEquation}>0</button>
          <button className="dot" value="." onClick={createEquation}>.</button>
          <button className="eq" value="eq" onClick={createEquation}>=</button>

        </div>

      </div>

    </div>

  </Fade>
}

export default App

