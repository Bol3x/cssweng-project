import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './App';
import { TestApp } from './TestApp';

const root1 = ReactDOM.createRoot(document.getElementById('root1'));
root1.render(
    <StrictMode>
		<BrowserRouter>
			<TestApp />
		</BrowserRouter>
    </StrictMode>

);