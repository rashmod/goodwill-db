import { useState, useEffect } from 'react';
import CONSTANT_LITERALS from '../Constants/Constants';

const useForm = () => {
	const [formState, setFormState] = useState(initialState);

	const {
		clientName: { value: clientNameValue, isTouched: clientNameIsTouched },
		mobile: { value: mobileValue, isTouched: mobileIsTouched },
		address: { value: addressValue, isTouched: addressIsTouched },
		propertyType: {
			value: propertyTypeValue,
			isTouched: propertyTypeIsTouched,
		},
		clientType: { value: clientTypeValue, isTouched: clientTypeIsTouched },
		rentParty: { value: rentPartyValue, isTouched: rentPartyIsTouched },
		saleParty: { value: salePartyValue, isTouched: salePartyIsTouched },
		loan: { value: loanValue, isTouched: loanIsTouched },
		size: { value: sizeValue, isTouched: sizeIsTouched },
		sqft: { value: sqftValue, isTouched: sqftIsTouched },
		budget: { value: budgetValue, isTouched: budgetIsTouched },
		lead: { value: leadValue, isTouched: leadIsTouched },
		leadAgentName: {
			value: leadAgentNameValue,
			isTouched: leadAgentNameIsTouched,
		},
		leadOnlineName: {
			value: leadOnlineNameValue,
			isTouched: leadOnlineNameIsTouched,
		},
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

			clientNameIsTouched,
			mobileIsTouched,
			addressIsTouched,
			propertyTypeIsTouched,
			clientTypeIsTouched,
			rentPartyIsTouched,
			salePartyIsTouched,
			loanIsTouched,
			sizeIsTouched,
			sqftIsTouched,
			budgetIsTouched,
			leadIsTouched,
			leadAgentNameIsTouched,
			leadOnlineNameIsTouched,
		]
	);

	const valueChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		let re, newValue;

		switch (name) {
			case 'clientName':
			case 'size':
			case 'leadAgentName':
				if (name === 'clientName' || name === 'leadAgentName') {
					re = /^[A-Za-z\s]+$/;
				} else {
					re = /^[a-z\d]+$/i;
				}

				const isKeyValid = re.test(value);
				if (isKeyValid || value === '') {
					setFormState((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], value },
					}));
				}
				break;
			case 'mobile':
				newValue = value.replace(/[^0-9.]/g, '');
				if (isNaN(+newValue)) {
					return;
				} else {
					setFormState((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], value: newValue },
					}));
				}
				break;

			case 'loan':
				setFormState((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], value: isTrue(value) },
				}));
				break;

			// case 'budget':
			// 	const newValue = value.split(',').join('');
			// 	if (!isValidCurrencyFormat(value)) {
			// 		setFormState((prevState) => ({
			// 			...prevState,
			// 			[name]: { ...prevState[name], value: '' },
			// 		}));
			// 	} else {
			// 		setFormState((prevState) => ({
			// 			...prevState,
			// 			[name]: {
			// 				...prevState[name],
			// 				value: Number(value.split(',').join('')),
			// 			},
			// 		}));
			// 	}
			// 	break;

			case 'sqft':
			case 'budget':
				newValue = value.split(',').join('');

				if (!Boolean(Number(newValue))) {
					setFormState((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], value: '' },
					}));
				} else {
					setFormState((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], value: Number(newValue) },
					}));
				}
				break;

			default:
				setFormState((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], value },
				}));
				break;
		}
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

	return {
		formState,
		setFormState,
		valueChangeHandler,
		inputBlurHandler,
		resetForm,
	};
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
				isValid = Object.values(
					CONSTANT_LITERALS.PROPERTY_TYPE
				).includes(value);

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'clientType':
				isValid = Object.values(CONSTANT_LITERALS.CLIENT_TYPE).includes(
					value
				);

				if (value === CONSTANT_LITERALS.CLIENT_TYPE.RENT) {
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
				} else if (value === CONSTANT_LITERALS.CLIENT_TYPE.SALE) {
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
				isValid = Object.values(CONSTANT_LITERALS.RENT_PARTY).includes(
					value
				);

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'saleParty':
				// ? should i also check if clientType is sale ?
				isValid = Object.values(CONSTANT_LITERALS.SALE_PARTY).includes(
					value
				);

				if (value === CONSTANT_LITERALS.SALE_PARTY.BUYER) {
					setStateObj((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], valueIsValid: isValid },
					}));
				} else if (value === CONSTANT_LITERALS.SALE_PARTY.SELLER) {
					setStateObj((prevState) => ({
						...prevState,
						[name]: { ...prevState[name], valueIsValid: isValid },
						loan: {
							value: false,
							isTouched: false,
							valueIsValid: false,
							hasError: false,
						},
					}));
				}
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
				isValid = Object.values(CONSTANT_LITERALS.LEAD).includes(value);

				if (value === CONSTANT_LITERALS.LEAD.ONLINE) {
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
				} else if (value === CONSTANT_LITERALS.LEAD.REFERENCE) {
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
					}));
				}

				break;

			case 'leadAgentName':
				isValid = value.trim() !== '';

				setStateObj((prevState) => ({
					...prevState,
					[name]: { ...prevState[name], valueIsValid: isValid },
				}));
				break;

			case 'leadOnlineName':
				isValid = Object.values(
					CONSTANT_LITERALS.LEAD_ONLINE_NAME
				).includes(value);

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

// check if the input is indian currency format
// function isValidCurrencyFormat(input) {
// 	const regexTest = /(\d{1,2}(,\d{2})*(,\d{3}))|(\d{1,3})/g;
// 	// const regexFormat = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g; // format string to indian currency format
// 	return regexTest.test(input);
// }

export default useForm;
