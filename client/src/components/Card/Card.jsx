import React from 'react';
import style from './Card.module.css';
import IconSword from '../../img/icon_sword.svg';
import IconSwordWhite from '../../img/icon_sword_white.svg';
import IconShield from '../../img/icon_shield.svg';
import IconShieldWhite from '../../img/icon_shield_white.svg';
import { Link } from 'react-router-dom';

function Card({
	id,
	pokedex,
	name,
	attack,
	defense,
	img,
	types,
	typesImg,
	crateInDb,
	Types,
	imgDbPokemon,
}) {
	let color1 = imgDbPokemon
		? imgDbPokemon[0].color
		: typesImg && typesImg[0].color;

	let color2;

	if (imgDbPokemon) {
		color2 = imgDbPokemon[1] ? imgDbPokemon[1].color : '#F0F0F0';
	} else {
		color2 = typesImg[1] ? typesImg[1].color : '#F0F0F0';
	}

	return (
		<>
			<div className={style.container}>
				<div className={style.mainContainer}>
					<div
						className={style.card1}
						style={{ '--color1': color1, '--color2': color2 }}
					>
						<Link className={style.linkCard} to={`/home/${id}`}>
							<div className={style.cardCircle}>
								<h2 className={style.pokeName}>{name}</h2>
								<div className={style.statsContainer}>
									<div className={style.stats}>
										<img
											className={style.iconBlack}
											src={IconSword}
											alt='IconShield'
										/>
										<img
											className={style.iconWhite}
											src={IconSwordWhite}
											alt='IconSwordWhite'
										/>
										<h3>{attack}</h3>
									</div>
									<div className={style.stats}>
										<img
											className={style.iconBlack}
											src={IconShield}
											alt='IconShield'
										/>
										<img
											className={style.iconWhite}
											src={IconShieldWhite}
											alt='IconShieldWhite'
										/>
										<h3>{defense}</h3>
									</div>
								</div>

								<img className={style.imgPokemon} src={img} alt={'Pokemon'} />
								<div className={style.pokedexContainer}>
									<img
										className={style.imgPokedex}
										src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
										alt='Pokedex icon'
									/>
									<h3 className={style.pokedex}>{pokedex}</h3>
								</div>

								<div className={style.containerTypes}>
									{crateInDb
										? Types?.map((type) => (
												<div className={style.types} key={`${type.name} ${id}`}>
													{imgDbPokemon[0]?.url ? (
														imgDbPokemon[0]?.type === type.name ? (
															<img
																src={imgDbPokemon[0].url}
																alt={imgDbPokemon[0].url}
															/>
														) : (
															<img
																src={imgDbPokemon[1].url}
																alt={imgDbPokemon[1].url}
															/>
														)
													) : null}
													<p>{type.name}</p>
												</div>
										  ))
										: types?.map((type) => (
												<div className={style.types} key={`${type} ${id}`}>
													{typesImg[0]?.type === type ? (
														<img src={typesImg[0].url} alt={typesImg[0].url} />
													) : null}
													{typesImg[1]?.type === type ? (
														<img src={typesImg[1].url} alt={typesImg[1].url} />
													) : null}
													<p className={style.types} key={`${name} ${type}`}>
														{type}
													</p>
												</div>
										  ))}
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;

/* 
style={{ '--color1': color1, '--color2': color2 }}
*/
