import React, { useState } from 'react';
import { mutate } from 'swr';
import HolesInput from './ScoresFormParts/HolesInput';

export default function EnterScore({ user, userScores, lastScheduledRound, setSuccess, setFailure }): JSX.Element {
	if (lastScheduledRound.course) {
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
				mutate('/api/getScores', () => {
					setSuccess(true);
				}).catch((err) => {
					setFailure(true);
					console.log(err);
				});
			}
		};

		return (
			<div className='mb-5'>
				<h2 className='text-xs font-medium uppercase tracking-wide text-gray-500'>Enter Score</h2>
				<form onSubmit={handleSubmit} className='mt-3 flex flex-row flex-wrap'>
					<li className='shadow-s m-1 flex h-24 w-52 rounded-md'>
						<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
							<p>Date</p>
							<p>Course</p>
						</div>
						<div className='flex flex-1 flex-col justify-center truncate rounded-r-md border border-gray-200 bg-white'>
							<div className='mx-1'>{date}</div>
							<div className='mx-1'>{course}</div>
						</div>
					</li>
					<li className='m-1 flex h-24 w-52 rounded-md shadow-sm'>
						<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
							Score
						</div>
						<div className='flex flex-1 items-center justify-between truncate rounded-r-md border border-gray-200 bg-white'>
							<div className='mx-1'>
								<label htmlFor='score' className='sr-only'>
									Score
								</label>
								<input
									type='number'
									name='score'
									id='score'
									onChange={(e) => setScore(e.target.value)}
									className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
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

					<div className='my-2 mr-2 flex w-full flex-row  gap-1'>
						<button
							type='submit'
							className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Save
						</button>
						<button
							type='reset'
							className='inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Reset
						</button>
					</div>
				</form>
			</div>
		);
	} else {
		return <div></div>;
	}
}
