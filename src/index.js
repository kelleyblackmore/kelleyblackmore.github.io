import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Buffer polyfill for libs that expect Node core modules
try {
	// eslint-disable-next-line global-require
	window.Buffer = window.Buffer || require('buffer').Buffer;
} catch (e) {
	// ignore in environments where require isn't available
}
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<HashRouter>
		<App />
	</HashRouter>
);
