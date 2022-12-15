import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	ascAttack,
	ascDefense,
	ascPokedex,
	aToZ,
	desAttack,
	desDefense,
	desPokedex,
	filterCreated,
	filterExisted,
	filterPokemonTypes,
	zToA,
} from './helpers.js';
//Iconos pokemons
import flyingIcon from '../../img/Pokemon_Type_Icon_Flying.svg';
import bugIcon from '../../img/Pokemon_Type_Icon_Bug.svg';
import ghostIcon from '../../img/Pokemon_Type_Icon_Ghost.svg';
import fireIcon from '../../img/Pokemon_Type_Icon_Fire.svg';
import grassIcon from '../../img/Pokemon_Type_Icon_Grass.svg';
import dragonIcon from '../../img/Pokemon_Type_Icon_Dragon.svg';

const initialState = {
	pokeCache: [], //ALL
	pokemons: [],
	pokemonsFiltered: [],
	pokeDetail: {},
	types: [],
	imgTypes: [],
	loading: false,
	newPokemon: false,
};

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		getAllPokemonsReducer: (state, action) => {
			state.loading = false;
			state.pokeCache = action.payload;
			state.pokemons = action.payload;
			state.pokemonsFiltered = action.payload;
		},
		getPokemonsNameReducer: (state, action) => {
			state.loading = false;
			state.pokemonsFiltered = action.payload;
		},
		getPokemonIdReducer: (state, action) => {
			state.loading = false;
			state.pokeDetail = action.payload;
		},
		pokemonNotFound: (state) => {
			state.loading = false;
			state.pokemonsFiltered = [];
		},
		refresh: (state) => {
			state.loading = false;
			state.pokemons = state.pokeCache;
			state.pokemonsFiltered = state.pokeCache;
		},
		refreshTypes: (state) => {
			state.loading = false;
			state.pokemonsFiltered = state.pokemons;
		},
		filterTypes: (state, action) => {
			state.loading = false;
			state.pokemonsFiltered = filterPokemonTypes(state.pokemons, action);
		},
		existing: (state) => {
			const auxFilter = filterExisted(state.pokeCache);

			state.loading = false;
			state.pokemons = auxFilter;
			state.pokemonsFiltered = auxFilter;
		},
		created: (state) => {
			const auxFilter = filterCreated(state.pokeCache);

			state.loading = false;
			state.pokemons = auxFilter;
			state.pokemonsFiltered = auxFilter;
		},
		ascendingPokedex: (state) => {
			state.loading = false;
			state.pokemonsFiltered = ascPokedex(state.pokemonsFiltered);
		},
		descendingPokedex: (state) => {
			state.loading = false;
			state.pokemonsFiltered = desPokedex(state.pokemonsFiltered);
		},
		aToZReducer: (state) => {
			state.loading = false;
			state.pokemonsFiltered = aToZ(state.pokemonsFiltered);
		},
		zToAReducer: (state) => {
			state.loading = false;
			state.pokemonsFiltered = zToA(state.pokemonsFiltered);
		},
		maxAttack: (state) => {
			state.loading = false;
			state.pokemonsFiltered = ascAttack(state.pokemonsFiltered);
		},
		minAttack: (state) => {
			state.loading = false;
			state.pokemonsFiltered = desAttack(state.pokemonsFiltered);
		},
		maxDefense: (state) => {
			state.loading = false;
			state.pokemonsFiltered = ascDefense(state.pokemonsFiltered);
		},
		minDefense: (state) => {
			state.loading = false;
			state.pokemonsFiltered = desDefense(state.pokemonsFiltered);
		},
		getAllTypesReducer: (state, action) => {
			state.types = action.payload;
		},
		createPokemonReducer: (state) => {
			state.newPokemon = true;
		},
		setNewPokemon: (state) => {
			state.newPokemon = false;
		},
		getAllImgTypesReducer: (state, action) => {
			state.imgTypes = action.payload;
		},
	},
});

export function getAllPokemons() {
	return async function (dispatch) {
		dispatch(loading());
		try {
			const response = await axios.get(`/pokemons`);
			dispatch(getAllPokemonsReducer(response.data));
		} catch (error) {
			console.log(error.response.data);
		}
	};
}

export function getPokemonsName(name) {
	return async function (dispatch) {
		dispatch(loading());
		try {
			const response = await axios.get(`/pokemons?name=${name}`);
			dispatch(getPokemonsNameReducer(response.data));
		} catch (error) {
			dispatch(pokemonNotFound());
		}
	};
}

export function getPokemonId(id) {
	return async function (dispatch) {
		dispatch(loading());
		try {
			const response = await axios.get(`/pokemons/${id}`);
			dispatch(getPokemonIdReducer(response.data));
		} catch (error) {
			dispatch(pokemonNotFound());
		}
	};
}

export function pokemonFilter(filter) {
	return async function (dispatch) {
		dispatch(loading());
		switch (filter) {
			case 'All':
				dispatch(refresh());
				break;

			case 'Existing':
				dispatch(existing());
				break;

			case 'Created':
				dispatch(created());
				break;

			default:
				break;
		}
	};
}

export function orderFilter(order) {
	return async function (dispatch) {
		dispatch(loading());
		switch (order) {
			case 'Ascending pokedex':
				dispatch(ascendingPokedex());
				break;

			case 'Descending pokedex':
				dispatch(descendingPokedex());
				break;

			case 'A to Z':
				dispatch(aToZReducer());
				break;

			case 'Z to A':
				dispatch(zToAReducer());
				break;

			case 'Max attack':
				dispatch(maxAttack());
				break;

			case 'Min attack':
				dispatch(minAttack());
				break;

			case 'Max defense':
				dispatch(maxDefense());
				break;

			case 'Min defense':
				dispatch(minDefense());
				break;

			default:
				break;
		}
	};
}

export function getAllTypes() {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/types`);
			dispatch(getAllTypesReducer(response.data));
		} catch (error) {
			console.log(error.response.data);
		}
	};
}

export function createPokemon(pokemon) {
	return async function (dispatch) {
		try {
			const response = await axios.post(`/pokemons`, pokemon);
			dispatch(createPokemonReducer());
			return response;
		} catch (error) {
			console.log(error.response.data);
		}
	};
}

export function getAllImgTypes() {
	return async function (dispatch) {
		const imgTypes = [
			{
				type: 'normal',
				url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg',
				color: '#919aa2',
			},
			{
				type: 'fighting',
				url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg',
				color: '#e0306a',
			},
			{
				type: 'flying',
				url: flyingIcon,
				color: '#89aae3',
			},
			{
				type: 'poison',
				url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg',
				color: '#b567ce',
			},
			{
				type: 'ground',
				url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg',
				color: '#e87236',
			},
			{
				type: 'rock',
				url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg',
				color: '#c8b686',
			},
			{
				type: 'bug',
				url: bugIcon,
				color: '#83c300',
			},
			{
				type: 'ghost',
				url: ghostIcon,
				color: '#4c6ab2',
			},
			{
				type: 'steel',
				url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg',
				color: '#5a8ea2',
			},
			{
				type: 'fire',
				url: fireIcon,
				color: '#ff9741',
			},
			{
				type: 'water',
				url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg',
				color: '#3692dc',
			},
			{
				type: 'grass',
				url: grassIcon,
				color: '#38bf4b',
			},
			{
				type: 'electric',
				url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg',
				color: '#fbd100',
			},
			{
				type: 'psychic',
				url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg',
				color: '#ff6675',
			},
			{
				type: 'ice',
				url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg',
				color: '#4cd1c0',
			},
			{
				type: 'dragon',
				url: dragonIcon,
				color: '#006fc9',
			},
			{
				type: 'dark',
				url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg',
				color: '#5b5466',
			},
			{
				type: 'fairy',
				url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg',
				color: '#fb89eb',
			},
			{
				type: 'unknown',
				color: '#c6c69b',
			},
			{
				type: 'shadow',
				color: '#3f3f3f',
			},
		];
		dispatch(getAllImgTypesReducer(imgTypes));
	};
}

export const {
	loading,
	getAllPokemonsReducer,
	getPokemonsNameReducer,
	getPokemonIdReducer,
	pokemonNotFound,
	refresh,
	refreshTypes,
	filterTypes,
	existing,
	created,
	ascendingPokedex,
	descendingPokedex,
	aToZReducer,
	zToAReducer,
	maxAttack,
	minAttack,
	maxDefense,
	minDefense,
	getAllTypesReducer,
	createPokemonReducer,
	setNewPokemon,
	getAllImgTypesReducer,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
