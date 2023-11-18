
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AppRouter from './Router';

function App() {
	return (
		<div>
			< Navbar />
			<AppRouter>
			</AppRouter>
		</div>
	);
}

export default App;


