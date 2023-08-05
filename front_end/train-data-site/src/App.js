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
				<Route exact path='/' element={<AllTrainWell />} />
				<Route exact path='/train/:trainnum' element={<TrainData />} />
			</Routes>
		</Router>
	);
}

export default App;
