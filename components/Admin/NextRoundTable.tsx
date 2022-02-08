import { useAllUsersContext, useScheduleContext } from '@/context/Store';
import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import TeetimeSchedule from '../TeeTimeGenerater/TeetimeSchedule';
import Modal from '../Modals/Modal';

//For testing purposes
const golfers = [
	{ first_name: 'Player', last_name: 'One', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Two',
		carpool: 'Player Nine',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Three', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Four', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'Five',
		carpool: 'Player Thirteen',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Six', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Seven', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Eight', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Nine',
		carpool: 'Player Two',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Ten', carpool: '', teeTime: true },
	{ first_name: 'Player', last_name: 'Eleven', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twelve', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Thirteen',
		carpool: 'Player Five',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Fourteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Fifteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Sixteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Seventeen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Eighteen', carpool: '', teeTime: true },
	{ first_name: 'Player', last_name: 'Nineteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twenty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twentyone', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twentytwo', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Twentythree',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'TwentyFour', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'TwentyFive',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'TwentySix', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'TwentySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'TwentyEight',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'TwentyNine',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Thirty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'ThirtyOne', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'ThirtyTwo', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'ThirtyThree',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyFour',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyFive',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'ThirtySix', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'ThirtySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyEight',
		carpool: '',
		teeTime: true,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyNine',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Forty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyOne', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyTwo', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'FortyThree',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'FortyFour', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyFive', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortySix', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'FortySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'FortyEight',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'FORTYNINE', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTY', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTYONE', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTYTWO', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'FIFTYTHREE',
		carpool: '',
		teeTime: false,
	},
];

export default function NextRoundTable(): JSX.Element {
	const allUsers = useAllUsersContext();
	const schedule = useScheduleContext();
	const [users, setUsers] = useState(allUsers);

	const [scheduleOpen, setScheduleOpen] = useState(false);
	interface Group {
		teeTime: string;
		golfers: Golfer[];
	}

	interface Golfer {
		first_name: string;
		last_name: string;
		teeTime: boolean;
		carpool: string;
	}
	interface TeeTimes {
		teeTimeSchedule: Group[];
		waitingList: Golfer[];
	}
	const [teeTimeSchedule, setTeeTimeSchedule] = useState<TeeTimes>();

	const nextRound = findNextRound(schedule);

	if (nextRound.course) {
		const findUsers = allUsers.filter((user) => {
			for (let i = 0; i < user.availability.length; i++) {
				if (user.availability[i].date === nextRound.date && user.availability[i].available) {
					return user;
				}
			}
		});

		useEffect(() => {
			setUsers(findUsers);
		}, []);

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
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='mb-3'>
							Next Round is: {nextRound.date} at {nextRound.course.name}
						</div>
						<button
							onClick={() => generateScheduleClicked()}
							className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ml-auto'
						>
							Generate Tee-Times
						</button>
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
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, userIdx) => (
										<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={() => removeUserFromAvailability(user)}
													className='group flex items-center px-3 py-2 text-sm font-medium w-full'
												>
													<XIcon
														className='text-gray-400 group-hover:text-gray-500
										flex-shrink-0 h-6 w-6'
													/>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		const sampleCourse = { timeslots: 12, interval: 7 };
		const sampleNextRound = {
			start_time: '16:00:00',
			game: 'Best_Poker_Hand',
			course: { name: 'Agusta National' },
			date: 'Tuesday',
		};
		const generateScheduleClicked = () => {
			setTeeTimeSchedule(generateSchedule(golfers, sampleNextRound, sampleCourse));

			setScheduleOpen(!scheduleOpen);
		};
		return (
			<div className='flex flex-col'>
				{scheduleOpen ? (
					<Modal open={scheduleOpen} setOpen={setScheduleOpen}>
						<TeetimeSchedule teeTimes={teeTimeSchedule} nextRound={sampleNextRound} setScheduleOpen={setScheduleOpen} />
					</Modal>
				) : null}
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='mb-3'>Next Round is: Not Yet Scheduled</div>
						<button
							onClick={() => generateScheduleClicked()}
							className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ml-auto'
						>
							Generate Tee-Times
						</button>
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
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, userIdx) => (
										<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={() => removeUserFromAvailability(user)}
													className='group flex items-center px-3 py-2 text-sm font-medium w-full'
												>
													<XIcon
														className='text-gray-400 group-hover:text-gray-500
								flex-shrink-0 h-6 w-6'
													/>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
