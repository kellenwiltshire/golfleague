import { sortSchedule } from '@/utils/sortingFunctions';

export default function ScheduleTable({ schedules }): JSX.Element {
	const scheduleSorted = sortSchedule(schedules);

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
										Start Time
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Pricing
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Notes
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Address
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Phone Number
									</th>
								</tr>
							</thead>
							<tbody>
								{scheduleSorted.map((round, roundIdx) => {
									let game = '';
									if (round.game) {
										game = round.game.replaceAll('_', ' ');
									}
									return (
										<tr key={round.id} className={roundIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.date}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.course.name}</td>

											<td className='px-6 py-4 whitespace-nowrap text-sm'>{game}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.start_time}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.course.pricing}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.course.additionalInfo}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.course.phone}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>{round.course.address}</td>
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
