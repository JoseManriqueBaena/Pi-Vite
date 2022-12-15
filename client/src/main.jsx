import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store/index';
// import dotenv from 'dotenv';
// dotenv.config();
// const { VITE_LOCAL } = process.env;

axios.defaults.baseURL =
	process.env.VITE_DEPLOY || import.meta.env.VITE_LOCAL_URL;
// axios.defaults.baseURL = import.meta.env.VITE_LOCAL_URL;
// console.log(import.meta.env.VITE_LOCAL_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
