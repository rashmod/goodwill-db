import CONSTANT_LITERALS from '../Constants/Constants';
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
	minBudget: -1,
	maxBudget: -1,
	minArea: -1,
	maxArea: -1,
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

			if (
				name === CONSTANT_LITERALS.FIELD_NAMES.CLIENT_TYPE &&
				value === ''
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.SALE_PARTY] = '';
				state[CONSTANT_LITERALS.FIELD_NAMES.RENT_PARTY] = '';
			} else if (
				name === CONSTANT_LITERALS.FIELD_NAMES.CLIENT_TYPE &&
				value === CONSTANT_LITERALS.CLIENT_TYPE.SALE
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.RENT_PARTY] = '';
			} else if (
				name === CONSTANT_LITERALS.FIELD_NAMES.CLIENT_TYPE &&
				value === CONSTANT_LITERALS.CLIENT_TYPE.RENT
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.SALE_PARTY] = '';
			}

			if (name === CONSTANT_LITERALS.FIELD_NAMES.LEAD && value === '') {
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_AGENT_NAME] = '';
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_ONLINE_NAME] = '';
			} else if (
				name === CONSTANT_LITERALS.FIELD_NAMES.LEAD &&
				value === CONSTANT_LITERALS.LEAD.WALK_IN
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_AGENT_NAME] = '';
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_ONLINE_NAME] = '';
			} else if (
				name === CONSTANT_LITERALS.FIELD_NAMES.LEAD &&
				value === CONSTANT_LITERALS.LEAD.ONLINE
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_AGENT_NAME] = '';
			} else if (
				name === CONSTANT_LITERALS.FIELD_NAMES.LEAD &&
				value === CONSTANT_LITERALS.LEAD.REFERENCE
			) {
				state[CONSTANT_LITERALS.FIELD_NAMES.LEAD_ONLINE_NAME] = '';
			}

			state[name] = value;
		},
		updateRange(state, action) {
			const { min, max, name } = action.payload;
			const minName = `min${capitalizeFirstLetter(name)}`;
			const maxName = `max${capitalizeFirstLetter(name)}`;

			state[minName] = min;
			state[maxName] = max;
		},
		resetFilter(state) {
			for (const name in state) {
				state[name] = initialState[name];
			}
		},
	},
});

export const { updateSearch, updateFilter, updateRange, resetFilter } =
	FiltersSlice.actions;
export default FiltersSlice.reducer;
