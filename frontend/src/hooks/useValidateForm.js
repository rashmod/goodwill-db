import { useState, useEffect } from 'react';

const useForm = () => {
	const [formState, setFormState] = useState(initialState);

	const {
		clientName: { value: clientNameValue },
		mobile: { value: mobileValue },
		address: { value: addressValue },
		propertyType: { value: propertyTypeValue },
		clientType: { value: clientTypeValue },
		rentParty: { value: rentPartyValue },
		saleParty: { value: salePartyValue },
		loan: { value: loanValue },
		size: { value: sizeValue },
		sqft: { value: sqftValue },
		budget: { value: budgetValue },
		lead: { value: leadValue },
		leadAgentName: { value: leadAgentNameValue },
		leadOnlineName: { value: leadOnlineNameValue },
	} = formState;

	useEffect(
		() => {
			validateFunc(formState, setFormState);
			checkErrorFunc(formState, setFormState);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			clientNameValue,
			mobileValue,
			addressValue,
			propertyTypeValue,
			clientTypeValue,
			rentPartyValue,
			salePartyValue,
			loanValue,
			sizeValue,
			sqftValue,
			budgetValue,
			leadValue,
			leadAgentNameValue,
			leadOnlineNameValue,
		]
	);

	const valueChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setFormState((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], value },
		}));
	};

	const inputBlurHandler = (event) => {
		const name = event.target.name;

		setFormState((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], isTouched: true },
		}));
	};

	const resetForm = () => {
		setFormState(initialState);
	};

	return { formState, valueChangeHandler, inputBlurHandler, resetForm };
};

const validateFunc = (stateObj, setStateObj) => {
	for (const name in stateObj) {
		const value = stateObj[name].value;
		let isValid = false;

		switch (name) {
			case 'clientName':
			case 'address':
			case 'size':
				isValid = value.trim() !== '';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'mobile':
				isValid = /^[6-9]\d{9}$/.test(value);

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'propertyType':
				isValid =
					value === 'RESIDENTIAL' ||
					value === 'COMMERCIAL' ||
					value === 'INDUSTRIAL' ||
					value === 'OPEN-PLOT' ||
					value === 'AGRICULTURAL';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'clientType':
				isValid = value === 'RENT' || value === 'SALE';

				if (value === 'RENT') {
					setStateObj((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], valueIsValid: isValid },
						saleParty: {
							value: '',
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
						loan: {
							value: false,
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
					}));
				} else if (value === 'SALE') {
					setStateObj((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], valueIsValid: isValid },
						rentParty: {
							value: '',
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
					}));
				}
				break;

			case 'rentParty':
				// ? should i also check if clientType is Rent ?
				isValid = value === 'RENTER' || value === 'HOMEOWNER';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'saleParty':
				// ? should i also check if clientType is sale ?
				isValid = value === 'BUYER' || value === 'SELLER';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'loan':
				// ? should i also check if clientType is sale and saleParty is buyer ?
				isValid = value === true || value === false;

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'sqft':
			case 'budget':
				isValid = value > 0;

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'lead':
				isValid =
					value === 'WALK-IN' ||
					value === 'ONLINE' ||
					value === 'REFERENCE';

				if (value === 'ONLINE') {
					setStateObj((prevState) => ({
						...prevState,
						[name]: {
							...prevState[name],
							valueIsValid: isValid,
						},
						leadAgentName: {
							value: '',
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
					}));
				} else if (value === 'REFERENCE') {
					setStateObj((prevState) => ({
						...prevState,
						[name]: {
							...prevState[name],
							valueIsValid: isValid,
						},
						leadOnlineName: {
							value: '',
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
					}));
				} else {
					setStateObj((prevState) => ({
						...prevState,
						[name]: {
							...prevState[name],
							valueIsValid: isValid,
						},
					}));
				}

				break;

			case 'leadAgentName':
				// todo recheck logic if it needs change
				isValid = value.trim() !== '';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'leadOnlineName':
				isValid =
					value === 'UNKNOWN' ||
					value === 'JUST-DIAL' ||
					value === 'SQUARE-YARDS';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			default:
				break;
		}
	}
};

const checkErrorFunc = (stateObj, setStateObj) => {
	for (const name in stateObj) {
		setStateObj((prevState) => ({
			...prevState,
			[name]: {
				...prevState[name],
				hasError:
					prevState[name].isTouched && !prevState[name].valueIsValid,
			},
		}));
	}
};

const initialState = {
	clientName: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	mobile: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	address: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	propertyType: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	clientType: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	rentParty: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	saleParty: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	loan: {
		value: false,
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	size: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	sqft: {
		value: 0,
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	budget: {
		value: 0,
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	lead: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	leadAgentName: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
	leadOnlineName: {
		value: '',
		isTouched: false,
		valueIsValid: false,
		hasError: false,
	},
};

// check if the string is true or false
const isTrue = (str) => {
	if (str === 'true') return true;
	return false;
};

export default useForm;
