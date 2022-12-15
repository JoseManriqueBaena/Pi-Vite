import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsName } from '../../redux/slice/pokemonSlice';
import style from './SearchBar.module.css';

export default function SearchBar({ paginado, cacheFilters }) {
	const [pokemonName, setPokemonName] = useState('');
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.pokemon.loading);

	const handlerChange = (event) => {
		setPokemonName(event.target.value);
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		cacheFilters('page', 1, 1, true);
		dispatch(getPokemonsName(pokemonName));
		setPokemonName('');
		paginado(1);
	};

	return (
		<>
			{loading ? null : (
				<div>
					<form onSubmit={handlerSubmit}>
						<input
							className={style.inputSearch}
							type='text'
							name='pokemon'
							id='pokemon'
							value={pokemonName}
							placeholder='Search pokemon...'
							onChange={handlerChange}
							required
						/>
						<button className={style.buttonSearch} type='submit'>
							Search
						</button>
					</form>
				</div>
			)}
		</>
	);
}
