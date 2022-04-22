import { useAllScoresStore } from '@/stores/AllScoresStore';
import { useScheduleStore } from '@/stores/ScheduleStore';
import {
	completedSchedule,
	findPriorRoundResults,
	findPriorRoundWinner,
} from '@/utils/sortingFunctions';
import { toJS } from 'mobx';
import React from 'react';

export default function ResultsTable(): JSX.Element {
	const allScores = toJS(useAllScoresStore().allScores);
	const schedule = toJS(useScheduleStore().schedule);

	const completedRounds = completedSchedule(schedule);
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
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
										Course
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Game
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Winner
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Score
									</th>
								</tr>
							</thead>
							<tbody>
								{completedRounds.map((round, roundIdx) => {
									const roundScores = findPriorRoundResults(
										allScores,
										round.date,
									);

									const winningGolfer = findPriorRoundWinner(
										roundScores,
										round,
									);

									let game = '';
									if (round.game) {
										game = round.game.replaceAll('_', ' ');
									}

									return (
										<tr
											key={round.id}
											className={roundIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
										>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
												{round.date}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
												{round.course.name}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
												{game}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
												{winningGolfer?.user?.first_name}{' '}
												{winningGolfer?.user?.last_name}
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
												{winningGolfer?.score}
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
