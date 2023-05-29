import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientFromDB } from '../features/ClientsSlice';

const DeleteButton = ({ clientId }) => {
	const dispatch = useDispatch();

	return (
		<button
			className='bg-red-500/75 py-1 px-2 rounded-md hover:bg-red-400'
			onClick={() => {
				// dispatch(deleteClientFromDB(client._id));
				dispatch(deleteClientFromDB(clientId));
			}}>
			Delete
		</button>
	);
};

export default DeleteButton;
