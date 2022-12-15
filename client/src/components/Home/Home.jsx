import React, { useEffect, useState } from 'react';
import Pokemons from '../Pokemons/Pokemons';
import SearchBar from '../SearchBar/SearchBar';
import Filterbutton from '../Filterbutton/Filterbutton';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllPokemons,
	getAllTypes,
	orderFilter,
	refresh,
	setNewPokemon,
} from '../../redux/slice/pokemonSlice';
import style from './Home.module.css';
import TabsFilter from '../TabsFilter/TabsFilter';
import Pages from '../Pages/Pages';
import Navbar from '../NavBar/NavBar';

function Home({ cacheFilters, filters, cacheFiltersReset }) {
	const dispatch = useDispatch();
	const allTypes = useSelector((state) => state.pokemon.types);
	const pokemons = useSelector((state) => state.pokemon.pokemonsFiltered);
	const loading = useSelector((state) => state.pokemon.loading);
	const newPokemon = useSelector((state) => state.pokemon.newPokemon);
	// eslint-disable-next-line
	const [order, setOrder] = useState('');
	const [activatedPage, setActivatedPage] = useState({
		1: true,
	});
	const [activatedTabs, setActivatedTabs] = useState({
		[filters.tabs]: true,
	});
	//*paginado
	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line
	const [maxPokemonsPage, setMaxPokemonsPage] = useState(12);
	const lastPokemon = currentPage * maxPokemonsPage;
	const firstPokemon = lastPokemon - maxPokemonsPage;
	const pokemonsPerPage = pokemons?.slice(firstPokemon, lastPokemon);

	//*Volver a la página
	const paginado = (page) => {
		setCurrentPage(page);
	};

	//*Hover pagina
	const paginadoActivated = (value = 1) => {
		const clicked = value;
		setActivatedPage({
			[clicked]: true,
		});
	};

	let maxPages = Math.ceil(pokemons?.length / maxPokemonsPage);
	//*Next
	const nextPage = () => {
		if (currentPage < maxPages) {
			setCurrentPage(currentPage + 1);
			paginadoActivated(currentPage + 1);
			cacheFilters('page', currentPage + 1);
		}
	};
	//*Prev
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			paginadoActivated(currentPage - 1);
			cacheFilters('page', currentPage - 1);
		}
	};
	const ordenado = (value) => {
		setOrder(`Ordenado ${value}`);
	};
	//*Hover tabs
	const tabsActivated = (clicked) => {
		setActivatedTabs({
			[clicked]: true,
		});
	};
	//*Handler refresh
	const handleClick = () => {
		cacheFiltersReset();
		paginado(1);
		paginadoActivated(1);
		tabsActivated('All');
		dispatch(refresh());
		dispatch(orderFilter('Ascending pokedex'));
	};

	useEffect(() => {
		if (!allTypes?.length) dispatch(getAllTypes());

		if (filters.page !== 1) {
			paginado(filters.page);
			paginadoActivated(filters.page);
		}

		if (!pokemons?.length || newPokemon) {
			cacheFiltersReset();
			paginado(1);
			paginadoActivated(1);
			dispatch(getAllPokemons());
			dispatch(setNewPokemon());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, newPokemon]);

	return (
		<>
			<Navbar />
			<div className={style.mainContainer}>
				{
					<div className={style.filterContainer}>
						<TabsFilter
							paginado={paginado}
							activated={activatedTabs}
							fnActivated={tabsActivated}
							paginadoActivated={paginadoActivated}
							cacheFilters={cacheFilters}
						/>
						<Filterbutton
							defaultOption={'Select type'}
							name={'Types'}
							all={'All types'}
							opciones={allTypes?.map((type) => type.name)}
							paginado={paginado}
							ordenado={ordenado}
							paginadoActivated={paginadoActivated}
							cacheFilters={cacheFilters}
							filters={filters}
						/>
						<Filterbutton
							defaultOption={'Select filter'}
							name={'Order'}
							all={'Ascending pokedex'}
							opciones={['Descending pokedex', 'A to Z', 'Z to A']}
							paginado={paginado}
							ordenado={ordenado}
							paginadoActivated={paginadoActivated}
							cacheFilters={cacheFilters}
							filters={filters}
						/>

						<Filterbutton
							defaultOption={'Select filter'}
							name={'Attack'}
							all={'Max attack'}
							opciones={['Min attack', 'Max defense', 'Min defense']}
							paginado={paginado}
							ordenado={ordenado}
							paginadoActivated={paginadoActivated}
							cacheFilters={cacheFilters}
							filters={filters}
						/>
						<SearchBar paginado={paginado} cacheFilters={cacheFilters} />
						{loading ? null : (
							<button className={style.buttonRefresh} onClick={handleClick}>
								Refresh
							</button>
						)}
					</div>
				}
				<Pokemons pokemons={pokemonsPerPage} />
				{pokemons?.length <= 12 ? undefined : (
					<Pages
						activated={activatedPage}
						paginadoActivated={paginadoActivated}
						maxPokemonsPage={maxPokemonsPage}
						pokemons={pokemons?.length}
						paginado={paginado}
						currentPage={currentPage}
						maxPages={maxPages}
						nextPage={nextPage}
						prevPage={prevPage}
						cacheFilters={cacheFilters}
					/>
				)}
			</div>
		</>
	);
}
export default Home;
