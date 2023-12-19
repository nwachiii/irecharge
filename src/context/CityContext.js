import React, {createContext, useContext, useReducer} from 'react';

const CityContext = createContext();

// Initial state
const initialState = {
	favorites: [],
};

// Reducer function to manage state actions
const cityReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITES':
			return {...state, favorites: [...state.favorites, action.payload]};
		case 'REMOVE_FROM_FAVORITES':
			return {
				...state,
				favorites: state.favorites.filter((city) => city.geonameId !== action.payload.geonameId),
			};
		default:
			return state;
	}
};

export const CityProvider = ({children}) => {
	const [state, dispatch] = useReducer(cityReducer, initialState);

	const addToFavorites = (city) => {
		dispatch({type: 'ADD_TO_FAVORITES', payload: city});
	};

	const removeFromFavorites = (city) => {
		dispatch({type: 'REMOVE_FROM_FAVORITES', payload: city});
	};

	return (
		<CityContext.Provider
			value={{
				favorites: state.favorites,
				addToFavorites,
				removeFromFavorites,
			}}>
			{children}
		</CityContext.Provider>
	);
};

export const useCity = () => {
	return useContext(CityContext);
};
