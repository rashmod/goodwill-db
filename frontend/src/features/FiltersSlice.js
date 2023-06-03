import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';

const { createSlice } = require('@reduxjs/toolkit');

export const initialState = {
	keyword: '',
	propertyType: '',
	dealStatus: '',
	clientType: '',
	rentParty: '',
	saleParty: '',
	size: '',
	lead: '',
	leadOnlineName: '',
	leadAgentName: '',
	minBudget: 0,
	maxBudget: 0,
	minArea: 0,
	maxArea: 0,
};

const FiltersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		updateSearch(state, action) {
			state.keyword = action.payload;
		},
		updateFilter(state, action) {
			const { name, value } = action.payload;
			console.log(action.payload);
			state[name] = value;
		},
		updateRange(state, action) {
			const { min, max, name } = action.payload;
			const minName = `min${capitalizeFirstLetter(name)}`;
			const maxName = `max${capitalizeFirstLetter(name)}`;

			state[minName] = min;
			state[maxName] = max;
		},
	},
});

export const { updateSearch, updateFilter, updateRange } = FiltersSlice.actions;
export default FiltersSlice.reducer;
