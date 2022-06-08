import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import TeetimeSchedule from '../TeeTimeGenerator/TeetimeSchedule';
import Modal from '../Modals/Modal';
import { User } from '@/utils/interfaces';
import { golfers } from '@/utils/testGolfers';

interface Group {
	teeTime: string;
	golfers: Golfer[];
}

interface Golfer {
	id: number;
	first_name: string;
	last_name: string;
	teeTime: boolean;
	carpool: string;
}
interface TeeTimes {
	teeTimeSchedule: Group[];
	waitingList: Golfer[];
}

//TODO CLEAN THIS ALL UP!

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NextRoundTable({ allUsers, schedule }): JSX.Element {
	const [users, setUsers] = useState<User[]>(allUsers);

	const [scheduleOpen, setScheduleOpen] = useState(false);

	const [teeTimeSchedule, setTeeTimeSchedule] = useState<TeeTimes>();

	const nextRound = findNextRound(schedule);

	if (!nextRound || !nextRound.course) return <div>Error Finding Next Round</div>;

	const findUsers = allUsers.filter((user: User) => {
		for (let avail of user.availability) {
			if (avail.date === nextRound.date && avail.available) {
				return user;
			}
		}
	});

	const removeUserFromAvailability = async (user) => {
		const newEntry = {
			date: nextRound.date,
			available: false,
		};

		const body = {
			id: user.id,
			availability: [newEntry],
		};

		const req = await fetch(`/api/submitAvailability`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		//Filters out the removed person from the list of available golfers
		const newUsers = users.filter((person) => {
			if (person !== user) {
				return person;
			}
		});

		setUsers(newUsers);
	};

	const generateScheduleClicked = () => {
		setTeeTimeSchedule(generateSchedule(golfers, nextRound, nextRound.course));

		setScheduleOpen(!scheduleOpen);
	};

	return (
		<div className='flex flex-col'>
			{scheduleOpen ? (
				<Modal open={scheduleOpen} setOpen={setScheduleOpen}>
					<TeetimeSchedule teeTimes={teeTimeSchedule} nextRound={nextRound} setScheduleOpen={setScheduleOpen} />
				</Modal>
			) : null}
			<div className='-my-2 overflow-x-auto'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='mb-3'>
						Next Round is: {nextRound.date} at {nextRound.course.name}
					</div>
					<button
						onClick={() => generateScheduleClicked()}
						className='mb-4 ml-auto inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Generate Tee-Times
					</button>
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
										Remove
									</th>
								</tr>
							</thead>
							<tbody>
								{users
									? findUsers.map((user, userIdx) => (
											<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
												<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
													{user.first_name} {user.last_name}
												</td>
												<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.email}</td>
												<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
													<button
														onClick={() => removeUserFromAvailability(user)}
														className='group flex w-full items-center px-3 py-2 text-sm font-medium'
													>
														<XIcon
															className='h-6 w-6
										flex-shrink-0 text-gray-400 group-hover:text-gray-500'
														/>
													</button>
												</td>
											</tr>
									  ))
									: null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
	// } else {
	// 	return (
	// 		<div className='flex flex-col'>
	// 			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
	// 				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
	// 					<div className='mb-3'>Next Round is: Not Yet Scheduled</div>
	// 					<button
	// 						disabled
	// 						className='mb-4 ml-auto inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
	// 					>
	// 						Generate Tee-Times
	// 					</button>
	// 					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
	// 						<table className='min-w-full divide-y divide-gray-200'>
	// 							<thead className='bg-gray-50'>
	// 								<tr>
	// 									<th
	// 										scope='col'
	// 										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
	// 									>
	// 										Name
	// 									</th>
	// 									<th
	// 										scope='col'
	// 										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
	// 									>
	// 										Email
	// 									</th>
	// 									<th
	// 										scope='col'
	// 										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
	// 									>
	// 										Remove
	// 									</th>
	// 								</tr>
	// 							</thead>
	// 						</table>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }
}
