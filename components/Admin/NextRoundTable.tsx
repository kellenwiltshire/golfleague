import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import TeetimeSchedule from '../TeeTimeGenerator/TeetimeSchedule';
import Modal from '../Modals/Modal';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { toJS } from 'mobx';
import { useAllUsersStore } from '@/stores/AllUsersStore';
import { User } from '@/utils/interfaces';

//For testing purposes
const golfers = [
	{ id: 1, first_name: 'Player', last_name: 'One', carpool: '', teeTime: false },
	{
		id: 2,
		first_name: 'Player',
		last_name: 'Two',
		carpool: 'Player Nine',
		teeTime: false,
	},
	{ id: 3, first_name: 'Player', last_name: 'Three', carpool: '', teeTime: false },
	{ id: 4, first_name: 'Player', last_name: 'Four', carpool: '', teeTime: true },
	{ id: 5, first_name: 'Player', last_name: 'Five', carpool: 'Player Thirteen', teeTime: false },
	{ id: 6, first_name: 'Player', last_name: 'Six', carpool: '', teeTime: false },
	{ id: 7, first_name: 'Player', last_name: 'Seven', carpool: '', teeTime: false },
	{ id: 8, first_name: 'Player', last_name: 'Eight', carpool: '', teeTime: false },
	{
		id: 9,
		first_name: 'Player',
		last_name: 'Nine',
		carpool: 'Player Two',
		teeTime: false,
	},
	{ id: 10, first_name: 'Player', last_name: 'Ten', carpool: '', teeTime: true },
	{ id: 11, first_name: 'Player', last_name: 'Eleven', carpool: '', teeTime: false },
	{ id: 12, first_name: 'Player', last_name: 'Twelve', carpool: '', teeTime: false },
	{
		id: 13,
		first_name: 'Player',
		last_name: 'Thirteen',
		carpool: 'Player Five',
		teeTime: false,
	},
	{ id: 14, first_name: 'Player', last_name: 'Fourteen', carpool: '', teeTime: false },
	{ id: 15, first_name: 'Player', last_name: 'Fifteen', carpool: '', teeTime: false },
	{ id: 16, first_name: 'Player', last_name: 'Sixteen', carpool: '', teeTime: false },
	{ id: 17, first_name: 'Player', last_name: 'Seventeen', carpool: '', teeTime: false },
	{ id: 18, first_name: 'Player', last_name: 'Eighteen', carpool: '', teeTime: true },
	{ id: 19, first_name: 'Player', last_name: 'Nineteen', carpool: '', teeTime: false },
	{ id: 20, first_name: 'Player', last_name: 'Twenty', carpool: '', teeTime: false },
	{ id: 21, first_name: 'Player', last_name: 'Twentyone', carpool: '', teeTime: false },
	{ id: 22, first_name: 'Player', last_name: 'Twentytwo', carpool: '', teeTime: false },
	{ id: 23, first_name: 'Player', last_name: 'Twentythree', carpool: '', teeTime: false },
	{ id: 24, first_name: 'Player', last_name: 'TwentyFour', carpool: '', teeTime: true },
	{ id: 25, first_name: 'Player', last_name: 'TwentyFive', carpool: '', teeTime: false },
	{ id: 26, first_name: 'Player', last_name: 'TwentySix', carpool: '', teeTime: false },
	{ id: 27, first_name: 'Player', last_name: 'TwentySeven', carpool: '', teeTime: false },
	{ id: 28, first_name: 'Player', last_name: 'TwentyEight', carpool: '', teeTime: false },
	{ id: 29, first_name: 'Player', last_name: 'TwentyNine', carpool: '', teeTime: false },
	{ id: 30, first_name: 'Player', last_name: 'Thirty', carpool: '', teeTime: false },
	{ id: 31, first_name: 'Player', last_name: 'ThirtyOne', carpool: '', teeTime: false },
	{ id: 32, first_name: 'Player', last_name: 'ThirtyTwo', carpool: '', teeTime: true },
	{ id: 33, first_name: 'Player', last_name: 'ThirtyThree', carpool: '', teeTime: false },
	{ id: 34, first_name: 'Player', last_name: 'ThirtyFour', carpool: '', teeTime: false },
	{ id: 35, first_name: 'Player', last_name: 'ThirtyFive', carpool: '', teeTime: false },
	{ id: 36, first_name: 'Player', last_name: 'ThirtySix', carpool: '', teeTime: false },
	{ id: 37, first_name: 'Player', last_name: 'ThirtySeven', carpool: '', teeTime: false },
	{ id: 38, first_name: 'Player', last_name: 'ThirtyEight', carpool: '', teeTime: true },
	{ id: 39, first_name: 'Player', last_name: 'ThirtyNine', carpool: '', teeTime: false },
	{ id: 40, first_name: 'Player', last_name: 'Forty', carpool: '', teeTime: false },
	{ id: 41, first_name: 'Player', last_name: 'FortyOne', carpool: '', teeTime: false },
	{ id: 42, first_name: 'Player', last_name: 'FortyTwo', carpool: '', teeTime: false },
	{
		id: 43,
		first_name: 'Player',
		last_name: 'FortyThree',
		carpool: '',
		teeTime: false,
	},
	{ id: 44, first_name: 'Player', last_name: 'FortyFour', carpool: '', teeTime: false },
	{ id: 45, first_name: 'Player', last_name: 'FortyFive', carpool: '', teeTime: false },
	{ id: 46, first_name: 'Player', last_name: 'FortySix', carpool: '', teeTime: true },
	{
		id: 47,
		first_name: 'Player',
		last_name: 'FortySeven',
		carpool: '',
		teeTime: false,
	},
	{ id: 48, first_name: 'Player', last_name: 'FortyEight', carpool: '', teeTime: false },
	{ id: 49, first_name: 'Player', last_name: 'FORTYNINE', carpool: '', teeTime: false },
	{ id: 50, first_name: 'Player', last_name: 'FIFTY', carpool: '', teeTime: false },
	{ id: 51, first_name: 'Player', last_name: 'FIFTYONE', carpool: '', teeTime: false },
	{ id: 52, first_name: 'Player', last_name: 'FIFTYTWO', carpool: '', teeTime: true },
	{ id: 53, first_name: 'Player', last_name: 'FIFTYTHREE', carpool: '', teeTime: false },
];

export default function NextRoundTable(): JSX.Element {
	const allUsers = toJS(useAllUsersStore().allUsers);
	const schedule = toJS(useScheduleStore().schedule);
	const [users, setUsers] = useState<User[]>(allUsers);

	const [scheduleOpen, setScheduleOpen] = useState(false);
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
	const [teeTimeSchedule, setTeeTimeSchedule] = useState<TeeTimes>();

	const nextRound = findNextRound(schedule);

	if (nextRound && nextRound.course) {
		const findUsers = allUsers.filter((user: User) => {
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
									{users.map((user, userIdx) => (
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
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='mb-3'>Next Round is: Not Yet Scheduled</div>
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
									{users.map((user, userIdx) => (
										<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{user.email}</td>
											<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
												<button className='group flex w-full items-center px-3 py-2 text-sm font-medium'>
													<XIcon
														className='h-6 w-6
								flex-shrink-0 text-gray-400 group-hover:text-gray-500'
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
