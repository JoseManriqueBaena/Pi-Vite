import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from '../slice/pokemonSlice.js';

const store = configureStore({
	reducer: {
		pokemon: pokemonSlice,
	},
});

export default store;
