import CourseFilterInput from '@/components/Inputs/CourseFilterInput';
import DateFilterInput from '@/components/Inputs/DateFilterInput';
import SearchInput from '@/components/Inputs/SearchInput';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { findLastScheduledRound } from '@/utils/sortingFunctions';
import SaveSuccess from '../Notifications/SaveSuccess';
import SaveFail from '../Notifications/SaveFail';
import Modal from '../Modals/Modal';
import EditScoreForm from '../Forms/EditScoreForm';
import DeleteScore from '../Modals/DeleteScore';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useAllScoresStore } from '@/stores/AllScoresStore';
import { toJS } from 'mobx';
import { useCoursesStore } from '@/stores/CoursesStore';

export default function UserScores(): JSX.Element {
	const allScores = toJS(useAllScoresStore().allScores);
	const schedules = toJS(useScheduleStore().schedule);
	const courses = toJS(useCoursesStore().courses);
	const [scores, setScores] = useState(allScores);
	const [editUserScore, setEditUserScore] = useState(false);
	const [deleteUserScore, setDeleteUserScore] = useState(false);
	const [scoresSorted, setScoresSorted] = useState(false);

	const [success, setSuccess] = useState(false);
	const [fail, setFail] = useState(false);

	const lastScheduledRound = findLastScheduledRound(schedules);
	const [selectedScore, setSelectedScore] = useState({});

	const userSearchChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			let nameFilter = allScores.filter((score) => {
				const fullName = `${score.user.first_name} ${score.user.last_name}`;
				const name = fullName.toLowerCase();
				if (name.includes(e.target.value.toLowerCase())) {
					return score;
				}
			});
			setScores(nameFilter);
		} else {
			setScores(allScores);
		}
	};

	const courseFilterChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			if (e.target.value === 'Courses') {
				setScores(allScores);
			} else {
				let courseFilter = allScores.filter((score) => {
					if (score.course.name === e.target.value) {
						return score;
					}
				});
				setScores(courseFilter);
			}
		} else {
			setScores(allScores);
		}
	};

	const sortScores = () => {
		if (!scoresSorted) {
			const sortedScores = scores.sort((a, b) => {
				return a.score - b.score;
			});
			setScores(sortedScores);
			setScoresSorted(!scoresSorted);
		} else {
			const sortedScores = scores.sort((a, b) => {
				return b.score - a.score;
			});
			setScores(sortedScores);
			setScoresSorted(!scoresSorted);
		}
	};

	const dateFilterChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			if (e.target.value === 'Date') {
				setScores(allScores);
			} else {
				let dateFilter = allScores.filter((score) => {
					if (score.date === e.target.value) {
						return score;
					}
				});
				setScores(dateFilter);
			}
		} else {
			setScores(allScores);
		}
	};

	const resetForm = () => {
		setScores(allScores);
	};
	return (
		<div className='flex flex-col'>
			<Modal open={editUserScore} setOpen={setEditUserScore}>
				<EditScoreForm
					lastScheduledRound={lastScheduledRound}
					selectedScore={selectedScore}
					setSuccess={setSuccess}
					setFail={setFail}
					setOpen={setEditUserScore}
					setScores={setScores}
				/>
			</Modal>

			{deleteUserScore ? (
				<DeleteScore
					open={deleteUserScore}
					setOpen={setDeleteUserScore}
					selectedScore={selectedScore}
					setFailure={setFail}
					setSuccess={setSuccess}
					setScores={setScores}
				/>
			) : null}

			<SaveSuccess show={success} setShow={setSuccess} />

			<SaveFail show={fail} setShow={setFail} />

			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='flex w-full flex-col md:flex-row'>
						<SearchInput inputName='Search Players' inputChange={userSearchChange} />
						<CourseFilterInput inputName='Filter Courses' courses={courses} inputChange={courseFilterChange} />
						<DateFilterInput inputName='Filter Dates' schedules={schedules} inputChange={dateFilterChange} />
						<div className='mx-2 mt-2 md:mx-0'>
							<button
								type='reset'
								className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:mt-6'
								onClick={resetForm}
							>
								Reset
							</button>
						</div>
					</div>

					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										User ID
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
										Course
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Date
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Holes Birdies (Hole No.)
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Holes Chipped (Hole No.)
									</th>
									<th
										onClick={sortScores}
										scope='col'
										className='cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Total Score
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{scores.map((score, scoreIdx) => (
									<tr key={score.id} className={scoreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
										<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>{score.user.id}</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
											{score.user.first_name} {score.user.last_name}
										</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{score.course.name}</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{score.date}</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
											{score.holes.map((hole) => {
												let birdies: Array<number> = [];
												if (hole.birdie) {
													birdies.push(hole.hole);
												}

												return birdies.map((bird) => {
													return <span key={hole.id}>{bird} </span>;
												});
											})}
										</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
											{score.holes.map((hole) => {
												let chips: Array<number> = [];
												if (hole.chip) {
													chips.push(hole.hole);
												}

												return chips.map((chip) => {
													return <span key={hole.id}>{chip} </span>;
												});
											})}
										</td>
										<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{score.score}</td>
										<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
											<button
												onClick={() => {
													setEditUserScore(!editUserScore);
													setSelectedScore(score);
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
													setDeleteUserScore(!deleteUserScore);
													setSelectedScore(score);
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
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
