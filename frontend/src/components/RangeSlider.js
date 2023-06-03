import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';
import { updateRange } from '../features/FiltersSlice';
import debounce from '../utilities/debounce';

const RangeSlider = ({ label, min, max, step }) => {
	const dispatch = useDispatch();

	const [minValue, setMinValue] = useState(min);
	const [maxValue, setMaxValue] = useState(max);

	let progressRef = useRef(null);

	const handleMin = (e) => {
		const newMinValue = parseInt(e.target.value);
		if (newMinValue <= maxValue && newMinValue >= min) {
			setMinValue(newMinValue);
		} else if (newMinValue > maxValue) {
			setMaxValue(newMinValue);
			setMinValue(newMinValue);
		}
	};

	const handleMax = (e) => {
		const newMaxValue = parseInt(e.target.value);
		if (newMaxValue >= minValue && newMaxValue <= max) {
			setMaxValue(newMaxValue);
		} else if (newMaxValue < minValue) {
			setMinValue(newMaxValue);
			setMaxValue(newMaxValue);
		}
	};

	useEffect(() => {
		const range = max - min;

		const left = ((minValue - min) / range) * 100;
		const right = ((max - maxValue) / range) * 100;

		progressRef.current.style.left = `${left}%`;
		progressRef.current.style.right = `${right}%`;
	}, [minValue, maxValue, max, min]);

	const debouncedDispatch = debounce((newMinValue, newMaxValue) => {
		dispatch(
			updateRange({ min: newMinValue, max: newMaxValue, name: label })
		);
	}, 300);

	useEffect(() => {
		debouncedDispatch(minValue, maxValue);

		return () => debouncedDispatch.cancel();
	}, [debouncedDispatch, maxValue, minValue]);

	return (
		<div className='flex flex-col'>
			<h3 className='mb-1 font-medium text-base'>{label}</h3>
			<div className='flex justify-between items-center gap-2'>
				<div className='w-1/2'>
					<div className='font-medium text-xs'>Min</div>
					<input
						onChange={(e) => handleMin(e)}
						type='number'
						name={`min${capitalizeFirstLetter(label)}`}
						value={minValue}
						className='w-full px-2 py-1 bg-transparent border-2 border-solid border-gray-700 rounded transition duration-100 ease-in-out focus:border-accent focus:outline-none'
					/>
				</div>
				<div className='w-1/2'>
					<div className='font-medium text-xs'>Max</div>
					<input
						onChange={(e) => handleMax(e)}
						type='number'
						name={`min${capitalizeFirstLetter(label)}`}
						value={maxValue}
						className='w-full px-2 py-1 bg-transparent border-2 border-solid border-gray-700 rounded transition duration-100 ease-in-out focus:border-accent focus:outline-none'
					/>
				</div>
			</div>
			<div className='mt-3'>
				<div className='slider relative h-1 rounded-md bg-gray-300'>
					<div
						className='progress absolute h-1 bg-accent rounded '
						ref={progressRef}></div>
				</div>
				<div className='range-input relative'>
					<input
						onChange={handleMin}
						type='range'
						min={min}
						step={step}
						max={max}
						value={minValue}
						className='range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none'
					/>

					<input
						onChange={handleMax}
						type='range'
						min={min}
						step={step}
						max={max}
						value={maxValue}
						className='range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none'
					/>
				</div>
			</div>
		</div>
	);
};
export default RangeSlider;
