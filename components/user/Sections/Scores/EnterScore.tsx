import React, { useState } from 'react';
import HolesInput from './ScoresFormParts/HolesInput';

export default function EnterScore({
	user,
	userScores,
	lastScheduledRound,
	updateScores,
	setSuccess,
	setFailure,
	setSubmitSuccess,
}): JSX.Element {
	const course = lastScheduledRound.course.name;
	const date = lastScheduledRound.date;
	const [score, setScore] = useState('');

	const [holeOne, setHoleOne] = useState({
		hole: 1,
		chip: false,
		birdie: false,
	});
	const [holeTwo, setHoleTwo] = useState({
		hole: 2,
		chip: false,
		birdie: false,
	});
	const [holeThree, setHoleThree] = useState({
		hole: 3,
		chip: false,
		birdie: false,
	});
	const [holeFour, setHoleFour] = useState({
		hole: 4,
		chip: false,
		birdie: false,
	});
	const [holeFive, setHoleFive] = useState({
		hole: 5,
		chip: false,
		birdie: false,
	});
	const [holeSix, setHoleSix] = useState({
		hole: 6,
		chip: false,
		birdie: false,
	});
	const [holeSeven, setHoleSeven] = useState({
		hole: 7,
		chip: false,
		birdie: false,
	});
	const [holeEight, setHoleEight] = useState({
		hole: 8,
		chip: false,
		birdie: false,
	});
	const [holeNine, setHoleNine] = useState({
		hole: 9,
		chip: false,
		birdie: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newScore = {
			course: lastScheduledRound.course,
			holes: [holeOne, holeTwo, holeThree, holeFour, holeFive, holeSix, holeSeven, holeEight, holeNine],
			date: lastScheduledRound.date,
			user: user,
			score: score,
		};

		const request = { score: newScore };

		const res = await fetch('/api/submitScore', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		});

		if (res.status < 300) {
			updateScores([...userScores, newScore]);
			setSubmitSuccess(true);
			setSuccess(true);
		} else {
			setFailure(true);
		}
	};

	return (
		<div className='mb-5'>
			<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>Enter Score</h2>
			<form onSubmit={handleSubmit} className='mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				<li className='col-span-1 flex shadow-sm rounded-md'>
					<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
						<p>Date</p>
						<p>Course</p>
					</div>
					<div className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
						<div className='mx-1'>{date}</div>
						<div className='mx-1'>{course}</div>
					</div>
				</li>
				<li className='col-span-1 flex shadow-sm rounded-md'>
					<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
						Score
					</div>
					<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate'>
						<div className='mx-1'>
							<label htmlFor='score' className='sr-only'>
								Score
							</label>
							<input
								type='number'
								name='score'
								id='score'
								onChange={(e) => setScore(e.target.value)}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
								placeholder='Score'
								required
							/>
						</div>
					</div>
				</li>

				<HolesInput
					holeOne={holeOne}
					setHoleOne={setHoleOne}
					holeTwo={holeTwo}
					setHoleTwo={setHoleTwo}
					holeThree={holeThree}
					setHoleThree={setHoleThree}
					holeFour={holeFour}
					setHoleFour={setHoleFour}
					holeFive={holeFive}
					setHoleFive={setHoleFive}
					holeSix={holeSix}
					setHoleSix={setHoleSix}
					holeSeven={holeSeven}
					setHoleSeven={setHoleSeven}
					holeEight={holeEight}
					setHoleEight={setHoleEight}
					holeNine={holeNine}
					setHoleNine={setHoleNine}
				/>

				<div className='col-span-4 flex flex-row gap-1 my-2'>
					<button
						type='submit'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
					<button
						type='reset'
						className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
