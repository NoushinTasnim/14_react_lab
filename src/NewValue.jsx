import React, { useState } from 'react';
import './App.css';

function NewValue() {
  const [textboxes, setTextboxes] = useState([{ id: 1, value: '', warning: '' }]);
  const [totalSum, setTotalSum] = useState(0);

  const handleAddTextbox = () => {
    const newTextbox = {
      id: textboxes.length + 1,
      value: '',
      warning: '',
    };
    setTextboxes([...textboxes, newTextbox]);
  };

  const handleDeleteTextbox = (id) => {
    const updatedTextboxes = textboxes.filter((textbox) => textbox.id !== id);
    setTextboxes(updatedTextboxes);
  };

  const handleTextboxChange = (id, value) => {
    const isValidNumber = /^\d+$/.test(value);
    const warning = !isValidNumber && value !== '' ? 'Please enter a valid number.' : '';

    const updatedTextboxes = textboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, value, warning } : textbox
    );
    setTextboxes(updatedTextboxes);
    updateTotalSum(updatedTextboxes);
  };

  const updateTotalSum = (updatedTextboxes) => {
    const sum = updatedTextboxes.reduce((acc, textbox) => acc + parseInt(textbox.value, 10) || 0, 0);
    setTotalSum(sum);
  };

  return (
    <div className="App">
        <h2>Textbox App</h2>
        {textboxes.map((textbox) => (
          <div key={textbox.id} className="textbox-container">
            <input
              type="text"
              value={textbox.value}
              onChange={(e) => handleTextboxChange(textbox.id, e.target.value)}
            />
            <button className='dlt-btn' onClick={() => handleDeleteTextbox(textbox.id)}>Delete</button>
            {textbox.warning && <div className="warning">{textbox.warning}</div>}
          </div>
        ))}
        <button className='add-btn' onClick={handleAddTextbox}>Add Textbox</button>
        <h5>Total Sum: {totalSum}</h5>
    </div>
  );
}

export default NewValue;
