import React from 'react';
import Navbar from '../NavBar/NavBar';
import style from './About.module.css';

export default function About() {
	return (
		<>
			<Navbar />
			<div className={style.mainContainer}>
				<div className={style.aboutContainer}>
					<h1>Pi Pokemon 30A - Jose Manrique</h1>
					<p>
						Proyecto individual para el Bootcamp Henry. Se trata de una
						aplicación en la cual consulto datos a una API externa (PokeAPI)
						para mostrar toda la información relacionada con los pokemons, así
						mismo me permite crear nuevos pokemons y guardarlos en mi base de
						datos. Todos los estilos son creados usando module.css.
						<br /> Para realizar la aplicación he usado las siguientes
						tecnologías:
						<br /> <strong>Frontend:</strong> React y Redux <br />
						<strong>Backend:</strong> Node.js y Express.js <br />
						<strong>Base de datos:</strong> PostgreSQL y Sequelize
					</p>
				</div>
			</div>
		</>
	);
}
