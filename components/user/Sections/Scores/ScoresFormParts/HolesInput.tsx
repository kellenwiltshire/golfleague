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
			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 1
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 2
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 3
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 4
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 5
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 6
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 7
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 8
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-1 flex shadow-sm rounded-md'>
				<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					Hole 9
				</div>
				<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm'>
						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>

						<div className='flex flex-row h-10 w-full justify-between align-middle'>
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
								className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
