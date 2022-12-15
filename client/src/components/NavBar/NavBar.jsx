import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

function Navbar(props) {
	return (
		<>
			<nav className={style.navContainer}>
				<div className={style.mainContainer}>
					<div>
						<Link to={'/'}>
							<img
								src='https://1000marcas.net/wp-content/uploads/2020/01/Pokemon-Logo.png'
								alt='Poke Logo'
							/>
						</Link>
					</div>
					<div className={style.linksContainer}>
						<Link className={style.classLink} to={'/home'}>
							Home
						</Link>
						<Link className={style.classLink} to={'/pokecreate'}>
							Create pokemon
						</Link>
						<Link className={style.classLink} to={'/about'}>
							About
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
