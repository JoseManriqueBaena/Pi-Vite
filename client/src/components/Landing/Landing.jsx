import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

function Landing() {
	return (
		<>
			<section className={style.mainContainer}>
				<div className={style.containerInfo}>
					<img
						src='https://1000marcas.net/wp-content/uploads/2020/01/Pokemon-Logo.png'
						alt=''
					/>
					<Link to='/home'>
						<button className={style.buttonGo}>Let's go!</button>
					</Link>
				</div>
			</section>
		</>
	);
}

export default Landing;
