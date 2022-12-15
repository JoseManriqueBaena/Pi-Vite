import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonId, getAllImgTypes } from '../../redux/slice/pokemonSlice';
import IconSword from '../../img/icon_sword.svg';
import IconShield from '../../img/icon_shield.svg';
import IconHp from '../../img/icon_hp.svg';
import IconSpeed from '../../img/icon_speed.svg';
import IconWeight from '../../img/icon_weight.svg';
import IconHeight from '../../img/icon_height.svg';
import IconShinyOn from '../../img/icon_shiny_on.svg';
import IconShinyOff from '../../img/icon_shiny_off.svg';
import IconArrow from '../../img/icon_arrow.svg';
import style from './Detail.module.css';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function Detail() {
	const [shiny, setShiny] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const pokeDetail = useSelector((state) => state.pokemon.pokeDetail);
	const loading = useSelector((state) => state.pokemon.loading);
	const imgTypes = useSelector((state) => state.pokemon.imgTypes);

	useEffect(() => {
		dispatch(getPokemonId(id));
		if (imgTypes.length === 0) dispatch(getAllImgTypes());
	}, [dispatch, id, imgTypes]);

	const images = pokeDetail.crateInDb
		? pokeDetail.Types?.map((type) =>
				imgTypes.find((imgType) => imgType.type === type.name)
		  )
		: pokeDetail.types?.map((type) =>
				imgTypes.find((imgType) => imgType.type === type)
		  );

	const handlerClick = () => {
		shiny ? setShiny(false) : setShiny(true);
	};

	if (loading) return <Loading />;

	return (
		<>
			{Object.entries(pokeDetail).length ? (
				<div className={style.mainContainer}>
					<div className={style.infoContainer}>
						<div className={style.arrowContainer}>
							<img onClick={() => navigate(-1)} src={IconArrow} alt='IconHp' />
						</div>
						<h2 className={style.pokeName}>{pokeDetail.name}</h2>
						<div className={style.statsContainer}>
							<div className={style.stats}>
								<img src={IconHp} alt='IconHp' />
								<h3>{pokeDetail.hp}</h3>
							</div>
							<div className={style.stats}>
								<img src={IconSword} alt='IconSword' />
								<h3>{pokeDetail.attack}</h3>
							</div>
							<div className={style.stats}>
								<img src={IconShield} alt='IconShield' />
								<h3>{pokeDetail.defense}</h3>
							</div>
						</div>
						{pokeDetail.imgShiny ? (
							<div className={style.imgContainers}>
								<div onClick={handlerClick} className={style.containerShiny}>
									<img
										className={style.imgshiny}
										src={shiny ? IconShinyOn : IconShinyOff}
										alt={'Shiny'}
									/>
								</div>

								<img
									className={style.imgPokemon}
									src={shiny ? pokeDetail.imgShiny : pokeDetail.img}
									alt={'Normal color'}
								/>
							</div>
						) : (
							<img
								className={style.imgPokemon}
								src={pokeDetail.img}
								alt={'Normal color'}
							/>
						)}

						<div className={style.pokedexContainer}>
							<img
								className={style.imgPokedex}
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
								alt='Pokedex icon'
							/>
							<h3 className={style.pokedex}>{pokeDetail.pokedex}</h3>
						</div>

						<div className={style.statsContainer}>
							<div className={style.stats}>
								<img src={IconHeight} alt='IconHeight' />
								<h3>{pokeDetail.height}</h3>
							</div>
							<div className={style.stats}>
								<img src={IconWeight} alt='IconWeight' />
								<h3>{pokeDetail.weight}</h3>
							</div>
							<div className={style.stats}>
								<img src={IconSpeed} alt='IconSpeed' />
								<h3>{pokeDetail.speed}</h3>
							</div>
						</div>
						{/* TYPES */}
						<div className={style.containerTypes}>
							{pokeDetail.crateInDb
								? pokeDetail.Types?.map((type) => (
										<div
											className={style.types}
											key={`${type.name} ${pokeDetail.id}`}
										>
											{images[0]?.url ? (
												<img
													src={
														images.find((element) => element.type === type.name)
															.url
													}
													alt={type.name}
												/>
											) : null}
											<h3>{type.name}</h3>
										</div>
								  ))
								: pokeDetail.types?.map((type) => (
										<div
											className={style.types}
											key={`${type} ${pokeDetail.id}`}
										>
											<img
												src={
													images.find((element) => element.type === type).url
												}
												alt={type.name}
											/>
											<h3
												className={style.types}
												key={`${pokeDetail.name} ${type}`}
											>
												{type}
											</h3>
										</div>
								  ))}
						</div>
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</>
	);
}
