import React from 'react';

export default function HolesInput({
	holeOne,
	setHoleOne,
	holeTwo,
	setHoleTwo,
	holeThree,
	setHoleThree,
	holeFour,
	setHoleFour,
	holeFive,
	setHoleFive,
	holeSix,
	setHoleSix,
	holeSeven,
	setHoleSeven,
	holeEight,
	setHoleEight,
	holeNine,
	setHoleNine,
}): JSX.Element {
	return (
		<>
			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 1
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole1Chip'
								aria-describedby='hole-1-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleOne({
										hole: 1,
										chip: !holeOne.chip,
										birdie: holeOne.birdie,
									});
								}}
								checked={holeOne.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole1Birdie'
								aria-describedby='hole-1-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleOne({
										hole: 1,
										chip: holeOne.chip,
										birdie: !holeOne.birdie,
									});
								}}
								checked={holeOne.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 2
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole2Chip'
								aria-describedby='hole-2-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleTwo({
										hole: 2,
										chip: !holeTwo.chip,
										birdie: holeTwo.birdie,
									});
								}}
								checked={holeTwo.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole2Birdie'
								aria-describedby='hole-2-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleTwo({
										hole: 2,
										chip: holeTwo.chip,
										birdie: !holeTwo.birdie,
									});
								}}
								checked={holeTwo.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 3
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole3Chip'
								aria-describedby='hole-3-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleThree({
										hole: 3,
										chip: !holeThree.chip,
										birdie: holeThree.birdie,
									});
								}}
								checked={holeThree.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole3Birdie'
								aria-describedby='hole-3-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleThree({
										hole: 3,
										chip: !holeThree.chip,
										birdie: holeThree.birdie,
									});
								}}
								checked={holeThree.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 4
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole4Chip'
								aria-describedby='hole-4-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleFour({
										hole: 4,
										chip: !holeFour.chip,
										birdie: holeFour.birdie,
									});
								}}
								checked={holeFour.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole4Birdie'
								aria-describedby='hole-4-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleFour({
										hole: 4,
										chip: holeFour.chip,
										birdie: !holeFour.birdie,
									});
								}}
								checked={holeFour.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 5
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole5Chip'
								aria-describedby='hole-5-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleFive({
										hole: 5,
										chip: !holeFive.chip,
										birdie: holeFive.birdie,
									});
								}}
								checked={holeFive.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole5Birdie'
								aria-describedby='hole-5-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleFive({
										hole: 5,
										chip: holeFive.chip,
										birdie: !holeFive.birdie,
									});
								}}
								checked={holeFive.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 6
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole16hip'
								aria-describedby='hole-6-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleSix({
										hole: 6,
										chip: !holeSix.chip,
										birdie: holeSix.birdie,
									});
								}}
								checked={holeSix.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole6Birdie'
								aria-describedby='hole-6-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleSix({
										hole: 6,
										chip: holeSix.chip,
										birdie: !holeSix.birdie,
									});
								}}
								checked={holeSix.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 7
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole7Chip'
								aria-describedby='hole-7-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleSeven({
										hole: 7,
										chip: !holeSeven.chip,
										birdie: holeSeven.birdie,
									});
								}}
								checked={holeSeven.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole7Birdie'
								aria-describedby='hole-7-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleSeven({
										hole: 7,
										chip: holeSeven.chip,
										birdie: !holeSeven.birdie,
									});
								}}
								checked={holeSeven.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 8
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole8Chip'
								aria-describedby='hole-8-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleEight({
										hole: 8,
										chip: !holeEight.chip,
										birdie: holeEight.birdie,
									});
								}}
								checked={holeEight.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole8Birdie'
								aria-describedby='hole-8-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleEight({
										hole: 8,
										chip: holeEight.chip,
										birdie: !holeEight.birdie,
									});
								}}
								checked={holeEight.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					Hole 9
				</div>
				<div className='flex flex-1 items-center justify-between rounded-r-md border border-gray-200 bg-white'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Chip In: </span>
							<input
								id='hole9Chip'
								aria-describedby='hole-9-chip-in'
								name='chip-in'
								type='checkbox'
								onChange={() => {
									setHoleNine({
										hole: 9,
										chip: !holeNine.chip,
										birdie: holeNine.birdie,
									});
								}}
								checked={holeNine.chip}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>

						<div className='flex h-10 w-full flex-row justify-between align-middle'>
							<span>Birdie </span>
							<input
								id='hole9Birdie'
								aria-describedby='hole-9-birdie'
								name='birdie'
								type='checkbox'
								onChange={() => {
									setHoleNine({
										hole: 9,
										chip: holeNine.chip,
										birdie: !holeNine.birdie,
									});
								}}
								checked={holeNine.birdie}
								className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
