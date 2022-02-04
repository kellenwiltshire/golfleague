export default function ScoresList({ scores }): JSX.Element {
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide mb-5'>Prior Scores</h2>
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
										Birdies
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Chip Ins
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
								{scores
									? scores.map((score, scoreIdx) => (
											<tr key={score.id} className={scoreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{score.date}</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
													{score.course.name}
												</td>

												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{score.holes.map((hole) => {
														interface Hole {
															birdie: boolean;
															chip: boolean;
														}
														interface Birdies {
															hole: Hole[];
														}
														let birdies: Birdies[] = [];
														if (hole.birdie) {
															birdies.push(hole.hole);
														}

														return birdies.map((bird) => {
															return <span key={hole.id}>{bird} </span>;
														});
													})}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{score.holes.map((hole) => {
														interface Hole {
															birdie: boolean;
															chip: boolean;
														}
														interface ChipIn {
															hole: Hole[];
														}
														let chips: ChipIn[] = [];
														if (hole.chip) {
															chips.push(hole.hole);
														}

														return chips.map((chip) => {
															return <span key={hole.id}>{chip} </span>;
														});
													})}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{score.score}</td>
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
}
