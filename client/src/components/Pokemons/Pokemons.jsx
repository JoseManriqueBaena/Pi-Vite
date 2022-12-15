import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllImgTypes } from '../../redux/slice/pokemonSlice';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import style from './Pokemons.module.css';

export default function Cards({ pokemons }) {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.pokemon.loading);
	const imgTypes = useSelector((state) => state.pokemon.imgTypes);

	useEffect(() => {
		if (imgTypes?.length === 0) dispatch(getAllImgTypes());
	}, [dispatch, imgTypes]);

	if (loading) return <Loading />;

	return (
		<>
			<div>
				<div className={style.mainContainer}>
					{pokemons?.length ? (
						pokemons?.map((pokemon) => (
							<Card
								key={pokemon.id}
								id={pokemon.id}
								pokedex={pokemon.pokedex}
								attack={pokemon.attack}
								defense={pokemon.defense}
								name={pokemon.name}
								img={pokemon.img}
								types={pokemon.types}
								Types={pokemon.Types} //Types de los pokemons creados(en mayus -.-)
								typesImg={pokemon.types?.map((type) => {
									let img = imgTypes?.find((imgtype) => imgtype.type === type);
									return img;
								})}
								imgDbPokemon={
									pokemon?.crateInDb
										? pokemon.Types?.map((type) => {
												let img = imgTypes?.find(
													(imgtype) => imgtype.type === type.name
												);
												return img;
										  })
										: undefined
								}
								crateInDb={pokemon.crateInDb}
							/>
						))
					) : (
						<NotFound />
					)}
				</div>
			</div>
		</>
	);
}
