import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TaskManager() {
  const [textboxes, setTextboxes] = useState([]);
  const [isAddingText, setIsAddingText] = useState(false);
  const [newText, setNewText] = useState({ title: '', subtitle: '' });
  const [editingId, setEditingId] = useState(null);
  const [titleWarning, setTitleWarning] = useState('');

  const handleAddTextbox = () => {
    if (newText.title.trim() === '') {
      setTitleWarning('Title cannot be empty!');
      return;
    } else {
      setTitleWarning('');
    }

    if (editingId !== null) {
      const updatedTextboxes = textboxes.map((textbox) =>
        textbox.id === editingId ? { ...newText, id: editingId } : textbox
      );
      setTextboxes(updatedTextboxes);
      setEditingId(null);
    } else {
      setTextboxes([...textboxes, { ...newText, id: textboxes.length + 1 }]);
    }

    setNewText({ title: '', subtitle: '' });
    setIsAddingText(false);
  };

  const handleAddNewText = () => {
    setIsAddingText(true);
  };

  const handleDeleteTextbox = (id) => {
    const updatedTextboxes = textboxes.filter((textbox) => textbox.id !== id);
    setTextboxes(updatedTextboxes);
    setEditingId(null);
  };

  const handleEditTextbox = (id) => {
    const textboxToEdit = textboxes.find((textbox) => textbox.id === id);
    setNewText({ title: textboxToEdit.title, subtitle: textboxToEdit.subtitle });
    setEditingId(id);
    setIsAddingText(true);
  };

  const handleTextboxChange = (field, value) => {
    setNewText((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mt-4">
      <div className='button-container'>
        <h2>TASK MANAGER</h2>
        <button className="add-task-btn" onClick={handleAddNewText}>
          Add New Task
        </button>
      </div>
      <div>
        {textboxes.map((textbox) => (
          <div key={textbox.id} className="form-group">
            <div className='abcd'>
              <div className='edit-delete-container'>
                <h5>{textbox.title}</h5>
                <div>{textbox.subtitle}</div>
              </div>
              <div className='edit-delete-container'>
                <button className="edit-btn" onClick={() => handleEditTextbox(textbox.id)}>
                  Edit
                </button>
                <button className="dlt-btn2" onClick={() => handleDeleteTextbox(textbox.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {isAddingText && (
          <div className="form-group">
            <div className='abcd'>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={newText.title}
                  onChange={(e) => handleTextboxChange('title', e.target.value)}
                />
                {titleWarning && <div className="warning">{titleWarning}</div>}
                <input
                  type="text"
                  placeholder="Subtitle"
                  className="form-control mb-2"
                  value={newText.subtitle}
                  onChange={(e) => handleTextboxChange('subtitle', e.target.value)}
                />
              </div>
              <div className='edit-delete-container'>
                <button className="add-btn2" onClick={handleAddTextbox}>
                  {editingId !== null ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskManager;
