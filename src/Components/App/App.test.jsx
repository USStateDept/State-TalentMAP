import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App api={'http://localhost:8000/api/v1'} /></MemoryRouter>, div);
  global.document.getElementById = id => id === 'root' && div;
});
