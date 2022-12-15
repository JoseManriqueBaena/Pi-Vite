import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getAllImgTypes,
	getAllTypes,
	getAllPokemons,
	loading,
	createPokemon,
} from '../../redux/slice/pokemonSlice';
import style from './CreatePokemon.module.css';
import { capitalize, findInImgTypes } from '../../redux/slice/helpers';
import iconQuestionRed from '../../img/icon_question_red.svg';
import iconQuestionBlue from '../../img/icon_question_blue1.svg';
import Navbar from '../NavBar/NavBar';

function validate(input, pokemons) {
	let errors = {};
	//*Name
	if (!input.name) {
		errors.name = 'Name is required';
	} else if (!/^[a-zA-Z0-9\s]*$/.test(input.name)) {
		errors.name = 'Invalid name';
	} else if (input.name.length < 3) {
		errors.name = 'Few characters';
	} else if (input.name.length > 16) {
		errors.name = 'Many characters';
	} else if (pokemons) {
		const pokemonFind = pokemons?.filter(
			(pokemon) => pokemon.name.toLowerCase() === input.name.toLowerCase()
		);
		pokemonFind.length && (errors.name = 'The pokemon name already exists');
	}
	//*Hp
	if (!input.hp) {
		errors.hp = 'Hp is required';
	} else if (input.hp.length > 4) {
		errors.hp = 'Max four characters';
	} else if (input.hp < 0) {
		errors.hp = 'Only positive numbers';
	}
	//*Attack
	if (!input.attack) {
		errors.attack = 'Attack is required';
	} else if (input.attack.length > 4) {
		errors.attack = 'Max four characters';
	} else if (input.attack < 0) {
		errors.attack = 'Only positive numbers';
	}
	//*Defense
	if (!input.defense) {
		errors.defense = 'Defense is required';
	} else if (input.defense.length > 4) {
		errors.defense = 'Max four characters';
	} else if (input.defense < 0) {
		errors.defense = 'Only positive numbers';
	}
	//*Speed
	if (!input.speed) {
		errors.speed = 'Speed is required';
	} else if (input.speed.length > 4) {
		errors.speed = 'Max four characters';
	} else if (input.speed < 0) {
		errors.speed = 'Only positive numbers';
	}
	//*Height
	if (!input.height) {
		errors.height = 'Height is required';
	} else if (input.height.length > 4) {
		errors.height = 'Max four characters';
	} else if (input.height < 0) {
		errors.height = 'Only positive numbers';
	}
	//*Weight
	if (!input.weight) {
		errors.weight = 'weight is required';
	} else if (input.weight.length > 4) {
		errors.weight = 'Max four characters';
	} else if (input.weight < 0) {
		errors.weight = 'Only positive numbers';
	}
	//*Type
	if (input.type.length === 0) errors.type = 'Select at least one type';
	//*Img
	if (input.img) {
		if (!/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/.test(input.img))
			errors.img = 'Invalid URL';
	}

	return errors;
}

export default function CreatePokemon() {
	const imgTypes = useSelector((state) => state.pokemon.imgTypes);
	const allTypes = useSelector((state) => state.pokemon.types);
	const pokemons = useSelector((state) => state.pokemon.pokeCache);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [errors, setErrors] = useState({
		inicial: true,
	});
	const [newPokemon, setNewPokemon] = useState({
		name: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		img: '',
		type: [],
	});

	useEffect(() => {
		if (!imgTypes.length) dispatch(getAllImgTypes());
		if (!allTypes.length) dispatch(getAllTypes());
		if (!pokemons.length) dispatch(getAllPokemons());
	}, [dispatch, imgTypes, allTypes, pokemons]);

	const handlerChange = (event) => {
		const nameProp = event.target.name;
		let valueProp = event.target.value;
		setNewPokemon({ ...newPokemon, [nameProp]: valueProp });
		setErrors(validate({ ...newPokemon, [nameProp]: valueProp }, pokemons));
	};

	const handlerChangeSelect = (event) => {
		const valueProp = event.target.value;
		if (newPokemon?.type?.length < 2) {
			if (newPokemon.type.includes(valueProp))
				return alert('No se pueden agregar dos tipos iguales');
			setNewPokemon({
				...newPokemon,
				type: [...newPokemon.type, valueProp],
			});

			setErrors(
				validate(
					{
						...newPokemon,
						type: [...newPokemon.type, valueProp],
					},
					pokemons
				)
			);
		} else {
			alert('No se puede agregar más de dos tipos');
		}
	};

	const handlerSubmit = async (event) => {
		event.preventDefault();
		if (Object.values(errors).length === 0) {
			dispatch(createPokemon(newPokemon));
			alert(`Pokemon ${newPokemon.name} created successfully`);
			setNewPokemon({
				name: '',
				hp: '',
				attack: '',
				defense: '',
				speed: '',
				height: '',
				weight: '',
				img: '',
				type: [],
			});
			dispatch(loading());
			navigate('/home');
		} else {
			alert('The pokemon could not be created');
		}
	};

	const onClose = (event) => {
		const typeClose = event.target.value;
		const filterTypes = newPokemon?.type?.filter(
			(nameType) => nameType !== typeClose
		);
		setNewPokemon({
			...newPokemon,
			type: filterTypes,
		});
		setErrors(
			validate({
				...newPokemon,
				type: filterTypes,
			})
		);
	};

	return (
		<>
			<Navbar />
			<div className={style.mainContainer}>
				<form onSubmit={handlerSubmit}>
					<div className={style.inputsContainer}>
						<h2>Create Pokemon</h2>
						<div className={style.rowContainer}>
							<div>
								{/* Name */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='text'
											className={
												errors.name ? style.formFieldErrors : style.formField
											}
											placeholder='name'
											onChange={handlerChange}
											value={newPokemon.name}
											name='name'
											id='name'
											autoComplete='off'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.name
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Name
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.name
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.name
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.name
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Name is required.
													<br /> Can have letters and numbers.
													<br /> Must have at least three characters.
													<br /> You can't create two pokemons with the same
													name.
													<br /> Max sixteen characters.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.name && (
										<p className={style.pError}> {errors.name} </p>
									)}
								</div>
								{/* Hp */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.hp ? style.formFieldErrors : style.formField
											}
											placeholder='Hp'
											onChange={handlerChange}
											value={newPokemon.hp}
											name='hp'
											id='hp'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.hp
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Hp
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.hp
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.hp
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.hp
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Hp is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.hp && <p className={style.pError}> {errors.hp} </p>}
								</div>
								{/* Attack */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.attack ? style.formFieldErrors : style.formField
											}
											placeholder='Attack'
											onChange={handlerChange}
											value={newPokemon.attack}
											name='attack'
											id='attack'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.attack
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Attack
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.attack
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.attack
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.attack
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Attack is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.attack && (
										<p className={style.pError}> {errors.attack} </p>
									)}
								</div>
								{/* Defense */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.defense ? style.formFieldErrors : style.formField
											}
											placeholder='Defense'
											onChange={handlerChange}
											value={newPokemon.defense}
											name='defense'
											id='defense'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.defense
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Defense
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.defense
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.defense
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.defense
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Defense is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.defense && (
										<p className={style.pError}> {errors.defense} </p>
									)}
								</div>
							</div>
							<div>
								{/* Speed */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.speed ? style.formFieldErrors : style.formField
											}
											placeholder='Speed'
											onChange={handlerChange}
											value={newPokemon.speed}
											name='speed'
											id='speed'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.speed
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Speed
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.speed
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.speed
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.speed
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Speed is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.speed && (
										<p className={style.pError}> {errors.speed} </p>
									)}
								</div>
								{/* Height */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.height ? style.formFieldErrors : style.formField
											}
											placeholder='Height'
											onChange={handlerChange}
											value={newPokemon.height}
											name='height'
											id='height'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.height
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Height
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.height
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.height
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.height
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Height is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.height && (
										<p className={style.pError}> {errors.height} </p>
									)}
								</div>
								{/* Weight */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='number'
											className={
												errors.weight ? style.formFieldErrors : style.formField
											}
											placeholder='Weight'
											onChange={handlerChange}
											value={newPokemon.weight}
											name='weight'
											id='weight'
											required
										/>
										<label
											className={style.formLabel}
											style={
												errors.weight
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Weight
										</label>
										{/* Burbujas */}
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												style={
													errors.weight
														? { visibility: 'hidden' }
														: { visibility: 'visible' }
												}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>
											<img
												className={style.imgBurbujaRed}
												style={
													errors.weight
														? { visibility: 'visible' }
														: { visibility: 'hidden' }
												}
												src={iconQuestionRed}
												alt={'iconQuestionRed'}
											/>

											<div
												className={style.infoBurbuja}
												style={
													errors.weight
														? { border: '2px solid var(--redPokeball)' }
														: { border: 'none' }
												}
											>
												<p>
													Weight is required.
													<br /> Can only contain numbers.
													<br /> Max four characters.
													<br /> Only positive numbers.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.weight && (
										<p className={style.pError}> {errors.weight} </p>
									)}
								</div>
								{/* Image */}
								<div className={style.inputContainer}>
									<div className={`${style.formGroup} ${style.field}`}>
										<input
											type='text'
											className={
												errors.img ? style.formFieldErrors : style.formField
											}
											placeholder='Image'
											onChange={handlerChange}
											value={newPokemon.img}
											name='img'
											id='img'
										/>
										<label
											className={style.formLabel}
											style={
												errors.img
													? { color: 'var(--redPokeball)' }
													: { color: 'var(--blue1)' }
											}
										>
											Image
										</label>
										<div className={style.burbujaContainer}>
											<img
												className={style.imgBurbujaBlue}
												src={iconQuestionBlue}
												alt={'iconQuestionBlue'}
											/>

											<div className={style.infoBurbuja}>
												<p>URL of the image you want for your pokemon.</p>
											</div>
										</div>
									</div>
								</div>
								<div className={style.errorContainer}>
									{errors.img && <p className={style.pError}> {errors.img} </p>}
								</div>
							</div>
						</div>
						{/* Types */}
						<select
							className={
								errors.type ? style.customSelectError : style.customSelect
							}
							defaultValue={'default'}
							name={'type'}
							id={'type'}
							onChange={handlerChangeSelect}
						>
							<option
								className={style.selectOptions}
								hidden={true}
								value='default'
							>
								Select the type
							</option>
							{allTypes?.map((type) => (
								<option key={type.id} value={type.name}>
									{capitalize(type.name)}
								</option>
							))}
						</select>
						<div className={style.errorContainerType}>
							{errors.type && <p className={style.pError}> {errors.type} </p>}
						</div>
						{/* Cards types */}
						<div className={style.typeContainerMain}>
							{newPokemon?.type?.map((nameType) => (
								<div
									className={style.pTypeContainer}
									key={nameType}
									style={{
										backgroundColor: findInImgTypes(nameType, imgTypes).color,
									}}
								>
									{nameType === 'unknown' || nameType === 'shadow' ? null : (
										<div className={style.imageContainer}>
											<img
												src={findInImgTypes(nameType, imgTypes).url}
												alt={{ nameType }}
											/>
										</div>
									)}
									<p className={style.pType}> {nameType} </p>
									<button
										value={nameType}
										className={style.buttonX}
										onClick={onClose}
									>
										x
									</button>
								</div>
							))}
						</div>
						<button
							disabled={Object.values(errors).length === 0 ? false : true}
							className={
								Object.values(errors).length === 0
									? style.buttonCreate
									: style.buttonCreateDisabled
							}
							type='submit'
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
