import { useAllUsersContext } from '@/context/Store';
import React, { useState, useEffect } from 'react';
import Modal from '../Modals/Modal';

export default function YearEndTable(): JSX.Element {
	const [users, setUsers] = useState(useAllUsersContext());
	const [userEmailOpen, setUserEmailOpen] = useState(false);

	useEffect(() => {
		const sortedUsers = users.sort((a, b) => {
			return a.last_name.toLowerCase() > b.last_name.toLowerCase();
		});

		setUsers(sortedUsers);
	}, [users]);

	const attendingUsers = users.filter((user) => {
		return user.yearend;
	});

	return (
		<div className='flex flex-col'>
			{userEmailOpen ? (
				<Modal open={userEmailOpen} setOpen={setUserEmailOpen}>
					<p className='flex flex-wrap flex-row'>
						{attendingUsers.map((user) => {
							return <span key={user.id}>{user.email}, </span>;
						})}
					</p>
				</Modal>
			) : null}

			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<button
						onClick={() => setUserEmailOpen(!userEmailOpen)}
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 mx-1'
					>
						Email List
					</button>
					<div className='inline-flex items-center px-6 py-2'>Number of Golfers: {attendingUsers.length}</div>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										ID
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Phone
									</th>
								</tr>
							</thead>
							<tbody>
								{attendingUsers.map((user, userIdx) => {
									return (
										<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.id}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.phone}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
