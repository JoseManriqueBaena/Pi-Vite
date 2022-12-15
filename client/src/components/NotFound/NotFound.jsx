import React from 'react';
import style from './NotFound.module.css';

export default function NotFound() {
	return (
		<>
			<div className={style.mainContainer}>
				<div className={style.infoContainer}>
					<img
						className={style.image}
						src='https://i.gifer.com/XJ1C.gif'
						alt='Not Found'
					/>
					<h1 className={style.title}>
						404 POKEMONS <br /> NOT FOUND
					</h1>
				</div>
			</div>
		</>
	);
}
