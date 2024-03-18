import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManager from './TaskManager';
import NewValue from './app2';

const App = () => {
  return (
      <div className='total'>
        <div className='new-val'><NewValue/>
        </div>
        <TaskManager/>
      </div>
  );
}

export default App;