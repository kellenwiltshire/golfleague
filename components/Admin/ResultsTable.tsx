import { useAllScoresContext, useScheduleContext } from '@/context/Store';
import {
	completedSchedule,
	findPriorRoundResults,
	findPriorRoundWinner,
} from '@/utils/sortingFunctions';
import React from 'react';

export default function ResultsTable(): JSX.Element {
	const allScores = useAllScoresContext();
	const schedule = useScheduleContext();

	const completedRounds = completedSchedule(schedule);
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Date
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Course
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Game
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Winner
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
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
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{round.date}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{round.course.name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{game}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{winningGolfer?.user?.first_name}{' '}
												{winningGolfer?.user?.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
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
