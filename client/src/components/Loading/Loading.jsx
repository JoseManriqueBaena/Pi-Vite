import React from 'react';
import pikachu from '../../img/Pika.webp';
import style from './Loading.module.css';

function Loading() {
	return (
		<>
			<div className={style.mainContainer}>
				<img src={pikachu} alt='pikachu' />
				<div className={style.loading}>
					<h1>LOADING</h1>
					<div className={style.ldsEllipsis}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Loading;
