import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterTypes,
	orderFilter,
	refreshTypes,
} from '../../redux/slice/pokemonSlice';
import style from './Filterbutton.module.css';

export default function Filterbutton({
	defaultOption,
	name,
	all,
	opciones,
	paginado,
	ordenado,
	paginadoActivated,
	cacheFilters,
	filters,
}) {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.pokemon.loading);

	const handlerChange = async (event) => {
		const targetName = event.target.name;
		const targetValue = event.target.value;
		paginadoActivated();
		switch (targetName) {
			case 'Types':
				paginado(1);
				cacheFilters('type', targetValue);
				targetValue === 'All types'
					? dispatch(refreshTypes())
					: dispatch(filterTypes(targetValue));
				break;

			default:
				paginado(1);
				cacheFilters('order', targetValue);
				ordenado(targetValue);
				dispatch(orderFilter(targetValue));
				break;
		}
	};

	function capitalize(word) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	}

	return (
		<>
			{loading ? null : (
				<div>
					<select
						className={style.selectButton}
						defaultValue={name === 'Types' ? filters.type : filters.order}
						name={name}
						id={name}
						onChange={handlerChange}
					>
						<option hidden key={defaultOption} value={defaultOption}>
							{defaultOption}
						</option>

						<option key={all} value={all}>
							{all}
						</option>
						{opciones?.map((element) => (
							<option key={element} value={element}>
								{capitalize(element)}
							</option>
						))}
					</select>
				</div>
			)}
		</>
	);
}
