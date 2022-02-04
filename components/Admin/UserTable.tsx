import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import EditUserForm from '../Forms/EditUserForm';
import Modal from '../Modals/Modal';
import { useEffect, useState } from 'react';
import { useAllScoresContext, useAllUsersContext } from '@/context/Store';
import RegisterUserForm from '../Forms/RegisterUser';
import DeleteUser from '../Modals/DeleteUser';
import SaveFail from '../Notifications/SaveFail';
import SaveSuccess from '../Notifications/SaveSuccess';
import { getUserScores } from '@/utils/sortingFunctions';

export default function UserTable(): JSX.Element {
	const [editUserOpen, setEditUserOpen] = useState(false);
	const [addUserOpen, setAddUserOpen] = useState(false);
	const [deleteUserOpen, setDeleteUserOpen] = useState(false);
	const [userSelected, setUserSelected] = useState();
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [users, setUsers] = useState(useAllUsersContext());
	const [userEmailOpen, setUserEmailOpen] = useState(false);
	const allScores = useAllScoresContext();

	useEffect(() => {
		const sortedUsers = users.sort((a, b) => {
			return a.last_name.localeCompare(b.last_name);
		});

		setUsers(sortedUsers);
	}, [users]);

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
					<p className='flex flex-wrap flex-row'>
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

			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<button
						onClick={() => setAddUserOpen(!addUserOpen)}
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 mx-1'
					>
						Add New Golfer
					</button>

					<button
						onClick={() => setUserEmailOpen(!userEmailOpen)}
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 mx-1'
					>
						Email List
					</button>
					<div className='inline-flex items-center px-6 py-2'>Number of Golfers: {users.length - 1}</div>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
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
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Car Pool
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Birdies
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
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
								{users.map((user, userIdx) => {
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
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.phone}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.carpool}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{numBirds}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{numChips}</td>

											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={() => {
														setUserSelected(user);
														setEditUserOpen(!editUserOpen);
													}}
													className='group flex items-center px-3 py-2 text-sm font-medium w-full'
												>
													<PencilIcon
														className='text-gray-400 group-hover:text-gray-500
									 flex-shrink-0 h-6 w-6'
													/>
												</button>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={() => {
														setUserSelected(user);
														setDeleteUserOpen(!deleteUserOpen);
													}}
													className='group flex items-center px-3 py-2 text-sm font-medium w-full'
												>
													<TrashIcon
														className='text-gray-400 group-hover:text-gray-500
									flex-shrink-0 h-6 w-6'
													/>
												</button>
											</td>
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
