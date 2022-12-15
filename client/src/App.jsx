import './App.css';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon.jsx';
import About from './components/About/About';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	//*Cache filters
	const [filters, setFilters] = useState({
		name: false,
		page: 1,
		type: 'Select type',
		order: 'Select filter',
		tabs: 'All',
	});

	const cacheFilters = (key, value, value2 = 1, value3 = false) => {
		setFilters({
			...filters,
			name: value3,
			page: value2,
			[key]: value,
		});
	};

	const cacheFiltersReset = () => {
		setFilters({
			name: false,
			page: 1,
			type: 'Select type',
			order: 'Select filter',
			tabs: 'All',
		});
	};

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					{/* <Route path='*' element={<PageNotFound />} />
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/tienda/producto/:id' element={<ProductsDetail />} /> */}
					<Route path={'/'} element={<Landing />} />
					<Route
						path={'home'}
						element={
							<Home
								cacheFilters={cacheFilters}
								filters={filters}
								cacheFiltersReset={cacheFiltersReset}
							/>
						}
					/>
					<Route path={'home/:id'} element={<Detail />} />
					<Route path={'pokecreate'} element={<CreatePokemon />} />
					<Route path={'about'} element={<About />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
