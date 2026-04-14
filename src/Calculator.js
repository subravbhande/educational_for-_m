import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(nextOperation);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (operation && previousValue !== null) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      
      <div className="buttons">
        <button className="btn function-btn" onClick={handleClear}>AC</button>
        <button className="btn function-btn" onClick={handleBackspace}>⌫</button>
        <button className="btn function-btn" onClick={handlePercentage}>%</button>
        <button className="btn operation-btn" onClick={() => handleOperation('/')}>÷</button>

        <button className="btn" onClick={() => handleNumberClick(7)}>7</button>
        <button className="btn" onClick={() => handleNumberClick(8)}>8</button>
        <button className="btn" onClick={() => handleNumberClick(9)}>9</button>
        <button className="btn operation-btn" onClick={() => handleOperation('*')}>×</button>

        <button className="btn" onClick={() => handleNumberClick(4)}>4</button>
        <button className="btn" onClick={() => handleNumberClick(5)}>5</button>
        <button className="btn" onClick={() => handleNumberClick(6)}>6</button>
        <button className="btn operation-btn" onClick={() => handleOperation('-')}>−</button>

        <button className="btn" onClick={() => handleNumberClick(1)}>1</button>
        <button className="btn" onClick={() => handleNumberClick(2)}>2</button>
        <button className="btn" onClick={() => handleNumberClick(3)}>3</button>
        <button className="btn operation-btn" onClick={() => handleOperation('+')}>+</button>

        <button className="btn zero-btn" onClick={() => handleNumberClick(0)}>0</button>
        <button className="btn" onClick={handleDecimal}>.</button>
        <button className="btn equals-btn" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
