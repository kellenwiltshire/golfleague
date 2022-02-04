import React, { useState } from 'react';
import HolesInput from '../user/Sections/Scores/ScoresFormParts/HolesInput';

export default function EditScoreForm({
	lastScheduledRound,
	selectedScore,
	setSuccess,
	setFail,
	setOpen,
	setScores,
}): JSX.Element {
	const [score, setScore] = useState(selectedScore.score);

	const course = lastScheduledRound.course.name;
	const date = lastScheduledRound.date;

	const [holeOne, setHoleOne] = useState({
		hole: 1,
		chip: selectedScore.holes[0].chip,
		birdie: selectedScore.holes[0].birdie,
	});
	const [holeTwo, setHoleTwo] = useState({
		hole: 2,
		chip: selectedScore.holes[1].chip,
		birdie: selectedScore.holes[1].birdie,
	});
	const [holeThree, setHoleThree] = useState({
		hole: 3,
		chip: selectedScore.holes[2].chip,
		birdie: selectedScore.holes[2].birdie,
	});
	const [holeFour, setHoleFour] = useState({
		hole: 4,
		chip: selectedScore.holes[3].chip,
		birdie: selectedScore.holes[3].birdie,
	});
	const [holeFive, setHoleFive] = useState({
		hole: 5,
		chip: selectedScore.holes[4].chip,
		birdie: selectedScore.holes[4].birdie,
	});
	const [holeSix, setHoleSix] = useState({
		hole: 6,
		chip: selectedScore.holes[5].chip,
		birdie: selectedScore.holes[5].birdie,
	});
	const [holeSeven, setHoleSeven] = useState({
		hole: 7,
		chip: selectedScore.holes[6].chip,
		birdie: selectedScore.holes[6].birdie,
	});
	const [holeEight, setHoleEight] = useState({
		hole: 8,
		chip: selectedScore.holes[7].chip,
		birdie: selectedScore.holes[7].birdie,
	});
	const [holeNine, setHoleNine] = useState({
		hole: 9,
		chip: selectedScore.holes[8].chip,
		birdie: selectedScore.holes[8].birdie,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newScore = {
			id: selectedScore.id,
			data: {
				holes: [
					holeOne,
					holeTwo,
					holeThree,
					holeFour,
					holeFive,
					holeSix,
					holeSeven,
					holeEight,
					holeNine,
				],
				score: score,
			},
		};

		const request = { score: newScore };

		const req = await fetch('/api/editUserScore', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		});

		if (req.status < 300) {
			const reqScores = await fetch('/api/getScores');
			if (reqScores.status < 300) {
				const response = await reqScores.json();
				setScores(response);
				setOpen(false);
				setSuccess(true);
			}
		} else {
			setOpen(false);
			setFail(true);
		}
	};
	return (
		<div>
			<div>
				<div className='mb-5'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Edit Score
						</h2>
					</div>
					<form
						onSubmit={handleSubmit}
						className='mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'
					>
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
										type='score'
										name='score'
										id='score'
										onChange={(e) => setScore(e.target.value)}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={score || 'Score'}
										value={score}
										required
									/>
								</div>
							</div>
						</li>
						<div className='col-span-4 flex flex-row gap-1 my-2 ml-auto'>
							<button
								type='submit'
								disabled
								className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
