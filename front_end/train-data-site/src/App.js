import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import AllTrainWell from './pages';
import TrainData from './pages/train';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<AllTrainWell />} />
				<Route path='/train/?s=' element={<TrainData TrainNumber = {s}/>} />
			</Routes>
		</Router>
	);
}

export default App;
