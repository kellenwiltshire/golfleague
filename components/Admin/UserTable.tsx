import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import EditUserForm from '../Forms/EditUserForm';
import Modal from '../Modals/Modal';
import { useEffect, useState } from 'react';
import RegisterUserForm from '../Forms/RegisterUser';
import DeleteUser from '../Modals/DeleteUser';
import SaveFail from '../Notifications/SaveFail';
import SaveSuccess from '../Notifications/SaveSuccess';
import { getUserScores } from '@/utils/sortingFunctions';
import { User } from '@/utils/interfaces';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function UserTable(): JSX.Element {
	const { data: initialUsers, error: usersError } = useSWR('/api/getAllUsers', fetcher);
	const { data: allScores, error: scoresError } = useSWR('/api/getScores', fetcher);

	const [editUserOpen, setEditUserOpen] = useState(false);
	const [addUserOpen, setAddUserOpen] = useState(false);
	const [deleteUserOpen, setDeleteUserOpen] = useState(false);
	const [userSelected, setUserSelected] = useState<User>();
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [userEmailOpen, setUserEmailOpen] = useState(false);
	const [users, setUsers] = useState(initialUsers);

	useEffect(() => {
		if (initialUsers) {
			const sortedUsers = initialUsers.sort((a, b) => {
				return a.last_name.localeCompare(b.last_name);
			});
			setUsers(sortedUsers);
		}
	}, [users, initialUsers]);

	if (usersError || scoresError) return <div>Failed to load</div>;
	if (!initialUsers || !allScores) return <div>Loading...</div>;

	return (
		<div className='flex flex-col'>
			{editUserOpen ? (
				<Modal open={editUserOpen} setOpen={setEditUserOpen}>
					<EditUserForm user={userSelected} setSuccess={setSuccess} setFailure={setFailure} setOpen={setEditUserOpen} />
				</Modal>
			) : null}
			{addUserOpen ? (
				<Modal open={addUserOpen} setOpen={setAddUserOpen}>
					<RegisterUserForm
						setSuccess={setSuccess}
						setFailure={setFailure}
						setOpen={setAddUserOpen}
						setUsers={setUsers}
					/>
				</Modal>
			) : null}
			{deleteUserOpen ? (
				<DeleteUser
					open={deleteUserOpen}
					setOpen={setDeleteUserOpen}
					user={userSelected}
					setFailure={setFailure}
					setSuccess={setSuccess}
					setUsers={setUsers}
				/>
			) : null}

			{userEmailOpen ? (
				<Modal open={userEmailOpen} setOpen={setUserEmailOpen}>
					<p className='flex flex-row flex-wrap'>
						{users.map((user) => {
							if (user.username === 'webdevelopment@kellenwiltshire.com') {
								return null;
							}
							return <span key={user.id}>{user.email}, </span>;
						})}
					</p>
				</Modal>
			) : null}

			<SaveSuccess show={success} setShow={setSuccess} />

			<SaveFail show={failure} setShow={setFailure} />

			<div className='-my-2 overflow-x-auto'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<button
						onClick={() => setAddUserOpen(!addUserOpen)}
						className='mx-1 mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Add New Golfer
					</button>

					<button
						onClick={() => setUserEmailOpen(!userEmailOpen)}
						className='mx-1 mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Email List
					</button>
					{users ? (
						<div className='inline-flex items-center px-6 py-2'>Number of Golfers: {users.length - 1}</div>
					) : null}
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
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
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Car Pool
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Birdies
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Chip Ins
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Delete</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{users
									? users.map((user, userIdx) => {
											const userScores = getUserScores(user, allScores);

											let numBirds = 0;
											for (let i = 0; i < userScores.length; i++) {
												for (let x = 0; x < userScores[i].holes.length; x++) {
													if (userScores[i].holes[x].birdie) {
														numBirds++;
													}
												}
											}

											let numChips = 0;
											for (let i = 0; i < userScores.length; i++) {
												for (let x = 0; x < userScores[i].holes.length; x++) {
													if (userScores[i].holes[x].chip) {
														numChips++;
													}
												}
											}

											return (
												<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
													<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
														{user.first_name} {user.last_name}
													</td>
													<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.email}</td>
													<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.phone}</td>
													<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.carpool}</td>
													<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{numBirds}</td>
													<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{numChips}</td>

													<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
														<button
															onClick={() => {
																setUserSelected(user);
																setEditUserOpen(!editUserOpen);
															}}
															className='group flex w-full items-center px-3 py-2 text-sm font-medium'
														>
															<PencilIcon
																className='h-6 w-6
									 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
															/>
														</button>
													</td>
													<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
														<button
															onClick={() => {
																setUserSelected(user);
																setDeleteUserOpen(!deleteUserOpen);
															}}
															className='group flex w-full items-center px-3 py-2 text-sm font-medium'
														>
															<TrashIcon
																className='h-6 w-6
									flex-shrink-0 text-gray-400 group-hover:text-gray-500'
															/>
														</button>
													</td>
												</tr>
											);
									  })
									: null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
