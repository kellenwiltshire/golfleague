import { useAllUsersStore } from '@/stores/AllUsersStore';
import { toJS } from 'mobx';
import React, { useState, useEffect } from 'react';
import Modal from '../Modals/Modal';

export default function YearEndTable(): JSX.Element {
	const [users, setUsers] = useState(toJS(useAllUsersStore().allUsers));
	const [userEmailOpen, setUserEmailOpen] = useState(false);

	useEffect(() => {
		const sortedUsers = users.sort((a, b) => {
			return a.last_name.localeCompare(b.last_name);
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
					<p className='flex flex-row flex-wrap'>
						{attendingUsers.map((user) => {
							return <span key={user.id}>{user.email}, </span>;
						})}
					</p>
				</Modal>
			) : null}

			<div className='-my-2 overflow-x-auto'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<button
						onClick={() => setUserEmailOpen(!userEmailOpen)}
						className='mx-1 mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Email List
					</button>
					<div className='inline-flex items-center px-6 py-2'>Number of Golfers: {attendingUsers.length}</div>
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										ID
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Phone
									</th>
								</tr>
							</thead>
							<tbody>
								{attendingUsers.map((user, userIdx) => {
									return (
										<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.id}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.email}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.phone}</td>
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
