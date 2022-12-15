import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonFilter } from '../../redux/slice/pokemonSlice';
import style from './TabsFilter.module.css';

export default function TabsFilter({
	paginado,
	activated,
	fnActivated,
	paginadoActivated,
	cacheFilters,
}) {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.pokemon.loading);

	const handlerClick = (event) => {
		const clicked = event.target.name;
		cacheFilters('tabs', clicked);
		fnActivated(clicked);
		paginadoActivated();
		paginado(1);
		dispatch(pokemonFilter(clicked));
	};

	return (
		<>
			{loading ? null : (
				<div className={style.mainContainer}>
					<button
						name='All'
						onClick={handlerClick}
						className={`${style.buttonIzq} ${
							activated.All ? style.active : style.buttonClass
						}`}
					>
						All pokemons
					</button>
					<button
						name='Existing'
						onClick={handlerClick}
						className={activated.Existing ? style.active : style.buttonClass}
					>
						Existing
					</button>
					<button
						name='Created'
						onClick={handlerClick}
						className={`${
							activated.Created ? style.active : style.buttonClass
						} ${style.buttonDer}`}
					>
						Created
					</button>
				</div>
			)}
		</>
	);
}
